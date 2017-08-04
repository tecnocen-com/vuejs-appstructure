module.exports = `
        <b-nav vertical class="custom-sidebar">
            <b-nav-item v-if="active.first === 1" active class="custom-sidebar-item">Clientes</b-nav-item>
            <b-nav-item v-else v-on:click="setview({first: 1, second: 0})" class="custom-sidebar-item">Clientes</b-nav-item>
            <b-nav-item v-if="active.first === 2" active class="custom-sidebar-item">Tiendas</b-nav-item>
            <b-nav-item v-else v-on:click="setview({first: 2, second: 0})" class="custom-sidebar-item">Tiendas</b-nav-item>
            <b-nav-item v-if="active.first === 3" active class="custom-sidebar-item">Recursos Humanos</b-nav-item>
            <b-nav-item v-else v-on:click="setview({first: 3, second: 0})" class="custom-sidebar-item">Recursos Humanos</b-nav-item>
            <b-nav-item v-if="active.first === 4" active class="custom-sidebar-item">Reportes</b-nav-item>
            <b-nav-item v-else v-on:click="setview({first: 4, second: 0})" class="custom-sidebar-item">Reportes</b-nav-item>
        </b-nav>
`;