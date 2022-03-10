<template>
  <div :class="['dropdown-group', mainClass]">
    <button
      :class="['custom-dropdown-btn', buttonClass]"
      @click.stop="toggleDropdown"
    >
      <slot name="button-content" />
    </button>
    <div
      v-click-outside="closeDropdown"
      :class="dropdownClass"
    >
      <div class="triangle-container">
        <div class="triangle-with-shadow" />
      </div>
      <slot name="dropdown-content" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mainClass: {
      type: String,
      required: false,
      default: ''
    },
    buttonClass: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      dropdownClass: 'dropdown-list'
    }
  },
  watch: {
    $route () {
      this.closeDropdown() // close dropdown if view (route changes)
    }
  },
  methods: {
    toggleDropdown () {
      if (this.dropdownClass === 'dropdown-list') { this.dropdownClass = 'dropdown-list show' } else { this.dropdownClass = 'dropdown-list' }
    },
    closeDropdown () {
      this.dropdownClass = 'dropdown-list'
    }
  }
}
</script>

<style scoped>
.dropdown-group{
  position: relative;
  height: 40px;
  position: relative;
  display: inline-block;
}
.dropdown-group > button{
  align-items: center;
}
.dropdown-list{
  position: absolute;
  min-width: 310px;
  top: 50px;
  right: 0;
  visibility: hidden;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #fff;
  border-radius: 0 0 5px 5px;
  padding-bottom: 16px;
  transition: opacity 0.5s;
  opacity: 0;
  z-index: 19999999999;
}
/*
.dropdown-list::before{
  content: '';
  width: 0px;
  height: 0px;
  position: absolute;
  top: -11px;
  right: 4px;
  border-style: solid;
  border-top: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-bottom: 12px solid var(--accent-orange);
  display: inline-block;
  vertical-align: middle;
}*/
.triangle-container{
  width: 100%;
  display: flex;
  justify-content: flex-end;
  height: 0;
}
.triangle-with-shadow {
  width: 32px;
  height: 24px;
  position: relative;
  top: -24px;
  right: 0;
  overflow: hidden;
  z-index: 1;
}
.triangle-with-shadow:after {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  background: #FFF;
  transform: rotate(45deg);
  bottom: -10px;
  left: 6px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  /*box-shadow: 0 0px 4px 0 rgba(0, 0, 0, 0.16);*/
}
.dropdown-list ul{
  list-style: none;
  padding: 0px;
  margin: 0;
}
.dropdown-list.show{
  visibility: visible;
  opacity: 1;
}
.dropdown-list .dropdown-option{
  padding: 8px 24px;
}
.dropdown-list .dropdown-option > a{
  color: var(--dark-text);
  display: block;
  cursor: pointer;
}
.dropdown-list .dropdown-option > a:hover{
  text-decoration: none;
  color: var(--accent-orange);
}
.dropdown-list .dropdown-option > a{
  font-size: 12px;
  line-height: 1;
  color: var(--dark-text);
}
.custom-dropdown-btn:active,
.custom-dropdown-btn:focus{
  border: none;
  outline: none;
}
</style>
