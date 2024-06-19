module.exports = {
    JSONResponse: (res, status, payload) => {
      res.status(status).json(payload);                         // this function generates response if response is success , it sends status and payload
    },
    ErrorResponse: (res, status, message) => {
      res.status(status).json({ error: message });            // this function generates response if response is error , it sends status and payload
    }
  };