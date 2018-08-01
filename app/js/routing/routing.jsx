import VueRouter from "vue-router";

const Login = resolve => require(["./../components/login/Login.vue"], resolve);

const Home = resolve => require(["./../components/home/Home.vue"], resolve);
const Dashboard = resolve => require(["./../components/home/dashboard/Dashboard.vue"], resolve);
const Test = resolve => require(["./../components/home/test/Test.vue"], resolve);

const router = new VueRouter({
  routes: [
    { path: "/", name: "login", component: Login, meta: { name: "login" } },
    { path: "/inicio", component: Home, meta: { name: "inicio" },
      children: [
        {
          path: "/",
          name: "dashboard",
          component: Dashboard,
          meta: { name: "dashboard" }
        },
        {
          path: "/test",
          name: "test",
          component: Test,
          meta: { name: "test" }
        }
      ]
    },
    { path: "*", redirect: "/" }
  ]
});
router.beforeEach((to, from, next) => {
  router.app.$nextTick(() => {
    const token = router.app.$children[0].getToken();
    let pass = ((to.name === "login") && token) || ((to.name !== "login") && !token) ? false : true;
    if(!pass && to.name === "login"){
      next({ name: "dashboard" });
    }
    else if(!pass){
      next({ name: "login" });
    }
    else{
      next();
    }
  });
});
export { router };
