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
  isCarouselBidirectional,
  queueAction,
} from './handler';
import { addListener, removeListener, userConfig } from '../../listener';

class CarouselEngine extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.listenerId = addListener(this.keysHandler, this);
  }

  componentWillUnmount() {
    removeListener(this.listenerId);
  }

  getNestedHorizontalPositions = (carouselId, direction) => {
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
  };

  getHorizontalPositions = (carouselId, direction) => {
    const iFocused = getIFocused(carouselId);
    const scrollableTranslateX = getScrollableTranslateX(carouselId);
    const nextIFocused =
      direction === CAROUSEL_SCROLLABLE_DIRECTIONS.right
        ? iFocused + 1
        : iFocused - 1;
    const nextItemFocusedPosition = getItemOffsetLeft(carouselId, nextIFocused);
    const itemWidth = getItemOffsetWidth(carouselId, nextIFocused);
    return {
      iFocused,
      scrollableTranslateX,
      nextIFocused,
      nextItemFocusedPosition,
      itemWidth,
    };
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

      const itemHeight = getItemOffsetHeight(carouselId, iFocused);
      const nextItemHeight = getItemOffsetHeight(carouselId, nextIFocused);
      const isLastItem =
        getItemOffsetHeight(
          carouselId,
          direction === CAROUSEL_SCROLLABLE_DIRECTIONS.down
            ? nextIFocused + 1
            : nextIFocused - 1
        ) === undefined;

      return {
        iFocused,
        scrollableTranslateY,
        nextIFocused,
        nextItemFocusedPosition,
        itemHeight,
        nextItemHeight,
        isLastItem,
      };
    }
  };

  scrollToDown = nested => {
    const {
      carouselId,
      onDownExit,
      updatePositions,
      verticalFocusGap,
      wrapperHeight,
    } = this.props;

    const {
      iFocused,
      itemHeight,
      nextItemHeight,
      scrollableTranslateY,
      nestedIFocused,
      nextIFocused,
      nextNestedIFocused,
      nextItemFocusedPosition,
      isLastItem,
    } = this.getVerticalPositions(
      carouselId,
      CAROUSEL_SCROLLABLE_DIRECTIONS.down,
      nested
    );

    const isInsideWrapperLeftBorder =
      nextItemFocusedPosition >= -scrollableTranslateY;
    const isInsideWrapperRightBorder =
      nextItemFocusedPosition + itemHeight <=
      wrapperHeight - scrollableTranslateY;
    const isNextItemFocusedInsideWrapper =
      isInsideWrapperLeftBorder && isInsideWrapperRightBorder;

    if (isNextItemFocusedInsideWrapper) {
      const newPositions = {
        iFocused: nextIFocused,
      };
      updatePositions(newPositions);
    } else if (!isNaN(nextItemFocusedPosition)) {
      let newScrollableTranslateY;
      if (isLastItem)
        newScrollableTranslateY = -(
          nextItemFocusedPosition +
          nextItemHeight -
          wrapperHeight
        );
      else if (verticalFocusGap > 0)
        newScrollableTranslateY = -nextItemFocusedPosition - verticalFocusGap;
      else newScrollableTranslateY = scrollableTranslateY - itemHeight;

      const newPositions = {
        iFocused: nextIFocused,
        scrollableTranslateY: newScrollableTranslateY,
      };
      updatePositions(newPositions);
    } else {
      onDownExit();
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
    } = nested
      ? this.getNestedHorizontalPositions(
          carouselId,
          CAROUSEL_SCROLLABLE_DIRECTIONS.left
        )
      : this.getHorizontalPositions(
          carouselId,
          CAROUSEL_SCROLLABLE_DIRECTIONS.left
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
    } = nested
      ? this.getNestedHorizontalPositions(
          carouselId,
          CAROUSEL_SCROLLABLE_DIRECTIONS.right
        )
      : this.getHorizontalPositions(
          carouselId,
          CAROUSEL_SCROLLABLE_DIRECTIONS.right
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
    const {
      carouselId,
      onUpExit,
      updatePositions,
      verticalFocusGap,
      wrapperHeight,
    } = this.props;
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

    const isInsideWrapperLeftBorder =
      previousItemFocusedPosition >= -scrollableTranslateY;
    const isInsideWrapperRightBorder =
      previousItemFocusedPosition + itemHeight <=
      wrapperHeight - scrollableTranslateY;
    const isPreviousItemInsideWrapper =
      isInsideWrapperLeftBorder && isInsideWrapperRightBorder;

    if (isPreviousItemInsideWrapper) {
      updatePositions({
        iFocused: previousIFocused,
      });
    } else if (!isNaN(previousItemFocusedPosition)) {
      let newScrollableTranslateY;
      if (previousIFocused === 0) newScrollableTranslateY = 0;
      else if (verticalFocusGap > 0)
        newScrollableTranslateY =
          -previousItemFocusedPosition - verticalFocusGap;
      else newScrollableTranslateY = scrollableTranslateY + itemHeight;

      const newPositions = {
        iFocused: previousIFocused,
        scrollableTranslateY: newScrollableTranslateY,
      };
      updatePositions(newPositions);
    } else {
      onUpExit();
    }
  };

  keysHandler(keyCode, longPress, click) {
    const { active, carouselId, direction } = this.props;

    if (isCarouselActive(carouselId) && isActive({ active, id: carouselId })) {
      const nested = isCarouselBidirectional(carouselId);

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
