import { connect } from 'react-redux';
import HeaderBackgroundImage from './header-background-image-component';
import { conferenceSelectors } from '../../conference';

const { conferenceBySlugSelector } = conferenceSelectors;

export default connect(conferenceBySlugSelector)(HeaderBackgroundImage);
