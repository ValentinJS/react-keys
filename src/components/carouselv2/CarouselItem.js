import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addScrollableItemRef, addNestedScrollableItemRef } from './handler';
import { CAROUSEL_DIRECTIONS } from '../../constants';
class CarouselItem extends Component {
  state = {}

  componentDidMount() {
    const { carouselId, itemIndex, nested, parentCarouselId, parentItemIndex } = this.props;
    if(!nested) {
      addScrollableItemRef(carouselId, itemIndex, this.el)
    }
    else {
      addNestedScrollableItemRef(parentCarouselId, itemIndex, parentItemIndex, this.el)
    }
  }

  render() {
    const {
      direction,
      children,
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
          {children}
        </div>
      </div>
    );
  }
}

export default CarouselItem;