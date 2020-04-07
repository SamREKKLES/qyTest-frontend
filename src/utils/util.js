export default {
    userType: 1,
    setUserType(_type) {
        console.log('updat type: ' + _type)
        this.userType = _type
        console.log('new type: ' + this.userType)
    }
}

