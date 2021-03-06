// create, update data for app
export const initialState = {
  datas: {},
  steps: {},
  step: -1,
  isPlaying: false,
  isLoading: false,
  hideMaxillary: false,
  hideMandibular: false
};

//
export const actionTypes = {
  INC_STEP: "INC_STEP",
  SET_STEP: "SET_STEP",
  RESET_STEP: "RESET_STEP",
  LOADING: "LOADING",
  LOADING_FINISHED: "LOADING_FINISHED",
  TOGGLE_PLAY: "TOGGLE_PLAY",
  // Setdata
  SET_DATA: "SET_DATA",

  //
  SET_STEPS: "SET_STEPS",
  CLEAR_STEPS: "CLEAR_STEPS",

  //Ẩn hàm trên
  HIDE_MAXILLARY: "HIDE_MAXILLARY",
  SHOW_MAXILLARY: "SHOW_MAXILLARY",
  HIDE_MANDIBULAR: "HIDE_MANDIBULAR",
  SHOW_MANDIBULAR: "SHOW_MANDIBULAR"

}

export const reducer = (state, action) => {
  switch (action.type) {
    //
    case actionTypes.HIDE_MAXILLARY:
      return {
        ...state,
        hideMaxillary: true
      };

    case actionTypes.SHOW_MAXILLARY:
      return {
        ...state,
        hideMaxillary: false
      };

    case actionTypes.HIDE_MANDIBULAR:
      return {
        ...state,
        hideMandibular: true
      };

    case actionTypes.SHOW_MANDIBULAR:
      return {
        ...state,
        hideMandibular: false
      };

    // tang so buoc nhay STEP
    case actionTypes.INC_STEP:
      return {
        ...state,
        step: state.step + action.step
      };

    //SET STEP tai 1 vi tri
    case actionTypes.SET_STEP:
      return {
        ...state,
        step: action.step
      };

    // BAT/TAT che do PLAYING
    case actionTypes.TOGGLE_PLAY:
      return {
        ...state,
        isPlaying: !state.isPlaying
      };

    //Reset
    case actionTypes.RESET_STEP:
      return {
        ...state,
        step: 0,
        isPlaying: false
      };

    //
    case actionTypes.SET_STEPS:
      return {
        ...state,
        steps: action.steps,
      };

    //
    case actionTypes.SET_DATA:
      return {
        ...state,
        datas: action.datas,
      };

    // Loading big data rang
    case actionTypes.LOADING:
      return {
        ...state,
        isLoading: true,
      };

    // Loading finished big data rang
    case actionTypes.LOADING_FINISHED:
      return {
        ...state,
        isLoading: false,
      };

    //
    case actionTypes.CLEAR_STEPS:
      // for enumerable properties of shallow/plain object
      for (var key in state.steps) {
        // this check can be safely omitted in modern JS engines
        // if (obj.hasOwnProperty(key))
        delete state.steps[key];
      }
      return {
        ...state,
        steps: {},
      };

    default:
      return state;
  }
}