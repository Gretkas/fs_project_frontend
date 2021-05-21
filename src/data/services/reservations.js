import axios from "axios";
import { API_URL } from "../../utils/api";

axios.defaults.withCredentials = true;

const getReservations = async () => {
  let res;
  try {
    res = await axios.get(`${API_URL}reservations`);
  } catch (e) {
    return e;
  }
  return res;
};

const postReservation = async (data) => {
  let res;

  try {
    res = await axios({
      method: "POST",
      url: `${API_URL}reservations`,

      data: {
        startTime: data.startTime,
        endTime: data.endTime,
        items: data.items,
        type: data.type,
        title: data.title,
      },
    });
  } catch (err) {
    return err;
  }
  return res;
};

const getAvailableTimeTable = async (items) => {
  let res;

  try {
    res = await axios({
      method: "POST",
      url: `${API_URL}reservations/available`,

      data: {
        items: items,
      },
    });
  } catch (e) {
    console.log(e);
    return e;
  }
  return res;
};

const getReservationHistory = async () => {
  let res;
  try {
    res = await axios.get(`${API_URL}reservations/history`);
  } catch (e) {
    return e;
  }
  return res;
};

const cancelReservation = async (reservationId) => {
  try {
    await axios
      .delete(`${API_URL}reservations/${reservationId}`)
      .then((response) => {
        return response;
      });
  } catch (error) {
    return error;
  }
};

const postMaintenanceReservation = (data) => {
  return new Promise((resolve, reject) => {
    return axios
      .post(`${API_URL}reservations`, data)
      .then((res) => {
        return resolve(res);
      })
      .catch((err) => {
        return reject({ ...err });
      });
  });
};

const getFilteredReservations = async (data) => {
  let res;

  try {
    res = await axios({
      method: "POST",
      url: `${API_URL}reservations/filter`,
      data: {
        reservationSearchCriteria: data.reservationSearchCriteria,
        reservationPage: data.reservationPage,
      },
    });
  } catch (err) {}
  return res;
};

export const reservationService = {
  getReservations,
  getReservationHistory,
  cancelReservation,
  postReservation,
  getAvailableTimeTable,
  postMaintenanceReservation,
  getFilteredReservations,
};
