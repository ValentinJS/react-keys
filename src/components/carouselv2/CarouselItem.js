import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addScrollableItemRef } from './handler';
import { CAROUSEL_DIRECTIONS } from '../../constants';
class CarouselItem extends Component {
  state = {}

  componentDidMount() {
    const { carouselId, itemIndex } = this.props;
    addScrollableItemRef(carouselId, itemIndex, this.el)
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    const {
      direction,
      item,
      itemWidth, 
      itemHeight,
      itemStyles,
    } = this.props;

    const itemWrapperStyles = {
      width: `${itemWidth}px`,
      height: `${itemHeight}px`,
      display: direction === CAROUSEL_DIRECTIONS.horizontal ? 'inline-block' : 'block'
    };
    
    return (
      <div ref={(el) => { this.el = el }} style={itemWrapperStyles}>
        <div style={itemStyles}>
          {item}
        </div>
      </div>
    );
  }
}

export default CarouselItem;