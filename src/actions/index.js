// Action Creator

import Axios from 'axios';

export const getReminders = () => async dispatch => {
    const response = await Axios.get("/api/reminders");

    dispatch({
        type: "GET_REMINDERS",
        payload: response.data
    })
}

export const deleteReminders = (reminderId) => async dispatch => {
    await Axios.delete(`/api/reminders/${reminderId}`);
    dispatch({
        type: "DELETE_REMINDER",
        payload: reminderId
    })
}
