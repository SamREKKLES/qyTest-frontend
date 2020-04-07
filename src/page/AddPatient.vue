<template>
    <div class="content">

    <Form :model="formData" :rules="rules" ref="formData" :label-width='120' inline>
        <Row>
            <div class="title">
                <Col span="12">新建患者，请根据信息提示填写</Col>
            </div>
        </Row>

        <br>
        <br>
        <br>

        <Row>
            <Col span="4">
                <FormItem label="姓名：" prop="username">
                    <Input v-model="formData.username"></Input>
                </FormItem>
            </Col>
            <Col span="4">
                <Form-item label="性别：" prop="gender">
                    <Radio-group v-model="formData.gender">
                        <Radio label="0">男</Radio>
                        <Radio label="1">女</Radio>
                    </Radio-group>
                </Form-item>
            </Col>
        </Row>

        <Row>
            <Col span="4">
                <FormItem label="年龄：" prop="age">
                    <Input v-model="formData.age"></Input>
                </FormItem>
            </Col>
            <Col span="4">
                <FormItem label="创建日期：" prop="date">
                    <DatePicker
                        type="date"
                        :options="dateoptions"
                        format="yyyy-MM-dd"
                        placeholder="选择日期"
                        @on-change="getTime"
                        style="width: 200px">
                    </DatePicker>
                </FormItem>
            </Col>
        </Row>

        <Row>
            <FormItem label="病情描述：" prop="description">
                <Input v-model="formData.description" type="textarea" :rows="3" placeholder="请输入病情描述" style="width: 1200px"></Input>
            </FormItem>
        </Row>
        <Row>
            <FormItem label="既往病史：" prop="illnesshistory">
                <Input v-model="formData.illnesshistory" type="textarea" :rows="3" placeholder="请输入既往病史" style="width: 1200px"></Input>
            </FormItem>
        </Row>
        <Row>
            <FormItem label="检查结果（可选）：" prop="checkResult">
                <Input v-model="formData.checkResult" type="textarea" :rows="3" placeholder="请输入现阶段检查结果" style="width: 1200px"></Input>
            </FormItem>
        </Row>
        <Row>
            <Form :model="formData" :label-width="160" inline >
                <FormItem>
                    <Button type="primary" @click="submitForm('formData')" >新增患者</Button>
                    <Button type="primary" @click="goPage('PatientRecord')">  返回  </Button>
                </FormItem>
            </Form>
        </Row>
    </Form>
    </div>

</template>

<script>
    export default {
        name: 'AddPatient',
        data () {
            return {
                formData: {
                    username: '',
                    gender: '',
                    age: '',
                    date: '',
                    illnesshistory: '',
                    description: '',
                    checkResult: ''
                },
                dateoptions: {
                    disabledDate (date) {
                        return date && date.valueOf() > Date.now();
                    }
                },
                rules:{
                    username: [
                        { required: true, message: '请输入患者姓名', trigger: 'blur' }
                    ],
                    age: [
                        { required: true, message: '请输入年龄', trigger: 'blur' }
                    ],
                    date: [
                        { required: true, message: '请选择创建日期', trigger: 'blur', pattern: /.+/ }
                    ],
                    description: [
                        { required: true, message: '请输入病情描述', trigger: 'blur' }
                    ],
                    illnesshistory: [
                        { required: true, message: '请输入既往病史', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            getTime(dateTime){
                this.formData.date = dateTime;
            },
            submitForm({formData}) {
                this.$refs.formData.validate((valid) => {
                    if (valid) {
                        let params = Object.assign({}, this.formData);
                        this.$api.patient.addPatient(params).then((response) => {
                            if (response.status === 'success') {
                                window.alert('新建成功！')
                                this.$router.push("/patientRecord")
                            } else if (response.status === 'fail') {
                                alert(response.data)
                            } else if (response.status === 'reload') {
                                this.$message({
                                    message: "请重新登录",
                                    center: 'true',
                                    type: 'info',
                                });
                                this.logout();
                            }
                            this.resetForm('formData')
                        }).catch(function (error) {
                            console.log(error);
                        });
                    }
                })
                },
            resetForm (formData) {
                this.$refs[formData].resetFields();
            },
            goPage (pageName) {
                this.$router.push('/' + pageName)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .title {
        width: 50%;
        line-height:40px;
        text-align:left;
        position:absolute;
        left:10px;
        color: #464c5b;
        font-size: 20px

    }
    .content {
        margin: 20px 0px 0 100px;
        left:10px;
    }
</style>
