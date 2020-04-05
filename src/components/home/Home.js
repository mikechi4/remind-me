import React from 'react';
import Axios from 'axios';

import './Home.scss';

import ReminderModal from '../reminder-modal/ReminderModal';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }
    }

    toggleModalState = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    render() {
        return (
            <div className="home-container">
                <ReminderModal showModal={this.state.showModal} toggleModal={this.toggleModalState} />
                <div className="text-center">
                    <h1>Welcome</h1>
                </div>
                <div className="list-header">
                    <h2>Reminder(s)</h2>
                    <button className="btn btn-primary" onClick={this.toggleModalState}>Create Reminder</button>
                </div>
            </div>
        )
    }
}

export default Home;