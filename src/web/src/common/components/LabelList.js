import React, { PropTypes } from 'react';
import { Label } from './Bootstrap';

const LabelValue = ({ value }) => (
  <span className="label-list__item">
    <Label className="label-list__value" bsStyle="info">{value}</Label>
  </span>
);

const LabelList = ({ items }) => (
  <div className="label-list">
    {items.map((value, index) => <LabelValue value={value} key={index} />)}
  </div>
);

LabelValue.propTypes = {
  value: PropTypes.string,
};

LabelList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
};

export default LabelList;
