let ports = [];
let ws;
let initing = false;
let opened = false; // 连接状态 打开/关闭

self.onconnect = (e) => {
  debugger
  const port = e.ports[0]
  ports.push(port)
  // 发送消息给连接的页面
  port.postMessage(
    JSON.stringify({
      type: 10,
      data: `SharedWorker连接成功,连接数:${ports.length}`
    })
  )
  port.onmessage = (e) => {
    // 处理从连接的页面接收到的消息
    console.log('处理从连接的页面接收到的消息e', e)
    const d = e.data
    // type=0 连接WebSocket
    // type=1 初始化WebSocket
    // type=2 发送数据
    // type=3 关闭连接
    // type=4 从shareWorker移除当前连接的页面
    // type=10 输出日志
    if (d.type === 0 && !initing) {
      initing = true;
      // WebSocket如果未进行连接则需要建立一个新的连接
      // WebSocket连接如果已关闭需重新连接
      if (!ws || !opened) {
        const wsBaseUrl = d.data.wsBaseUrl
        // const wsBaseUrl = "ws://10.2.2.13:1380/api/sl/ws"
        try {
          postAllMessage({
            type: 10,
            data: 'WebSocket不存在，即将创建'
          });
          ws = new WebSocket(wsBaseUrl);
          postAllMessage({
            type: 10,
            data: 'WebSocket创建连接成功:' + wsBaseUrl
          });

          ws.onopen = function (e) {
            opened = true;
            console.log('onopen', e)
            postAllMessage({
              type: 10,
              data: 'WebSocket连接打开'
            });
            postAllMessage({
              type: 1,
              success: true,
              method: 'onopen'
            });
          }

          ws.onclose = function (e) {
            console.log('onclose', e)
            opened = false;
            postAllMessage({
              type: 10,
              data: `WebSocket连接关闭:${JSON.stringify(e)}`
            });
            postAllMessage({
              type: 1,
              success: true,
              method: 'onclose',
              data: e
            });
          }
          ws.onmessage = (e) => {
            console.log('onmessage', e)
            const data = e.data
            postAllMessage({
              type: 10,
              data: `WebSocket获取到数据:${JSON.stringify(e.data)}`
            });
            postAllMessage({
              type: 1,
              success: true,
              method: 'onmessage',
              data: data
            });
          }
          ws.onerror = function (e) {
            console.log('onerror', e)
            opened = false
            postAllMessage({
              type: 10,
              data: `WebSocket连接错误:${JSON.stringify(e)}`
            })
            postAllMessage({
              type: 1,
              success: true,
              method: 'onerror',
              data: e
            })
          }
        } catch (e) {
          postAllMessage({
            type: 10,
            data: 'WebSocket创建连接失败:' + wsBaseUrl + '\n错误信息：' + e
          })
        }
      } else {
        if (opened) {
          postAllMessage({
            type: 10,
            data: 'WebSocket连接打开,沿用已有WebSocket'
          });
          postAllMessage({
            type: 1,
            success: true,
            method: 'onopen'
          });
        } else {
          postAllMessage({
            type: 1,
            success: true,
            method: 'onclose',
            data: 'WebSocket连接关闭,WebSocket'
          });
        }
        postAllMessage({
          type: 10,
          data: '沿用已有WebSocket连接成功'
        });
      }
    } else if (d.type === 2) {
      ws.send(d.data)
      postAllMessage({
        type: 10,
        data: `WebSocket发送数据:${d.data}`
      })
    } else if (d.type === 3) {
      if (ports.length === 1) {
        ws.close()
        postAllMessage({
          type: 10,
          data: 'WebSocket关闭连接成功'
        });
      } else {
        postAllMessage({
          type: 10,
          data: `当前标签页有${ports.length}个，不会关闭WebSocket`
        });
      }
    } else if (d.type === 4) {
      const index = ports.indexOf(port)
      ports.splice(index, 1)
      postAllMessage({
        type: 10,
        data: `从ShareWorker移除已关闭的页面`
      })
    }
  }

  function postAllMessage(msg) {
    // console.log('SharedWorker连接数', ports.length)
    // console.log('给每个页面发送消息', msg)
    // 广播消息给所有连接的页面
    for (let i = 0; i < ports.length; i++) {
      const message = JSON.stringify(msg)
      // console.log('消息转成字符串', message)
      ports[i].postMessage(message)
    }
  }
}
