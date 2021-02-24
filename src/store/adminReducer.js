const initialState = {
    logIn: false
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_LOGIN_STATE':
            const logIn = action.payload;
            return { ...state, logIn };

        default:
            console.log("Unknown action" + action.type);
            return state;
    }
}

export default adminReducer;