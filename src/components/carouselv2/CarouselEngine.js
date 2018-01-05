import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Keys from '../Keys';
import { block, isBlocked } from '../../clock';
import { enterTo, execCb } from '../../funcHandler';
import { throttle } from '../../engines/helpers';
import { CAROUSEL_DIRECTIONS } from '../../constants';
import { 
  getBinder, 
  getIFocused, 
  getItemOffsetHeight, 
  getItemOffsetLeft,
  getItemOffsetTop, 
  getItemOffsetWidth,
  getScrollableTranslateX, 
  getScrollableTranslateY, 
  isCarouselActive 
} from './handler';
import { addListener, removeListener, userConfig } from '../../listener';
import { debounce } from '../../engines/helpers';

class CarouselEngine extends Component {
  constructor(props) {
    super(props);
    this.ticking = false;
  }

  componentWillMount() {
    this.listenerId = addListener(this.keysHandler, this);
  }

  scrollToDown = () => {
    const {
      binderId,
      //itemHeight,
      wrapperHeight,
      updatePositions,
    } = this.props;

    const iFocused = getIFocused(binderId);
    const scrollableTranslateY = getScrollableTranslateY(binderId);
    const nextIFocused = iFocused + 1;
    const nextItemFocusedPosition = getItemOffsetTop(binderId, nextIFocused);
    const itemHeight = getItemOffsetHeight(binderId, nextIFocused);
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

  scrollToLeft = () => {
    const {
      binderId,
      wrapperWidth,
      updatePositions
    } = this.props;

    const iFocused = getIFocused(binderId);
    const scrollableTranslateX = getScrollableTranslateX(binderId);

    const previousIFocused = iFocused - 1;
    const previousItemFocusedPosition = getItemOffsetLeft(binderId, previousIFocused);
    const itemWidth = getItemOffsetWidth(binderId, previousIFocused);
    const isAboveWrapperLeftBorder = previousItemFocusedPosition >= -scrollableTranslateX;
    const isBeforeWrapperRightBorder = previousItemFocusedPosition + itemWidth <= wrapperWidth - scrollableTranslateX;
    const isPreviousItemFocusedVisible = isAboveWrapperLeftBorder && isBeforeWrapperRightBorder;

    if (isPreviousItemFocusedVisible) {
      updatePositions({
        iFocused: previousIFocused,
      });

      const newPositions = {
        iFocused: previousIFocused
      }

      updatePositions(newPositions);
    }
    else if (!isNaN(previousItemFocusedPosition)) {
      const newScrollableTranslateX = scrollableTranslateX + itemWidth;
      const newPositions = {
        iFocused: previousIFocused,
        scrollableTranslateX: newScrollableTranslateX,
      };
      updatePositions(newPositions);
    }
  }

  scrollToRight = () => {
    const {
      binderId,
      wrapperWidth,
      updatePositions,
    } = this.props;

    const iFocused = getIFocused(binderId);
    const scrollableTranslateX = getScrollableTranslateX(binderId);

    const nextIFocused = iFocused + 1;
    const nextItemFocusedPosition = getItemOffsetLeft(binderId, nextIFocused);
    const itemWidth = getItemOffsetWidth(binderId, nextIFocused);

    const isAboveWrapperLeftBorder = nextItemFocusedPosition >= -scrollableTranslateX;
    const isBeforeWrapperRightBorder = nextItemFocusedPosition + itemWidth <= wrapperWidth - scrollableTranslateX;
    const isNextItemFocusedVisible = isAboveWrapperLeftBorder && isBeforeWrapperRightBorder;

    if (isNextItemFocusedVisible) {
      const newPositions = {
        iFocused: nextIFocused,
      };

      updatePositions(newPositions);
    }
    else if (!isNaN(nextItemFocusedPosition)) {
      const newScrollableTranslateX = scrollableTranslateX - itemWidth;
      const newPositions = {
        iFocused: nextIFocused,
        scrollableTranslateX: newScrollableTranslateX,
      };
      updatePositions(newPositions);
    }
  }

  scrollToUp = () => {
    const {
      binderId,
      wrapperHeight,
      updatePositions
    } = this.props;

    const iFocused = getIFocused(binderId);
    const scrollableTranslateY = getScrollableTranslateY(binderId);

    const previousIFocused = iFocused - 1;
    const previousItemFocusedPosition = getItemOffsetTop(binderId, previousIFocused);
    const itemHeight = getItemOffsetHeight(binderId, previousIFocused);
    const isAboveWrapperLeftBorder = previousItemFocusedPosition >= -scrollableTranslateY;
    const isBeforeWrapperRightBorder = previousItemFocusedPosition + itemHeight <= wrapperHeight - scrollableTranslateY;
    const isPreviousItemFocusedVisible = isAboveWrapperLeftBorder && isBeforeWrapperRightBorder;

    if (isPreviousItemFocusedVisible) {
      updatePositions({
        iFocused: previousIFocused,
      });
    }
    else if (!isNaN(previousItemFocusedPosition)) {
      const newScrollableTranslateY = scrollableTranslateY + itemHeight;
      const newPositions = {
        iFocused: previousIFocused,
        scrollableTranslateY: newScrollableTranslateY,
      };
      updatePositions(newPositions);
    }
  }

  onCarouselDown = () => {
    this.scrollToDown();
  }

  onCarouselLeft = () => {
    this.scrollToLeft();
  }

  onCarouselRight = () => {
    this.scrollToRight();
  }

  onCarouselUp = () => {
    this.scrollToUp();
  }

  keysHandler(keyCode, longPress, click) {
    const { binderId, direction } = this.props;
    const newCall = Date.now();
    const timeDiff = newCall - this.lastKeysCall;
    
    if (isCarouselActive(binderId) && (isNaN(timeDiff) || timeDiff > 200)) {
      this.lastKeysCall = Date.now();
      switch (keyCode) {
        case userConfig.left:
          if (direction === CAROUSEL_DIRECTIONS.horizontal) {
            this.onCarouselLeft();
          }
          break;
        case userConfig.right:
          if (direction === CAROUSEL_DIRECTIONS.horizontal) {
            this.onCarouselRight();
          }
          break;
        case userConfig.down:
          if (direction === CAROUSEL_DIRECTIONS.vertical) {
            this.onCarouselDown();
          }
          break;
        case userConfig.up:
          if (direction === CAROUSEL_DIRECTIONS.vertical) {
            this.onCarouselUp();
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