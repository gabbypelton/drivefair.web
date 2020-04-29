import types from "../actions/types";

const initialState = {
  menuItems: [],
  modifications: [],
  isLoading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.ADD_MENU_ITEM:
    case types.REMOVE_MENU_ITEM:
    case types.EDIT_MENU_ITEM:
    case types.ADD_MODIFICATION:
    case types.REMOVE_MODIFICATION:
    case types.EDIT_MODIFICATION:
    case types.GET_MENU:
    case types.LOG_IN:
      return { ...state, ...payload, isLoading: true };
    case types.ADD_MENU_ITEM_FAIL:
    case types.REMOVE_MENU_ITEM_FAIL:
    case types.EDIT_MENU_ITEM_FAIL:
    case types.ADD_MODIFICATION_FAIL:
    case types.REMOVE_MODIFICATION_FAIL:
    case types.EDIT_MODIFICATION_FAIL:
    case types.LOG_IN_FAIL:
    case types.GET_MENU_FAIL:
      return { ...state, error: payload.error, isLoading: false };
    case types.ADD_MENU_ITEM_SUCCESS:
    case types.REMOVE_MENU_ITEM_SUCCESS:
    case types.EDIT_MENU_ITEM_SUCCESS:
      return { ...state, menuItems: payload.menuItems, isLoading: false };
    case types.ADD_MODIFICATION_SUCCESS:
    case types.REMOVE_MODIFICATION_SUCCESS:
    case types.EDIT_MODIFICATION_SUCCESS:
      return {
        ...state,
        modifications: payload.savedModifications,
        isLoading: false,
      };
    case types.GET_MENU_SUCCESS:
      return {
        ...state,
        menuItems: payload.menuItems,
        modifications: payload.modifications,
        isLoading: false,
      };
    case type.LOG_IN_SUCCESS:
      return { ...state, isLoading: false, menuItems: payload.profile.menu };
    default:
      return state;
  }
};
