
import { globalStore } from '../../listener';
import { C_DOWN, C_LEFT, C_RIGHT, C_UP, NAME } from '../../constants';
import { _updateBinder } from '../../redux/actions';

export function getBinder(id) {
  return globalStore.getState()[NAME][id];
}

export function addScrollableRef(id, scrollableRef) {
  _updateBinder(id, { scrollableRef, scrollableTranslateX: 0, scrollableTranslateY: 0 });
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

export function horizontalScrollHandler(id, translateX) {
  const { scrollableRef } = getBinder(id);
  _updateBinder(id, { scrollableTranslateX: translateX });
  scrollableRef.style.transform = `translate3d(${translateX}px, 0, 0)`;
}

export function verticalScrollHandler(id, translateY) {
  const { scrollableRef } = getBinder(id);
  _updateBinder(id, { scrollableTranslateY: translateY });
  scrollableRef.style.transform = `translate3d(0, ${translateY}px, 0)`;
}

export function addScrollableItemRef(id, scrollableItemRef) {
  const { scrollableItems } = getBinder(id);
  if (!scrollableItems) {
    _updateBinder(id, { scrollableItems: [scrollableItemRef], iFocused: 0 });
  }
  else {
    scrollableItems.push(scrollableItemRef);
    _updateBinder(id, { scrollableItems });
  }
}

export function getIFocused(id) {
  const { iFocused } = getBinder(id);
  return iFocused;
}

export function initItemFocused(id) {
  const { active, childItemWrapper, focusedClassName, iFocused, scrollableItems } = getBinder(id);
  if (active) {
    const focusedItem = scrollableItems[iFocused].querySelector(childItemWrapper).childNodes.item(0);
    focusedItem.classList.add(focusedClassName);
  }
}

const ITEM_FOCUSED_TIMEOUT = 90;
let nextBinderItemFocusedTimeout = null,
  nextItemFocusedTimeout = null;


export function itemFocusedHandler(id, iFocused, callback) {
  const { childItemWrapper, focusedClassName, iFocused: prevIFocused, preloadItemsCount, scrollableItems } = getBinder(id);
  const focusedItem = scrollableItems[iFocused].querySelector(childItemWrapper).childNodes.item(0);
  if (focusedClassName) {
    if (nextItemFocusedTimeout) clearTimeout(nextItemFocusedTimeout);
    nextItemFocusedTimeout = setTimeout(() => focusedItem.classList.add(focusedClassName), ITEM_FOCUSED_TIMEOUT);
  }

  const prevFocusedItem = scrollableItems[prevIFocused].querySelector(childItemWrapper).childNodes.item(0);
  prevFocusedItem.classList.remove(focusedClassName);

  _updateBinder(id, { iFocused, selectedId: focusedItem.id, scrollableItems });

  if (callback) callback();
}

export function isCarouselActive(id) {
  const { active } = getBinder(id);
  return active;
}