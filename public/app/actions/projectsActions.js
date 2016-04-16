/**
 * Created by plarboul on 22/03/2016.
 */

import * as types from '../constants/ActionTypes'

export function addProject(name, beginDate, endDate, creator, collaborators) {
    return {
        type: types.ADD_PROJECT,
        name,
        beginDate,
        endDate,
        creator,
        collaborators
    }
}



