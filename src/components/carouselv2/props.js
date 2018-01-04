import PropTypes from 'prop-types';
import { NAVIGATION_CENTER } from '../../constants';

export const propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  id: PropTypes.string.isRequired,
  active: PropTypes.bool,
  index: PropTypes.number,
  onDownExit: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  onUpExit: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  onEnter: PropTypes.func,
  itemWidth: PropTypes.number,
  itemHeight: PropTypes.number,
  loop: PropTypes.bool,
  preloadItemsCount: PropTypes.number,
  wrapperOverflow: PropTypes.number
};

export const defaultProps = {
  children: [],
  active: false,
  index: 0,
  loop: false
};
