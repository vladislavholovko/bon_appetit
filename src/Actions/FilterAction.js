import {store} from "../Components/App";
import {actionType} from "../Reducers/ReducerCompany";

const host = "http://web.bidon-tech.com:65059/";

export async function ReportFilter(listReports) {
    store.dispatch({
        type: actionType.FILTER_LIST,
        payload: listReports
    })
}


export async function saveXls() {
    let token = localStorage.getItem('token');
    await fetch(host + "reports/xls",
        {
            method: "GET",
            headers: {
                "Authorization": token
            }
        }).then(async (response)=>{
            console.log(response)
        let blob = await response.blob()
        let url = window.URL.createObjectURL(blob);
        download(url, 'export.xls' );
    });

}
function download( url, filename ) {
    let link = document.createElement('a');
    link.setAttribute('href',url);
    link.setAttribute('download',filename);
    let event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
    link.dispatchEvent(event);
}