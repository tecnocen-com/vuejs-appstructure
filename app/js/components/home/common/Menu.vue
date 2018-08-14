<template>
  <div>
    <slot>
      <div class="_appstructure__sidebar responsive">
        <b-btn v-b-toggle.menuCollapse variant="outline-warning" right block>
          <i class="fas fa-angle-down"></i>
        </b-btn>
        <b-collapse id="menuCollapse" class="mt-2">
          <b-nav pills vertical>
            <b-nav-item
            v-for="(m, menuIndex) in $props.menu"
            :key="m.path"
            :title="m.title"
            exact-active-class="bg-warning"
            :to="{ name: m.path }">{{ m.title }}</b-nav-item>
          </b-nav>
        </b-collapse>
      </div>
      <div class="_appstructure__sidebar">
        <b-nav pills vertical class="_appstructure__nav">
          <div class="_appstructure__nav-header" :style="{ 'opacity': opacity }">
            <b-navbar type="light" variant="warning">
              <b-navbar-brand tag="h1" class="mb-0">vuejs-appstructure</b-navbar-brand>
            </b-navbar>
          </div>
          <b-nav-item
          v-for="(m, menuIndex) in $props.menu"
          :key="m.path"
          :title="m.title"
          exact-active-class="bg-warning"
          :to="{ name: m.path }">{{ m.title }}</b-nav-item>
        </b-nav>
      </div>
    </slot>
  </div>
</template>
<script>
  export default {
    components: {},
    mixins: [],
    directives: {},
    props: {
      menu: Array
    },
    data: function(){
      return {
        opacity: 0
      };
    },
    computed: {},
    watch: {},
    filters: {},
    methods: {
      doOpacity() {
        const scroll = window.scrollY;
        const state = (1 - 0)*(scroll - 25)/(35 - 25);
        let opacity = 0;
        if(state > 1){
          opacity = 1;
        }
        else if(state >= 0){
          opacity = state;
        }
        this.$set(this, "opacity", opacity);
      }
    },
    beforeCreate: function(){},
    created: function(){},
    beforeMount: function(){},
    mounted: function(){
       window.addEventListener('scroll', this.doOpacity);
    },
    beforeUpdate: function(){},
    updated: function(){},
    activated: function(){},
    deactivated: function(){},
    beforeDestroy: function(){},
    destroyed: function(){}
  }
</script>
<style scoped>
  div._appstructure__sidebar:not(.responsive){
    height: 100%;
  }
  div._appstructure__sidebar ul li a:not(.active){
    color: #ffc107;
  }
  @media (min-width: 576px) {
    div._appstructure__sidebar.responsive{
      display: none;
    }
  }
  @media (max-width: 576px){
    div._appstructure__sidebar:not(.responsive){
      display: none;
    }
  }
  div._appstructure__sidebar ._appstructure__nav{
    position: fixed;
    top: 0;
    bottom: 0;
    width: 240px;
    border: 1px solid #ffc107;
  }
  div._appstructure__sidebar ._appstructure__nav div._appstructure__nav-header{
    height: 56px;
  }
</style>
