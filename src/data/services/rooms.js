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

const getFilteredRooms = async (data) =>{
    let res;
    
    try{
        res = await axios({
            method: 'POST',
            url: `${API_URL}rooms/filter`,
            
             data:{                 
                roomSearchCriteria: data.roomSearchCriteria,                 
                roomPage: data.roomPage        
             },
            })

    }catch(err){

    }
    return res;
}


const getRooms = async () => {
    try{
        return (await axios.get( `${API_URL}rooms`));
    }catch(e){
        return e;
    }
}

export const roomService = {
  getSingleRoom,
  getFilteredRooms,
  getRooms
};
