const findIndexById = (list, id) => {
    return list.findIndex((reminder) => {
        return reminder._id === id
    });
}
const removeDeletedReminder = (prevState, deletedReminderId) => {
    const updatedReminderList = prevState.slice();
    let index = findIndexById(updatedReminderList, deletedReminderId);
    return updatedReminderList.splice(index, 1);
}

export default (state = [], action) => {
    switch (action.type) {
        case "GET_REMINDERS":
            return action.payload;
        case "DELETE_REMINDER":
            return removeDeletedReminder(state, action.payload);
        default:
            return state
    }
};