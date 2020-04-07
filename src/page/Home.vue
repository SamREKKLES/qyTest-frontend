<template>
    <div class="layout">
        <Menu class="" mode="horizontal" :theme="theme1" active-key="1" >
            <router-link to="/welcome">
                <div class="layout-logo-cn" v-if="this.lang==='zh_cn'" >{{$t("common.projectRepo")}}</div>
                <div class="layout-logo-en" v-else >{{$t("common.projectRepo")}}</div>
            </router-link>
            <div class="layout-nav">
                <Row :gutter="2">
                    <i-col span="3">
                        <div>
                            <router-link to="/">
                                <Menu-item name="1">
                                    <Icon type="home"></Icon>
                                    <span class="layout-text">{{$t("common.home")}}</span>
                                </Menu-item>
                            </router-link>
                        </div>
                    </i-col>
                    <i-col span="3">
                        <div>
                        <router-link to="/patientRecord" >
                            <Submenu name="2">
                                <template slot="title">
                                    <Icon type="ios-contact"></Icon>
                                    <span class="layout-text">{{$t("common.patientManage")}}</span>
                                </template>
                                    <router-link to="/addPatient" >
                                        <MenuItem name="2-1">{{$t("common.addPatient")}}</MenuItem>
                                    </router-link>

                                    <router-link to="/patientRecord" >
                                        <MenuItem name="2-2">{{$t("common.patientRecord")}}</MenuItem>
                                    </router-link>
                            </Submenu>
                        </router-link>
                        </div>
                    </i-col>
                    <i-col span="3">
                        <div>
                        <router-link to="/modelAnalyze" >
                            <Menu-item name="3">
                                <Icon type="ios-albums"></Icon>
                                <span class="layout-text">模型管理</span>
                            </Menu-item>
                        </router-link>
                        </div>
                    </i-col>
                    <i-col span="3">
                        <div>
                            <router-link to="/resultCorrect" >
                            <Menu-item name="4">
                                <Icon type="ios-analytics"></Icon>
                                <span class="layout-text">{{$t("common.resultCorrect")}}</span>
                            </Menu-item>
                            </router-link>
                        </div>
                    </i-col>
                    <i-col span="3">
                        <div>
                        <router-link to="/userManage" >
                            <Submenu name="5" >
                                <template slot="title">
                                    <Icon type="android-settings"></Icon>
                                    <span class="layout-text">{{$t("common.userManage")}}</span>
                                </template>
                                    <MenuItem name="5-1" @click.native="changeTheme">
                                        {{$t("action.themeChange")}}
                                    </MenuItem>
                                    <MenuItem name="language" @click.native="changeLanguage" >
                                        {{$t("action.langChange")}}
                                    </MenuItem>
                                    <MenuItem name="5-3">
                                        {{$t("common.userConfig")}}
                                    </MenuItem>
                            </Submenu>
                        </router-link>
                        </div>
                    </i-col>
                    <i-col span="3">
                        <Button type="error" class="u-logout" @click="modal1 = true">{{$t("common.logout")}}</Button>
                        <Modal
                            v-model="modal1"
                            title="温馨提醒"
                            @on-ok="ok()">
                            <p>确认退出登录？</p>
                        </Modal>
                    </i-col>
                </Row>
            </div>
        </Menu>
        <div class="layout-content">
            <div class="layout-content-main">
                <router-view></router-view>
            </div>
        </div>
        <div class="layout-copy">
            2019-2020 &copy; ZJULAB205
        </div>
    </div>
</template>
<script>
import Cookies from "js-cookie"
export default {
    name: 'Home',
    data() {
        return {
            theme1: 'dark',
            lang: 'zh_cn',
            modal1: false
        }
    },
    methods: {
        // 清除缓存并退出登录
        ok () { 
            this.logout()
            }
        },
        // 切换主题
        onThemeChange: function(themeColor) {
        this.$store.commit('setThemeColor', themeColor)
        },
        changeTheme: function () {
            this.$confirm('确认切换主题吗？','提示',{
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
            }).then(() => {
                if ( this.theme1 === "dark") {
                    this.theme1 = "light";
                }else{
                    this.theme1 = "dark";
                }
                }).catch(() => {
                    this.$message({
                        message: "取消/cancel",
                        center: 'true',
                        type: 'info',
                    });
                });
        },
        // 语言切换
        changeLanguage: function () {
            this.$confirm('确认切换语言吗？','提示',{
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
            }).then(() => {
                if ( this.$i18n.locale === 'zh_cn') {
                    this.lang = 'en_us';
                    this.$i18n.locale = this.lang;
                }else{
                    this.lang = 'zh_cn';
                    this.$i18n.locale = this.lang;
                }
                }).catch(() => {
                    this.$message({
                        message: "取消/cancel",
                        center: 'true',
                        type: 'info',
                    });
                });
    },
}
</script>
<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        height: 100%;
        overflow: hidden;

    }
    .layout-logo-cn{
        width: 200px;
        height: 30px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
        color: rgb(31, 150, 230);
        font-weight: bold;
        font-size: 20px;
        line-height: 30px;
        padding-left: 14px;
    }
    .layout-logo-en{
        width: 300px;
        height: 30px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
        color: rgb(31, 150, 230);
        font-weight: bold;
        font-size: 15px;
        line-height: 30px;
        padding-left: 14px;
    }
    .layout-welcome{
        width: 100%;
        height: 30px;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;

        color: #000;
        font-weight: bold;
        font-size: 24px;
        line-height: 30px;
        padding-left: 14px;
    }
    .layout-nav{
        width: 100%;
        left: 22%;
        position: absolute;
        margin: 0 auto;
    }
    .layout-assistant{
        width: fit-content;
        margin: 0 auto;
        height: inherit;

    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        /* min-height: 680px; */
        margin-top: 0%;

        overflow: scroll;
        background: #fff;
        border-radius: 4px;
        position:-ms-page;
        /* // overflow-y: scroll; */
        height:90%;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 10px;
        color: #9ea7b4;
        height: 15%;
    }
    .layout-hide-text .layout-text{
        display: none;
    }
    .lang-item {
        font-size: 16px;
        padding-left: 8px;
        padding-top: 8px;
        padding-bottom: 8px;
        cursor: pointer;
    }
    .center-right{
        float: right;
    }

</style>
