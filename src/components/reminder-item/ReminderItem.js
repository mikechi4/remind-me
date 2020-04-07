import React, { useState } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { Trash, PencilSquare, ThreeDotsVertical } from 'react-bootstrap-icons';
import Axios from 'axios';
import DatePicker from 'react-datepicker';
import './ReminderItem.scss';
const ReminderItem = (props) => {
    const [isEdit, setIsEdit] = useState(false);
    const [reminderData, setReminderData] = useState(props);

    const deleteReminder = (reminderId) => {
        Axios.delete(`/api/reminders/${reminderId}`).then((res) => {
            props.removeDeletedReminder(reminderId);
        })
    }

    const handleDateChange = (date) => {
        setReminderData({
            ...reminderData, dueDate: date
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        // need to keep track of state within componenet
        setReminderData({
            ...reminderData, [`${name}`]: value
        })
    }

    const updateReminder = (reminderDataObj) => {
        const { reminder, dueDate, id: _id } = reminderDataObj;
        Axios.put("/api/edit", {
            reminder, dueDate, _id
        }).then((res) => {
            setIsEdit(!isEdit)
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <ListGroup.Item >
            <div className="reminder-item-container">
                <div className="reminder-item">
                    <input
                        className="reminder-item-name"
                        type="text"
                        disabled={!isEdit}
                        value={reminderData.reminder}
                        name="reminder"
                        onChange={handleChange}
                    />
                    <div className="reminder-item-date">
                        <DatePicker
                            selected={new Date(reminderData.dueDate)}
                            name="dueDate"
                            onChange={handleDateChange}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={5}
                            timeCaption="time"
                            dateFormat="MMMM d, yyyy h:mm aa"
                            className="form-control"
                            disabled={!isEdit}
                        />
                    </div>
                </div>
                <div className="action-buttons">
                    <Button variant="danger" onClick={() => deleteReminder(reminderData.id)}><Trash /></Button>
                    <ThreeDotsVertical />
                    <Button variant="primary" onClick={() => setIsEdit(!isEdit)}><PencilSquare /></Button>
                </div>
            </div>

            {isEdit ? (<div className="save-button">
                <Button variant="success" onClick={() => updateReminder(reminderData)}>Save</Button>
            </div>) : ""}
        </ListGroup.Item>
    )

}

export default ReminderItem;
