import {store} from "../Components/App";
import {actionType} from "../Reducers/ReducerCompany";
import {host} from './host';

export async function  DashboardInfo() {
    let token = localStorage.getItem('token');
    let response = await fetch(host+"dashboard",
        {
            method: "GET",
            headers: {
                "Authorization": token
            }
        });
    let data = await response.json();
    store.dispatch({
        type: actionType.DASHBOARD_INFO,
        payload: data.message
    })
}
