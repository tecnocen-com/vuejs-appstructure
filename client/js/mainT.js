var toolbar = require("./template/mapT.js");
var map = require("./template/toolbarT.js");
Vue.component("toolbar", {
    template: toolbar,
    props: {
        config: Object
    }
});
Vue.component("mapping", {
    template: map,
    props: {
        config: Object
    }
});
module.exports = `
    <div>
        <toolbar :config="children.map"></toolbar>
        <mapping :config="children.map"></mapping>
    </div>
`;