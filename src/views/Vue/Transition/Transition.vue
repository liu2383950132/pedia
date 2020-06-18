<template>
  <div class="transition">
    <!-- 00 单元素过渡-->
    <el-card>
      <el-button @click="show = !show">toggle</el-button>
      <div class="wrapper">
        <transition name="name00"> <h1 v-if="false">hello</h1> </transition>
      </div>
    </el-card>

    <!-- name-enter name-enter-active name-enter-to -->
    <!-- name-leave name-leave-active name-leave-to -->

    <!-- 01 单元素过渡 出入动画不同-->
    <el-card>
      <el-button @click="show = !show">toggle</el-button>
      <div class="wrapper">
        <transition name="name01"> <h1 v-if="false">hello</h1> </transition>
      </div>
    </el-card>

    <!-- 动画中 v-enter 类名在节点插入 DOM 后不会立即删除 -->
    <!-- 而在 animationend 事件触发时删除 -->
    <!-- 02 css动画 -->
    <el-card>
      <el-button @click="show = !show">toggle</el-button>
      <div class="wrapper">
        <transition name="name02"> <h1 v-if="false">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum earum consequuntur vero repellendus reiciendis dolorum facere aliquid error tempora illum? Voluptas tempore nemo repudiandae necessitatibus reprehenderit, fugit similique quas iste veritatis sequi? Recusandae accusantium delectus eveniet suscipit fugiat laboriosam dolorem.</h1> </transition>
      </div>
    </el-card>

    <!-- 03 结合 Animate.css -->
    <el-card>
      <el-button @click="show = !show">toggle</el-button>
      <div class="wrapper">
        <transition
          name="custom-classes-transition"
          enter-active-class="animated tada"
          leave-active-class="animated bounceOutRight"
        >
          <h1 v-if="false">hello</h1>
        </transition>
      </div>
    </el-card>

    <!-- 04 结合velocity -->
    <el-card>
      <el-button @click="show = !show">toggle</el-button>
      <div class="wrapper">
        <transition
          v-on:before-enter="beforeEnter"
          v-on:enter="enter"
          v-on:leave="leave"
          v-bind:css="false"
        >
          <h1 v-if="false"> hello </h1>
        </transition>
      </div>
    </el-card>

    <!-- 05 多元素过渡 -->
    <el-card>
      <el-button @click="show = !show">toggle</el-button>
        <transition name="name05">
          <!-- <h1 class="wrapper" v-if="show"> hello </h1> -->
          <!-- <h1 class="wrapper" v-else> tank!!!! </h1> -->
            <!-- v-if 和 v-else 两个元素 -->
            <!-- Vue 为了效率只会替换相同标签内部的内容 -->
            <!-- 通过 key attribute 设置唯一的值来标记以让 Vue 区分它们 -->

          <!-- <h1 class="wrapper" v-if="show" key="if"> hello </h1> -->
          <!-- <h1 class="wrapper" v-else key="else"> tank!!!! </h1> -->
        </transition>
    </el-card>

    <!-- 06 多元素过渡 -->
    <el-card>
      <el-button @click="key06 = !key06">toggle</el-button>
        <transition name="name06">
            <!-- 通过给同一个元素的 key attribute 设置不同的状态 -->
            <!-- 代替 v-if 和 v-else -->
          <h1 class="wrapper" :key="key06"> {{ key06 ? 'true' : 'false' }} </h1>
        </transition>
    </el-card>

    <!-- 07 三元素过渡 动画效果同步化 -->
    <el-card>
      <el-button @click="changeTag">toggle</el-button>
        <transition name="name07" mode="in-out">
        <!-- <transition name="name07" mode="out-in"> -->
          <h1 class="wrapper" :key="tag"> {{ msg }} </h1>
        </transition>
    </el-card>

    <!-- 08 add&remove&shuffle -->
    <el-card>
      {{arr}}<br>
      <el-button @click="add">Add</el-button>
      <el-button @click="remove">remove</el-button>
      <el-button @click="shuffle">Shuffle</el-button>
      <transition-group name="list" tag="p">
        <span
          v-for="item of arr"
          v-bind:key="item"
          class="list-item"
          > {{arr}} </span>
      </transition-group>
      <el-tag v-model="testarr" v-for="item of testarr" :key="item"> {{testarr}} </el-tag>
      <el-button @click="test">testbtn</el-button>
      {{testarr}}
    </el-card>
  </div>
</template>

<script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.3/velocity.min.js"></script>
<script>
export default {
  name: 'VueTransition',
  data () {
    return {
      show: false,
    // 06
      key06: true,
    // 07
      key07: true,
      tag: 'saved',
    // 08
      arr: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      nextNum: 10,
      testarr: ['x', 'y', 'z']
    }
  },
  computed: {
    // 07
    msg () {
      return this.tag === 'saved' ? 'Edit' :
             this.tag === 'edited' ? 'Save' :
             this.tag === 'editing' ? 'Cancel' : 'error'
    }
  },
  methods: {
    beforeEnter: function (el) {
      el.style.opacity = 0
      el.style.transformOrigin = 'left'
    },
    enter: function (el, done) {
      Velocity(el, { opacity: 1, fontSize: '1.4em' }, { duration: 300 })
      Velocity(el, { fontSize: '1em' }, { complete: done })
    },
    leave: function (el, done) {
      Velocity(el, { translateX: '15px', rotateZ: '50deg' }, { duration: 600 })
      Velocity(el, { rotateZ: '100deg' }, { loop: 2 })
      Velocity(el, {
        rotateZ: '45deg',
        translateY: '30px',
        translateX: '30px',
        opacity: 0
      }, { complete: done })
    },
    //07
    changeTag () {
      this.tag  = this.tag === 'saved' ? 'edited' :
                  this.tag === 'edited' ? 'editing' :
                  this.tag === 'editing' ? 'saved' : 'error'
    },
    // 08
    getRanIndex () {
      return Math.floor(Math.random() * this.arr.length)
    },
    add () {
      this.arr.splice(this.getRanIndex(), 0, this.nextNum++)
    },
    remove () {
      this.arr.splice(this.getRanIndex(), 1)
    },
    shuffle: function () {
      let index = -1
      const len = this.arr.length
      while(++index < len) {
        const ranIndex = this.getRanIndex()
        const value = this.arr[index]
        this.arr[index] = this.arr[ranIndex]
        this.arr[ranIndex] = value
      }
      // [...this.arr] = [...this.arr]
    },
    test() {
      // this.testarr[0] = 2
      this.testarr[0] = {}

    }
  }
}
</script>

<style lang="stylus" scoped>
  .el-card
    width 50%
    margin 0 auto
    .wrapper
      outline 3px solid #008c8c
      background #ccc

  // 00
    .name00-enter, .name00-leave-to
      opacity 0
    .name00-enter-active, .name00-leave-active
      transition all 1s

  // 01
    .name01-enter, .name01-leave-to
      opacity 0
      transform translateX(10px)
    .name01-enter-active
      transition all 1.6s ease
    .name01-leave-active
      transition all 1s ease

  // 02
    @keyframes bounce-in {
      0% {
        transform scale(0)
      }
      50% {
        transform scale(1.5)
      }
      100% {
        transform scale(1)
      }
    }
    .name02-enter-active
      animation bounce-in 2s
    .name02-leave-active
      animation bounce-in 2s reverse

  // 05
    .name05-enter, .name05-leave-to
      opacity 0
    .name05-enter-active, .name05-leave-active
      transition all 1s

  // 06
    .name06-enter, .name06-leave-to
      opacity 0
    .name06-enter-active, .name06-leave-active
      transition all 1s

  // 07
    .name07-enter, .name07-leave-to
      opacity 0
    .name07-enter-active, .name07-leave-active
      transition all 1s

  // 08
    .list-item
      transition all 1s
      display inline-block
      margin-right 10px
    .list-enter, .list-leave-to
      opacity 0
      transform translateY(30px)
    .list-leave-active
      position absolute
</style>
