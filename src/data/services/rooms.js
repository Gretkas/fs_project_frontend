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

const deleteRoom = async (roomId) => {
    try{
        await axios.delete( `${API_URL}rooms/${roomId}`).then(
            response => {
                return response;
            }
        );
    }
    catch(e){
        return e;
    }
}

const putRoom = (roomId, data) => {
    return new Promise((resolve, reject) => {
        return axios.put(`${API_URL}rooms/${roomId}`, data)
            .then(res => {
                return resolve(res)
            })
            .catch(err => {
                console.log({...err})
                return reject({...err})
            });
    })
}

const getRoom = (roomId) => {
    return new Promise((resolve, reject) => {
        return axios.get(`${API_URL}rooms/${roomId}`)
            .then(res => {
                console.log(res)
                return resolve(res)
            })
            .catch(err => {
                console.log({...err})
                return reject({...err})
            });
    })
}

export const roomService = {
  getSingleRoom,
  getFilteredRooms,
  getRooms, 
  deleteRoom,
    putRoom,
    getRoom,
};
