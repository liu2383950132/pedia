<template>
  <div class="es6">
    <variable></variable>
    <regexp></regexp>
    <string></string>
    <number></number>
  </div>
</template>

<script>
const variable = () => import('./childCpns/01Variable')
const regexp = () => import('./childCpns/02RegExp')
const string = () => import('./childCpns/03String')
const number = () => import('./childCpns/04Number')
export default {
  name: 'ES6',
  components: {
    variable,
    regexp,
    string,
    number
  }
}
</script>

<style lang="stylus" scoped>

</style>
