import { getBinders, globalStore } from '../../store';
import { findBinder } from '../../redux/helper';
import { C_DOWN, C_LEFT, C_RIGHT, C_UP, NAME } from '../../constants';
import { _updateBinder, UPDATE_CURRENT } from '../../redux/actions';
import { CAROUSEL_DIRECTIONS } from '../../constants';

export function getBinder(id) {
  return findBinder(getBinders(), id);
}

export function addScrollableRef(id, scrollableRef, parentItemIndex) {
  _updateBinder({
    id,
    scrollableRef,
    scrollableTranslateX: 0,
    scrollableTranslateY: 0,
  });
}

export function addNestedScrollableRef(id, scrollableRef, parentItemIndex) {
  const { nestedScrollableRefs } = getBinder(id);
  nestedScrollableRefs[parentItemIndex] = {
    ref: scrollableRef,
    scrollableTranslateX: 0,
    scrollableTranslateY: 0,
    iFocused: 0,
  };
  _updateBinder({ id, nestedScrollableRefs });
}

export function getScrollableRef(id) {
  const { scrollableRef } = getBinder(id);
  return scrollableRef;
}

export function getScrollableTranslateX(id) {
  const { scrollableTranslateX } = getBinder(id);
  return scrollableTranslateX;
}

export function getScrollableTranslateY(id) {
  const { scrollableTranslateY } = getBinder(id);
  return scrollableTranslateY;
}

export function horizontalScrollHandler(id, translateX, nestedTranslateX) {
  const { direction, scrollableRef } = getBinder(id);
  _updateBinder({ id, scrollableTranslateX: translateX });
  scrollableRef.style.transform = `translate3d(${translateX}px, 0, 0)`;
}

export function horizontalNestedScrollHandler(id, nestedTranslateX) {
  const { iFocused, nestedIFocused, nestedScrollableRefs } = getBinder(id);
  nestedScrollableRefs[iFocused].scrollableTranslateX = nestedTranslateX;
  _updateBinder({ id, nestedScrollableRefs });
  nestedScrollableRefs[
    iFocused
  ].ref.style.transform = `translate3d(${nestedTranslateX}px, 0, 0)`;
}

export function verticalScrollHandler(id, translateY) {
  const { scrollableRef } = getBinder(id);
  _updateBinder({ id, scrollableTranslateY: translateY });
  scrollableRef.style.transform = `translate3d(0, ${translateY}px, 0)`;
}

export function addScrollableItemRef(id, itemIndex, scrollableItemRef) {
  const { direction, nestedScrollableItems, scrollableItems } = getBinder(id);

  scrollableItems[itemIndex] = {};
  scrollableItems[itemIndex].ref = scrollableItemRef;

  if (
    direction === CAROUSEL_DIRECTIONS.vertical ||
    direction === CAROUSEL_DIRECTIONS.verticalBidirectional
  ) {
    scrollableItems[itemIndex].offsetHeight = scrollableItemRef.offsetHeight;
    scrollableItems[itemIndex].offsetTop = scrollableItemRef.offsetTop;
  } else if (direction === CAROUSEL_DIRECTIONS.horizontal) {
    scrollableItems[itemIndex].offsetWidth = scrollableItemRef.offsetWidth;
    scrollableItems[itemIndex].offsetLeft = scrollableItemRef.offsetLeft;
  }
  _updateBinder({ id, scrollableItems });
}

export function addNestedScrollableItemRef(
  id,
  itemIndex,
  parentItemIndex,
  scrollableItemRef
) {
  const { nestedScrollableItems } = getBinder(id);
  if (!nestedScrollableItems[parentItemIndex]) {
    nestedScrollableItems[parentItemIndex] = [];
  }
  nestedScrollableItems[parentItemIndex][itemIndex] = {};
  nestedScrollableItems[parentItemIndex][itemIndex].ref = scrollableItemRef;
  nestedScrollableItems[parentItemIndex][itemIndex].offsetWidth =
    scrollableItemRef.offsetWidth;
  nestedScrollableItems[parentItemIndex][itemIndex].offsetLeft =
    scrollableItemRef.offsetLeft;

  _updateBinder({ id, nestedScrollableItems });
}

export function getItemOffsetHeight(id, iFocused) {
  const { scrollableItems } = getBinder(id);
  return scrollableItems[iFocused]
    ? scrollableItems[iFocused].offsetHeight
    : undefined;
}

export function getItemOffsetLeft(id, iFocused) {
  const { scrollableItems } = getBinder(id);
  return scrollableItems[iFocused]
    ? scrollableItems[iFocused].offsetLeft
    : undefined;
}

export function getItemOffsetTop(id, iFocused) {
  const { scrollableItems } = getBinder(id);
  return scrollableItems[iFocused]
    ? scrollableItems[iFocused].offsetTop
    : undefined;
}

export function getItemOffsetWidth(id, iFocused) {
  const { scrollableItems } = getBinder(id);
  return scrollableItems[iFocused]
    ? scrollableItems[iFocused].offsetWidth
    : undefined;
}

export function getIFocused(id) {
  const { iFocused } = getBinder(id);
  return iFocused;
}

export function isItemMounted(idItem) {
  return !!document.getElementById(idItem);
}

export function getNestedIFocused(id, iFocused) {
  const { nestedScrollableRefs } = getBinder(id);
  return nestedScrollableRefs && nestedScrollableRefs[iFocused]
    ? nestedScrollableRefs[iFocused].iFocused
    : 0;
}

export function getNestedItemOffsetLeft(id, iFocused, nestedIFocused) {
  const { nestedScrollableItems } = getBinder(id);
  return nestedScrollableItems[iFocused] &&
    nestedScrollableItems[iFocused][nestedIFocused]
    ? nestedScrollableItems[iFocused][nestedIFocused].offsetLeft
    : undefined;
}

export function getNestedItemOffsetWidth(id, iFocused, nestedIFocused) {
  const { nestedScrollableItems } = getBinder(id);
  return nestedScrollableItems[iFocused] &&
    nestedScrollableItems[iFocused][nestedIFocused]
    ? nestedScrollableItems[iFocused][nestedIFocused].offsetWidth
    : undefined;
}

export function getNestedScrollableTranslateX(id, iFocused) {
  const { nestedScrollableRefs } = getBinder(id);
  return nestedScrollableRefs[iFocused].scrollableTranslateX;
}

export function itemFocusedHandler(id, iFocused, nestedIFocused, callback) {
  const {
    childItemWrapper,
    direction,
    focusedClassName,
    nestedFocusedClassName,
    horizontalChildItemWrapper,
    iFocused: prevIFocused,
    nestedScrollableItems,
    nestedScrollableRefs,
    preloadItemsCount,
    scrollableItems,
    verticalChildItemWrapper,
  } = getBinder(id);
  //console.log('=> BINDER', getBinder(id));

  if (direction === CAROUSEL_DIRECTIONS.verticalBidirectional) {
    const focusedItem = scrollableItems[iFocused].ref.querySelector(
      verticalChildItemWrapper
    );
    const prevNestedIFocused = nestedScrollableRefs[prevIFocused].iFocused;
    if (isNaN(nestedIFocused)) {
      nestedIFocused = nestedScrollableRefs[iFocused].iFocused;
    }

    const prevNestedFocusedItem = nestedScrollableItems[prevIFocused][
      prevNestedIFocused || 0
    ].ref.querySelector(horizontalChildItemWrapper);
    if (prevNestedFocusedItem)
      prevNestedFocusedItem.classList.remove(nestedFocusedClassName);

    const nestedFocusedItem = nestedScrollableItems[iFocused][
      nestedIFocused || 0
    ].ref.querySelector(horizontalChildItemWrapper);
    nestedFocusedItem.classList.add(nestedFocusedClassName);

    nestedScrollableRefs[iFocused].iFocused = nestedIFocused;

    _updateBinder({
      id,
      iFocused,
      selectedId: focusedItem.id,
      nestedIFocused,
      nestedSelectedId: nestedFocusedItem.id,
      nestedScrollableRefs,
    });
  } else {
    const focusedItem = scrollableItems[iFocused].ref.querySelector(
      childItemWrapper
    );
    if (focusedClassName) {
      const prevFocusedItem = scrollableItems[prevIFocused].ref.querySelector(
        childItemWrapper
      );
      if (prevFocusedItem) prevFocusedItem.classList.remove(focusedClassName);
      focusedItem.classList.add(focusedClassName);
    }

    _updateBinder({
      id,
      iFocused,
      selectedId: focusedItem.id,
      scrollableItems,
    });
  }
}

export function isCarouselActive(id) {
  const { active } = getBinder(id);
  return active;
}
