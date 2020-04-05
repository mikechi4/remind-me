import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

import "./Reminder.scss";

const Reminder = (props) => {
    const [reminderData, setReminderData] = useState(props.data);
    console.log(reminderData)
    return (
        <div className="reminder-container">
            <Form onSubmit={props.setReminderData}>
                <Form.Group className="form-group">
                    <Form.Label htmlFor="reminder">Enter your username</Form.Label>
                    <Form.Control
                        className="form-control"
                        type="text"
                        name="reminder"
                        value={reminderData.reminder}
                        onChange={e => setReminderData({ ...reminderData, reminder: e.target.value })}
                    />
                </Form.Group>
                <Form.Group className="form-group date-picker">
                    <Form.Label>Choose a due date</Form.Label>
                    <DatePicker
                        selected={reminderData.dueDate}
                        onChange={date => setReminderData({ ...reminderData, dueDate: date })}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
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