import {store} from "../Components/App";
import {actionType} from "../Reducers/ReducerCompany";
import {host} from './host';

export function user(user) {
    store.dispatch({type:actionType.FILTER, user})
}

export async function gExcel(type) {
    let token = localStorage.getItem('token');
    var filter = '';
    let state = store.getState();

    let userId = state.filter_list === undefined ?
        state.report_info.map(value => value.user_id):
        state.filter_list.map(value => value.user_id);

    console.log(userId);
    if (userId.length !== state.report_info.length) {
        filter = 'reports/' + type + '?filter'
    } else if (userId.length === state.report_info.length) {
        filter = 'reports/' + type
    }

    if (userId.length !== state.report_info.length) {
        filter += '&user_id=' + userId[0]
    }

    let response = await fetch(host + filter,
        {
            method: "GET",
            headers: {
                "Authorization": token
            }
        });
    let blob = await response.blob();
    let url = window.URL.createObjectURL(blob);
    download(url, 'reports.' + type);
}

function download( url, filename ) {
    let link = document.createElement('a');
    link.setAttribute('href',url);
    link.setAttribute('download',filename);
    let event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
    link.dispatchEvent(event);
}