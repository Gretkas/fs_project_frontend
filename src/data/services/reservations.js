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




export const reservationService = {
  getReservations,
  getReservationHistory
};
