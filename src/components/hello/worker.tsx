self.onmessage = function(event) {
  const result = event.data * 2;
  self.postMessage(result);
};