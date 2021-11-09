import Home from '@/pages/Home.vue'
const routes = [{
    path: '/',
    component: Home
}, {
    path: '/detail/:id',
    component: () => import('@/pages/Detail.vue')
}, {
    path: '/login',
    component: () => import('@/pages/Login.vue')
}, {
    path: '/person',
    component: () => import('@/pages/Person.vue')
}, {
    path: '/store',
    component: () => import('@/pages/Store.vue')
}, {
    path: '/updateperson',
    component: () => import('@/pages/UpdatePerson.vue')
}, {
    path: '/:pathMatch(.*)*',
    redirect: '/'
}
]
export default routes
