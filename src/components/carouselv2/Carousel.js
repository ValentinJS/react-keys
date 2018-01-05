import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Keys from '../Keys';
import CarouselEngine from './CarouselEngine';
import CarouselLoopedEngine from './CarouselLoopedEngine';
import CarouselItem from './CarouselItem';
import CarouselScrollable from './CarouselScrollable';
import { defaultProps, propTypes } from './props';
import { _updateBinder, addCarouselToStore, _removeBinder } from '../../redux/actions';
import { CAROUSEL_DIRECTIONS, CAROUSEL_TYPE } from '../../constants';
import { itemFocusedHandler, horizontalScrollHandler, verticalScrollHandler, getItemOffsetHeight } from './handler';
import { getIFocused, getItemOffsetWidth, getScrollableRef, getScrollableTranslateX, getScrollableTranslateY, initCarousel, initItemFocused } from './handler';

class Carousel extends Component {

  state = {
    initialized: false
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { children, direction, itemsVisiblesCount, loop, preloadItemsCount } = this.props;
    
    addCarouselToStore(this.props, CAROUSEL_TYPE);
    _updateBinder(this.props.id,
      {
        childItemWrapper: this.props.childItemWrapper,
        focusedClassName: this.props.focusedClassName,
        direction,
        iFocused: 0,
        loop,
        itemsVisiblesCount,
        preloadItemsCount,
        scrollableItems: [],
        scrollableTranslateX: 0,
        scrollableTranslateY: 0,
        scrollableWidth: 0
      }); 
  }

  componentDidMount() {
    itemFocusedHandler(this.props.id, 0)
  }

  componentWillReceiveProps({ id, children, direction, itemsVisiblesCount, itemHeight, itemWidth, loop, preloadItemsCount }) {
    const {
      children: previousChildren
    } = this.props;

    // if (previousChildren.length !== children.length) {
    //   this.initCarousel(direction, children, itemsVisiblesCount, itemHeight, itemWidth, loop, preloadItemsCount);
    // }
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

  getVerticalWrapperStyles(wrapperHeight, wrapperWidth, wrapperOverflow) {
    return {
      height: `${wrapperHeight + wrapperOverflow}px`,
      width: wrapperWidth,
      margin: '0 auto',
      overflow: 'hidden',
      position: 'relative',
      display: 'block'
    };
  }

  renderItems(carouselId, iFocused, itemsVisiblesCount, children, direction, itemStyles, preloadItemsCount, scrollableTranslateY, wrapperHeight) {
    return children.map((item, iIndex) => {
      const maxItemsVisible = iFocused + itemsVisiblesCount + preloadItemsCount;
      const minItemsVisible = iFocused - itemsVisiblesCount - preloadItemsCount;
      const isItemVisible = iIndex < maxItemsVisible && iIndex > minItemsVisible

      if(!isItemVisible){
        const height = getItemOffsetHeight(carouselId, iIndex);
        const width = getItemOffsetWidth(carouselId, iIndex);
        return (
          <div key={`spacer_${iIndex}`} style={{display: direction === CAROUSEL_DIRECTIONS.horizontal ? 'inline-block' : 'block' }}>
            <div style={{ height: height, width: width }}>
            </div>
          </div>
        )
      }

      return isItemVisible && (
        <CarouselItem
          carouselId={carouselId}
          direction={direction}
          key={`item_${iIndex}`}
          item={item}
          itemIndex={iIndex}
          itemStyles={itemStyles}
          preloadItemsCount={preloadItemsCount}
          wrapperHeight={wrapperHeight}
        />
      )
    })
  }

  refreshCarousel = (cb) => {
    const {children, preloadItemsCount} = this.props;
    if(preloadItemsCount < children.length){
      this.setState({ refresh: true }, () => {
        cb();
      })
    }
    else {
      cb();
    }
  }

  updatePositions = (positions, cb) => {
    const { children, id, preloadItemsCount } = this.props;


    this.refreshCarousel(() => {
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
    });

  }

  render() {
    const {
      initialized,
      itemsLeft,
      itemsTop,
      itemsPositionsIndex,
      scrollableAnimated,
      scrollable2Animated,
      scrollable2TranslateX,
      scrollablesVisibles,
      scrollableHeight,
      scrollableWidth,
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
      preloadItemsCount,
      onEnter,
      wrapperOverflow,
      wrapperHeight,
      wrapperWidth
    } = this.props,
      wrapperStyles = direction === CAROUSEL_DIRECTIONS.horizontal ?
        this.getHorizontalWrapperStyles(itemHeight, wrapperOverflow, wrapperWidth) :
        this.getVerticalWrapperStyles(wrapperHeight, wrapperWidth, wrapperOverflow);

    const iFocused = getIFocused(id);
    const scrollableTranslateY = getScrollableTranslateY(id) || 0;
    const scrollableTranslateX = getScrollableTranslateX(id) || 0;

    return (
      <div id={id} style={wrapperStyles}>
        <CarouselScrollable
          carouselId={id}
          direction={direction}
          scrollableHeight={scrollableHeight}
          scrollableTranslateX={scrollableTranslateX}
          scrollableTranslateY={scrollableTranslateY}
          scrollable2TranslateX={scrollable2TranslateX}
          scrollableWidth={scrollableWidth}
        >
          {
            this.renderItems(
              id,
              iFocused,
              itemsVisiblesCount,
              children,
              direction,
              itemStyles,
              preloadItemsCount,
              scrollableTranslateY,
              wrapperHeight
            )
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
              onEnter={onEnter}
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