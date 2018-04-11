import {host} from './host';

export async function getExcel() {
    let token = localStorage.getItem('token');
    let response = await fetch(host+"reports/csv",
        {
            method: "GET",
            headers: {
                "Authorization": token
            }
        });
    console.log(response);
    console.log(response.url);

}