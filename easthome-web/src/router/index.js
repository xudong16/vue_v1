import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'index',
        redirect: '/main',
        component: () => import('@/views/Index.vue'),
        children: [
            { path: 'main', name: 'Main', component: () => import('@/views/Main.vue') },
            { path: 'classCenter', name: 'ClassCenter', component: () => import('@/views/ClassCenter.vue') },
            { path: 'classDetail/:id', name: 'ClassDetail', component: () => import('@/views/ClassDetail.vue') },
            { path: 'training', name: 'Training', component: () => import('@/views/Training.vue') },
            { path: 'exam', name: 'Exam', component: () => import('@/views/Exam.vue') }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// 解决路由重复点击出错没有处理的问题
const originalPush = router.push;
router.push = function push(location, onResolve, onReject) {
    return originalPush.call(this, location).catch(err => err);
}

export default router