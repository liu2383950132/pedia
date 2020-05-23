<template>
  <div
    class="pedia-block"
    :style="{'background' : bgColor}"
    @click="toSecondRoute">
    <p>{{obj.title}}</p>
  </div>
</template>

<script>
export default {
  name: 'PediaBlock',
  props: {
    obj: {
      type: Object,
      value: null
    }
  },
  data () {
    return { bgColor: '' }
  },
  methods: {
    toSecondRoute () {
      console.log(this.$route)
      console.log(this.$router)
      this.$router.push(this.$route.path + '/' + this.obj.title)
    }
  },
  created () {
    // 1 custom
    // const { bgColorArr } = this.$store.state
    // const randomRange = Math.random() * bgColorArr.length
    // const randomIndex = Math.floor(randomRange)
    // this.bgColor = bgColorArr[randomIndex]
    // 2 random
    const arr = []
    for (let i = 3; i--;) {
      arr.push(Math.floor(Math.random() * 255))
    }
    this.bgColor = `rgb(${arr.join()})`
  }
}
</script>

<style lang="stylus" scoped>
.pedia-block
  width 25vw
  height 20vh

  display flex
  align-items center
  justify-content center
  line-height 1
  font-size 6vh
  font-weight bolder

  transition all .1s ease-out
  p
    user-select none
    color #2c3e50

.pedia-block:hover
  transform scale(1.1)

</style>
