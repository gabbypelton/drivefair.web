import types from "../actions/types";

const initialState = {
  isLoading: false,
  vendors: [],
  selectedVendorId: localStorage.getItem("selectedVendorId") || "",
  selectedVendor: {
    businessName: "",
    address: {},
    menu: [],
    phoneNumber: "",
  },
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_VENDORS:
    case types.NEW_VENDOR:
      return { ...state, isLoading: true };

    case types.GET_VENDORS_FAIL:
    case types.NEW_VENDOR_FAIL:
      return { ...state, isLoading: false, error: payload.error };

    case types.NEW_VENDOR_SUCCESS:
      return { ...state, isLoading: false };

    case types.GET_VENDORS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        vendors: payload.vendors,
        selectedVendor: payload.vendors.find(
          (vendor) => vendor._id === state.selectedVendorId
        ) || { ...state.selectedVendor },
      };

    case types.SELECT_VENDOR:
      return {
        ...state,
        selectedVendorId: payload.vendorId,
        selectedVendor: state.vendors.find(
          (vendor) => vendor._id === payload.vendorId
        ) || { ...state.selectedVendor },
      };

    case "DISMISS_VENDOR_ERROR":
      return { ...state, error: null };

    default:
      return state;
  }
};
