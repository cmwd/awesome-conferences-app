function show({ pocket }, res, next) {
  const model = pocket.get('conferenceModel');

  model.populate('resources', () => {
    res.json(model.resources);
  });
}

module.exports = { show };
