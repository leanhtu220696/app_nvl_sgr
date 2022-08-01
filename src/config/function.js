import axios from "axios"
import { sha256 } from 'react-native-sha256';
export const codeSha = (user, pass) => {
    const key = `{"username":"${user}","password":"${pass}"}3xBGYEpCIlaksjddkjfklDKFJD()F#psdfjh358^%(`;
    sha256(key).then(hash => {
        setKey(hash)
    })
}
let Token = ""
let Key = ""
import { urlLogin, urlSearch, urlFilter, urlProduct, urlContact, urlRegister } from "./url"
const config = {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
};
export const setToken = (token) => {
    Token = token
}
export const setKey = (key) => {
    Key = key
}
export const Call_Login = (user, pass) => {
    return axios.post(urlLogin, JSON.stringify({
        "username": `${user}`,
        "password": `${pass}`
    }), config)
}
export const Call_Register = (phonenumber,email,fullname,password) => {
    return axios.post(urlRegister, JSON.stringify({
        "phonenumber": `${phonenumber}`,
        "email": `${email}`,
        "fullname": `${fullname}`,
        "password": `${password}`
    }), config)
}
export const Call_Search = (data) => {
    return axios.post(urlSearch, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${Token}`,
            'Key': `${Key}`
        }
    })
}
export const Call_Filter = (data) => {
    var config = {
        method: 'post',
        url: urlFilter,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };
    return axios(config)
}
export const Call_Detail = (data) => {
    var config = {
        method: 'post',
        url: urlProduct,
        headers: {
            'Authorization': `${Token}`,
            'Key': `${Key}`,
            'Content-Type': 'application/json'
        },
        data: data
    };
    return axios(config)
}
export const Call_Contact = (data) => {
    var config = {
        method: 'post',
        url: urlContact,
        headers: {
            'Authorization': `${Token}`,
            'Key': `${Key}`,
            'Content-Type': 'application/json'
        },
        data: data
    };
    return axios(config)
}