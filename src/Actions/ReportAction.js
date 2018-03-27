import {store} from "../Components/App";
import {actionType} from "../Reducers/ReducerCompany";


const host = "http://web.bidon-tech.com:65059/";

export async function usersReports() {
    let token = localStorage.getItem('token');
    let response = await fetch(host+"reports",
        {
            method: "GET",
            headers: {
                "Authorization": token
            }
        });
    let data = await response.json();
    store.dispatch({
        type: actionType.REPORT_INFO,
        payload: data.message
    })
}
