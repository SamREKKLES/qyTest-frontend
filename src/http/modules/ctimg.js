import axios from '../axios'

/*
 * CT图像相关模块
 */

export const ctUpload = data => {
    return axios({
        url: 'ctUpload',
        method: 'post',
        data
    })
}

export const imgList = data => {
    return axios({
        url: 'imgList',
        method: 'post',
        data
    })
}

export const delImage = data => {
    return axios({
        url: 'delImage',
        method: 'post',
        data
    })
}
