import { combineReducers } from 'redux';
import remindersReducer from './remindersReducer';

export default combineReducers({
    reminderList: remindersReducer
})
