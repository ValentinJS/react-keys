import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { connect, Provider } from 'react-redux';
import {
  Binder,
  Carousel,
  CarouselV2,
  getBinderSelectedId,
  keysInit,
  keysReducer,
  keysSelector,
  Keys,
  removeBinder,
} from '../src';

function reducer(state = { active: false }, action) {
  switch (action.type) {
    case 'LOOL':
      return { ...state, active: true };
    default:
      return state;
  }
}

setTimeout(() => store.dispatch({ type: 'LOOL' }), 2000);

const store = createStore(
  combineReducers({
    '@@keys': keysReducer,
    LOL: reducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

keysInit({ store: store });



class OldCarousel extends React.Component {
  state = {

    items: [
      { id: 0, name: "item 0" },
      { id: 1, name: "item 1" },
      { id: 2, name: "item 2" },
      { id: 3, name: "item 3" },
      { id: 4, name: "item 4" },
      { id: 5, name: "item 5" },
      { id: 6, name: "item 6" },
      { id: 7, name: "item 7" },
      { id: 8, name: "item 8" },
      { id: 9, name: "item 9" },
      { id: 10, name: "item 10" },
      { id: 11, name: "item 11" },
      { id: 12, name: "item 12" },
      { id: 13, name: "item 13" },
      { id: 14, name: "item 14" },
      { id: 15, name: "item 15" },
      { id: 16, name: "item 16" },
      { id: 17, name: "item 17" },
      { id: 18, name: "item 18" },
      { id: 19, name: "item 19" },
      { id: 20, name: "item 20" },
      { id: 21, name: "item 21" },
      { id: 22, name: "item 22" },
      { id: 23, name: "item 23" },
      { id: 24, name: "item 24" },
      { id: 25, name: "item 25" },
      { id: 26, name: "item 26" },
      { id: 27, name: "item 27" },
      { id: 28, name: "item 28" },
      { id: 29, name: "item 29" },
      { id: 30, name: "item 30" },
      { id: 31, name: "item 31" },
      { id: 32, name: "item 32" },
      { id: 33, name: "item 33" },
      { id: 34, name: "item 34" },
      { id: 35, name: "item 35" },
      { id: 36, name: "item 36" },
      { id: 37, name: "item 37" },
      { id: 38, name: "item 38" },
      { id: 39, name: "item 39" },
      { id: 40, name: "item 40" },
      { id: 41, name: "item 41" },
    ],


  }

  render() {
    const { items } = this.state;
    return (
      <Carousel
        id="old-carousel"
        currentIndex={0}
        elWidth={200}
        childrenClassName={'item-children'}
      >
        {
          items.map((item, index) => {
            return (
              <div id={item.id} key={item.id} className={item.id === this.props.selectedId ? 'focused' : null} style={{ height: '300px', margin: '10px' }}>
                {item.name}
              </div>
            )
          })
        }

      </Carousel>
    )

  }
}



class CarouselV2Wrapper extends React.Component {
  state = {
    currentIndex: 0,
    iFocused: 0,
    itemHeight: 150,
    itemWidth: 285,
    itemsVisiblesCount: 3,
    wrapperOverflow: 60,
    preloadItemsCount: 2,
    scrollableTranslateX: 0,
    scrollable2TranslateX: 0,
    scrollableAnimated: true,
    scrollablesVisibles: [true, false],
    items: [
      { id: 0, name: "item 0" },
      { id: 1, name: "item 1" },
      { id: 2, name: "item 2" },
      { id: 3, name: "item 3" },
      { id: 4, name: "item 4" },
      { id: 5, name: "item 5" },
      { id: 6, name: "item 6" },
      { id: 7, name: "item 7" },
      { id: 8, name: "item 8" },
      { id: 9, name: "item 9" },
      { id: 10, name: "item 10" },
      { id: 11, name: "item 11" },
      { id: 12, name: "item 12" },
      { id: 13, name: "item 13" },
      { id: 14, name: "item 14" },
      { id: 15, name: "item 15" },
      { id: 16, name: "item 16" },
      { id: 17, name: "item 17" },
      { id: 18, name: "item 18" },
      { id: 19, name: "item 19" },
      { id: 20, name: "item 20" },
      { id: 21, name: "item 21" },
      { id: 22, name: "item 22" },
      { id: 23, name: "item 23" },
      { id: 24, name: "item 24" },
      { id: 25, name: "item 25" },
      { id: 26, name: "item 26" },
      { id: 27, name: "item 27" },
      { id: 28, name: "item 28" },
      { id: 29, name: "item 29" },
      { id: 30, name: "item 30" },
      { id: 31, name: "item 31" },
      { id: 32, name: "item 32" },
      { id: 33, name: "item 33" },
      { id: 34, name: "item 34" },
      { id: 35, name: "item 35" },
      { id: 36, name: "item 36" },
      { id: 37, name: "item 37" },
      { id: 38, name: "item 38" },
      { id: 39, name: "item 39" },
      { id: 40, name: "item 40" },
      { id: 41, name: "item 41" },
    ],
    carousels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
    loop: false,
    animationDuration: 0.15,
  }

  onEnter = (selectedId) => {
  }


  render() {
    const {
      carousels,
      currentIndex,
      items,
      itemsVisiblesCount,
      itemHeight,
      itemWidth,
      loop,
      preloadItemsCount,
      wrapperOverflow
    } = this.state;

    return (
      <div>
        <CarouselV2
          active
          id="carousel-v-1"
          currentIndex={currentIndex}
          direction="vertical"
          itemsVisiblesCount={3}
          loop={loop}
          onEnter={this.onEnter}
          preloadItemsCount={5}
          focusedClassName={'focuseditemlol'}
          wrapperWidth={600}
          wrapperHeight={450}
          wrapperOverflow={0}
          childItemWrapper={'.item-child'}
        >

          {
            items.map((item, index) => {
              return (
                <div key={`item_${index}`} className={'item-child-2'} style={{height: index === 4 ? '200px' : '150px', width: index === 4 ? '300px' : '200px'}}>
                  <div id={`item_${index}`} className={'item-child'}>
                    item_{index}
                  </div>
                </div>
              )
            })
          }

        </CarouselV2>

      </div>
    )
  }

}



const CarouselV2Sandbox = connect(state => {
  return {
    // lool: state['LOL'].active,
    // selectedId: getBinderSelectedId('carousel-v-1')()
  };
})(CarouselV2Wrapper);

ReactDOM.render(
  <Provider store={store}>
    <CarouselV2Sandbox />
  </Provider>,
  document.getElementById('body')
);
