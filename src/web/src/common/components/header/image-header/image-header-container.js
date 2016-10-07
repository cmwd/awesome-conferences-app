import { connect } from 'react-redux';
import _ from 'lodash';
import ImageHeader from './image-header-tag';

const mapStateToProps = ({ conferences }, { params: { slug } }) => {
  const conference = conferences.find(c => c.slug === slug) || {};
  const name = _.get(conference, 'name', null);
  const banner = _.get(conference, 'details.banner', null);

  return { name, banner };
};

export default connect(mapStateToProps)(ImageHeader);
