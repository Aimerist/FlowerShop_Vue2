<template>
  <div id="app">
    <Loading :active.sync="status.isLoading"></Loading>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['status'])
  }
}
</script>

<style lang="scss">
@import "./assets/scss/all.scss";
</style>
