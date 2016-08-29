const generate = (count, offset, limit) => {
  const total = Math.ceil(count / limit);
  const left = Math.floor((count - offset) / limit);
  const current = total - left;

  return { total, current, itemsLimit: limit };
};

module.exports = { generate };
