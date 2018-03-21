import {store} from "../Components/App";
import {actionType} from "../Reducers/ReducerCompany";

const host = "http://web.bidon-tech.com:65059/";
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

export async function  UserInfo() {
    let token = localStorage.getItem('token');
    let response = await fetch(host+"user",
        {
            method: "GET",
            headers: {
                "Authorization": token
            }
        });
    let data = await response.json();
    store.dispatch({
        type: actionType.USER_INFO,
        payload: data.message
    })
}