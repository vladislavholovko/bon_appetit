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

export async function EditReport(id, category_id, comment, approved) {
    let token = localStorage.getItem('token');
    let response = await fetch(host + "reports",
        {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": token
            },
            body: JSON.stringify({
                _id:id,
                category_id: category_id,
                comment: comment,
                approved: approved,
            })
        });
    let data = await response.json();
    if (data.error) {
        console.log(data.message.toString());
    } else {
        usersReports();
    }
}