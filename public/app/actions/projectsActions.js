/**
 * Created by plarboul on 22/03/2016.
 */


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



