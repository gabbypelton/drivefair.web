import types from "../actions/types";

const initialState = {
  isLoading: false,
  vendors: [],
  selectedVendorId: "",
  selectedVendor: {
    businessName: "",
    address: {},
    menu: [],
    phoneNumber: "",
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.NEW_VENDOR:
      return { ...state, ...payload };
    case types.GET_VENDORS:
      return { ...state, isLoading: true };
    case types.GET_VENDORS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        vendors: payload.vendors,
        selectedVendor: payload.vendors.find(
          (vendor) => vendor._id === state.selectedVendorId
        ) || { ...state.selectedVendor },
      };
    case types.GET_VENDORS_FAIL:
      return { ...state, isLoading: false };
    case types.SELECT_VENDOR:
      return {
        ...state,
        selectedVendorId: payload.vendorId,
        selectedVendor: state.vendors.find(
          (vendor) => vendor._id === payload.vendorId
        ) || { ...state.selectedVendor },
      };
    default:
      return state;
  }
};
