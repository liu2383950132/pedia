<template>
  <div class="css">
    <pedia-block
      v-for="(item, i) in pediaBlockArr"
      :key="i"
      :obj="item"/>
  </div>
</template>

<script>
const PediaBlock = () => import('@/components/PediaBlock')
export default {
  name: 'Css',
  components: {
    PediaBlock
  },
  data () {
    return {
      pediaBlockArr: [
        { title: 'Syntax' },
        { title: 'Selectors' },
        { title: 'Specificity' },
        { title: 'inheritance' },
        { title: 'theCascade' },
        { title: 'Box Model' },
        { title: 'BFC' },
        { title: 'computed' },
        { title: 'Flex' },
        { title: 'Grid' },
        { title: 'Animation' }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.css
  width 100vw
  height 10vh

  display flex
  flex-wrap wrap
</style>
