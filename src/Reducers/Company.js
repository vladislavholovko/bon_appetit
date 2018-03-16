export const actionType = {
    DATA_COMPANY: "DATA_COMPANY"
};

const defaultState = {
    data_company: {}
};

export default function Info(state = defaultState, action) {
    switch (action.type) {
        case "DATA_COMPANY":
            return {...state, data_company: action.payload};
            break;

        default:
            return state;
    }
}