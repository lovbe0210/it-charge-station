let workerInstance = null;

export const getWorker = () => {
  if (!workerInstance) {
    workerInstance = new SharedWorker(require("shared-worker"));
    workerInstance.port.start();
  }
  return workerInstance;
};

export const sendMessage = (payload) => {
  const worker = getWorker();
  worker.port.postMessage({
    type: 'SEND',
    payload
  });
};
