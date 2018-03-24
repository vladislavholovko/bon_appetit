import {store} from "../Components/App";
import {actionType} from "../Reducers/ReducerCompany";

const host = "http://web.bidon-tech.com:65059/";

export async function UserInfo() {
    let token = localStorage.getItem('token');
    let response = await fetch(host + "user",
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

export async function NewUsers(fullName, email, password) {
    let token = localStorage.getItem('token');
    let response = await fetch(host + "user",
        {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": token
            },
            body: JSON.stringify({
                fullName: fullName,
                email: email,
                password: password,
            })
        });
    let data = await response.json();
    if (data.error) {
        console.log(data.message.toString());
    } else {
        UserInfo();
    }
}