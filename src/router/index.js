import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/Login'
import Home from '@/page/Home'
import Register from '@/page/Register'
import AddPatient from '@/page/AddPatient'
import ModelAnalyze from '@/page/ModelAnalyze'
import PatientRecord from '@/page/PatientRecord'
import ResultCorrect from '@/page/ResultCorrect'
import UserManage from '@/page/UserManage'
import CTPupload from '@/page/CTPupload'
import PatientDetailPage from '@/page/PatientDetailPage'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/',
            name: 'home',
            component: Home,
            children: [
                {
                    path: '/addPatient',
                    name: 'AddPatient',
                    component: AddPatient
                },
                {
                    path: '/modelAnalyze',
                    name: 'ModelAnalyze',
                    component: ModelAnalyze
                },
                {
                    path: '/patientRecord',
                    name: 'PatientRecord',
                    component: PatientRecord
                },
                {
                    path: '/resultCorrect',
                    name: 'ResultCorrect',
                    component: ResultCorrect
                },
                {
                    path: '/userManage',
                    name: 'UserManage',
                    component: UserManage
                },
                {
                    path: '/ctpupload',
                    name: 'CTPupload',
                    component: CTPupload
                },
                {
                    path: '/patientDetailPage',
                    name: 'PatientDetailPage',
                    component: PatientDetailPage
                }

            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    // 登录界面登录成功之后，会把用户信息保存在会话
    // 存在时间为会话生命周期，页面关闭即失效。
    let userName = sessionStorage.getItem('user')
    if (to.path === '/login') {
      // 如果是访问登录界面，如果用户会话信息存在，代表已登录过，跳转到主页
        if (userName) {
            next({ path: '/' })
        } else {
            next()
        }
        } else if (to.path === '/register') {
            next()
        } else {
            if (!userName) {
                // 如果访问非登录界面，且户会话信息不存在，代表未登录，则跳转到登录界面
                next({ path: '/login' })
            } else {
                // // 加载动态菜单和路由
                // addDynamicMenuAndRoutes(userName, to, from)
                // 直接加载
                next()
            }
        }
    }
)

export default router
