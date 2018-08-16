import VueRouter from "vue-router";

const Login = resolve => require(["./../components/login/Login.vue"], resolve);

const Home = resolve => require(["./../components/home/Home.vue"], resolve);
const Dashboard = resolve => require(["./../components/home/dashboard/Dashboard.vue"], resolve);
const Test = resolve => require(["./../components/home/test/Test.vue"], resolve);

const router = new VueRouter({
  routes: [
    { path: "/", name: "login", component: Login, meta: { name: "login" } },
    { path: "/inicio", component: Home, meta: { name: "inicio", auth: true },
      children: [
        {
          path: "/",
          name: "dashboard",
          component: Dashboard,
          meta: {
            name: "dashboard",
            auth: true,
            breadcrumb: []
          }
        },
        {
          path: "/test",
          name: "test",
          component: Test,
          meta: {
            name: "test",
            auth: true,
            breadcrumb: [
              { label: "Inicio", name: "dashboard" },
              { label: "Test", name: null }
            ]
          }
        }
      ]
    },
    { path: "*", redirect: "/" }
  ]
});
router.beforeEach((to, from, next) => {
  router.app.$nextTick(() => {
    const token = router.app.$children[0].getToken();
    if(token && !to.meta.auth){
      next({ name: "dashboard" });
    }
    else if(!token && to.meta.auth){
      next({ name: "login" });
    }
    else{
      next();
    }
  });
});
export { router };
