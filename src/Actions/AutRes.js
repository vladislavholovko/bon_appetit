import {host} from './host';

export async function registration(information) {
    let response = await fetch(host+"company",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                name: information.name,
                ownerEmail: information.ownerEmail,
                ownerPassword: information.ownerPassword,
                description: information.description,
                logo: "myLogo",
                imageQuality: information.imageQuality,
                orderValue: information.orderValue,
                active: true,
                language: information.language
            })
        });
     return response
}

export async function autorization(login, password) {
    let response = await fetch(host+"company/login",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                ownerEmail: login,
                ownerPassword: password,
            })
        });
    return response
}
