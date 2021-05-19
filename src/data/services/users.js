import axios from 'axios';
import {API_URL} from "../../utils/api";

axios.defaults.withCredentials = true;

const getUsers = async () => {
    let res;
    try{
        res = await axios.get( `${API_URL}users`)
    }
    catch(e){
        return e;
    }
    return res;
}

const deleteUser = async (userId) => {
    try{
        await axios.delete( `${API_URL}users/${userId}`).then(
            response => {
                return response;
            }
        );
    }
    catch(e){
        return e;
    }
}

export const userService = {
    getUsers,
    deleteUser
};