import {
  SET_ORDER_ID,
  SET_TOTAL_AMOUNT,
  SET_PAYMENT_STATUS,
  RESET_ORDER_ID,
  RESET_STATE_PAYMENT,
  RESET_TOTAL_AMOUNT,
  SET_IS_PROCESSED_EMAIL_PDF,
} from "../action/orderActions";

const initialState = {
  idOrder: null,
  price: 0,
  paymentStatus: "pending",
  isProcessedEmailPDF: false,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER_ID:
      return {
        ...state,
        idOrder: action.payload,
      };
    case SET_TOTAL_AMOUNT:
      return {
        ...state,
        price: action.payload,
      };
    case SET_PAYMENT_STATUS:
      return {
        ...state,
        paymentStatus: action.payload,
      };
    case RESET_ORDER_ID:
      return {
        ...state,
        idOrder: null,
      };
    case RESET_STATE_PAYMENT:
      return {
        ...state,
        paymentStatus: "pending",
      };
    case RESET_TOTAL_AMOUNT:
      return {
        ...state,
        price: 0,
      };
    case SET_IS_PROCESSED_EMAIL_PDF:
      return {
        ...state,
        isProcessedEmailPDF: action.payload,
      };
    default:
      return state;
  }
};

export default orderReducer;
