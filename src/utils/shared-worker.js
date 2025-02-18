const ports = new Set();
let ws = null;
let reconnectTimer = null;

const connect = () => {
  if (ws && [WebSocket.OPEN, WebSocket.CONNECTING].includes(ws.readyState)) return;

  ws = new WebSocket(`wss://localhost/api/sl/ws`);

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    ports.forEach(port => {
      port.postMessage({
        type: 'WS_MESSAGE',
        payload: data
      });
    });
  };

  ws.onclose = () => {
    if (reconnectTimer) clearTimeout(reconnectTimer);
    reconnectTimer = setTimeout(() => connect(), 5000);
  };
};

self.onconnect = (e) => {
  const port = e.ports[0];
  ports.add(port);

  port.onmessage = (event) => {
    switch (event.data.type) {
      case 'INIT':
        connect(event.data.token);
        break;
      case 'SEND':
        if (ws?.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(event.data.payload));
        }
        break;
      case 'CLOSE':
        ws?.close();
        break;
    }
  };

  port.start();
};
