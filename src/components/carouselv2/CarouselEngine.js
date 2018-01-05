import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Keys from '../Keys';
import { block, isBlocked } from '../../clock';
import { enterTo, execCb } from '../../funcHandler';
import { throttle } from '../../engines/helpers';
import { CAROUSEL_DIRECTIONS, CAROUSEL_SCROLLABLE_DIRECTIONS } from '../../constants';
import {
  getBinder,
  getIFocused,
  getItemOffsetHeight,
  getItemOffsetLeft,
  getItemOffsetTop,
  getItemOffsetWidth,
  getNestedIFocused,
  getNestedItemOffsetLeft,
  getNestedItemOffsetWidth,
  getNestedScrollableTranslateX,
  getScrollableTranslateX,
  getScrollableTranslateY,
  isCarouselActive
} from './handler';
import { addListener, removeListener, userConfig } from '../../listener';

class CarouselEngine extends Component {
  constructor(props) {
    super(props);
    this.ticking = false;
  }

  componentWillMount() {
    this.listenerId = addListener(this.keysHandler, this);
  }

  componentWillUnmount() {
    removeListener(this.listenerId);
  }

  getHorizontalPositions = (binderId, direction, nested) => {
    if (nested) {
      const iFocused = getIFocused(binderId);
      const nestedIFocused = getNestedIFocused(binderId, iFocused);
      const scrollableTranslateX = getNestedScrollableTranslateX(binderId, iFocused);
      const nextNestedIFocused = direction === CAROUSEL_SCROLLABLE_DIRECTIONS.right ? nestedIFocused + 1 : nestedIFocused - 1;
      const nextItemFocusedPosition = getNestedItemOffsetLeft(binderId, iFocused, nextNestedIFocused);
      const itemWidth = getNestedItemOffsetWidth(binderId, iFocused, nextNestedIFocused);
      return { iFocused: iFocused, nestedIFocused, scrollableTranslateX, nextIFocused: iFocused, nextNestedIFocused, nextItemFocusedPosition, itemWidth };
    }
    else {
      const iFocused = getIFocused(binderId);
      const scrollableTranslateX = getScrollableTranslateX(binderId);
      const nextIFocused = direction === CAROUSEL_SCROLLABLE_DIRECTIONS.right ? iFocused + 1 : iFocused - 1;
      const nextItemFocusedPosition = getItemOffsetLeft(binderId, nextIFocused);
      const itemWidth = getItemOffsetWidth(binderId, nextIFocused);
      return { iFocused, scrollableTranslateX, nextIFocused, nextItemFocusedPosition, itemWidth };
    }
  }

  getVerticalPositions = (binderId, direction, nested) => {
    const iFocused = getIFocused(binderId);
    if (nested) {
      const nestedIFocused = getNestedIFocused(binderId, iFocused);
      const scrollableTranslateY = getNestedScrollableTranslateY(binderId, iFocused);
      const nextNestedIFocused = direction === CAROUSEL_SCROLLABLE_DIRECTIONS.down ? nestedIFocused + 1 : nestedIFocused - 1;
      const nextItemFocusedPosition = getNestedItemOffsetTop(binderId, iFocused, nextNestedIFocused);
      const itemHeight = getNestedItemOffsetHeight(binderId, iFocused, nextNestedIFocused);
      return { iFocused: iFocused, nestedIFocused, scrollableTranslateY, nextIFocused: iFocused, nextNestedIFocused, nextItemFocusedPosition, itemHeight };
    }
    else {
      const scrollableTranslateY = getScrollableTranslateY(binderId);
      const nextIFocused = direction === CAROUSEL_SCROLLABLE_DIRECTIONS.down ? iFocused + 1 : iFocused - 1;
      const nextItemFocusedPosition = getItemOffsetTop(binderId, nextIFocused);
      const itemHeight = getItemOffsetHeight(binderId, nextIFocused);
      return { iFocused, scrollableTranslateY, nextIFocused, nextItemFocusedPosition, itemHeight };
    }
  }

  scrollToDown = (nested) => {
    const {
      binderId,
      wrapperHeight,
      updatePositions,
    } = this.props;

    const {
      iFocused,
      itemHeight,
      scrollableTranslateY,
      nestedIFocused,
      nextIFocused,
      nextNestedIFocused,
      nextItemFocusedPosition
    } = this.getVerticalPositions(binderId, CAROUSEL_SCROLLABLE_DIRECTIONS.down, nested);

    const isAboveWrapperLeftBorder = nextItemFocusedPosition >= -scrollableTranslateY;
    const isBeforeWrapperRightBorder = nextItemFocusedPosition + itemHeight <= wrapperHeight - scrollableTranslateY;
    const isNextItemFocusedVisible = isAboveWrapperLeftBorder && isBeforeWrapperRightBorder;

    if (isNextItemFocusedVisible) {
      const newPositions = {
        iFocused: nextIFocused,
      };
      updatePositions(newPositions);
    }
    else if (!isNaN(nextItemFocusedPosition)) {
      const newScrollableTranslateY = scrollableTranslateY - itemHeight;
      const newPositions = {
        iFocused: nextIFocused,
        scrollableTranslateY: newScrollableTranslateY,
      };
      updatePositions(newPositions);
    }
  }

  scrollToLeft = (nested) => {
    const {
      binderId,
      wrapperWidth,
      updatePositions
    } = this.props;

    const {
      iFocused,
      itemWidth,
      scrollableTranslateX,
      nestedIFocused,
      nextIFocused: previousIFocused,
      nextNestedIFocused: prevNestedIFocused,
      nextItemFocusedPosition: previousItemFocusedPosition
    } = this.getHorizontalPositions(binderId, CAROUSEL_SCROLLABLE_DIRECTIONS.left, nested);

    const isAboveWrapperLeftBorder = previousItemFocusedPosition >= -scrollableTranslateX;
    const isBeforeWrapperRightBorder = previousItemFocusedPosition + itemWidth <= wrapperWidth - scrollableTranslateX;
    const isPreviousItemFocusedVisible = isAboveWrapperLeftBorder && isBeforeWrapperRightBorder;

    if (isPreviousItemFocusedVisible) {
      if (!nested) {
        const newPositions = {
          iFocused: previousIFocused
        }
        updatePositions(newPositions);
      }
      else {
        const newPositions = {
          iFocused: previousIFocused,
          nestedIFocused: prevNestedIFocused
        }
        updatePositions(newPositions);
      }
    }
    else if (!isNaN(previousItemFocusedPosition)) {
      const newScrollableTranslateX = (scrollableTranslateX + itemWidth) <= 0 ? (scrollableTranslateX + itemWidth) : 0;

      if (!nested) {
        const newPositions = {
          iFocused: previousIFocused,
          scrollableTranslateX: newScrollableTranslateX,
        };
        updatePositions(newPositions);
      }
      else {
        const newPositions = {
          iFocused: previousIFocused,
          nestedIFocused: prevNestedIFocused,
          nestedScrollableTranslateX: newScrollableTranslateX,
        };
        updatePositions(newPositions);
      }
    }
  }

  scrollToRight = (nested) => {
    const {
      binderId,
      wrapperWidth,
      updatePositions,
    } = this.props;

    const {
      iFocused,
      itemWidth,
      scrollableTranslateX,
      nestedIFocused,
      nextIFocused,
      nextNestedIFocused,
      nextItemFocusedPosition
    } = this.getHorizontalPositions(binderId, CAROUSEL_SCROLLABLE_DIRECTIONS.right, nested);

    const isAboveWrapperLeftBorder = nextItemFocusedPosition >= -scrollableTranslateX;
    const isBeforeWrapperRightBorder = nextItemFocusedPosition + itemWidth <= wrapperWidth - scrollableTranslateX;
    const isNextItemFocusedVisible = isAboveWrapperLeftBorder && isBeforeWrapperRightBorder;

    if (isNextItemFocusedVisible) {
      if (!nested) {
        const newPositions = {
          iFocused: nextIFocused,
        };
        updatePositions(newPositions);
      }
      else {
        const newPositions = {
          iFocused: nextIFocused,
          nestedIFocused: nextNestedIFocused
        }
        updatePositions(newPositions);
      }
    }
    else if (!isNaN(nextItemFocusedPosition)) {
      const newScrollableTranslateX = scrollableTranslateX - itemWidth;
      if (!nested) {
        const newPositions = {
          iFocused: nextIFocused,
          scrollableTranslateX: newScrollableTranslateX,
        };
        updatePositions(newPositions);
      }
      else {
        const newPositions = {
          iFocused: nextIFocused,
          nestedIFocused: nextNestedIFocused,
          nestedScrollableTranslateX: newScrollableTranslateX,
        };
        updatePositions(newPositions);
      }
    }
  }

  scrollToUp = (nested) => {
    const {
      binderId,
      wrapperHeight,
      updatePositions
    } = this.props;

    const {
      iFocused,
      itemHeight,
      scrollableTranslateY,
      nestedIFocused,
      nextIFocused: previousIFocused,
      nextNestedIFocused: prevNestedIFocused,
      nextItemFocusedPosition: previousItemFocusedPosition
    } = this.getVerticalPositions(binderId, CAROUSEL_SCROLLABLE_DIRECTIONS.up, nested);

    const isAboveWrapperLeftBorder = previousItemFocusedPosition >= -scrollableTranslateY;
    const isBeforeWrapperRightBorder = previousItemFocusedPosition + itemHeight <= wrapperHeight - scrollableTranslateY;
    const isPreviousItemFocusedVisible = isAboveWrapperLeftBorder && isBeforeWrapperRightBorder;

    if (isPreviousItemFocusedVisible) {
      updatePositions({
        iFocused: previousIFocused,
      });
    }
    else if (!isNaN(previousItemFocusedPosition)) {
      const newScrollableTranslateY = (scrollableTranslateY + itemHeight) <= 0 ? (scrollableTranslateY + itemHeight) : 0;

      const newPositions = {
        iFocused: previousIFocused,
        scrollableTranslateY: newScrollableTranslateY,
      };
      updatePositions(newPositions);
    }
  }

  keysHandler(keyCode, longPress, click) {
    const { binderId, direction } = this.props;
    const newCall = Date.now();
    const timeDiff = newCall - this.lastKeysCall;
    if (isCarouselActive(binderId) && (isNaN(timeDiff) || timeDiff > 200)) {
      this.lastKeysCall = Date.now();
      const nested = direction === CAROUSEL_DIRECTIONS.verticalBidirectional;

      switch (keyCode) {
        case userConfig.left:
          if (direction === CAROUSEL_DIRECTIONS.horizontal || nested) {
            this.scrollToLeft(nested);
          }
          break;
        case userConfig.right:
          if (direction === CAROUSEL_DIRECTIONS.horizontal || nested) {
            this.scrollToRight(nested);
          }
          break;
        case userConfig.down:
          if (direction === CAROUSEL_DIRECTIONS.vertical || nested) {
            this.scrollToDown();
          }
          break;
        case userConfig.up:
          if (direction === CAROUSEL_DIRECTIONS.vertical || nested) {
            this.scrollToUp();
          }
          break;
        case userConfig.enter:
          const { selectedId } = getBinder(binderId);
          this.props.onEnter(selectedId);
          break;
      }
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return null;
  }
}

export default CarouselEngine;