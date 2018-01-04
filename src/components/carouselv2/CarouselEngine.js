import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Keys from '../Keys';
import { block, isBlocked } from '../../clock';
import { enterTo, execCb } from '../../funcHandler';
import { throttle } from '../../engines/helpers';
import { CAROUSEL_DIRECTIONS } from '../../constants';
import { getBinder, getIFocused, getScrollableTranslateX, getScrollableTranslateY, isCarouselActive } from './handler';
import { addListener, removeListener, userConfig } from '../../listener';

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
      itemsTop,
      itemHeight,
      wrapperHeight,
      updatePositions,
    } = this.props;

    const iFocused = getIFocused(binderId);
    const scrollableTranslateY = getScrollableTranslateY(binderId);

    const nextIFocused = iFocused + 1;
    const nextItemFocusedPosition = itemsTop[iFocused + 1];
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
      itemsLeft,
      itemWidth,
      wrapperWidth,
      updatePositions
    } = this.props;

    const iFocused = getIFocused(binderId);
    const scrollableTranslateX = getScrollableTranslateX(binderId);

    const previousItemFocusedPosition = itemsLeft[iFocused - 1];
    const isAboveWrapperLeftBorder = previousItemFocusedPosition >= -scrollableTranslateX;
    const isBeforeWrapperRightBorder = previousItemFocusedPosition + itemWidth <= wrapperWidth - scrollableTranslateX;
    const isPreviousItemFocusedVisible = isAboveWrapperLeftBorder && isBeforeWrapperRightBorder;

    if (isPreviousItemFocusedVisible) {
      updatePositions({
        iFocused: iFocused - 1,
      });

      const newPositions = {
        iFocused: iFocused - 1
      }

      updatePositions(newPositions);
    }
    else if (!isNaN(previousItemFocusedPosition)) {
      const newScrollableTranslateX = scrollableTranslateX + itemWidth;
      const newPositions = {
        iFocused: iFocused - 1,
        scrollableTranslateX: newScrollableTranslateX,
      };
      updatePositions(newPositions);
    }
  }

  scrollToRight = () => {
    const {
      binderId,
      itemsLeft,
      itemWidth,
      wrapperWidth,
      updatePositions,
    } = this.props;

    const iFocused = getIFocused(binderId);
    const scrollableTranslateX = getScrollableTranslateX(binderId);

    const nextIFocused = iFocused + 1;
    const nextItemFocusedPosition = itemsLeft[nextIFocused];
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
      itemsTop,
      itemHeight,
      wrapperHeight,
      updatePositions
    } = this.props;

    const iFocused = getIFocused(binderId);
    const scrollableTranslateY = getScrollableTranslateY(binderId);

    const previousItemFocusedPosition = itemsTop[iFocused - 1];
    const isAboveWrapperLeftBorder = previousItemFocusedPosition >= -scrollableTranslateY;
    const isBeforeWrapperRightBorder = previousItemFocusedPosition + itemHeight <= wrapperHeight - scrollableTranslateY;
    const isPreviousItemFocusedVisible = isAboveWrapperLeftBorder && isBeforeWrapperRightBorder;

    if (isPreviousItemFocusedVisible) {
      updatePositions({
        iFocused: iFocused - 1,
      });
    }
    else if (!isNaN(previousItemFocusedPosition)) {
      const newScrollableTranslateY = scrollableTranslateY + itemHeight;
      const newPositions = {
        iFocused: iFocused - 1,
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
    if (isCarouselActive(binderId)) {
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