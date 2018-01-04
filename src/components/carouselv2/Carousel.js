import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Keys from '../Keys';
import CarouselEngine from './CarouselEngine';
import CarouselLoopedEngine from './CarouselLoopedEngine';
import CarouselItem from './CarouselItem';
import CarouselScrollable from './CarouselScrollable';
import { defaultProps, propTypes } from './props';
import { _updateBinder, addCarouselToStore, _removeBinder } from '../../redux/actions';
import { throttle } from '../../engines/helpers';
import { CAROUSEL_DIRECTIONS, CAROUSEL_TYPE } from '../../constants';
import { itemFocusedHandler, horizontalScrollHandler, verticalScrollHandler } from './handler';
import { getIFocused, getScrollableRef, getScrollableTranslateX, getScrollableTranslateY, initItemFocused } from './handler';

class Carousel extends Component {

  constructor(props) {
    super(props);
    if (props.throttle) {
      this.updatePositions = throttle(this.updatePositions, 120);
    }
    this.isAnimating = false;
  }

  componentWillMount() {
    addCarouselToStore(this.props, CAROUSEL_TYPE);
    const { children, direction, itemsVisiblesCount, itemHeight, itemWidth, loop, preloadItemsCount } = this.props;
    this.initCarousel(direction, children, itemsVisiblesCount, itemHeight, itemWidth, loop, preloadItemsCount);
  }

  componentDidMount() {
    initItemFocused(this.props.id);
  }

  componentWillReceiveProps({ id, children, direction, itemsVisiblesCount, itemHeight, itemWidth, loop, preloadItemsCount }) {
    const {
      children: previousChildren
    } = this.props;

    if (previousChildren.length !== children.length) {
      this.initCarousel(direction, children, itemsVisiblesCount, itemHeight, itemWidth, loop, preloadItemsCount);
    }
  }

  getHorizontalWrapperStyles(itemHeight, wrapperOverflow, wrapperWidth) {
    return {
      height: itemHeight,
      width: `${wrapperWidth + wrapperOverflow}px`,
      margin: '0 auto',
      overflow: 'hidden',
      position: 'relative'
    };
  }

  getVerticalWrapperStyles(itemHeight, wrapperOverflow, wrapperHeight) {
    return {
      height: `${wrapperHeight + wrapperOverflow}px`,
      width: '100%',
      margin: '0 auto',
      overflow: 'hidden',
      position: 'relative'
    };
  }

  initCarousel(type, items, itemsVisiblesCount, itemHeight, itemWidth, loop, preloadItemsCount, iFocused = 0) {
    _updateBinder(this.props.id, { childItemWrapper: this.props.childItemWrapper, focusedClassName: this.props.focusedClassName, itemsVisiblesCount, preloadItemsCount });

    if (type === CAROUSEL_DIRECTIONS.horizontal) {
      const itemsLeft = [];

      for (let i = 0; i < items.length; i++) {
        const pos = itemWidth * i
        itemsLeft[i] = pos;
      }

      if (loop) {
        const scrollableWidth = items.length * itemWidth;
        this.setState({
          iFocused,
          itemsLeft,
          preloadItemsCount,
          scrollableWidth,
          wrapperWidth: itemsVisiblesCount * itemWidth,
          scrollable2TranslateX: -scrollableWidth,
          scrollableTranslateX: 0
        });
      }
      else {
        this.setState({
          itemsLeft,
          preloadItemsCount,
          scrollableTranslateX: 0,
          scrollableWidth: items.length * itemWidth,
          wrapperWidth: itemsVisiblesCount * itemWidth,
        });
      }
    }
    else if (type === CAROUSEL_DIRECTIONS.vertical) {
      const itemsTop = [];

      for (let i = 0; i < items.length; i++) {
        const pos = itemHeight * i;
        itemsTop[i] = pos;
      }

      this.setState({
        items,
        itemsTop,
        preloadItemsCount,
        scrollableTranslateY: 0,
        scrollableHeight: items.length * itemWidth,
        wrapperHeight: itemsVisiblesCount * itemHeight,
      });
    }
  }

  renderHorizontalItems(binderId, items, itemsLeft, itemHeight, itemWidth, itemStyles, preloadItemsCount, scrollableTranslateX, wrapperWidth) {
    const itemsToDisplay = items.map((item, iIndex) => {
      const itemLeft = itemsLeft[iIndex];
      const isItemVisible = (itemLeft + (itemWidth * preloadItemsCount)) >= -scrollableTranslateX && (itemLeft - (itemWidth * preloadItemsCount)) < ((wrapperWidth) - scrollableTranslateX);
      return isItemVisible && (
        <CarouselItem
          binderId={binderId}
          key={`item_${iIndex}`}
          item={item}
          itemWidth={itemWidth}
          itemHeight={itemHeight}
          itemStyles={itemStyles}
        />
      );
    })
    return itemsToDisplay;
  }

  renderVerticalItems(binderId, items, itemsTop, itemHeight, itemWidth, itemStyles, preloadItemsCount, scrollableTranslateY, wrapperHeight) {
    const itemsToDisplay = items.map((item, iIndex) => {
      const itemTop = itemsTop[iIndex];
      const isItemVisible = (itemTop + (itemHeight * preloadItemsCount)) >= -scrollableTranslateY && (itemTop - (itemHeight * preloadItemsCount)) < ((wrapperHeight) - scrollableTranslateY);

      return isItemVisible ? (
        <CarouselItem
          binderId={binderId}
          key={`item_${iIndex}`}
          item={item}
          itemWidth={itemWidth}
          itemHeight={itemHeight}
          itemStyles={itemStyles}
        />) : (
          <div key={`spacer_${iIndex}`} style={{ height: itemHeight }}></div>
        )
    })
    return itemsToDisplay;
  }

  updatePositions = (positions, cb) => {
    const { children, id } = this.props;

    this.setState({ refresh: true });
    if (!isNaN(positions.scrollableTranslateX)) {
      itemFocusedHandler(id, positions.iFocused, () => {
        horizontalScrollHandler(id, positions.scrollableTranslateX);
      })
    }
    else if (!isNaN(positions.scrollableTranslateY)) {
      itemFocusedHandler(id, positions.iFocused, () => {
        verticalScrollHandler(id, positions.scrollableTranslateY);
      })
    }
    else if (isNaN(positions.scrollableTranslateX) && isNaN(positions.scrollableTranslateY)) {
      itemFocusedHandler(id, positions.iFocused)
    }
  }

  render() {
    const {
      itemsLeft,
      itemsTop,
      itemsPositionsIndex,
      preloadItemsCount,
      scrollableAnimated,
      scrollable2Animated,
      scrollable2TranslateX,
      scrollablesVisibles,
      scrollableHeight,
      scrollableWidth,
      wrapperHeight,
      wrapperWidth
    } = this.state;

    const {
      active,
      children,
      direction,
      id,
      itemsVisiblesCount,
      itemHeight,
      itemWidth,
      itemStyles,
      loop,
      onEnter,
      wrapperOverflow
    } = this.props,
      wrapperStyles = direction === CAROUSEL_DIRECTIONS.horizontal ?
        this.getHorizontalWrapperStyles(itemHeight, wrapperOverflow, wrapperWidth) :
        this.getVerticalWrapperStyles(itemHeight, wrapperOverflow, wrapperHeight);

    const iFocused = getIFocused(id);
    const scrollableTranslateY = getScrollableTranslateY(id) || 0;
    const scrollableTranslateX = getScrollableTranslateX(id) || 0;

    return (
      <div id={id} style={wrapperStyles}>
        <CarouselScrollable
          id={id}
          direction={direction}
          scrollableHeight={scrollableHeight}
          scrollableTranslateX={scrollableTranslateX}
          scrollableTranslateY={scrollableTranslateY}
          scrollable2TranslateX={scrollable2TranslateX}
          scrollableWidth={scrollableWidth}
        >
          {
            direction === CAROUSEL_DIRECTIONS.horizontal ?
              this.renderHorizontalItems(
                id,
                children,
                itemsLeft,
                itemHeight,
                itemWidth,
                itemStyles,
                preloadItemsCount,
                scrollableTranslateX,
                wrapperWidth) :
              this.renderVerticalItems(
                id,
                children,
                itemsTop,
                itemHeight,
                itemWidth,
                itemStyles,
                preloadItemsCount,
                scrollableTranslateY,
                wrapperHeight)
          }
        </CarouselScrollable>
        {
          loop ?
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
            : <CarouselEngine
              binderId={id}
              direction={direction}
              itemsLeft={itemsLeft}
              itemsTop={itemsTop}
              itemsVisiblesCount={itemsVisiblesCount}
              itemHeight={itemHeight}
              itemWidth={itemWidth}
              onEnter={onEnter}
              scrollableTranslateX={scrollableTranslateX}
              scrollableTranslateY={scrollableTranslateY}
              scrollableHeight={scrollableHeight}
              scrollableWidth={scrollableWidth}
              wrapperHeight={wrapperHeight}
              wrapperWidth={wrapperWidth}
              updatePositions={this.updatePositions}
            />
        }

      </div>
    );
  }
}

Carousel.propTypes = propTypes;
Carousel.defaultProps = defaultProps;

export default Carousel;