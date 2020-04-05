import React from 'react';
import "./ReminderItem.scss";
import { ListGroup } from 'react-bootstrap';
// import { ArrowRight } from 'react-bootstrap-icons';
const ReminderItem = (props) => {

    return (
        <ListGroup.Item className="reminder-item-container">
            <div className="reminder-item-name">{props.reminder}</div>
            <div className="reminder-item-date">{props.dueDate}</div>
        </ListGroup.Item>
    )

}

export default ReminderItem;