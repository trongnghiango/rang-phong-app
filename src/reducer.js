// create, update data for app
export const initialState = {
    steps: {},
    step: -1,
    isPlaying: false,
};

//
export const actionTypes = {
    INC_STEP: "INC_STEP",
    SET_STEP: "SET_STEP",
    RESET_STEP: "RESET_STEP",
   
    TOGGLE_PLAY: "TOGGLE_PLAY",
    SET_STEPS: "SET_STEPS",
    CLEAR_STEPS: "CLEAR_STEPS",
}

export const reducer = (state, action) => {
    switch (action.type) {

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

        //BAT/TAt che do PLAYING
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