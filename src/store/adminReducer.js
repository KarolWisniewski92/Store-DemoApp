const initialState = {
    logIn: false
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            console.log("Unknown action" + action.type);
            return state;
    }
}

export default adminReducer;