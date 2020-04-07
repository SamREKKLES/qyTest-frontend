<template>
    <div>
        <Form :model="formSearch" label-position="left" :label-width="100" inline>
            <FormItem label="患者姓名：" prop="username">
                <Input v-model="formSearch.username"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="searchPatient()">搜索</Button>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="fetchData(1)">刷新</Button>
            </FormItem>

        </Form>

        <Form label-position="left" inline>
            <FormItem>
                <Button type="success" @click="goPage('addPatient')">新增患者</Button>
            </FormItem>
        </Form>

        <Table :data="curData" :columns="tableColumns" stripe></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page ref="page" :total="totalNum" :current="1" @on-change="fetchData"></Page>
            </div>
        </div>


    </div>

</template>
<script>
    export default {
        name: 'PatientRecord',
        data () {
            return {
                modal1: false,
                formData: {
                    username: '',
                    gender: '',
                    age: '',
                    date: '',
                    illnesshistory: '',
                    description: '',
                    checkResult: ''
                },
                formSearch: {
                    username: '',
                },
                totalNum: 1,
                listData: [],
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
                        width: 120
                    },
                    {
                        title: '性别',
                        key: 'gender',
                        align: 'center',
                        width: 120,
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
                        width: 120,
                        align: 'center'
                    },
                    {
                        title: '日期',
                        key: 'date',
                        width: 200,
                        align: 'center'
                    },
                    {
                        title: '病情描述',
                        key: 'description',
                        align: 'center',
                        render: (h, params) => {
                                return h('div', [
                                    h('span', {
                                        style: {
                                            display: 'inline-block',
                                            width: '100%',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        },
                                        domProps: {
                                            title: params.row.description
                                        }
                                    }, params.row.description)
                                ]);

                        }
                    },
                    {
                        title: '既往病史',
                        key: 'illnesshistory',
                        align: 'center',
                        render: (h, params) => {
                                return h('div', [
                                    h('span', {
                                        style: {
                                            display: 'inline-block',
                                            width: '100%',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        },
                                        domProps: {
                                            title: params.row.illnesshistory
                                        }
                                    }, params.row.illnesshistory)
                                ]);

                        }
                    },
                    {
                        title: '检查结果',
                        key: 'checkResult',
                        align: 'center',
                        render: (h, params) => {
                                return h('div', [
                                    h('span', {
                                        style: {
                                            display: 'inline-block',
                                            width: '100%',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        },
                                        domProps: {
                                            title: params.row.checkResult
                                        }
                                    }, params.row.checkResult)
                                ]);

                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.goDetailPage(params.row.id)
                                        }
                                    }
                                }, '查看患者'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.gouploadPage(params.row.id)
                                        }
                                    }
                                }, '上传影像')
                            ]);
                        }
                    }
                ]
            }
        },
        methods: {
            fetchData (pageNum) {
                let username = sessionStorage.getItem('user')
                this.$api.patient.getPatients().then((response) => {
                    if (response.status === 'success') {
                        let _data = response.data.patients;
                        this.listData = _data;
                        this.curData = this.listData;
                        console.log(this.curData);
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
                }).catch((error) => {
                    console.log(error);
                })
            },
            searchPatient() {
                let name = this.formSearch.username;
                if(name == '') {
                    this.curData = this.listData
                    return
                }
                let newList = [],
                    item = this.listData.find((item) => {
                        return item.username == this.formSearch.username
                    })
                newList.push(item)
                this.curData = newList
            },
            goDetailPage(id){
                this.$router.push(
                    {
                        path:'/PatientDetailPage',
                        query: {info: id}
                    }
                )

            },
            gouploadPage(id){
                this.$router.push(
                    {
                        path:'/CTPupload',
                        query: {info: id}
                    }
                )

            },
            goPage (pageName) {
                this.$router.push('/' + pageName)
            }
        },
        mounted () {
            this.fetchData(1);
        }
    }
</script>
