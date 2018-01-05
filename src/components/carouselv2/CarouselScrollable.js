import React, { Component } from 'react';

import CarouselItem from './CarouselItem';
import { CAROUSEL_DIRECTIONS } from '../../constants';
import PropTypes from 'prop-types';
import { addScrollableRef, computeScrollableWidth } from './handler';

class CarouselScrollable extends Component {
  state = {}

  componentDidMount() {
    const { carouselId } = this.props;
    addScrollableRef(carouselId, this.el);
  }

  getHorizontalScrollableStyles() {
    return {
      display: 'flex',
      flexDirection: 'row',
      height: '100%',
    }
  }

  getVerticalScrollableStyles(scrollableTranslateY, scrollableHeight) {
    return {
      width: '100%',
      height: scrollableHeight,
    }
  }

  render() {
    const {
      children,
      direction,
      scrollableHeight,
      scrollableTranslateX,
      scrollableTranslateY,
      scrollable2TranslateX,
      scrollableWidth
    } = this.props;

    const scrollableStyles = direction === CAROUSEL_DIRECTIONS.horizontal ? this.getHorizontalScrollableStyles() : this.getVerticalScrollableStyles(scrollableTranslateY, scrollableHeight),
      scrollable2Styles = this.getHorizontalScrollableStyles(scrollable2TranslateX, scrollableWidth);

    return (
      <div className="keys-carousel-scrollable" ref={(el) => { this.el = el }} style={scrollableStyles} >
        {children}
      </div>
    );
  }
}

export default CarouselScrollable;