<template>
  <div class="api">

    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title"> <span>GLOBAL 全局</span> </template>

        <el-submenu index="1-1">
          <template slot="title">config</template>
          <el-menu-item index="1-1-1">silent</el-menu-item>
          <el-menu-item index="1-1-2">devtools</el-menu-item>
          <el-menu-item index="1-1-3">productionTip</el-menu-item>
          <el-menu-item index="1-1-4">optionMergeStrategies</el-menu-item>
          <el-menu-item index="1-1-5">errorHandler</el-menu-item>
          <el-menu-item index="1-1-6">warnHandler</el-menu-item>
          <el-menu-item index="1-1-7">performance</el-menu-item>
          <el-menu-item index="1-1-8">ignoredElements</el-menu-item>
          <el-menu-item index="1-1-9">keyCodes</el-menu-item>
        </el-submenu>

        <el-submenu index="1-2">
          <template slot="title">API</template>
          <el-menu-item index="1-1-1">Vue.extend</el-menu-item>
          <el-menu-item index="1-1-2">Vue.mixin</el-menu-item>
          <el-menu-item index="1-1-3">Vue.nextTick</el-menu-item>
          <el-menu-item index="1-1-4">Vue.set</el-menu-item>
          <el-menu-item index="1-1-5">Vue.delete</el-menu-item>
          <el-menu-item index="1-1-6">Vue.directive</el-menu-item>
          <el-menu-item index="1-1-7">Vue.filter</el-menu-item>
          <el-menu-item index="1-1-8">Vue.component</el-menu-item>
          <el-menu-item index="1-1-9">Vue.use</el-menu-item>
          <el-menu-item index="1-1-10">Vue.compile</el-menu-item>
          <el-menu-item index="1-1-11">Vue.observable</el-menu-item>
          <el-menu-item index="1-1-12">Vue.version</el-menu-item>
        </el-submenu>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title"> <span>INSTANCES 实例</span> </template>
        <el-submenu index="2-1">
          <template slot="title">成员/选项</template>

          <el-submenu index="2-1-1">
            <template slot="title">data</template>
            <el-menu-item index="2-1-1-1">props</el-menu-item>
            <el-menu-item index="2-1-1-2">propsData</el-menu-item>
            <el-menu-item index="2-1-1-3">computed</el-menu-item>
            <el-menu-item index="2-1-1-4">methods</el-menu-item>
            <el-menu-item index="2-1-1-5">watch</el-menu-item>
          </el-submenu>

          <el-submenu index="2-1-2">
            <template slot="title">DOM</template>
            <el-menu-item index="2-1-2-1">el</el-menu-item>
            <el-menu-item index="2-1-2-2">template</el-menu-item>
            <el-menu-item index="2-1-2-3">render</el-menu-item>
            <el-menu-item index="2-1-2-4">renderError</el-menu-item>
          </el-submenu>

          <el-submenu index="2-1-3">
            <template slot="title">钩子</template>
            <el-menu-item index="2-1-3-1">beforeCreate created</el-menu-item>
            <el-menu-item index="2-1-3-2">beforeMount mounted</el-menu-item>
            <el-menu-item index="2-1-3-3">beforeUpdate updated</el-menu-item>
            <el-menu-item index="2-1-3-4">activated deactivated</el-menu-item>
            <el-menu-item index="2-1-3-5">beforeDestroy destroyed</el-menu-item>
            <el-menu-item index="2-1-3-6">errorCaptured</el-menu-item>
          </el-submenu>

          <el-submenu index="2-1-4">
            <template slot="title">资源</template>
            <el-menu-item index="2-1-4-1">directives</el-menu-item>
            <el-menu-item index="2-1-4-2">filters</el-menu-item>
            <el-menu-item index="2-1-4-3">components</el-menu-item>
          </el-submenu>

          <el-submenu index="2-1-5">
            <template slot="title">组合</template>
            <el-menu-item index="2-1-5-1">parent</el-menu-item>
            <el-menu-item index="2-1-5-2">mixins</el-menu-item>
            <el-menu-item index="2-1-5-3">extends</el-menu-item>
            <el-menu-item index="2-1-5-4">provide/inject</el-menu-item>
          </el-submenu>

          <el-submenu index="2-1-6">
            <template slot="title">其他</template>
            <el-menu-item index="2-1-6-1">name</el-menu-item>
            <el-menu-item index="2-1-6-2">delimiters</el-menu-item>
            <el-menu-item index="2-1-6-3">functional</el-menu-item>
            <el-menu-item index="2-1-6-4">model</el-menu-item>
            <el-menu-item index="2-1-6-5">inheritAttrs</el-menu-item>
            <el-menu-item index="2-1-6-6">comments</el-menu-item>
          </el-submenu>

        </el-submenu>

        <el-submenu index="2-2">
          <template slot="title">实例成员</template>

          <el-submenu index="2-2-1">
            <template slot="title">实例成员 属性</template>
            <el-menu-item index="2-2-1-1">vm.$data</el-menu-item>
            <el-menu-item index="2-2-1-2">vm.$props</el-menu-item>
            <el-menu-item index="2-2-1-3">vm.$el</el-menu-item>
            <el-menu-item index="2-2-1-4">vm.$options</el-menu-item>
            <el-menu-item index="2-2-1-5">vm.$parent</el-menu-item>
            <el-menu-item index="2-2-1-6">vm.$children</el-menu-item>
            <el-menu-item index="2-2-1-7">vm.$slots</el-menu-item>
            <el-menu-item index="2-2-1-8">vm.$scopedSlots</el-menu-item>
            <el-menu-item index="2-2-1-9">vm.$refs</el-menu-item>
            <el-menu-item index="2-2-1-10">vm.$isServer</el-menu-item>
            <el-menu-item index="2-2-1-11">vm.$attrs</el-menu-item>
            <el-menu-item index="2-2-1-12">vm.$listeners</el-menu-item>
          </el-submenu>

          <el-submenu index="2-2-2">
            <template slot="title">实例成员 方法</template>
            <el-submenu index="2-2-2-1">
              <template slot="title">数据</template>
              <el-menu-item index="2-2-2-1-1">vm.$watch</el-menu-item>
              <el-menu-item index="2-2-2-1-2">vm.$set</el-menu-item>
              <el-menu-item index="2-2-2-1-3">vm.$delete</el-menu-item>
            </el-submenu>

            <el-submenu index="2-2-2-2">
              <template slot="title">事件</template>
              <el-menu-item index="2-2-2-2-1">vm.$on</el-menu-item>
              <el-menu-item index="2-2-2-2-2">vm.$once</el-menu-item>
              <el-menu-item index="2-2-2-2-3">vm.$off</el-menu-item>
              <el-menu-item index="2-2-2-2-4">vm.$emit</el-menu-item>
            </el-submenu>

            <el-submenu index="2-2-2-3">
              <template slot="title">lifecycle</template>
              <el-menu-item index="2-2-2-2-1">vm.$mount</el-menu-item>
              <el-menu-item index="2-2-2-2-2">vm.$forceUpdate</el-menu-item>
              <el-menu-item index="2-2-2-2-3">vm.$nextTick</el-menu-item>
              <el-menu-item index="2-2-2-2-4">vm.$destroy</el-menu-item>
            </el-submenu>
          </el-submenu>

        </el-submenu>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title"> <span>ATTRIBUTES</span> </template>

        <el-submenu index="3-1">
          <template slot="title">directives</template>
          <el-menu-item index="1-1-1">once pre cloak</el-menu-item>
          <el-menu-item index="1-1-2">text html</el-menu-item>
          <el-menu-item index="1-1-3">if show else-if else</el-menu-item>
          <el-menu-item index="1-1-4">for</el-menu-item>
          <el-menu-item index="1-1-5">model</el-menu-item>
          <el-menu-item index="1-1-6">slot</el-menu-item>
          <el-menu-item index="1-1-7">bind on</el-menu-item>
        </el-submenu>

        <el-submenu index="3-2">
          <template slot="title">special</template>
          <el-menu-item index="1-1-1">key</el-menu-item>
          <el-menu-item index="1-1-2">ref</el-menu-item>
          <el-menu-item index="1-1-3">is</el-menu-item>
        </el-submenu>
      </el-submenu>

      <el-submenu index="4">
        <template slot="title"> <span>BUILT-IN CPNs</span> </template>
        <el-menu-item index="1-1-1">component</el-menu-item>
        <el-menu-item index="1-1-2">transition</el-menu-item>
        <el-menu-item index="1-1-2">transition-group</el-menu-item>
        <el-menu-item index="1-1-3">keep-alive</el-menu-item>
        <el-menu-item index="1-1-4">slot</el-menu-item>
      </el-submenu>

    </el-menu>

  </div>
</template>

<script>
export default {
  name: 'API',
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="stylus" scoped>
.api .el-menu
  width 30vw
</style>

<style lang="stylus">
#app
  margin-top 0
</style>
