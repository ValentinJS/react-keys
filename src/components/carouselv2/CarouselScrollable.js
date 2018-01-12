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
  removeScrollableRef,
  removeNestedScrollableRef,
} from './handler';

class CarouselScrollable extends React.Component {
  state = {};
  prevNestedIFocused = 0;
  renderedItems = [];

  componentDidMount() {
    this.handleAddRef();
  }

  componentWillUnmount() {
    this.handleRemoveRef();
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
      height: '0px',
      width: '100%',
    };
  }

  handleAddRef() {
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

  handleRemoveRef() {
    const {
      carouselId,
      nested,
      parentCarouselId,
      parentItemIndex,
    } = this.props;
    if (!nested) {
      removeScrollableRef(carouselId);
    } else {
      removeNestedScrollableRef(parentCarouselId, parentItemIndex);
    }
  }

  hasBeenRendered(itemIndex) {
    const { loadOnce } = this.props;
    if (!loadOnce) {
      return false;
    }

    return this.renderedItems.includes(itemIndex);
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

    let spacerHeight = 0,
      spacerWidth = 0;
    const itemsTree = React.Children.toArray(children).map((item, iIndex) => {
      const maxItemsVisible = iFocused + itemsVisiblesCount + preloadItemsCount;
      const minItemsVisible = iFocused - itemsVisiblesCount - preloadItemsCount;
      const isItemVisible =
        (iIndex < maxItemsVisible && iIndex > minItemsVisible) ||
        this.hasBeenRendered(iIndex);

      if (isItemVisible && !this.hasBeenRendered(iIndex, false)) {
        this.renderedItems.push(iIndex);
      }

      if (!isItemVisible && iIndex < maxItemsVisible) {
        spacerHeight += getItemOffsetHeight(carouselId, iIndex) || 0;
        spacerWidth += getItemOffsetWidth(carouselId, iIndex) || 0;
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

    return React.createElement(
      'div',
      {
        style: {
          paddingLeft: spacerWidth,
          paddingTop: spacerHeight,
        },
      },
      itemsTree
    );
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
            (iNestedItem < maxNestedItemsVisible &&
              iNestedItem > minNestedItemsVisible) ||
            this.hasBeenRendered(iNestedItem);

          if (isItemVisible && !this.hasBeenRendered(iNestedItem, false)) {
            this.renderedItems.push(iNestedItem);
          }

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
      <div>
        <div
          className="keys-carousel-scrollable"
          ref={el => {
            this.el = el;
          }}
          style={scrollableStyles}
        >
          {nested ? this.renderNestedItems() : this.renderItems()}
        </div>
      </div>
    );
  }
}

export default CarouselScrollable;
