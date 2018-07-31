import Vue from 'vue';
import Router from 'vue-router';
// import { resolve } from 'upath';

// 按需加载组件，在需要的时候才加载组件
import App from '@/App';
const Manager = () =>
    import ('@/pages/manager' /* webpackChunkName: "pages/manager" */ ).then(m => m.default || m)
    // const Login = () =>
    //     import ('@/pages/login' /* webpackChunkName: "pages/login" */ ).then(m => m.default || m)
const Fanance = () =>
    import ('@/pages/finance/finance' /* webpackChunkName: "pages/finance/finance" */ ).then(m => m.default || m)
const Aptitude = () =>
    import ('@/pages/finance/aptitude/aptitude' /* webpackChunkName: "pages/finance/aptitude/aptitude" */ ).then(m => m.default || m)
const Store = () =>
    import ('@/pages/finance/store/store' /* webpackChunkName: "pages/finance/store/store" */ ).then(m => m.default || m)
Vue.use(Router);

// 路由后记住滚动条的位置
const scrollBehavior = (to, from, savedPosition) => {
        // SavedPosition is only available for popstate navigations.
        if (savedPosition) {
            return savedPosition
        } else {
            let position = {}
                // If no children detected
            if (to.matched.length < 2) {
                // Scroll to the top of the page
                position = { x: 0, y: 0 }
            } else if (to.matched.some((r) => r.components.default.scrollToTop)) {
                // If one of the children has scrollToTop option set to true
                position = { x: 0, y: 0 }
            }
            // If link has anchor, scroll to anchor by returning the selector
            if (to.hash) {
                position = { selector: to.hash }
            }
            return position
        }
    }
    // 注册路由
const router = new Router({
    mode: 'history',
    base: '/sangjie/panel/', //项目的根名称 如：localhost:3000/sangjie/panel/index
    linkActiveClass: 'b-link-active',
    linkExactActiveClass: 'b-c-link-active',
    scrollBehavior,
    routes: [{
        name: '/',
        path: '/',
        component: App,
        children: [
            // { name: 'login', path: 'login', component: Login },
            {
                name: 'manager',
                path: 'manager',
                component: Manager,
                children: [{
                    name: 'finance',
                    path: 'finance',
                    component: Fanance,
                    children: [
                        { name: 'finance-aptitude', path: 'aptitude', component: Aptitude },
                        { name: 'finance-store', path: 'store', component: Store }
                    ]
                }]
            }
        ]
    }]
});

/**
 * 路由守卫，用于拦截路由跳转
 * to   从哪儿来
 * from 到哪儿去
 * next 必须执行才能路由过去
 */
router.beforeEach((to, from, next) => {
    // if (to.path === '/login') {
    //     next();
    // } else {
    //     if (sessionStorage.username) {
    //         next();
    //     } else {
    //         next({ path: 'login' })
    //     }
    // }
    next()
});
export default router