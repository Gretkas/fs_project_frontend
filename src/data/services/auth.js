//fra sys2 prosjekt
import axios from 'axios';
import {API_URL} from "../../utils/api"

axios.defaults.withCredentials = true;

const login = async (userdata) => {
  let response;

  await axios({
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    
    url: `${API_URL}login`,
    params: {
      username: userdata.email,
      password: userdata.password,
    },
    
  }).then((res) => {
    response = res;
    console.log(res);
  })
    .catch(function (error) {
      console.error(error);
      return error;
    });

  return response;
};

async function logout() {
  try{
    await axios.post( `${API_URL}logout`)
  }
  catch(e){
    console.log(e)
  }
}

async function authUser() {
  try {
    let res;
    res = await axios({
      url: API_URL + 'auth',
      method: 'GET'
    });
    console.log("AUTH USER:")
    console.log(res)
    return res;
  }
  catch (err) {
    return err;
  }
}



export const authenticationService = {
  login,
  logout,
  authUser,
};
