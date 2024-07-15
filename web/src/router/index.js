import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import System from '@/components/Layout'
import Resume from '@/components/resumes/resume'
import SysIndex from '@/components/system/SysIndex'
import Addmanual from '@/components/system/SysAddmanual'
import Addauto from '@/components/system/SysAddauto'
import Mystudent from '@/components/system/SysMystudent'
import Audit from '@/components/system/SysAudit'
import Manageinfo from '@/components/system/SysManageinfo'
import Managepwd from '@/components/system/SysManagepwd'
import Myaudit from '@/components/system/SysMyaudit'
import Mteacher from '@/components/system/SysMteacher'
import Mstudent from '@/components/system/SysMstudent'
import MstudentClassify from '@/components/system/SysMStuClassify'
import Mharvest from '@/components/system/SysMharvest'
import Mharvestcopy from '@/components/system/SysMharvestcopy'
import Search from '@/components/system/SysSearch'
import OutputResume from '@/components/system/SysOutputResume'
import WebMaintain from '@/components/system/SysWebMaintain'
import Graduation from '@/components/system/SysGraduation'
Vue.use(Router)

export default new Router({
  mode:'history',
  base:'/management/',
  routes: [
    {
      path: '/',
      // name: 'Index',
      component: Login,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/resume',
      name: 'Resume',
      component: Resume
    },
    {
      path: '/system',
      name: 'System',
      component: System,
      children: [
        {
          path: 'index',
          name: 'SysIndex',
          component: SysIndex
        },
        {
          path: 'mystudent',
          name: 'Mystudent',
          component: Mystudent
        },
        {
           path: 'mystuclassify',
           name: 'Mystudentclassify',
           component: MstudentClassify
        },
        {
          path: 'audit',
          name: 'Audit',
          component: Audit
        },
        {
          path: 'addmanual',
          name: 'Addmanual',
          component: Addmanual
        },
        {
          path: 'addauto',
          name: 'Addauto',
          component: Addauto
        },
        {
          path: 'manageinfo',
          name: 'Manageinfo',
          component: Manageinfo
        },
        {
          path: 'managepwd',
          name: 'Managepwd',
          component: Managepwd
        },
        {
          path: 'myaudit',
          name: 'Myaudit',
          component: Myaudit
        },
        {
          path: 'mteacher',
          name: 'Mteacher',
          component: Mteacher
        },
        {
          path: 'mstudent/:grade',
          name: 'Mstudent',
          component: Mstudent
        },
        {
          path: 'mharvest',
          name: 'Mharvest',
          component: Mharvest
        },
        {
          path: 'mharvestcopy',
          name: 'Mharvestcopy',
          component: Mharvestcopy
        },
        {
          path: 'search',
          name: 'Search',
          component: Search
        },
        {
          path: 'outputResume',
          name: 'OutputResume',
          component: OutputResume
        },
        {
          path: 'webMaintain',
          name: 'WebMaintain',
          component: WebMaintain
        },
        {
          path: 'graduation',
          name: 'graduation',
          component: Graduation
        },
      ]
    }
  ]
})
