/**
 * Created by plarboul on 22/03/2016.
 */

import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/Header'

class App extends Component {


    render() {
        const {projects, actions} = this.props
        return (
            < div >
            Coucou
        App
        < / div >
    )
    }
}

App.propTypes = {
    users: PropTypes.array.isRequired
};



