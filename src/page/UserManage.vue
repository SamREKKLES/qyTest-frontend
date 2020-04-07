<template>
    <div>
        <Form :model="formSearch" label-position="left" :label-width="60" inline>
            <FormItem label="用户名：" prop="username">
                <Input v-model="formSearch.username"></Input>
            </FormItem>
            <FormItem label="姓名：" prop="realname">
                <Input v-model="formSearch.realname"></Input>
            </FormItem>
            <FormItem label="医院：" prop="hospital">
                <Input v-model="formSearch.hospital"></Input>
            </FormItem>
            <FormItem label="科室：" prop="department">
                <Input v-model="formSearch.department"></Input>
            </FormItem>
            <FormItem label="职位：" prop="title">
                <Input v-model="formSearch.title"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="searchUser()">搜索</Button>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="fetchData(1)">刷新</Button>
            </FormItem>

        </Form>

        <Form :model="formSearch" label-position="left" inline>
            <FormItem>
                <Button type="success" @click="modal1 = true">新增用户</Button>
            </FormItem>
        </Form>
        <Modal
            v-model="modal1"
            title="用户信息"
            @on-ok="handleSubmit('formData')"
            @on-cancel="cancel">
            <Form ref="formData" :model="formData" :rules="ruleValidate">
                <Form-item label="用户名" prop="username">
                    <Input v-model="formData.username" placeholder="请输入用户名"></Input>
                </Form-item>
                <Form-item label="姓名" prop="realname">
                    <Input v-model="formData.realname" placeholder="请输入真实姓名"></Input>
                </Form-item>
                <Form-item label="性别" prop="gender">
                    <Radio-group v-model="formData.gender">
                        <Radio label="0">男</Radio>
                        <Radio label="1">女</Radio>
                    </Radio-group>
                </Form-item>
                <Form-item label="医院" prop="hospital">
                    <Input v-model="formData.hospital" placeholder="请输入所属医院"></Input>
                </Form-item>
                <Form-item label="科室" prop="department">
                    <Input v-model="formData.department" placeholder="请输入所属科室"></Input>
                </Form-item>
                <Form-item label="职位" prop="title">
                    <Input v-model="formData.title" placeholder="请输入职位"></Input>
                </Form-item>
                <Form-item label="密码" prop="password">
                    <Input type="password" v-model="formData.password" placeholder="请输入密码"></Input>
                </Form-item>


            </Form>

        </Modal>

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
        name: 'UserManage',
        data () {
            return {
                modal1: false,
                formData: {
                    username: '',
                    realname: '',
                    gender: '',
                    userType: '',
                    password: '',
                    hospital: '',
                    department: '',
                    title: ''
                },
                formSearch: {
                    username: '',
                },
                ruleValidate: {
                    username: [
                        { required: true, message: '请填写用户名', trigger: 'blur'}
                    ],
                    realname: [
                        { required: true, message: '真实姓名不能为空', trigger: 'blur' }
                    ],
                    hospital: [
                        { required: true, message: '所属医院不能为空', trigger: 'blur' }
                    ],
                    department: [
                        { required: true, message: '所属科室不能为空', trigger: 'blur' }
                    ],
                    title: [
                        { required: true, message: '职位不能为空', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                    ],
                },
                totalNum: 1,
                listData: [],
                curData: [],
                tableColumns: [
                    {
                        title: '用户名',
                        key: 'username',
                        align: 'center',
                        width: 200
                    },
                    {
                        title: '姓名',
                        key: 'realname',
                        align: 'center',
                        width: 150
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
                        title: '医院',
                        key: 'hospital',
                        align: 'center'
                    },
                    {
                        title: '所属科室',
                        key: 'department',
                        align: 'center'
                    },
                    {
                        title: '职位',
                        key: 'title',
                        align: 'center'
                    },
                    {
                        title: '权限',
                        width: 180,
                        key: 'userType',
                        align: 'center',
                        render: (h, params) => {
                            let type = params.row.userType
                            const color = type === 0 ? 'green' : type === 2 ? 'yellow' : 'blue' ;

                            const text = type === 2 ? '医生' : type === 1 ? '医生(管理员)' : '管理员';

                            return h('Tag', {
                                props: {
                                    type: 'dot',
                                    color: color
                                }
                            }, text);
                        }
                    },
                    {
                        title: '操作',
                        width: '180',
                        key: 'action',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.delete(params.row.id)
                                        }
                                    }
                                }, '删除用户'),
                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                        }
                                    }
                                }, '修改权限')
                            ]);
                        }
                    }
                ]
            }
        },
        methods: {
            fetchData (pageNum) {
                let userInfo = {username: sessionStorage.getItem('user')}
                this.$api.user.searchUsers(userInfo.username).then((response) => {
                    if (response.status === 'success') {
                        let _data = response.data.users;
                        this.listData = _data;
                        this.curData = this.listData;
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
                });
            },
            searchUser() {
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
            handleSubmit ({formData}) {
                this.$refs.formData.validate((valid) => {
                    if (valid) {
                        let params = Object.assign({}, this.formData);
                        this.$api.user.addUser(params).then((response) => {
                        if (response.status === 'success') {
                            window.alert('新建成功！')
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
                        this.resetForm('formData')
                        }).catch(function (error) {
                            this.resetForm('formData')
                            console.log(error);
                        });
                    }
                })
                },
            cancel () {
                this.resetForm('formData');
                this.$Message.info('Clicked cancel');
            },
            resetForm (formData) {
                this.$refs[formData].resetFields();
            }
        },
        mounted () {
            this.fetchData(1);
        }
    }
</script>
