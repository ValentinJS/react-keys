import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Keys from '../Keys';
import CarouselEngine from './CarouselEngine';
import CarouselLoopedEngine from './CarouselLoopedEngine';
import CarouselItem from './CarouselItem';
import CarouselScrollable from './CarouselScrollable';
import { defaultProps, propTypes } from './props';
import { _updateBinder, addBinder, _removeBinder } from '../../redux/actions';
import { CAROUSEL_DIRECTIONS, CAROUSEL_TYPE } from '../../constants';
import {
  itemFocusedHandler,
  horizontalScrollHandler,
  horizontalNestedScrollHandler,
  verticalScrollHandler,
  getItemOffsetHeight,
  getNestedItemOffsetWidth,
} from './handler';
import {
  getIFocused,
  getNestedIFocused,
  getItemOffsetWidth,
  getScrollableRef,
  getScrollableTranslateX,
  getScrollableTranslateY,
  initCarousel,
  initItemFocused,
} from './handler';

class Carousel extends Component {
  state = {};

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {
      children,
      childItemWrapper,
      direction,
      focusedClassName,
      horizontalChildItemWrapper,
      id,
      itemsVisiblesCount,
      nestedFocusedClassName,
      loop,
      preloadItemsCount,
      verticalChildItemWrapper,
    } = this.props;

    if (!direction) {
      throw new Error('You must fill direction');
    } else if (
      direction === CAROUSEL_DIRECTIONS.verticalBidirectional &&
      (!horizontalChildItemWrapper || !verticalChildItemWrapper)
    ) {
      throw new Error(
        'You must fill horizontal child item wrapper and vertical child item wrapper selectors'
      );
    } else if (
      direction !== CAROUSEL_DIRECTIONS.verticalBidirectional &&
      !childItemWrapper
    ) {
      throw new Error('You must fill child item wrapper selector');
    }

    addBinder(this.props, CAROUSEL_TYPE);
    _updateBinder({
      id,
      childItemWrapper: childItemWrapper,
      focusedClassName: focusedClassName,
      direction,
      iFocused: 0,
      loop,
      horizontalChildItemWrapper,
      itemsVisiblesCount,
      preloadItemsCount,
      nestedFocusedClassName,
      nestedScrollableItems: [],
      nestedScrollableRefs: [],
      scrollableItems: [],
      scrollableTranslateX: 0,
      scrollableTranslateY: 0,
      scrollableWidth: 0,
      verticalChildItemWrapper,
    });
  }

  componentDidMount() {
    itemFocusedHandler(this.props.id, 0, 0);
  }

  componentWillReceiveProps({
    id,
    children,
    direction,
    itemsVisiblesCount,
    itemHeight,
    itemWidth,
    loop,
    preloadItemsCount,
  }) {
    const { children: previousChildren } = this.props;
  }

  getHorizontalWrapperStyles(wrapperHeight, wrapperOverflow, wrapperWidth) {
    return {
      height: wrapperHeigth,
      width: `${wrapperWidth + wrapperOverflow}px`,
      margin: '0 auto',
      overflow: 'hidden',
      position: 'relative',
    };
  }

  getVerticalWrapperStyles(wrapperHeight, wrapperWidth, wrapperOverflow) {
    return {
      height: `${wrapperHeight + wrapperOverflow}px`,
      width: wrapperWidth,
      margin: '0 auto',
      overflow: 'hidden',
      position: 'relative',
      display: 'block',
    };
  }

  refreshCarousel = cb => {
    const { children, preloadItemsCount } = this.props;
    if (preloadItemsCount < children.length) {
      this.setState({ refresh: true }, () => {
        cb();
      });
    } else {
      cb();
    }
  };

  updatePositions = (positions, cb) => {
    const { children, id, preloadItemsCount } = this.props;

    this.refreshCarousel(() => {
      if (!isNaN(positions.iFocused))
        itemFocusedHandler(id, positions.iFocused, positions.nestedIFocused);

      if (!isNaN(positions.scrollableTranslateX)) {
        horizontalScrollHandler(
          id,
          positions.scrollableTranslateX,
          positions.nestedScrollableTranslateX
        );
      } else if (!isNaN(positions.nestedScrollableTranslateX)) {
        horizontalNestedScrollHandler(id, positions.nestedScrollableTranslateX);
      } else if (!isNaN(positions.scrollableTranslateY)) {
        verticalScrollHandler(id, positions.scrollableTranslateY);
      }
    });
  };

  render() {
    const {
        active,
        children,
        direction,
        id,
        itemsVisiblesCount,
        itemStyles,
        loop,
        preloadItemsCount,
        onEnter,
        wrapperOverflow,
        wrapperHeight,
        wrapperWidth,
      } = this.props,
      wrapperStyles =
        direction === CAROUSEL_DIRECTIONS.horizontal
          ? this.getHorizontalWrapperStyles(
              wrapperHeight,
              wrapperOverflow,
              wrapperWidth
            )
          : this.getVerticalWrapperStyles(
              wrapperHeight,
              wrapperWidth,
              wrapperOverflow
            );

    const iFocused = getIFocused(id);
    const scrollableTranslateY = getScrollableTranslateY(id) || 0;
    const scrollableTranslateX = getScrollableTranslateX(id) || 0;

    return (
      <div id={id} style={wrapperStyles}>
        <CarouselScrollable
          carouselId={id}
          key={id}
          direction={direction}
          iFocused={iFocused}
          blah={Math.random()}
          itemsVisiblesCount={itemsVisiblesCount}
          preloadItemsCount={preloadItemsCount}
        >
          {children}
        </CarouselScrollable>
        {loop ? (
          <CarouselLoopedEngine
            id={`keys-${id}`}
            direction={direction}
            itemsLeft={itemsLeft}
            itemsVisiblesCount={itemsVisiblesCount}
            itemWidth={itemWidth}
            onEnter={onEnter}
            preloadItemsCount={preloadItemsCount}
            scrollableTranslateX={scrollableTranslateX}
            scrollable2TranslateX={scrollable2TranslateX}
            scrollableHeight={scrollableHeight}
            scrollableWidth={scrollableWidth}
            updatePositions={this.updatePositions}
            wrapperHeight={wrapperHeight}
            wrapperWidth={wrapperWidth}
          />
        ) : (
          <CarouselEngine
            active={active}
            carouselId={id}
            direction={direction}
            onEnter={onEnter}
            wrapperHeight={wrapperHeight}
            wrapperWidth={wrapperWidth}
            updatePositions={this.updatePositions}
          />
        )}
      </div>
    );
  }
}

Carousel.propTypes = propTypes;
Carousel.defaultProps = defaultProps;

export default Carousel;
