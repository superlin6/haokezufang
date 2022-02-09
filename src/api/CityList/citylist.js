import request from "../request";

export function getCityList(params) {
    return request({
        url: '/area/city',
        params
    })
}

export function getHotCity() {
    return request({
        url: '/area/hot'
    })
}