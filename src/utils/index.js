import cookie from 'js-cookie';
export const getCurrentCity = () => {
    let localCity = cookie.get('hkzf_city')
    if(!localCity) {
        cookie.set('hkzf_city', '上海');
        localCity = cookie.get('hkzf_city');
    }
    return localCity;
}
export const setCurrentCity = (city) => {
    cookie.set('hkzf_city', city);
}