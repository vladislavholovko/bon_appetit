export const actionType = {
    DATA_COMPANY: "DATA_COMPANY",
    DASHBOARD_INFO: "DASHBOARD_INFO"
};

const defaultState = {
    data_company: {},
    dashboard_info: {}
};

export default function Info(state = defaultState, action) {
    switch (action.type) {
        case "DATA_COMPANY":
            return {...state, data_company: action.payload};
            break;
        case "DASHBOARD_INFO":
            return {...state, dashboard_info: action.payload};
            break;
        default:
            return state;
    }
}