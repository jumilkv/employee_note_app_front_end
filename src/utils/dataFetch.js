/* eslint-disable no-throw-literal */
import Cookie from "js-cookie";

function fetchObj(method, body, contentType) {
    let obj = {
        method: method,
        headers: {
            'authorization': 'Bearer ' + Cookie.get('token'),
            'Content-Type': contentType || 'application/json',
        }
    }
    if (body && method.toLowerCase() !== 'get')
        obj.body = body
    return obj
}

export default async function dataFetch(url, method, body, contentType, file) {
    try {
        let res = await fetch(url, fetchObj(method, body, contentType, file)).then(res => res.json())
        return res
    }
    catch (error) {
        throw window.navigator.onLine ?
            {
                variant: 'error',
                message: error.message
            }
            :
            {
                variant: 'error',
                message: 'You are offline!'
            }
    }
}

