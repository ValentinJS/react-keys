import React, { Component } from 'react';

import CarouselItem from './CarouselItem';
import { CAROUSEL_DIRECTIONS } from '../../constants';
import PropTypes from 'prop-types';
import {
  addScrollableRef,
  addNestedScrollableRef,
  computeScrollableWidth,
  getItemOffsetHeight,
  getItemOffsetWidth,
  getNestedItemOffsetWidth,
  getNestedIFocused,
  isCarouselBidirectional,
} from './handler';

class CarouselScrollable extends React.Component {
  state = {};
  prevNestedIFocused = 0;

  componentDidMount() {
    const {
      carouselId,
      nested,
      parentCarouselId,
      parentItemIndex,
    } = this.props;
    if (!nested) {
      addScrollableRef(carouselId, this.el);
    } else {
      addNestedScrollableRef(parentCarouselId, this.el, parentItemIndex);
    }
  }

  getHorizontalScrollableStyles() {
    return {
      display: 'flex',
      flexDirection: 'row',
      height: '100%',
    };
  }

  getVerticalScrollableStyles() {
    return {
      width: '100%',
    };
  }

  renderItems() {
    const {
      carouselId,
      children,
      direction,
      iFocused,
      itemStyles,
      itemsVisiblesCount,
      preloadItemsCount,
    } = this.props;

    return React.Children.toArray(children).map((item, iIndex) => {
      const maxItemsVisible = iFocused + itemsVisiblesCount + preloadItemsCount;
      const minItemsVisible = iFocused - itemsVisiblesCount - preloadItemsCount;
      const isItemVisible =
        iIndex < maxItemsVisible && iIndex > minItemsVisible;

      if (!isItemVisible) {
        const spacerContentStyles = {
          height: getItemOffsetHeight(carouselId, iIndex),
          width: getItemOffsetWidth(carouselId, iIndex),
        };

        const spacerStyles = {
          display:
            direction === CAROUSEL_DIRECTIONS.horizontal
              ? 'inline-block'
              : 'block',
        };

        return (
          <div key={`spacer_${iIndex}`} style={spacerStyles}>
            <div style={spacerContentStyles} />
          </div>
        );
      }

      let mustUpdateNested = false;

      if (isCarouselBidirectional(carouselId)) {
        const nestedIFocused = getNestedIFocused(carouselId, iIndex);
        if (nestedIFocused !== this.prevNestedIFocused) {
          mustUpdateNested = true;
        }
        this.prevNestedIFocused = nestedIFocused;
      }

      return (
        isItemVisible && (
          <CarouselItem
            carouselId={carouselId}
            direction={direction}
            hasNestedItems={mustUpdateNested}
            key={`item_${iIndex}`}
            itemIndex={iIndex}
            itemStyles={itemStyles}
            preloadItemsCount={preloadItemsCount}
          >
            {React.cloneElement(item, [{ mustRefresh: true }])}
          </CarouselItem>
        )
      );
    });
  }

  renderNestedItems() {
    const {
      children: nestedChildren,
      itemStyles,
      itemsVisiblesCount,
      parentCarouselId,
      parentItemIndex,
      preloadItemsCount,
    } = this.props;

    const direction = CAROUSEL_DIRECTIONS.horizontal;
    const nestedIFocused = getNestedIFocused(parentCarouselId, parentItemIndex);
    const maxNestedItemsVisible =
      nestedIFocused + itemsVisiblesCount + preloadItemsCount;
    const minNestedItemsVisible =
      nestedIFocused - itemsVisiblesCount - preloadItemsCount;

    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {nestedChildren.map((nestedChildItem, iNestedItem) => {
          const isItemVisible =
            iNestedItem < maxNestedItemsVisible &&
            iNestedItem > minNestedItemsVisible;

          if (!isItemVisible && iNestedItem < maxNestedItemsVisible) {
            const width = getNestedItemOffsetWidth(
              parentCarouselId,
              parentItemIndex,
              iNestedItem
            );
            const spacerStyles = { display: 'inline-block' };
            const widthStyles = { width };
            return (
              <div
                key={`spacer_${parentItemIndex}_${iNestedItem}`}
                style={spacerStyles}
              >
                <div style={widthStyles} />
              </div>
            );
          }

          return (
            isItemVisible && (
              <CarouselItem
                carouselId={`${parentCarouselId}_${iNestedItem}`}
                parentCarouselId={parentCarouselId}
                parentItemIndex={parentItemIndex}
                direction={direction}
                key={`item_${parentItemIndex}_${iNestedItem}`}
                itemIndex={iNestedItem}
                itemStyles={itemStyles}
                nested
                preloadItemsCount={preloadItemsCount}
              >
                {nestedChildItem}
              </CarouselItem>
            )
          );
        })}
      </div>
    );
  }

  shouldComponentUpdate({ iFocused, nested }) {
    const {
      iFocused: prevIFocused,
      parentCarouselId,
      parentItemIndex,
    } = this.props;

    if (nested) {
      const nestedIFocused = getNestedIFocused(
        parentCarouselId,
        parentItemIndex
      );
      return this.prevNestedIFocused !== nestedIFocused;
    } else {
      return true;
    }
  }

  render() {
    const { children, direction, nested } = this.props;

    const scrollableStyles =
        direction === CAROUSEL_DIRECTIONS.horizontal
          ? this.getHorizontalScrollableStyles()
          : this.getVerticalScrollableStyles(),
      scrollable2Styles = this.getHorizontalScrollableStyles();

    return (
      <div
        className="keys-carousel-scrollable"
        ref={el => {
          this.el = el;
        }}
        style={scrollableStyles}
      >
        {nested ? this.renderNestedItems() : this.renderItems()}
      </div>
    );
  }
}

export default CarouselScrollable;
