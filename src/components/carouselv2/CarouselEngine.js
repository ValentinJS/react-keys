import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Keys from '../Keys';
import { block, isBlocked } from '../../clock';
import { throttle } from '../../engines/helpers';
import {
  CAROUSEL_DIRECTIONS,
  CAROUSEL_SCROLLABLE_DIRECTIONS,
} from '../../constants';
import { isActive } from '../../isActive';
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
  isCarouselActive,
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

  getHorizontalPositions = (carouselId, direction, nested) => {
    if (nested) {
      const iFocused = getIFocused(carouselId);
      const nestedIFocused = getNestedIFocused(carouselId, iFocused);
      const scrollableTranslateX = getNestedScrollableTranslateX(
        carouselId,
        iFocused
      );
      const nextNestedIFocused =
        direction === CAROUSEL_SCROLLABLE_DIRECTIONS.right
          ? nestedIFocused + 1
          : nestedIFocused - 1;
      const nextItemFocusedPosition = getNestedItemOffsetLeft(
        carouselId,
        iFocused,
        nextNestedIFocused
      );
      const itemWidth = getNestedItemOffsetWidth(
        carouselId,
        iFocused,
        nextNestedIFocused
      );
      return {
        iFocused: iFocused,
        nestedIFocused,
        scrollableTranslateX,
        nextIFocused: iFocused,
        nextNestedIFocused,
        nextItemFocusedPosition,
        itemWidth,
      };
    } else {
      const iFocused = getIFocused(carouselId);
      const scrollableTranslateX = getScrollableTranslateX(carouselId);
      const nextIFocused =
        direction === CAROUSEL_SCROLLABLE_DIRECTIONS.right
          ? iFocused + 1
          : iFocused - 1;
      const nextItemFocusedPosition = getItemOffsetLeft(
        carouselId,
        nextIFocused
      );
      const itemWidth = getItemOffsetWidth(carouselId, nextIFocused);
      return {
        iFocused,
        scrollableTranslateX,
        nextIFocused,
        nextItemFocusedPosition,
        itemWidth,
      };
    }
  };

  getVerticalPositions = (carouselId, direction, nested) => {
    const iFocused = getIFocused(carouselId);
    if (nested) {
      const nestedIFocused = getNestedIFocused(carouselId, iFocused);
      const scrollableTranslateY = getNestedScrollableTranslateY(
        carouselId,
        iFocused
      );
      const nextNestedIFocused =
        direction === CAROUSEL_SCROLLABLE_DIRECTIONS.down
          ? nestedIFocused + 1
          : nestedIFocused - 1;
      const nextItemFocusedPosition = getNestedItemOffsetTop(
        carouselId,
        iFocused,
        nextNestedIFocused
      );
      const itemHeight = getNestedItemOffsetHeight(
        carouselId,
        iFocused,
        nextNestedIFocused
      );
      return {
        iFocused: iFocused,
        nestedIFocused,
        scrollableTranslateY,
        nextIFocused: iFocused,
        nextNestedIFocused,
        nextItemFocusedPosition,
        itemHeight,
      };
    } else {
      const scrollableTranslateY = getScrollableTranslateY(carouselId);
      const nextIFocused =
        direction === CAROUSEL_SCROLLABLE_DIRECTIONS.down
          ? iFocused + 1
          : iFocused - 1;
      const nextItemFocusedPosition = getItemOffsetTop(
        carouselId,
        nextIFocused
      );
      const itemHeight = getItemOffsetHeight(carouselId, nextIFocused);
      return {
        iFocused,
        scrollableTranslateY,
        nextIFocused,
        nextItemFocusedPosition,
        itemHeight,
      };
    }
  };

  scrollToDown = nested => {
    const { carouselId, wrapperHeight, updatePositions } = this.props;

    const {
      iFocused,
      itemHeight,
      scrollableTranslateY,
      nestedIFocused,
      nextIFocused,
      nextNestedIFocused,
      nextItemFocusedPosition,
    } = this.getVerticalPositions(
      carouselId,
      CAROUSEL_SCROLLABLE_DIRECTIONS.down,
      nested
    );

    const isAboveWrapperLeftBorder =
      nextItemFocusedPosition >= -scrollableTranslateY;
    const isBeforeWrapperRightBorder =
      nextItemFocusedPosition + itemHeight <=
      wrapperHeight - scrollableTranslateY;
    const isNextItemFocusedVisible =
      isAboveWrapperLeftBorder && isBeforeWrapperRightBorder;

    if (isNextItemFocusedVisible) {
      const newPositions = {
        iFocused: nextIFocused,
      };
      updatePositions(newPositions);
    } else if (!isNaN(nextItemFocusedPosition)) {
      const newScrollableTranslateY = scrollableTranslateY - itemHeight;
      const newPositions = {
        iFocused: nextIFocused,
        scrollableTranslateY: newScrollableTranslateY,
      };
      updatePositions(newPositions);
    }
  };

  scrollToLeft = nested => {
    const { carouselId, wrapperWidth, updatePositions } = this.props;

    const {
      iFocused,
      itemWidth,
      scrollableTranslateX,
      nestedIFocused,
      nextIFocused: previousIFocused,
      nextNestedIFocused: prevNestedIFocused,
      nextItemFocusedPosition: previousItemFocusedPosition,
    } = this.getHorizontalPositions(
      carouselId,
      CAROUSEL_SCROLLABLE_DIRECTIONS.left,
      nested
    );

    const isAboveWrapperLeftBorder =
      previousItemFocusedPosition >= -scrollableTranslateX;
    const isBeforeWrapperRightBorder =
      previousItemFocusedPosition + itemWidth <=
      wrapperWidth - scrollableTranslateX;
    const isPreviousItemFocusedVisible =
      isAboveWrapperLeftBorder && isBeforeWrapperRightBorder;

    if (isPreviousItemFocusedVisible) {
      if (!nested) {
        const newPositions = {
          iFocused: previousIFocused,
        };
        updatePositions(newPositions);
      } else {
        const newPositions = {
          iFocused: previousIFocused,
          nestedIFocused: prevNestedIFocused,
        };
        updatePositions(newPositions);
      }
    } else if (!isNaN(previousItemFocusedPosition)) {
      const newScrollableTranslateX =
        scrollableTranslateX + itemWidth <= 0
          ? scrollableTranslateX + itemWidth
          : 0;

      if (!nested) {
        const newPositions = {
          iFocused: previousIFocused,
          scrollableTranslateX: newScrollableTranslateX,
        };
        updatePositions(newPositions);
      } else {
        const newPositions = {
          iFocused: previousIFocused,
          nestedIFocused: prevNestedIFocused,
          nestedScrollableTranslateX: newScrollableTranslateX,
        };
        updatePositions(newPositions);
      }
    }
  };

  scrollToRight = nested => {
    const { carouselId, wrapperWidth, updatePositions } = this.props;

    const {
      iFocused,
      itemWidth,
      scrollableTranslateX,
      nestedIFocused,
      nextIFocused,
      nextNestedIFocused,
      nextItemFocusedPosition,
    } = this.getHorizontalPositions(
      carouselId,
      CAROUSEL_SCROLLABLE_DIRECTIONS.right,
      nested
    );

    const isAboveWrapperLeftBorder =
      nextItemFocusedPosition >= -scrollableTranslateX;
    const isBeforeWrapperRightBorder =
      nextItemFocusedPosition + itemWidth <=
      wrapperWidth - scrollableTranslateX;
    const isNextItemFocusedVisible =
      isAboveWrapperLeftBorder && isBeforeWrapperRightBorder;

    if (isNextItemFocusedVisible) {
      if (!nested) {
        const newPositions = {
          iFocused: nextIFocused,
        };
        updatePositions(newPositions);
      } else {
        const newPositions = {
          iFocused: nextIFocused,
          nestedIFocused: nextNestedIFocused,
        };
        updatePositions(newPositions);
      }
    } else if (!isNaN(nextItemFocusedPosition)) {
      const newScrollableTranslateX = scrollableTranslateX - itemWidth;
      if (!nested) {
        const newPositions = {
          iFocused: nextIFocused,
          scrollableTranslateX: newScrollableTranslateX,
        };
        updatePositions(newPositions);
      } else {
        const newPositions = {
          iFocused: nextIFocused,
          nestedIFocused: nextNestedIFocused,
          nestedScrollableTranslateX: newScrollableTranslateX,
        };
        updatePositions(newPositions);
      }
    }
  };

  scrollToUp = nested => {
    const { carouselId, wrapperHeight, updatePositions } = this.props;

    const {
      iFocused,
      itemHeight,
      scrollableTranslateY,
      nestedIFocused,
      nextIFocused: previousIFocused,
      nextNestedIFocused: prevNestedIFocused,
      nextItemFocusedPosition: previousItemFocusedPosition,
    } = this.getVerticalPositions(
      carouselId,
      CAROUSEL_SCROLLABLE_DIRECTIONS.up,
      nested
    );

    const isAboveWrapperLeftBorder =
      previousItemFocusedPosition >= -scrollableTranslateY;
    const isBeforeWrapperRightBorder =
      previousItemFocusedPosition + itemHeight <=
      wrapperHeight - scrollableTranslateY;
    const isPreviousItemFocusedVisible =
      isAboveWrapperLeftBorder && isBeforeWrapperRightBorder;

    if (isPreviousItemFocusedVisible) {
      updatePositions({
        iFocused: previousIFocused,
      });
    } else if (!isNaN(previousItemFocusedPosition)) {
      const newScrollableTranslateY =
        scrollableTranslateY + itemHeight <= 0
          ? scrollableTranslateY + itemHeight
          : 0;

      const newPositions = {
        iFocused: previousIFocused,
        scrollableTranslateY: newScrollableTranslateY,
      };
      updatePositions(newPositions);
    }
  };

  keysHandler(keyCode, longPress, click) {
    const { active, carouselId, direction } = this.props;
    const newCall = Date.now();
    const timeDiff = newCall - this.lastKeysCall;
    if (
      isCarouselActive(carouselId) &&
      isActive({ active, id: carouselId }) &&
      (isNaN(timeDiff) || timeDiff > 80)
    ) {
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
          const { nestedSelectedId, selectedId } = getBinder(carouselId);
          this.props.onEnter(selectedId, nestedSelectedId);
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
