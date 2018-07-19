export function reducer(state, action) {
    switch (action.type) {
        case 'TOGGLE_MASK_USERNAME':
            return {
                ...state,
                maskUserName: action.value
            };
        default: {
            console.warn(`Unknown action type of ${action.type}.`);
        }
    }
}