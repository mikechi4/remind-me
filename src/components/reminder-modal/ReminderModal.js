import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ReminderModal = (props) => {
    const [showModal, setShow] = useState(props.showModal);

    useEffect(() => {
        setShow(props.showModal)
    }, [props.showModal]);

    const handleClose = () => {
        props.toggleModal();
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
                <p>Modal body text goes here.</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleClose}>Save changes</Button>
            </Modal.Footer>
        </Modal>

    )

}

export default ReminderModal;