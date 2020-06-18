<template>
  <div class="es6" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
    <!-- <el-menu
      :default-active="defaultActiveIndex"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item @click="isCollapse = !isCollapse" index="0">
        <i class="el-icon-arrow-right" v-if="isCollapse" ></i>
        <i class="el-icon-arrow-left" v-else></i>
      </el-menu-item>

      <template v-for="(item, i) of arr">
        <el-submenu :key="i" @click="tabClicked(i)" :index="`${i+1}`">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">{{i}}</span>
          </template>

          <el-menu-item-group>
            <el-menu-item index="1-1">{{i}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </template>

    </el-menu>

    <div class="father">

      <template v-for="(item, i) of arr">
        <transition :key="i" name="slide-fade">
          <el-card v-if="item.visible" class="cards"> el-card{{i}} </el-card>
        </transition>
      </template>

    </div> -->

    <!-- 左边块 -->
    <div class="wrapper">
      <el-menu
      :collapse="menuFolded"
      :default-active="defaultActiveName"
      @open="handleOpen"
      @close="handleClose"
      class="el-menu-vertical"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      >
        <!-- menu toggle -->
        <el-menu-item @click="menuFolded = !menuFolded" index="folder">
          <i class="el-icon-menu"></i>
          <!-- <i v-if="menuFolded" class="el-icon-caret-right"></i> -->
          <!-- <i v-else class="el-icon-caret-bottom"></i> -->
          <!-- <span slot="title">导航二</span> -->
        </el-menu-item>

        <!-- menu-item -->
        <template v-for="(item, i) of menuArr">
          <el-menu-item :key="i" :index="`${i}`">
            <i :class="`el-icon-${item.iconClass}`"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
        </template>

        <el-submenu index="animation">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>动画设置</span>
          </template>
            <el-menu-item index="a0">a0</el-menu-item>
            <el-menu-item index="a1">a1</el-menu-item>
            <el-menu-item index="a2">a2</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <!-- 右边块 -->
    <!-- <el-card class="infinite-list">
      <el-card
        v-for="i in count"
        :key="i"
        class="list-item">
          {{stats['FUNCTION'][i] && stats['FUNCTION'][i].question}}
          {{stats['FUNCTION'][i] && stats['FUNCTION'][i].answer}}

        <el-popover
          placement="bottom"
          title="答案"
          width="200"
          trigger="manual"
          content="xxxx"
          v-model="answerVisible">
          <i slot="reference" class="el-icon-warning" @click="answerVisible = !answerVisible"></i>
        </el-popover>
      </el-card>

      <b v-if="loading">loading...</b>
      <b v-if="noMore">nothing more</b>
    </el-card> -->

    <!-- transition add&delete&shuffle  -->
    <!-- <el-card class="infinite-list">
      <div id="list-complete-demo" class="demo">
        <button v-on:click="shuffle">Shuffle</button>
        <button v-on:click="add">Add</button>
        <button v-on:click="remove">Remove</button>
        <transition-group name="list-complete" tag="p">
          <span
            v-for="item in items"
            v-bind:key="item"
            class="list-complete-item"
          >
            {{ item }}
          </span>
        </transition-group>
      </div>
    </el-card> -->

    <!-- multi cpns -->
    <!-- <el-card>
      <el-button @click="`${view === 'v-a' ? view = 'v-b' : view = 'v-a'}`">switch</el-button>
      <transition name="component-fade" mode="out-in">
        <component v-bind:is="view" style="outline:1px solid red">
        </component>
      </transition>
    </el-card> -->

    <!-- multi el -->
    <!-- <el-card>
      <transition>
        <button v-bind:key="docState" @click="docState = (docState === 'save' ? 'editing' : 'save')">
          {{ buttonMessage }}
        </button>
      </transition>
    </el-card> -->

  </div>
</template>
<script>
import stats from './stats.js'
export default {
  name: 'ES6',
  data () {
    return {
      dynamicTags: ['标签一', '标签二', '标签三'],
      // el-menu aside-bar
      menuFolded: true,
      defaultActiveName: 'folder',
      // menu-item
      menuArr: [
        {
          iconClass: 'cold-drink',
          title: '解构赋值'
        },
        {
          iconClass: 'grape',
          title: '数组拓展'
        },
        {
          iconClass: 'sugar',
          title: '对象拓展'
        }
      ],
      // cards-container cards

      // infinite roll
      count: 5,
      loading: false,

      // stats
      stats,
      answerVisible: false,

      // transition add&delete&shuffle
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      nextNum: 10,

      // transition multicpns
      view: 'v-a',

      // multi el
      docState: 'saved'
    }
  },
  components: {
    // 'v-a': {
    //   template: '<div>Component A</div>'
    // },
    // 'v-b': {
    //   template: '<div>Component B</div>'
    // }
  },
  computed: {
    noMore () { return this.count >= 20 },
    disabled () { return this.loading || this.noMore },
    // eslint-disable-next-line vue/return-in-computed-property
    buttonMessage () {
      switch (this.docState) {
        case 'saved': return 'Edit'
        case 'edited': return 'Save'
        case 'editing': return 'Cancel'
      }
    }
  },
  methods: {
    // el-menu aside-bar
    handleOpen (key, keyPath) { console.log(key, keyPath) },
    handleClose (key, keyPath) { console.log(key, keyPath) },
    load () {
      this.loading = true
      setTimeout(() => {
        this.count += 2
        this.loading = false
      }, 500)
    },

    // transition add&delete&shuffle
    getRanIndex () {
      const { random, floor } = Math
      return floor(random() * this.items.length)
    },
    add () {
      this.items.splice(this.getRanIndex(), 0, this.nextNum++)
    },
    remove () {
      this.items.splice(this.getRanIndex(), 1)
    },
    shuffle () {
      let index = -1
      const [...arr] = [...this.items]
      while (++index < arr.length) {
        const ranIndex = this.getRanIndex();
        [arr[ranIndex], arr[index]] = [arr[index], arr[ranIndex]]
      }
      this.items = arr
    }

  }
}
</script>

// 页面样式
<style lang="stylus">
.es6
  min-height 100vh
  display grid
  grid-template-columns auto 1fr
  .wrapper
    height auto
  .el-menu-vertical
    position sticky
    top 0
    height 100vh
    .el-submenu:last-of-type
      position absolute
      bottom 0
      width -webkit-fill-available

    .el-menu-item i, .el-submenu i
      margin-right 20px

  .el-card
    align-self start
    margin 20px

  .el-menu-vertical:not(.el-menu--collapse)
    width 200px

  .infinite-list-wrapper
    overflow:auto
    height auto
    // .list-item
    // height 100px
</style>

// 动画
<style lang="stylus" scoped>
  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  // .slide-fade-enter-active {
  //   transition: all .8s ease;
  // }
  // .slide-fade-leave-active {
  //   transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  // }
  // .slide-fade-enter, .slide-fade-leave-to
  // /* .slide-fade-leave-active for below version 2.1.8 */ {
  //   transform: translateX(10px);
  //   opacity: 0;
  // }

  .es6
  // transition add&delete&shuffle
    .list-complete-item
      display block
      margin-right 10px
      transition all 1s

    /* .list-complete-leave-active for below version 2.1.8 */
    .list-complete-enter, .list-complete-leave-to
      opacity 0
      transform translateY(30px)

    .list-complete-leave-active
      position absolute
  // transition multicpn
    .component-fade-enter-active, .component-fade-leave-active
      transition opacity .3s ease
    .component-fade-enter, .component-fade-leave-to
    /* .component-fade-leave-active for below version 2.1.8 */
      opacity 0
</style>
