import React from 'react';
import Axios from 'axios';
import { ListGroup } from 'react-bootstrap';
import './Home.scss';

import ReminderModal from '../reminder-modal/ReminderModal';
import ReminderItem from '../reminder-item/ReminderItem';
import { Redirect } from 'react-router-dom';


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

    findIndexById = (list, id) => {
        return list.findIndex((reminder) => {
            console.log(reminder)
            return reminder._id === id
        });
    }
    removeDeletedReminder = (deletedReminderId) => {
        const updatedReminderList = this.state.reminderList.slice();
        let index = this.findIndexById(updatedReminderList, deletedReminderId);
        updatedReminderList.splice(index, 1);
        this.setState({ reminderList: updatedReminderList })
    }

    renderReminderList = (savedReminders) => {
        return savedReminders.map(item => {
            return (
                <ReminderItem
                    reminder={item.reminder}
                    dueDate={item.dueDate}
                    key={item._id}
                    id={item._id}
                    removeDeletedReminder={this.removeDeletedReminder}
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
            this.getReminders();
        }
    }

    logout = async () => {
        const response = await Axios.post("/api/logout");
        this.props.history.push('/login');
        window.localStorage.removeItem('isAuthenticated', false)
    }

    render() {
        const isAuthenticated = window.localStorage.getItem('isAuthenticated');

        if (!isAuthenticated) {
            return <Redirect to="/login" />
        }
        return (
            <div className="home-container">
                <ReminderModal showModal={this.state.showModal} toggleModalState={this.toggleModalState} />
                <div className="text-center">
                    <h1>Welcome</h1>
                </div>
                <div className="list-header">
                    <h2>Reminder(s)</h2>
                    <button className="btn btn-primary" onClick={this.toggleModalState}>Create Reminder</button>
                    <button className="btn btn-danger" onClick={this.logout}>Logout</button>
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