import {
  ACTIVATE_BINDER,
  ADD_BINDER_TO_STORE,
  UPDATE_BINDER_STATE,
  UPDATE_PRESS_STATUS,
  UPDATE_BINDER_SELECTED_KEY,
  UPDATE_CURRENT,
  RESET_BINDER,
  REMOVE_BINDER,
} from './actions';
import { addOrUpdateBinder } from './helper';

const initialKeysSate = {
  current: {
    selectedId: null,
    binderId: null,
  },
  standards: [],
  priority: [],
  PRESS: {
    press: false,
  },
};

export function _keyReducer(state = initialKeysSate, action) {
  switch (action.type) {
    case ADD_BINDER_TO_STORE:
      return {
        ...state,
        standards: addOrUpdateBinder(state.standards, action.newBinder),
      };
    case ACTIVATE_BINDER:
      return {
        ...state,
        ...action.inactiveBinders,
        [action.binderId]: {
          ...state[action.binderId],
          active: true,
        },
      };
    case UPDATE_BINDER_STATE:
      return {
        ...state,
        [action.binderId]: {
          ...state[action.binderId],
          ...action.state,
        },
      };
    case RESET_BINDER:
      return {
        ...state,
        [action.binderId]: {
          ...state[action.binderId],
          selectedId: action.selectedId,
          nextEl: state[action.binderId].elements.find(
            e => e.id === action.selectedId
          ),
        },
      };
    case REMOVE_BINDER:
      return copyStateWithout(state, action.binderId);
    case UPDATE_BINDER_SELECTED_KEY:
      return {
        ...state,
        [action.binderId]: {
          ...state[action.binderId],
          selectedId: action.selectedId,
          marginLeft: action.marginLeft,
          marginTop: action.marginTop,
        },
        current: {
          ...state['current'],
          binderId: action.binderId,
          selectedId: action.selectedId,
        },
      };
    case UPDATE_CURRENT:
      return {
        ...state,
        current: {
          ...state['current'],
          binderId: action.binderId,
          selectedId: action.selectedId,
        },
      };
    case UPDATE_PRESS_STATUS:
      return {
        ...state,
        PRESS: { press: action.press, keyCode: action.keyCode },
      };
    case 'RESET_STATE':
      return initialKeysSate;
    default:
      return state;
  }
}

function copyStateWithout(state, without) {
  const copy = { ...state };
  delete copy[without];
  return copy;
}
