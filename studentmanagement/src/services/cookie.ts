export const setCookie=(async(name: string, value: any, expireDays: number, path: string = '') =>{
    const d: Date = new Date();
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    const expires = `expires=${d.toUTCString()}`;
    const cpath = path ? `; path=${path}` : '';
    document.cookie = `${name}=${value}; ${expires}${cpath};`;
});

export const getCookie=(async(name: string)=> {
    const cookies = document.cookie.split('; ')
    for (let i = 0; i < cookies.length; i++) {
    const [key, value] = await cookies[i].split('=');
        if (key === name) {
            return await decodeURIComponent(value);
        }
    }
    return "";
})

export const deleteCookie=(name: string)=> {
    setCookie(name, '', -1);
}
export const deleteAllCookies=async()=>{
    var Cookies = document.cookie.split(';');
    for (var i = 0; i < Cookies.length; i++)
    document.cookie = Cookies[i] + "=;expires=" + new Date(0).toUTCString();
 }