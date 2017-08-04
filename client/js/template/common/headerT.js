module.exports = `
    <b-navbar toggleable type="inverse" class="custom-navbar">
        <b-nav-toggle target="nav_collapse"></b-nav-toggle>
        <b-link v-on:click="setview({first: 0, second: 0})" class="navbar-brand" to="#">
            <span>Logo</span>
        </b-link>
        <b-collapse is-nav id="nav_collapse">
            <b-nav is-nav-bar class="ml-auto">
                <b-nav-item-dropdown right>
                    <!-- Using button-content slot -->
                    <template slot="button-content">
                        <span style="font-weight: bold;">User</span>
                    </template>
                    <b-dropdown-item to="#">Profile</b-dropdown-item>
                    <b-dropdown-item to="#">Signout</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-nav>
        </b-collapse>
    </b-navbar>
`;