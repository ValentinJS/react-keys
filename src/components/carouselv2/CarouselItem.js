import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addScrollableItemRef } from './handler';

class CarouselItem extends Component {
  state = {}

  componentDidMount() {
    const { binderId } = this.props;
    addScrollableItemRef(binderId, this.el)
  }

  render() {
    const {
      item,
      itemWidth, 
      itemHeight,
      itemStyles, 
    } = this.props;

    const itemWrapperStyles = {
      width: `${itemWidth}px`,
      height: `${itemHeight}px`,
      display: 'inline-block'
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