import axios from 'axios'
export const isEmpty = (val) => {
    return val == '' || val == null || val == undefined || val == [] || val == {}
}

export const setLocalStorage = (key, val) => {
    if (this.isEmpty(val)) {
        localStorage.removeItem(key);
    } else {
        localStorage.setItem(key, JSON.stringify(val))
    }
}

export const getLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
}

export const downImg = async () => {
    let res = await axios.get('https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1')
    console.log(res)
}

export const isPhoneNumber = (phones) => {
    var regex = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    if (!regex.test(phones)) {
        return false;
    } else {
        return true;
    }
}