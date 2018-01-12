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
  exitCarousel,
  itemFocusedHandler,
  horizontalScrollHandler,
  horizontalNestedScrollHandler,
  verticalScrollHandler,
  getItemOffsetHeight,
  getNestedItemOffsetWidth,
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
  updatesTimeout = [];
  TICK = 0;

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {
      children,
      childItemWrapper,
      debounce,
      direction,
      focusedClassName,
      horizontalChildItemWrapper,
      id,
      itemsVisiblesCount,
      mirror,
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

    if (debounce) {
      this.TICK = debounce;
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
      mirror,
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

  componentWillUnmount() {
    _removeBinder(this.props.id);
    this.updatesTimeout.forEach(t => clearTimeout(t));
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
      height: wrapperHeight,
      width: `${wrapperWidth + wrapperOverflow}px`,
      margin: '0 auto',
      overflow: 'hidden',
      position: 'relative',
    };
  }

  getVerticalWrapperStyles(wrapperHeight, wrapperWidth) {
    return {
      height: `${wrapperHeight}px`,
      width: wrapperWidth,
      margin: '0 auto',
      overflow: 'hidden',
      position: 'relative',
      display: 'block',
    };
  }

  onUpExit = () => {
    const { id, onUpExit } = this.props;
    if (onUpExit) {
      onUpExit();
      exitCarousel(id);
    }
  };

  onDownExit = () => {
    const { id, onDownExit } = this.props;
    if (onDownExit) {
      onDownExit();
      exitCarousel(id);
    }
  };

  refreshCarousel = cb => {
    const { children, preloadItemsCount } = this.props;
    this.setState({ refresh: true }, () => {
      cb();
    });
  };

  queueAction(action, timeout) {
    const timeoutHandle = setTimeout(action, timeout);
    this.updatesTimeout.push(timeoutHandle);
  }

  updatePositions = (positions, cb) => {
    if (this.pendingScrollAsyncUpdateHandle || this.blocked) {
      return; // an update already queued, skip
    }
    const { children, id, preloadItemsCount } = this.props;
    this.blocked = true;
    this.pendingScrollAsyncUpdateHandle = requestAnimationFrame(() => {
      this.queueAction(() => {
        this.refreshCarousel(() => {});
        if (!isNaN(positions.iFocused))
          itemFocusedHandler(id, positions.iFocused, positions.nestedIFocused);

        if (!isNaN(positions.scrollableTranslateX)) {
          horizontalScrollHandler(
            id,
            positions.scrollableTranslateX,
            positions.nestedScrollableTranslateX
          );
        } else if (!isNaN(positions.nestedScrollableTranslateX)) {
          horizontalNestedScrollHandler(
            id,
            positions.nestedScrollableTranslateX
          );
        } else if (!isNaN(positions.scrollableTranslateY)) {
          verticalScrollHandler(id, positions.scrollableTranslateY);
        }
        this.pendingScrollAsyncUpdateHandle = 0;
        this.blocked = false;
      }, this.TICK);
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
        loadOnce,
        loop,
        preloadItemsCount,
        onEnter,
        wrapperOverflow,
        wrapperHeight,
        wrapperWidth,
        verticalFocusGap,
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
          refresh={Math.random()}
          loadOnce={loadOnce}
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
            onUpExit={this.onUpExit}
            onDownExit={this.onDownExit}
            updatePositions={this.updatePositions}
            verticalFocusGap={verticalFocusGap}
          />
        )}
      </div>
    );
  }
}

Carousel.propTypes = propTypes;
Carousel.defaultProps = defaultProps;

export default Carousel;
