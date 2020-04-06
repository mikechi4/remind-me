import React from 'react';
import Axios from 'axios';
import { ListGroup } from 'react-bootstrap';
import './Home.scss';

import ReminderModal from '../reminder-modal/ReminderModal';
import ReminderItem from '../reminder-item/ReminderItem';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            reminderList: [],
            savedNewReminder: false
        }
    }

    getReminders = () => {
        Axios.get("/api/reminders").then((response) => {
            const data = response.data;
            this.setState({ reminderList: data });
        })
    }

    renderReminderList = (savedReminders) => {
        return savedReminders.map(item => {
            return (
                <ReminderItem
                    reminder={item.reminder}
                    dueDate={item.dueDate}
                    key={item._id}
                    id={item._id}
                />
            );
        });
    }

    componentDidMount = () => {
        this.getReminders();
    }

    toggleModalState = (didSaveToDb) => {
        this.setState({
            showModal: !this.state.showModal
        })
        // this flag is to see if the user did a save. That way, we can make an API call to re-render most up to date list
        if (didSaveToDb) {
            this.getReminders()
        }
    }

    render() {
        return (
            <div className="home-container">
                <ReminderModal showModal={this.state.showModal} toggleModalState={this.toggleModalState} />
                <div className="text-center">
                    <h1>Welcome</h1>
                </div>
                <div className="list-header">
                    <h2>Reminder(s)</h2>
                    <button className="btn btn-primary" onClick={this.toggleModalState}>Create Reminder</button>
                </div>
                <div className="reminder-list">
                    <ListGroup>
                        {this.state.reminderList.length <= 0 ? "Add reminders" : this.renderReminderList(this.state.reminderList)}
                    </ListGroup>
                </div>
            </div>
        )
    }
}

export default Home;