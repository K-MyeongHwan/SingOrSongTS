<template>
  <Header />
  <router-view></router-view>
  <Footer />
</template>

<script lang="ts">
import Footer from "@/layout/Footer.vue";
import Header from "@/layout/Header.vue";

export default {

  components : {
    Header, Footer
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
