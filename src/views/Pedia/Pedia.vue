<template>
  <div class="pedia">
    <h2 class="line-through">FUCK-YOU MONEY ? NO,</h2>
    <h1>FUCK-YOU ABILITY</h1>
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
  name: 'Pedia',
  components: { PediaBlock },
  data () {
    return {
      pediaBlockArr: [
        { title: 'html' },
        { title: 'css' },
        { title: 'js' },
        { title: 'vue' },
        { title: 'algorithm' },
        { title: 'animation' },
        { title: 'interview' },
        { title: 'git' },
        { title: 'es6' },
        { title: 'node' },
        { title: 'typescript' },
        { title: 'deno' },
        { title: 'tools' }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.pedia
  color #2c3e50
  .line-through
    text-decoration line-through
  h2, h1
    text-align center
  .block-area
    width 100vw
    height 10vh

    display flex
    flex-wrap wrap
</style>
