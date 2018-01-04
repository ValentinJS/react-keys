import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addScrollableItemRef } from './handler';

class CarouselItem extends Component {
  state = {}

  componentDidMount() {
    const { binderId, itemIndex } = this.props;
    addScrollableItemRef(binderId, itemIndex, this.el)
  }

  shouldComponentUpdate() {
    return false
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