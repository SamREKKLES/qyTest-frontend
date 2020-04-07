<template>

    <div class="pos">
        <br>

         <Row>
            <div>
                <Col span="12">
                    <Button type="success" size = "middle" @click="goPage('PatientRecord')">返回患者记录</Button>
                </Col>
            </div>
        </Row>
        <br>
            <Table :data="curData" :columns="tableColumns"></Table>
        <br>


        <Row>
            <div class="title2">
                <Col span="12">请于此处上传患者CTP影像</Col>

            </div>
        </Row>
        <Row>
            <DatePicker
                    type="datetime"
                    :options="dateoptions"
                    format="yyyy-MM-dd"
                    placeholder="选择拍摄日期和时间"
                    @on-change="getTime">
                </DatePicker>
        </Row>
        <br>
        <br>

        </Form>
        <Row>
            <Col span="5">
                <Upload
                    type="drag"
                    ref="upload"
                    action="http://localhost:5000/api/ctUpload"
                    :headers="headers"
                    :file-list="fileList"
                    :on-success="handleSuccess"
                    :on-error="handleError"
                    :before-upload="checkCBF"
                    :data="formData"
                    :auto-upload="false"
                    :with-credentials="true"
                    >
                    <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>拖拽或点击上传CBF影像</p>
                    </div>
                </Upload>
            </Col>

            <Col span="1">
                <br>
            </Col>


            <Col span="5">
                <Upload
                    type="drag"
                    ref="upload"
                    action="http://localhost:5000/api/ctUpload"
                    :headers="headers"
                    :file-list="fileList"
                    :on-success="handleSuccess"
                    :on-error="handleError"
                    :before-upload="checkCBV"
                    :data="formData"
                    :auto-upload="false"
                    :with-credentials="true"
                    >
                    <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>拖拽或点击上传CBV影像</p>
                    </div>
                </Upload>
            </Col>

            <Col span="1">
                <br>
            </Col>


            <Col span="5">
                <Upload
                    type="drag"
                    ref="upload"
                    action="http://localhost:5000/api/ctUpload"
                    :headers="headers"
                    :file-list="fileList"
                    :on-success="handleSuccess"
                    :on-error="handleError"
                    :before-upload="checkMTT"
                    :data="formData"
                    :auto-upload="false"
                    :with-credentials="true"
                    >
                    <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>拖拽或点击上传MTT影像</p>
                    </div>
                </Upload>
            </Col>

        </Row>

        <br>

        <Row>

            <Col span="5">
                <Upload
                    type="drag"
                    ref="upload"
                    action="http://localhost:5000/api/ctUpload"
                    :headers="headers"
                    :file-list="fileList"
                    :on-success="handleSuccess"
                    :on-error="handleError"
                    :before-upload="checkTMAX"
                    :data="formData"
                    :auto-upload="false"
                    :with-credentials="true"
                    >
                    <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>拖拽或点击上传Tmax影像</p>
                    </div>
                </Upload>
            </Col>

            <Col span="1">
                <br>
            </Col>

            <Col span="5">
                <Upload
                    type="drag"
                    ref="upload"
                    action="http://localhost:5000/api/ctUpload"
                    :headers="headers"
                    :file-list="fileList"
                    :on-success="handleSuccess"
                    :on-error="handleError"
                    :before-upload="checkCT"
                    :data="formData"
                    :auto-upload="false"
                    :with-credentials="true"
                    >
                    <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>拖拽或点击上传CT影像</p>
                    </div>
                </Upload>
            </Col>

        </Row>





    </div>

</template>
<script>
    import Cookies from 'js-cookie';
    export default {
        name: 'ctUpload',
        data () {
            return {
                id: this.$route.query.info,
                dateoptions: {
                    disabledDate (date) {
                        return date && date.valueOf() > Date.now();
                    }
                },
                datetime: '',
                formData: {
                    img_type: '',
                    patient_id: '',
                    datetime: ''
                },
                headers: {
                    token: Cookies.get('token')
                },
                fileList: [],
                curData: [],
                tableColumns: [
                    {
                        title: 'id',
                        key: 'id',
                        align: 'center',
                        width: 80
                    },
                    {
                        title: '姓名',
                        key: 'username',
                        align: 'center',
                        width: 100
                    },
                    {
                        title: '性别',
                        key: 'gender',
                        align: 'center',
                        width: 80,
                        render: (h, params) => {
                            return h('div', params.row.gender === 0 ? '男' : '女',[
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        width: '100%',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    },
                                    domProps: {
                                        title: params.row.area
                                    }
                                }, params.row.area)
                            ])
                        }
                    },
                    {
                        title: '年龄',
                        key: 'age',
                        align: 'center',
                        width: 80
                    },
                    {
                        title: '日期',
                        key: 'date',
                        align: 'center',
                        width: 120
                    },
                    {
                        title: '病情描述',
                        key: 'description',
                        align: 'center',

                    },
                    {
                        title: '既往病史',
                        key: 'illnesshistory',
                        align: 'center',

                    },
                    {
                        title: '检查结果',
                        key: 'checkResult',
                        align: 'center',

                    }
                ]
            }
        },
        methods: {
            checkCBF(file){
                let that = this;
                that.formData.img_type = 'cbf'
                that.formData.patient_id =  this.id;
                that.formData.datetime =  this.datetime;
                if(that.datetime === ''){
                    this.$Message.info("请先选择拍摄日期！");
                    return false;
                }
                return true;
            },
            checkCBV(file){
                let that = this;
                that.formData.img_type = 'cbv'
                that.formData.patient_id =  this.id;
                that.formData.datetime =  this.datetime;
                if(that.datetime === ''){
                    this.$Message.info("请先选择拍摄日期！");
                    return false;
                }
                return true;
            },
            checkMTT(file){
                let that = this;
                that.formData.img_type = 'mtt'
                that.formData.patient_id =  this.id;
                that.formData.datetime =  this.datetime;
                if(that.datetime === ''){
                    this.$Message.info("请先选择拍摄日期！");
                    return false;
                }
                return true;
            },
            checkTMAX(file){
                let that = this;
                that.formData.img_type = 'tmax'
                that.formData.patient_id =  this.id;
                that.formData.datetime =  this.datetime;
                if(that.datetime === ''){
                    this.$Message.info("请先选择拍摄日期！");
                    return false;
                }
                return true;
            },
            checkCT(file){
                let that = this;
                that.formData.img_type = 'ct'
                that.formData.patient_id =  this.id;
                that.formData.datetime =  this.datetime;
                if(that.datetime === ''){
                    this.$Message.info("请先选择拍摄日期！");
                    return false;
                }
                return true;
            },
            getTime(dateTime){
                this.datetime = dateTime;
                console.log(this.datetime);
            },
            submitUpload () {
                this.$refs.upload.submit();
            },
            handlePreview(file) {
                console.log(file);
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handleSuccess(response) {
                if (response.status === 'suucess') {
                    window.alert("上传成功")
                }
            },
            handleError(response) {
                if (response.status === 'fail') {
                    window.alert(response.data)
                } else if (response.status === 'reload') {
                    this.$message({
                        message: "请重新登录",
                        center: 'true',
                        type: 'info',
                    });
                    this.logout();
                    }
            },
            fetchData () {
                this.$api.patient.searchIdPatient({
                    id: this.id
                }).then((response) => {
                    if (response.status === 'success') {
                        let _data = response.data.patient;
                        this.curData = _data;
                        
                    } else if (response.status === 'fail') {
                        window.alert(response.data)
                    } else if (response.status === 'reload') {
                        this.$message({
                            message: "请重新登录",
                            center: 'true',
                            type: 'info',
                        });
                        this.logout();
                    }
                    }).catch((error) => {
                        console.log(error);
                    });
            },
            goPage (pageName) {
                this.$router.push('/' + pageName)
            }
        },
        mounted () {
            this.id = this.$route.query.info;
            this.fetchData();
        }
    }
</script>

<style lang="scss" scoped>
    .pos {
        position:relative;
        left:100px;
        width:90%;
        overflow: hidden;
    }
    .title {
        width: 200%;
        line-height:50px;
        text-align:left;
        color: #464c5b;
        font-size: 30px

    }
    .title2 {
        width: 200%;
        line-height:50px;
        text-align:left;
        color: #464c5b;
        font-size: 20px

    }
    .content {
        margin: 20px 0px 0 100px;
        left:10px;
    }
</style>
