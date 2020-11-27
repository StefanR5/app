const initState = {
  user: undefined,
  signInError: "",
  signUpError: "",
};

const authReducers = (state = initState, action) => {
  switch (action.type) {
    case "SIGN_IN_ERROR":
      return { ...state, signInError: action.payload };
    case "SIGN_UP_ERROR":
      return { ...state, signUpError: action.payload };
    case "SIGN_OUT":
      return initState;
    case "REMOVE_SIGN_IN_ERROR":
      return { ...state, signInError: "" };
    case "REMOVE_SIGN_UP_ERROR":
      return { ...state, signUpError: "" };
    default:
      return state;
  }
};
export default authReducers;
