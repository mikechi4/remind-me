import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { Trash, PencilSquare, ThreeDotsVertical } from 'react-bootstrap-icons';

import './ReminderItem.scss';
const ReminderItem = (props) => {

    return (
        <ListGroup.Item className="reminder-item-container">
            <div className="reminder-item">
                <div className="reminder-item-name">{props.reminder}</div>
                <div className="reminder-item-date">{props.dueDate}</div>
            </div>
            <div className="action-buttons">
                <Button variant="danger"><Trash /></Button>
                <ThreeDotsVertical />
                <Button variant="primary"><PencilSquare /></Button>
            </div>
        </ListGroup.Item>
    )

}

export default ReminderItem;