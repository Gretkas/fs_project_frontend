import axios from 'axios';
import {API_URL} from "../../utils/api"

axios.defaults.withCredentials = true;

const postUser = (data) => {
    return new Promise((resolve, reject) => {
        return axios.post(`${API_URL}users`, data)
            .then(res => {
                return resolve(res)
            })
            .catch(err => {
                console.log({...err})
                return reject({...err})
            });
    })
}


export const userService = {
    postUser,
};