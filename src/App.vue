<template>
  <div id="app">
    <Fan />
  </div>
</template>

<script>
import Fan from "./components/Fan/index"

export default {
  name: 'App',
  components: {
    Fan
  },
}
</script>

<style>
  * {
    margin: 0 !important;
    padding: 0 !important;
  }
</style>
