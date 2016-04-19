/**
 * Created by pierre on 19/04/16.
 */

// Imports
import axios from 'axios';
import * as users from '../constants/Users'

// Private variables
const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';

export var actions = {
    fetchUsers : _fetchUsers,
    fetchUsersSuccess : _fetchUsersSuccess,
    fetchPostsFailure : _fetchPostsFailure
};


export function _fetchUsers () {
    const request = axios({
        method: 'get',
        url: `${ROOT_URL}/users`,
        headers: []
    });

    return {
        type: users.constants.FETCH_USERS,
        payload: request
    };
}

export function _fetchUsersSuccess (users) {
    return {
       type:users.constants.FETCH_USERS_SUCCESS,
        payload:users
    };
}

export function _fetchPostsFailure (error) {
    return {
        type :users.constants.FETCH_USERS_FAILURE,
        payload:error
    }
}