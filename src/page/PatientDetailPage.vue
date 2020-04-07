<template>

    <div class="pos">
        <br>
        <Row>
            <div class="title">
                <Col span="12">患者详细信息</Col>
            </div>
        </Row>
        <br>

        <Row>
            <div>
                <Col span="1">
                    <Button type="success" size = "large" @click="fetchData()">刷新</Button>
                </Col>
                <Col span="21">
                    <Button type="primary" size = "large" @click="goPage('PatientRecord')">返回</Button>
                </Col>
                <Col span="1">
                    <Button type="error" size = "large" @click="modal1 = true">删除患者</Button>
                    <Modal
                        v-model="modal1"
                        title="温馨提醒"
                        @on-ok="delPatient()">
                        <p>确认删除？</p>
                    </Modal>
                </Col>
            </div>
        </Row>
        <br>
        <br>

        <Table :data="curData" :columns="tableColumns" stripe></Table>
        <br>
        <Table :data="curData" :columns="tableColumns2" stripe></Table>
        <br>
        <Table :data="curData" :columns="tableColumns3" stripe></Table>
        <br>
        <Table :data="curData" :columns="tableColumns4" stripe></Table>
        <br>
        <br>
        <Tabs value="name1">
            <TabPane label="影像显示" name="name1">
                <Row>
                    <div class="title2">
                        <Col span="12">请选择图像 (CBF,CBV,MTT,TMax,CT为CTP数据  Output为预测结果)</Col>
                    </div>
                </Row>
                <br>
                <Row>
                    <Col :span="6">
                        <Select
                            v-model="cbf"
                            clearable filterable
                            collapse-tags
                            placeholder="CBF">
                            <Option
                                v-for="item in images" v-if="item.type === 'CBF'"
                                :key="item.uploadname"
                                :label=" '文件名：' + item.uploadname +  '  ||上传日期：' +item.time"
                                :value="item.filename"
                                :disabled="item.disabled"
                            >
                            </Option>
                        </Select>
                    </Col>


                    <Col span="1"><br></Col>
                    <Col :span="6">
                        <Select
                            v-model="cbv"
                            clearable filterable
                            collapse-tags
                            placeholder="CBV">
                            <Option
                                v-for="item in images" v-if="item.type === 'CBV'"
                                :key="item.uploadname"
                                :label=" '文件名：' + item.uploadname +  '  ||上传日期：' +item.time"
                                :value="item.filename"
                                :disabled="item.disabled"
                            >
                            </Option>
                        </Select>
                    </Col>
                    <Col span="1"><br></Col>

                    <Col :span="6">
                        <Select
                            v-model="mtt"
                            clearable filterable
                            collapse-tags
                            placeholder="MTT">
                            <Option
                                v-for="item in images" v-if="item.type === 'MTT'"
                                :key="item.uploadname"
                                :label=" '文件名：' + item.uploadname +  '  ||上传日期：' +item.time"
                                :value="item.filename"
                                :disabled="item.disabled"
                            >
                            </Option>
                        </Select>
                    </Col>


                </Row>
                <br>
                <Row>
                    <Col :span="6">
                        <Select
                            v-model="tmax"
                            clearable filterable
                            collapse-tags
                            placeholder="TMax">
                            <Option
                                v-for="item in images" v-if="item.type === 'TMax'"
                                :key="item.uploadname"
                                :label=" '文件名：' + item.uploadname +  '  ||上传日期：' +item.time"
                                :value="item.filename"
                                :disabled="item.disabled"
                            >
                            </Option>
                        </Select>
                    </Col>
                    <Col span="1"><br></Col>

                    <Col :span="6">
                        <Select
                            v-model="ct"
                            clearable filterable
                            collapse-tags
                            placeholder="CT">
                            <Option
                                v-for="item in images" v-if="item.type === 'CT'"
                                :key="item.uploadname"
                                :label=" '文件名：' + item.uploadname +  '  ||上传日期：' +item.time"
                                :value="item.filename"
                                :disabled="item.disabled"
                            >
                            </Option>
                        </Select>
                    </Col>
                    <Col span="1"><br></Col>

                    <Col :span="6">
                        <Select
                            v-model="output"
                            clearable filterable
                            collapse-tags
                            placeholder="Output">
                            <Option
                                v-for="item in images" v-if="item.type === 'Output'"
                                :key="item.uploadname"
                                :label=" '文件名：' + item.uploadname +  '  ||上传日期：' +item.time"
                                :value="item.filename"
                                :disabled="item.disabled"
                            >
                            </Option>
                        </Select>
                    </Col>

                </Row>
                <br>
                <Row>
                    <Col :span="6">
                        <Select
                            v-model="model"
                            clearable filterable
                            collapse-tags
                            placeholder="选择算法">
                            <Option
                                v-for="item in images" v-if="item.type === 'model'"
                                :key="item.value"
                                :value="item.value"
                                :disabled="item.disabled"
                            >
                            </Option>
                        </Select>
                    </Col>
                </Row>

                <br>
                <Row>
                    <Col :span="1">
                        <Button type="primary" plain @click="getImage">获取图像</Button>
                    </Col>
                    <Col span="1"><br></Col>
                    <Col :span="1">
                        <Button type="info" plain @click="Analyze">算法分析</Button>
                    </Col>
                    <Col span="1"><br></Col>
                    <Col :span="1">
                        <Button type="success" plain @click="Analyze">图像下载</Button>
                    </Col>
                    <Col span="17"><br></Col>
                    <Col :span="1">
                        <Button type="error" plain @click="delImage">删除图像</Button>
                    </Col>
                </Row>
                <br>
                <!--        显示CTP图像-->
                <Row>
                    <Col :span="11">
                    <div class="grid-content bg-white">
                        <h3 style="text-align:center;">CBF</h3>
                        <el-carousel indicator-position="outside" height="300" :autoplay="false">
                            <el-carousel-item v-for="(item, index) in cbfimg" :key="item">
                                <h3><img :src="item" id="cbfimg" alt=""></h3>
                                <h3>{{index}}</h3>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    </Col>
                    <Col span="1"><br></Col>

                    <Col :span="11">
                    <div class="grid-content bg-white">
                        <h3 style="text-align:center;">CBV</h3>
                        <el-carousel indicator-position="outside" height="300" :autoplay="false">
                            <el-carousel-item v-for="(item, index) in cbvimg" :key="item">
                                <h3><img :src="item" id="cbvimg" alt=""></h3>
                                <h3>{{index}}</h3>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    </Col>
                </Row>
                <br>
                <Row>
                    <Col :span="11">
                    <div class="grid-content bg-white">
                        <h3 style="text-align:center;">MTT</h3>
                        <el-carousel indicator-position="outside" height="300" :autoplay="false">
                            <el-carousel-item v-for="(item, index) in mttimg" :key="item">
                                <h3><img :src="item" id="mttimg" alt=""></h3>
                                <h3>{{index}}</h3>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    </Col>
                    <Col span="1"><br></Col>

                    <Col :span="11">
                    <div class="grid-content bg-white">
                        <h3 style="text-align:center;">TMax</h3>
                        <el-carousel indicator-position="outside" height="300" :autoplay="false">
                            <el-carousel-item v-for="(item, index) in tmaximg" :key="item">
                                <h3><img :src="item" id="tmaximg" alt=""></h3>
                                <h3>{{index}}</h3>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    </Col>
                </Row>
                <br>
                <Row>
                    <Col :span="11">
                    <div class="grid-content bg-white">
                        <h3 style="text-align:center;">CT</h3>
                        <el-carousel indicator-position="outside" height="300" :autoplay="false">
                            <el-carousel-item v-for="(item, index) in ctimg" :key="item">
                                <h3><img :src="item" id="ctimg" alt=""></h3>
                                <h3>{{index}}</h3>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    </Col>
                    <Col span="1"><br></Col>

                    <Col :span="11">
                    <div class="grid-content bg-white">
                        <h3 style="text-align:center;">Output</h3>
                        <el-carousel indicator-position="outside" height="300" :autoplay="false">
                            <el-carousel-item v-for="(item, index) in outputimg" :key="item">
                                <h3><img :src="item" id="outputimg" alt=""></h3>
                                <h3>{{index}}</h3>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    </Col>
                </Row>
            </TabPane>

            <TabPane label="信息修改" name="name2">
                <div class="info-change">
                <Form :model="formData" :rules="rules" ref="formData"  label-width="120" inline>
                    <Row>
                        <FormItem label="患者姓名：" prop="username">
                            <Input v-model="formData.username" placeholder="请输入姓名" style="width: 100px"></Input>
                        </FormItem>
                    </Row>
                    <Row>
                        <Form-item label="性别：" prop="gender">
                            <Radio-group v-model="formData.gender">
                                <Radio label="0">男</Radio>
                                <Radio label="1">女</Radio>
                            </Radio-group>
                        </Form-item>
                    </Row>
                    <Row>
                        <FormItem label="年龄：" prop="age">
                            <Input v-model="formData.age" placeholder="请输入年龄" style="width: 100px"></Input>
                        </FormItem>
                    </Row>
                    <Row>
                        <FormItem label="创建日期：" prop="date">
                            <DatePicker
                                type="date"
                                format="yyyy-MM-dd"
                                placeholder="选择日期"
                                @on-change="getTime"
                                style="width: 200px">
                            </DatePicker>
                        </FormItem>
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
                        <FormItem label="检查结果：" prop="checkResult">
                            <Input v-model="formData.checkResult" type="textarea" :rows="3" placeholder="请输入检查结果" style="width: 1200px"></Input>
                        </FormItem>
                    </Row>
                    <Row>
                        <Col span="2">
                            <br>
                        </Col>
                        <Button type="primary" @click="submitForm('formData')" >上传修改信息</Button>
                    </Row>

                </Form>
                </div>
            </TabPane>
        </Tabs>
    </div>

</template>
<script>
export default {
    name: "PatientDetailPage",
    data() {
    return {
        id: this.$route.query.info,
        images: [],
        cbfimg: "",
        cbvimg: "",
        ctimg: "",
        mttimg: "",
        tmaximg: "",
        outputimg: "",
        modal1: false,
        slices: 0,
        formData: {
        id: "",
        username: "",
        gender: "",
        age: "",
        date: "",
        illnesshistory: "",
        description: "",
        checkResult: ""
        },
        curData: [],
        tableColumns: [
        {
            title: "id",
            key: "id",
            align: "center"
        },
        {
            title: "姓名",
            key: "username",
            align: "center"
        },
        {
            title: "性别",
            key: "gender",
            align: "center",
            render: (h, params) => {
            return h("div", params.row.gender === 0 ? "男" : "女", [
                h(
                "span",
                {
                    style: {
                    display: "inline-block",
                    width: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                    },
                    domProps: {
                    title: params.row.area
                    }
                },
                params.row.area
                )
            ]);
            }
        },
        {
            title: "年龄",
            key: "age",
            align: "center"
        },
        {
            title: "创建日期",
            key: "date",
            align: "center"
        }
        ],
        tableColumns2: [
        {
            title: "病情详述",
            key: "description",
            align: "center"
        }
        ],
        tableColumns3: [
        {
            title: "既往病史",
            key: "illnesshistory",
            align: "center"
        }
        ],
        tableColumns4: [
        {
            title: "检查结果",
            key: "checkResult",
            align: "center"
        }
        ],
        rules: {
        username: [
            { required: true, message: "请输入患者姓名", trigger: "blur" }
        ],
        date: [
            {
            required: true,
            message: "请选择创建日期",
            trigger: "blur",
            pattern: /.+/
            }
        ],
        description: [
            { required: true, message: "请输入病情描述", trigger: "blur" }
        ],
        illnesshistory: [
            { required: true, message: "请输入既往病史", trigger: "blur" }
        ]
        }
    };
    },
    methods: {
    getTime(dateTime) {
        this.formData.date = dateTime;
        console(dateTime);
    },
    submitForm(formData) {
        this.$refs[formData].validate(valid => {
        if (valid) {
            let params = Object.assign({}, this.formData);
            this.$api.patient
            .changepatient(params)
            .then(response => {
                if (response.status === "success") {
                    this.$Notice.info({
                    desc: "患者信息修改成功. "
                    });
                } else if (response.status === "fail") {
                    window.alert("修改失败！");
                } else if (response.status === "reload") {
                    this.$message({
                    message: "请重新登录",
                    center: "true",
                    type: "info"
                    });
                    this.logout();
                }
                this.resetForm("formData");
                })
            .catch(function(error) {
                console.log(error);
            });
        } else {
            console.log("提交失败！");
        }
        });
    },
    fetchData() {
        this.$api.patient.searchIdPatient({
            id: this.id
        })
        .then(response => {
            if (response.status === "success") {
                let _data = response.data.patient;
                this.curData = _data;
                this.formData = curData;
                if (this.formData.checkResult === "") {
                this.formData.checkResult = "暂无";
                }
            } else if (response.status === "fail") {
                window.alert(response.data);
            } else if (response.status === "reload") {
                this.$message({
                message: "请重新登录",
                center: "true",
                type: "info"
                });
                this.logout();
            }
            })
            .catch(error => {
            console.log(error);
            });
        },
        delPatient() {
        this.$api.patient.delPatient({
            id: this.id
        }).then(response => {
            if (response.status === "success") {
                window.alert("删除成功")
                this.$router.push("/patientRecord")
            } else if (response.status === "fail") {
                window.alert(response.data);
            } else if (response.status === "reload") {
                this.$message({
                message: "请重新登录",
                center: "true",
                type: "info"
                });
                this.logout();
            }
        })
        .catch(error => {
            console.log(error);
        });
    },
        goPage(pageName) {
        this.$router.push("/" + pageName);
        },
        resetForm(formData) {
        this.$refs[formData].resetFields();
        }
    },
    mounted() {
        this.fetchData();
    }
    };
</script>

<style lang="scss" scoped>
    .pos {
    position: relative;
    left: 100px;
    width: 90%;
    overflow: hidden;
    }
    .title {
    width: 200%;
    line-height: 50px;
    text-align: left;
    color: #464c5b;
    font-size: 30px;
    }
    .title2 {
    width: 200%;
    line-height: 50px;
    text-align: left;
    color: #464c5b;
    font-size: 20px;
    }
    .content {
    margin: 20px 0px 0 100px;
    left: 10px;
    }
    .info-change {
    position: relative;
    left: 10%;
    }
    .grid-content {
    border-radius: 4px;
    min-height: 36px;
    }
</style>
