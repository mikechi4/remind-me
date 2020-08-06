import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Reminder from "../reminder/Reminder";

const defaultState = { reminder: "", dueDate: new Date() };
const ReminderModal = (props) => {
    const [showModal, setShow] = useState(props.showModal);
    const [reminderData, setReminderData] = useState(defaultState);

    useEffect(() => {
        setShow(props.showModal)
    }, [props.showModal]);

    useEffect(() => {
        setReminderData(reminderData);
    }, [reminderData]);

    const handleClose = () => {
        props.toggleModalState();
        setReminderData(defaultState)
        setShow(false);
    }

    const saveReminder = () => {
        props.addReminder(reminderData);
        props.toggleModalState(true);
        setReminderData(defaultState);
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
                <Button variant="primary" disabled={reminderData.reminder === "" || !reminderData.dueDate} onClick={saveReminder}>Save changes</Button>
            </Modal.Footer>
        </Modal>

    )

}

export default ReminderModal;