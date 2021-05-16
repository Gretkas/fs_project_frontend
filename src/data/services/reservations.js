import axios from 'axios';
import {API_URL} from "../../utils/api"

axios.defaults.withCredentials = true;

const getReservations = async () => {
    let res;
    try{
        res = await axios.get(`${API_URL}reservations`)
    }catch(e){
        return e;
    }
    return res;
};

const getReservationHistory = async () => {
    let res;
    try{
        res = await axios.get(`${API_URL}reservations/history`)
    }catch(e){
        return e;
    }
    return res;
};

const cancelReservation = async (reservationId) => {
    try{
        await axios.delete(`${API_URL}reservations/${reservationId}`).then((response)=>{
            return response;
        })
    }catch(error){
        return error;
    }
}

const postReservation = (data) => {
    return new Promise((resolve, reject) => {
        console.log("POSTING NEW RESERV")
        console.log(data)
        return axios.post(`${API_URL}reservations/`, data)
            .then(res => {
                console.log(res)
                return resolve(res)
            })
            .catch(err => {
                console.log( {...err})
                return reject({...err})
            });
    })
}




export const reservationService = {
  getReservations,
  getReservationHistory,
  cancelReservation,
  postReservation,
};
