import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  addScrollableItemRef,
  addNestedScrollableItemRef,
  removeScrollableItemRef,
  removeNestedScrollableItemRef,
} from './handler';
import { CAROUSEL_DIRECTIONS } from '../../constants';
class CarouselItem extends Component {
  state = {};

  componentDidMount() {
    this.handleAddRef();
  }

  componentWillUnmount() {
    this.handleRemoveRef();
  }

  handleAddRef() {
    const {
      carouselId,
      itemIndex,
      nested,
      parentCarouselId,
      parentItemIndex,
    } = this.props;
    if (!nested) {
      addScrollableItemRef(carouselId, itemIndex, this.el);
    } else {
      addNestedScrollableItemRef(
        parentCarouselId,
        itemIndex,
        parentItemIndex,
        this.el
      );
    }
  }

  handleRemoveRef() {
    const {
      carouselId,
      itemIndex,
      nested,
      parentCarouselId,
      parentItemIndex,
    } = this.props;
    if (!nested) {
      removeScrollableItemRef(carouselId, itemIndex);
    } else {
      removeNestedScrollableItemRef(
        parentCarouselId,
        itemIndex,
        parentItemIndex
      );
    }
  }

  shouldComponentUpdate() {
    return this.props.hasNestedItems || false;
  }

  render() {
    const { direction, children, itemStyles } = this.props;

    const itemWrapperStyles = {
      display:
        direction === CAROUSEL_DIRECTIONS.horizontal ? 'inline-block' : 'block',
    };

    return (
      <div
        ref={el => {
          this.el = el;
        }}
        style={itemWrapperStyles}
      >
        <div style={itemStyles}>{children}</div>
      </div>
    );
  }
}

export default CarouselItem;
