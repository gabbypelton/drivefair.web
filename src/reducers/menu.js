import types from "../actions/types";

const initialState = {
  menuItems: [],
  visibleMenuItems: [],
  searchString: "",
  modifications: [],
  isLoading: false,
  modificationsLoading: false,
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.ADD_MENU_ITEM:
    case types.REMOVE_MENU_ITEM:
    case types.EDIT_MENU_ITEM:
    case types.GET_MENU:
    case types.LOG_IN:
      return { ...state, ...payload, isLoading: true };
    case types.ADD_MENU_ITEM_FAIL:
    case types.REMOVE_MENU_ITEM_FAIL:
    case types.EDIT_MENU_ITEM_FAIL:
    case types.LOG_IN_FAIL:
    case types.GET_MENU_FAIL:
      return { ...state, error: payload.error, isLoading: false };
    case types.ADD_MENU_ITEM_SUCCESS:
    case types.REMOVE_MENU_ITEM_SUCCESS:
    case types.EDIT_MENU_ITEM_SUCCESS:
      return {
        ...state,
        menuItems: payload.menuItems,
        visibleMenuItems: payload.menuItems,
        isLoading: false,
      };
    case types.ADD_MODIFICATION:
    case types.REMOVE_MODIFICATION:
    case types.EDIT_MODIFICATION:
      return { ...state, modificationsLoading: true };
    case types.ADD_MODIFICATION_FAIL:
    case types.REMOVE_MODIFICATION_FAIL:
    case types.EDIT_MODIFICATION_FAIL:
      return { ...state, error: payload.error, modificationsLoading: false };
    case types.ADD_MODIFICATION_SUCCESS:
    case types.REMOVE_MODIFICATION_SUCCESS:
    case types.EDIT_MODIFICATION_SUCCESS:
      return {
        ...state,
        modifications: payload.savedModifications,
        modificationsLoading: false,
      };
    case types.GET_MENU_SUCCESS:
      return {
        ...state,
        menuItems: payload.foundMenu.menuItems,
        visibleMenuItems: payload.foundMenu.menuItems,
        modifications: payload.foundMenu.modifications,
        isLoading: false,
      };
    case type.LOG_IN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        menuItems: payload.profile.menu,
        visibleMenuItems: payload.profile.menu,
      };
    case types.SEARCH_MENU:
      return {
        ...state,
        searchString: payload.searchString,
        visibleMenuItems: [...state.menuItems].filter(
          (a) =>
            a.name.toLowerCase().includes(payload.searchString.toLowerCase()) ||
            a.description
              .toLowerCase()
              .includes(payload.searchString.toLowerCase())
        ),
      };
    case "DISMISS_MENU_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
};
