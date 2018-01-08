import React, { Component } from 'react';
import Keys from '../Keys';
import { block, isBlocked } from '../../clock';
import { enterTo } from '../../redux/actions';

class CarouselLoopedEngine extends Component {
  constructor(props) {
    super(props);
    this.ticking = false;
  }

  mustPlaceScrollableToRight(scrollableTranslateX) {
    const { itemWidth, preloadItemsCount, scrollableWidth } = this.props;

    return (
      scrollableTranslateX <=
      -(itemWidth * preloadItemsCount - itemWidth + scrollableWidth)
    );
  }

  mustPlaceScrollableToLeft(scrollableTranslateX) {
    const { itemWidth, preloadItemsCount, wrapperWidth } = this.props;

    return (
      scrollableTranslateX >=
      wrapperWidth + itemWidth * preloadItemsCount - itemWidth
    );
  }

  getItemsVisiblesInScrollable(
    scrollableTranslateX,
    scrollableWidth,
    wrapperWidth,
    itemWidth
  ) {
    if (
      scrollableTranslateX > wrapperWidth ||
      scrollableTranslateX + scrollableWidth <= 0
    ) {
      return [];
    }

    if (scrollableTranslateX < 0) {
      const { items } = this.props;
      const itemsVisibles = [];
      const itemsVisiblesCount = wrapperWidth / itemWidth;
      const itemsVisiblesStart = -scrollableTranslateX / itemWidth;
      for (
        let i = itemsVisiblesStart;
        i < items.length && itemsVisibles.length < itemsVisiblesCount;
        i++
      ) {
        itemsVisibles.push(i);
      }
      return itemsVisibles;
    } else {
      const itemsVisibles = [];
      const itemsVisiblesStart = scrollableTranslateX / itemWidth;
      const itemsVisiblesCount = wrapperWidth / itemWidth;
      let carouselIndex = 0;
      for (let i = itemsVisiblesStart; i < itemsVisiblesCount; i++) {
        itemsVisibles.push(carouselIndex);
        carouselIndex++;
      }
      return itemsVisibles;
    }
  }

  getItemsVisibles(
    firstScrollableTranslateX,
    secondScrollableTranslateX,
    scrollableWidth,
    wrapperWidth,
    itemWidth
  ) {
    const firstScrollableItemsVisibles = this.getItemsVisiblesInScrollable(
      firstScrollableTranslateX,
      scrollableWidth,
      wrapperWidth,
      itemWidth
    );
    const secondScrollableItemsVisibles = this.getItemsVisiblesInScrollable(
      secondScrollableTranslateX,
      scrollableWidth,
      wrapperWidth,
      itemWidth
    );

    return firstScrollableItemsVisibles.concat(secondScrollableItemsVisibles);
  }

  scrollToRight = () => {
    const {
      iFocused,
      itemsLeft,
      scrollableTranslateX,
      scrollable2TranslateX,
      scrollableWidth,
      wrapperWidth,
      items,
      itemWidth,
      updatePositions,
    } = this.props;

    const nextIFocused = items[iFocused + 1] ? iFocused + 1 : 0;

    const itemsVisibles = this.getItemsVisibles(
      scrollableTranslateX,
      scrollable2TranslateX,
      scrollableWidth,
      wrapperWidth,
      itemWidth
    );

    if (itemsVisibles.includes(nextIFocused)) {
      updatePositions(
        {
          iFocused: nextIFocused,
        },
        () => {
          this.ticking = false;
        }
      );
    } else {
      const newScrollableTranslateX = scrollableTranslateX - itemWidth;
      const newScrollable2TranslateX = scrollable2TranslateX - itemWidth;
      updatePositions(
        {
          iFocused: nextIFocused,
          scrollableTranslateX: newScrollableTranslateX,
          scrollable2TranslateX: newScrollable2TranslateX,
        },
        () => {
          const mustPlaceScrollable1 = this.mustPlaceScrollableToRight(
            newScrollableTranslateX
          );
          const mustPlaceScrollable2 = this.mustPlaceScrollableToRight(
            newScrollable2TranslateX
          );
          if (mustPlaceScrollable2) {
            const newScrollable2TranslateX =
              newScrollableTranslateX + scrollableWidth;

            updatePositions({
              scrollable2TranslateX: newScrollable2TranslateX,
            });
          }
          if (mustPlaceScrollable1) {
            const newScrollableTranslateX =
              newScrollable2TranslateX + scrollableWidth;

            updatePositions({
              scrollableTranslateX: newScrollableTranslateX,
            });
          }
          this.ticking = false;
        }
      );
    }
  };

  onCarouselLoopedRight = () => {
    this.ticking =
      this.ticking || window.requestAnimationFrame(this.scrollToRight);
  };

  scrollToLeft = () => {
    const {
      iFocused,
      itemsLeft,
      scrollableTranslateX,
      scrollable2TranslateX,
      scrollableWidth,
      wrapperWidth,
      items,
      itemWidth,
      updatePositions,
    } = this.props;

    const prevIFocused = items[iFocused - 1] ? iFocused - 1 : items.length - 1;

    const itemsVisibles = this.getItemsVisibles(
      scrollableTranslateX,
      scrollable2TranslateX,
      scrollableWidth,
      wrapperWidth,
      itemWidth
    );

    if (itemsVisibles.includes(prevIFocused)) {
      const newPositions = {
        iFocused: prevIFocused,
      };
      updatePositions(newPositions, () => {
        this.ticking = false;
      });
    } else {
      const newScrollableTranslateX = scrollableTranslateX + itemWidth;
      const newScrollable2TranslateX = scrollable2TranslateX + itemWidth;
      const newPositions = {
        iFocused: prevIFocused,
        scrollableTranslateX: newScrollableTranslateX,
        scrollable2TranslateX: newScrollable2TranslateX,
      };
      updatePositions(newPositions, () => {
        const mustPlaceScrollable1 = this.mustPlaceScrollableToLeft(
          newScrollableTranslateX
        );
        const mustPlaceScrollable2 = this.mustPlaceScrollableToLeft(
          newScrollable2TranslateX
        );

        if (mustPlaceScrollable2) {
          const newScrollable2TranslateX =
            newScrollableTranslateX - scrollableWidth;
          updatePositions({
            scrollable2TranslateX: newScrollable2TranslateX,
          });
        }
        if (mustPlaceScrollable1) {
          const newScrollableTranslateX =
            newScrollable2TranslateX - scrollableWidth;
          updatePositions({
            scrollableTranslateX: newScrollableTranslateX,
          });
        }
        this.ticking = false;
      });
    }
  };

  onCarouselLoopedLeft = () => {
    this.ticking =
      this.ticking || window.requestAnimationFrame(this.scrollToLeft);
  };

  performCallback(callback) {
    if (callback) {
      block();
      const { items, iFocused } = this.props;
      enterTo(callback, items[iFocused].props.id);
    }
  }

  render() {
    const { id, onDownExit, onUpExit, onEnter } = this.props;

    return (
      <Keys
        id={id}
        active={true}
        onLeft={this.onCarouselLoopedLeft}
        onRight={this.onCarouselLoopedRight}
        onUp={() => this.performCallback(onUpExit)}
        onDown={() => this.performCallback(onDownExit)}
        onEnter={() => this.performCallback(onEnter)}
      />
    );
  }
}

export default CarouselLoopedEngine;
