export function reducer(state, action) {
    switch (action.type) {
        case 'TOGGLE_PRODUCT_CODE':
            console.log(`Existing ${(state || {}).showProductCode} New: ${action.payload}.`);
            return {
                ...state,
                showProductCode: action.payload
            };
        default:
            console.warn(`Action of ${action.type} not defined`);
            return state;
    }
}
