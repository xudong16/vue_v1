import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    { path: '/login', name: 'login', component: () => import('@/views/Login.vue') },
    {
        path: '/',
        name: 'index',
        component: () => import('@/views/Index.vue'),
        redirect: '/welcome',
        children: [
            { path: 'welcome', name: 'Welcome', component: () => import('@/views/page/Welcome.vue') },
            { path: 'user', name: 'User',component: () => import('@/views/page/User.vue') },
            { path: 'course', name: 'Course', component: () => import('@/views/page/Course.vue') },
            { path: 'courseAddUpdate', name: 'CourseAddUpdate', component: () => import('@/views/page/CourseAddUpdate.vue') },
            { path: 'Chapter', name: 'Chapter', component: () => import('@/views/page/Chapter.vue') },
            { path: 'chapterAddUpdate', name: 'ChapterAddUpdate', component: () => import('@/views/page/ChapterAddUpdate.vue') },
            { path: '/changepsd', name: 'changepsd', component: () => import('@/views/page/changepsd.vue') },
            { path: '/center', name: 'center', component: () => import('@/views/page/center.vue') },
        ],
        beforeEnter: (to, from, next) => {
            let loginUser = sessionStorage.getItem('loginUser');
            if (loginUser) {
                next();
            } else {
                next('/login');
            }
        },
        
    },
    
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
