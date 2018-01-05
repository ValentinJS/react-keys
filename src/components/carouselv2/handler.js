
import { globalStore } from '../../listener';
import { C_DOWN, C_LEFT, C_RIGHT, C_UP, NAME } from '../../constants';
import { _updateBinder } from '../../redux/actions';
import { CAROUSEL_DIRECTIONS } from '../../constants';

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

export function addScrollableItemRef(id, itemIndex, scrollableItemRef) {
  const { direction, scrollableItems } = getBinder(id);
  
  scrollableItems[itemIndex] = {};
  scrollableItems[itemIndex].ref = scrollableItemRef
  
  if(direction === CAROUSEL_DIRECTIONS.vertical){
    scrollableItems[itemIndex].offsetHeight = scrollableItemRef.offsetHeight;
    scrollableItems[itemIndex].offsetTop = scrollableItemRef.offsetTop;
  }
  else if(direction === CAROUSEL_DIRECTIONS.horizontal){
    scrollableItems[itemIndex].offsetWidth = scrollableItemRef.offsetWidth;
    scrollableItems[itemIndex].offsetLeft = scrollableItemRef.offsetLeft;
  }

  _updateBinder(id, { scrollableItems });
}

export function getItemOffsetHeight(id, iFocused) {
  const { scrollableItems } = getBinder(id);
  return scrollableItems[iFocused] ? scrollableItems[iFocused].offsetHeight : undefined; 
}

export function getItemOffsetLeft(id, iFocused) {
  const { scrollableItems } = getBinder(id);
  return scrollableItems[iFocused] ? scrollableItems[iFocused].offsetLeft : undefined; 
}

export function getItemOffsetTop(id, iFocused) {
  const { scrollableItems } = getBinder(id);
  return scrollableItems[iFocused] ? scrollableItems[iFocused].offsetTop : undefined; 
}

export function getItemOffsetWidth(id, iFocused) {
  const { scrollableItems } = getBinder(id);
  return scrollableItems[iFocused] ? scrollableItems[iFocused].offsetWidth : undefined; 
}

export function getIFocused(id) {
  const { iFocused } = getBinder(id);
  return iFocused;
}

export function isItemMounted(idItem) {
  return !!document.getElementById(idItem);
}


export function initCarousel(carouselId, direction, children, itemsVisiblesCount, preloadItemsCount) {
  console.log('====================================');
  console.log('Initializing carousel id', carouselId, direction, children);
  console.log('====================================');


}

const ITEM_FOCUSED_TIMEOUT = 90;
let nextBinderItemFocusedTimeout = null,
  nextItemFocusedTimeout = null;

export function itemFocusedHandler(id, iFocused, callback) {
  const { childItemWrapper, focusedClassName, iFocused: prevIFocused, preloadItemsCount, scrollableItems } = getBinder(id);
  const focusedItem = scrollableItems[iFocused].ref.querySelector(childItemWrapper);

  if (focusedClassName) {
    if (nextItemFocusedTimeout) clearTimeout(nextItemFocusedTimeout);
    nextItemFocusedTimeout = setTimeout(() => {
      focusedItem.classList.add(focusedClassName)
    }, ITEM_FOCUSED_TIMEOUT);

    const prevFocusedItem = scrollableItems[prevIFocused].ref.querySelector(childItemWrapper);
    if(prevFocusedItem) prevFocusedItem.classList.remove(focusedClassName);
  }

  _updateBinder(id, { iFocused, selectedId: focusedItem.id, scrollableItems });

  if (callback) callback();
}

export function isCarouselActive(id) {
  const { active } = getBinder(id);
  return active;
}