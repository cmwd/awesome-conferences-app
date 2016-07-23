module.exports = {
  toPromise(resolve, reject) {
    return (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    };
  },
};
