import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

import Reminder from "../reminder/Reminder";

const ReminderModal = (props) => {
    const [showModal, setShow] = useState(props.showModal);
    const [reminderData, setReminderData] = useState({ reminder: "", dueDate: new Date() });

    useEffect(() => {
        setShow(props.showModal)
    }, [props.showModal]);

    useEffect(() => {
        setReminderData(reminderData)
    }, [reminderData]);

    const handleClose = () => {
        props.toggleModalState();
        setShow(false);
    }

    return (
        <Modal
            show={showModal}
            onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Add a reminder</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Reminder data={reminderData} setReminderData={setReminderData}></Reminder>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleClose}>Save changes</Button>
            </Modal.Footer>
        </Modal>

    )

}

export default ReminderModal;