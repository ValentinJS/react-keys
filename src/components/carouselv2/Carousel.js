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
  state = {
    initialized: false,
  };

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

  getHorizontalWrapperStyles(itemHeight, wrapperOverflow, wrapperWidth) {
    return {
      height: itemHeight,
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

  renderItems(
    carouselId,
    iFocused,
    itemsVisiblesCount,
    children,
    direction,
    itemStyles,
    preloadItemsCount,
    scrollableTranslateX,
    scrollableTranslateY,
    wrapperHeight
  ) {
    const { verticalChildItemWrapper } = this.props;
    if (direction === CAROUSEL_DIRECTIONS.verticalBidirectional) {
      const maxItemsVisible = iFocused + itemsVisiblesCount + preloadItemsCount;
      const minItemsVisible = iFocused - itemsVisiblesCount - preloadItemsCount;

      return children.map((item, iIndex) => {
        const isItemVisible =
          iIndex < maxItemsVisible && iIndex > minItemsVisible;

        const nestedIFocused = getNestedIFocused(carouselId, iIndex);
        const maxNestedItemsVisible =
          nestedIFocused + itemsVisiblesCount + preloadItemsCount;
        const minNestedItemsVisible =
          nestedIFocused - itemsVisiblesCount - preloadItemsCount;

        if (!isItemVisible && iIndex < maxItemsVisible) {
          const height = getItemOffsetHeight(carouselId, iIndex);
          const width = getItemOffsetWidth(carouselId, iIndex);
          return (
            <div
              key={`spacer_${iIndex}`}
              style={{
                display:
                  direction === CAROUSEL_DIRECTIONS.horizontal
                    ? 'inline-block'
                    : 'block',
              }}
            >
              <div style={{ height: height, width: width }} />
            </div>
          );
        }

        return (
          isItemVisible && (
            <CarouselItem
              carouselId={carouselId}
              direction={direction}
              hasNestedItems
              key={`item_${iIndex}`}
              itemIndex={iIndex}
              itemStyles={itemStyles}
              preloadItemsCount={preloadItemsCount}
              wrapperHeight={wrapperHeight}
            >
              {React.Children.toArray(item.props.children).map(
                (nestedChild, iNested) => {
                  return `.${nestedChild.props.className}` ===
                    verticalChildItemWrapper ? (
                    <div
                      id={item.props.id}
                      className={nestedChild.props.className}
                      key={`${carouselId}_${iIndex}`}
                    >
                      <CarouselScrollable
                        parentCarouselId={carouselId}
                        parentItemIndex={iIndex}
                        carouselId={`${carouselId}_${iIndex}`}
                        direction={CAROUSEL_DIRECTIONS.horizontal}
                        nested
                        scrollableTranslateX={scrollableTranslateX}
                        scrollableTranslateY={scrollableTranslateY}
                      >
                        {nestedChild.props.children.map(
                          (nestedChildItem, iNestedItem) => {
                            const isItemVisible =
                              iNestedItem < maxNestedItemsVisible &&
                              iNestedItem > minNestedItemsVisible;

                            if (
                              !isItemVisible &&
                              iNestedItem < maxNestedItemsVisible
                            ) {
                              const width = getNestedItemOffsetWidth(
                                carouselId,
                                iIndex,
                                iNestedItem
                              );
                              return (
                                <div
                                  key={`spacer_${iIndex}_${iNested}_${iNestedItem}`}
                                  style={{ display: 'inline-block' }}
                                >
                                  <div style={{ width: width }} />
                                </div>
                              );
                            }

                            return (
                              isItemVisible && (
                                <CarouselItem
                                  carouselId={`${carouselId}_${iNested}`}
                                  parentCarouselId={carouselId}
                                  parentItemIndex={iIndex}
                                  direction={direction}
                                  key={`item_${iIndex}_${iNested}_${iNestedItem}`}
                                  itemIndex={iNestedItem}
                                  itemStyles={itemStyles}
                                  nested
                                  preloadItemsCount={preloadItemsCount}
                                  wrapperHeight={wrapperHeight}
                                >
                                  {nestedChildItem}
                                </CarouselItem>
                              )
                            );
                          }
                        )}
                      </CarouselScrollable>
                    </div>
                  ) : (
                    nestedChild
                  );
                }
              )}
            </CarouselItem>
          )
        );
      });
    } else {
      return children.map((item, iIndex) => {
        const maxItemsVisible =
          iFocused + itemsVisiblesCount + preloadItemsCount;
        const minItemsVisible =
          iFocused - itemsVisiblesCount - preloadItemsCount;
        const isItemVisible =
          iIndex < maxItemsVisible && iIndex > minItemsVisible;

        if (!isItemVisible) {
          const height = getItemOffsetHeight(carouselId, iIndex);
          const width = getItemOffsetWidth(carouselId, iIndex);
          return (
            <div
              key={`spacer_${iIndex}`}
              style={{
                display:
                  direction === CAROUSEL_DIRECTIONS.horizontal
                    ? 'inline-block'
                    : 'block',
              }}
            >
              <div style={{ height: height, width: width }} />
            </div>
          );
        }

        return (
          isItemVisible && (
            <CarouselItem
              carouselId={carouselId}
              direction={direction}
              key={`item_${iIndex}`}
              itemIndex={iIndex}
              itemStyles={itemStyles}
              preloadItemsCount={preloadItemsCount}
              wrapperHeight={wrapperHeight}
            >
              {item}
            </CarouselItem>
          )
        );
      });
    }
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
        wrapperWidth,
      } = this.props,
      wrapperStyles =
        direction === CAROUSEL_DIRECTIONS.horizontal
          ? this.getHorizontalWrapperStyles(
              itemHeight,
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
          direction={
            direction === CAROUSEL_DIRECTIONS.verticalBidirectional
              ? CAROUSEL_DIRECTIONS.vertical
              : direction
          }
          scrollableHeight={scrollableHeight}
          scrollableTranslateX={scrollableTranslateX}
          scrollableTranslateY={scrollableTranslateY}
          scrollable2TranslateX={scrollable2TranslateX}
          scrollableWidth={scrollableWidth}
        >
          {this.renderItems(
            id,
            iFocused,
            itemsVisiblesCount,
            children,
            direction,
            itemStyles,
            preloadItemsCount,
            scrollableTranslateX,
            scrollableTranslateY,
            wrapperHeight
          )}
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
            binderId={id}
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
