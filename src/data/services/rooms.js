import axios from 'axios';
import {API_URL} from "../../utils/api"

axios.defaults.withCredentials = true;

const getSingleRoom = async (id) => {
    let res;
    try{
        res = await axios.get( `${API_URL}rooms/${id}`)
    }
    catch(e){
        return e;
    }
    return res;
};

async function getRooms() {
    let res;
    try{
        res = await axios.get( `${API_URL}rooms`)
    }
    catch(e){
        return e;
    }
    return res;
}





export const roomService = {
  getSingleRoom,
  getRooms
};
