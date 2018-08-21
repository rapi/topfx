import {line} from 'd3-shape'
import Base from './Base'
import PropTypes from 'prop-types';

class Line extends Base{
  path=()=>line()
    .x((d)=>this.x()(d.time))
    .y((d)=>this.y()(d.close))
}
Line.propTypes = {
  data: PropTypes.array,
};
export default Line
