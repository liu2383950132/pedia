<template>
  <div class="vue">
    <div class="block-area">
      <pedia-block
        v-for="(item, i) in pediaBlockArr"
        :key="i"
        :obj="item"/>
    </div>
  </div>
</template>

<script>
const PediaBlock = () => import('@/components/PediaBlock')
export default {
  name: 'Vue',
  components: { PediaBlock },
  data () {
    return {
      pediaBlockArr: [
        { title: 'project' },
        { title: 'API' },
        { title: 'cli' },
        { title: 'router' },
        { title: 'vuex' }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.vue
  color #2c3e50
  .block-area
    width 100vw
    height 10vh

    display flex
    flex-wrap wrap
</style>
