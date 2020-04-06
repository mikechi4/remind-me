import React, { useState } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { Trash, PencilSquare, ThreeDotsVertical } from 'react-bootstrap-icons';
import DatePicker from 'react-datepicker';
import './ReminderItem.scss';
const ReminderItem = (props) => {
    const [isEdit, setIsEdit] = useState(false);
    const [reminderData, setReminderData] = useState(props);

    const deleteReminder = (reminderId) => {
        console.log('delete');
        console.log(reminderId)
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

    const updateReminder = () => {
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
                            timeIntervals={15}
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
                <Button variant="success">Save</Button>
            </div>) : ""}
        </ListGroup.Item>
    )

}

export default ReminderItem;
