const status = { ok: true };

module.exports = (res, responseData = {}) => {
  responseData.status = Object.assign({}, responseData.status, status);
  res.json(responseData);
}
