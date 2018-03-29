export const actionType = {
    DATA_COMPANY: "DATA_COMPANY",
    DASHBOARD_INFO: "DASHBOARD_INFO",
    USER_INFO: "USER_INFO",
    REPORT_INFO: "REPORT_INFO",
    FILTER_LIST:"FILTER_LIST"
};

const defaultState = {
    data_company: {
        active: "",
        createdAt: "",
        description: "",
        imageQuality: "",
        language: "",
        logo: "",
        name: "",
        orderValue: "",
        ownerEmail: "",
        ownerPassword: "",
        totalSpace: 0,
        useSpace: 0,
        _id: ""
    },
    dashboard_info: {
        lastFiveReports:[],
        lastTwoWeeksReports:[],
        reportCount: 0,
        userCount: 0
    },
    user_info: [],
    report_info: [],
    filter_list:[]
};

export default function Info(state = defaultState, action) {
    switch (action.type) {
        case "DATA_COMPANY":
            return {...state, data_company: action.payload};
            break;
        case "DASHBOARD_INFO":
            return {...state, dashboard_info: action.payload};
            break;
        case "USER_INFO":
            return {...state, user_info: action.payload};
            break;
        case "REPORT_INFO":
            return {...state, report_info: action.payload};
            break;
            case "FILTER_LIST":
            return {...state, filter_list: action.payload};
            break;
        default:
            return state;
    }
}