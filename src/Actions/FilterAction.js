import {store} from "../Components/App";
import {actionType} from "../Reducers/ReducerCompany";

export async function ReportFilter(listReports) {
    store.dispatch({
        type: actionType.FILTER_LIST,
        payload: listReports
    })
}
