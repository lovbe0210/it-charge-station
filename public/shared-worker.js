let ports = [];
let ws;
let sockerUrl = null;
let initing = false;
let opened = false; // 连接状态 打开/关闭
let retries = 0; // 重试次数,最多5次
let retryIntervalTime = 5000; // 重试时间间隔，单位毫秒
let retryTimeout = null;
let heartCheckInterval = null; //心跳检测
let heartIntervalTime = 9000; //心跳时间间隔，9秒，后端服务器设置30秒空闲关闭连接，所以正好3次网络波动的机会

self.onconnect = (e) => {
  const port = e.ports[0]
  ports.push(port)
  // 发送消息给连接的页面
  port.postMessage(
    JSON.stringify({
      type: 10,
      data: `SharedWorker连接成功,连接数:${ports.length}`
    })
  )
  port.onmessage = (e) => executePageMessages(e);

  function executePageMessages(e) {
    // 处理从连接的页面接收到的消息
    const d = e.data
    // type=0 新建连接WebSocket
    // type=1 建立webSocket连接，状态：open
    // type=2 发送数据
    // type=3 关闭连接
    // type=4 从shareWorker移除当前连接的页面
    // type=10 输出日志
    if (d.type === 0 && !initing) {
      initing = true;
      if (!ws || !opened) {
        // WebSocket如果未进行连接则需要建立一个新的连接
        sockerUrl = d.data.wsBaseUrl
        try {
          ws = new WebSocket(sockerUrl);
          ws.onopen = function (e) {
            opened = true;
            postAllMessage({
              type: 1,
              data: 'WebSocket已连接'
            });
            // 开启心跳
            heartCheckInterval = setInterval(() => {
              let heartBeat = {
                type: 0,
                data: "ping"
              }
              ws.send(JSON.stringify(heartBeat));
            }, heartIntervalTime);
          }
          ws.onclose = function (e) {
            opened = false;
            postAllMessage({
              type: 3,
              data: `WebSocket连接关闭:${JSON.stringify(e)}`
            });
            clearInterval(heartCheckInterval);
            // retry("onclose");
          }
          ws.onmessage = (e) => {
            const data = e.data
            postAllMessage({
              type: 2,
              success: true,
              method: 'onmessage',
              data: data
            });
          }
          ws.onerror = function (e) {
            opened = false
            postAllMessage({
              type: 10,
              data: `WebSocket连接错误，errorInfo: ${JSON.stringify(e)}`
            });
            clearInterval(heartCheckInterval);
            retry("onerror");
          }
        } catch (e) {
          postAllMessage({
            type: 10,
            data: 'WebSocket创建连接失败:' + sockerUrl + '\n错误信息：' + e
          })
          retry("exception");
        }
      } else {
        postAllMessage({
          type: 1,
          data: 'WebSocket连接已建立,使用共享WebSocket连接'
        });
      }
      // 初始化结束，initing归位
      initing = false;
    } else if (d.type === 2) {
      ws.send(d.data);
    } else if (d.type === 3) {
      ws.close();
    } else if (d.type === 4) {
      const index = ports.indexOf(port)
      ports.splice(index, 1)
      port.postMessage(
        JSON.stringify({
          type: 10,
          data: `从SharedWorker移除已关闭的页面`
        })
      )
      if (ports.length === 0) {
        ws.close();
      }
    }
  }

  function retry(method) {
    clearTimeout(retryTimeout);
    if (retries < 5) {
      // 5秒后重新连接
      retryTimeout = setTimeout(() => {
        retries++;
        postAllMessage({
          type: 10,
          method: method,
          data: `websocket连接中断，重试第${retries}次`
        });
        executePageMessages({
          data: {
            type: 0,
            data: {wsBaseUrl: sockerUrl}
          }
        })
      }, retryIntervalTime)
    }
  }

  function postAllMessage(msg) {
    // 广播消息给所有连接的页面
    for (let i = 0; i < ports.length; i++) {
      const message = JSON.stringify(msg)
      ports[i].postMessage(message)
    }
  }
}
