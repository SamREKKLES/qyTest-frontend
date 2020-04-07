import axios from '../axios'

/*
 * Users信息相关模块
 */

export const usernameCheck = data => {
    return axios({
        url: 'usernameCheck',
        method: 'post',
        data
    })
}

export const searchUsers = data => {
    return axios({
        url: 'searchUsers',
        method: 'post',
        data
    })
}

export const addUser = data => {
    return axios({
        url: 'addUser',
        method: 'post',
        data
    })
}
