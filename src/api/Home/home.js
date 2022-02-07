import request from '../request'

export function getHomeSwiper() {
    return request({
        url: '/home/swiper',
        method: 'get'
    })
}

export function getRentGroups(params) {
    return request({
        url: '/home/groups',
        method: 'get',
        params
    })
}
 
export function getRecentNews(params) {
    return request({
        url: '/home/news',
        params
    })
}