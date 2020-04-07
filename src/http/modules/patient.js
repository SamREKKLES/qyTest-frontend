import axios from '../axios'

/*
 * Patients信息相关模块
 */

export const getPatients = () => {
    return axios({
        url: 'getPatients',
        method: 'get'
    })
}

export const delPatient = data => {
    return axios({
        url: 'delPatient',
        method: 'post',
        data
    })
}

export const addPatient = data => {
    return axios({
        url: 'addPatient',
        method: 'post',
        data
    })
}

export const searchPatient = data => {
    return axios({
        url: 'searchPatient',
        method: 'post',
        data
    })
}

export const searchIdPatient = data => {
    return axios({
        url: 'searchIdPatient',
        method: 'post',
        data
    })
}

export const changePatient = data => {
    return axios({
        url: 'changePatient',
        method: 'post',
        data
    })
}
