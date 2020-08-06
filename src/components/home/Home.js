import React from 'react';
import Axios from 'axios';
import { ListGroup } from 'react-bootstrap';
import './Home.scss';

import ReminderModal from '../reminder-modal/ReminderModal';
import ReminderItem from '../reminder-item/ReminderItem';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { getReminders, deleteReminders, addReminder } from '../../actions';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            savedNewReminder: false
        }
    }

    renderReminderList = (savedReminders) => {
        return savedReminders.map(item => {
            return (
                <ReminderItem
                    reminder={item.reminder}
                    dueDate={item.dueDate}
                    key={item._id}
                    id={item._id}
                    removeDeletedReminder={this.props.deleteReminders}
                />
            );
        });
    }

    componentDidMount = () => {
        this.props.getReminders();
        console.log(this.props)
    }

    toggleModalState = (didSaveToDb = false) => {
        this.setState({
            showModal: !this.state.showModal
        })
        // this flag is to see if the user did a save. That way, we can make an API call to re-render most up to date list
        if (didSaveToDb) {
            this.props.getReminders();
        }
    }

    logout = async () => {
        const response = await Axios.post("/api/logout");
        this.props.history.push('/login');
        window.localStorage.removeItem('isAuthenticated', false)
    }

    render() {
        const isAuthenticated = window.localStorage.getItem('isAuthenticated');
        console.log(this.props.reminderList)
        if (!isAuthenticated) {
            return <Redirect to="/login" />
        }
        return (
            <div className="home-container">
                <ReminderModal showModal={this.state.showModal} toggleModalState={this.toggleModalState} addReminder={this.props.addReminder} />
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
                        {this.props.reminderList.length <= 0 ? "Add reminders" : this.renderReminderList(this.props.reminderList)}
                    </ListGroup>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { reminderList: state.reminderList }
}

export default connect(mapStateToProps, { getReminders, deleteReminders, addReminder })(Home);