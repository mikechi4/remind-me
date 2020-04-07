import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

import "./Reminder.scss";

const Reminder = (props) => {
    const [reminderData, setReminderData] = useState(props.data);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // need to keep track of state within componenet
        setReminderData({
            ...reminderData, [`${name}`]: value
        })
        // must also send state back up to parent modal
        props.setReminderData({ ...reminderData, [`${name}`]: value })
    }

    // need to handle date chnge separately
    const handleDateChange = (date) => {
        setReminderData({
            ...reminderData, dueDate: date
        })
        props.setReminderData({ ...reminderData, dueDate: date })
    }
    return (
        <div className="reminder-container">
            <Form>
                <Form.Group className="form-group">
                    <Form.Label htmlFor="reminder">Enter a reminder</Form.Label>
                    <Form.Control
                        className="form-control"
                        type="text"
                        name="reminder"
                        value={reminderData.reminder}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="form-group date-picker">
                    <Form.Label>Choose a due date</Form.Label>
                    <DatePicker
                        selected={reminderData.dueDate}
                        name="dueDate"
                        onChange={handleDateChange}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={5}
                        timeCaption="time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                        className="form-control"
                    />
                </Form.Group>
            </Form>

        </div>
    )
}

export default Reminder;