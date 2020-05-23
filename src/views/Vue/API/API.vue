<template>
  <div class="api">

    <h5>自定义颜色</h5>
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title"> <span>global</span> </template>

        <el-submenu index="1-1">
          <template slot="title">config</template>
          <el-menu-item index="1-1-1">选项1</el-menu-item>
          <el-menu-item index="1-1-2">选项1</el-menu-item>
          <el-menu-item index="1-1-3">选项1</el-menu-item>
          <el-menu-item index="1-1-4">选项1</el-menu-item>
        </el-submenu>

        <el-submenu index="1-2">
          <template slot="title">API</template>
          <el-menu-item index="1-2-1">选项1</el-menu-item>
          <el-menu-item index="1-2-2">选项1</el-menu-item>
          <el-menu-item index="1-2-3">选项1</el-menu-item>
          <el-menu-item index="1-2-4">选项1</el-menu-item>
        </el-submenu>

      </el-submenu>

      <el-submenu index="2">
        <template slot="title"> <span>instance</span> </template>

        <el-submenu index="2-1">
          <template slot="title">成员</template>

          <el-submenu index="2-1-1">
            <template slot="title">数据</template>
            <el-menu-item index="2-1-1-1">选项1</el-menu-item>
            <el-menu-item index="2-1-1-2">选项1</el-menu-item>
            <el-menu-item index="2-1-1-3">选项1</el-menu-item>
          </el-submenu>

          <el-submenu index="2-1-2">
            <template slot="title">DOM</template>
            <el-menu-item index="2-1-1-1">选项1</el-menu-item>
            <el-menu-item index="2-1-1-2">选项1</el-menu-item>
            <el-menu-item index="2-1-1-3">选项1</el-menu-item>
          </el-submenu>

          <el-submenu index="2-1-3">
            <template slot="title">钩子</template>
            <el-menu-item index="2-1-1-1">选项1</el-menu-item>
            <el-menu-item index="2-1-1-2">选项1</el-menu-item>
            <el-menu-item index="2-1-1-3">选项1</el-menu-item>
          </el-submenu>

          <el-submenu index="2-1-4">
            <template slot="title">资源</template>
            <el-menu-item index="2-1-1-1">选项1</el-menu-item>
            <el-menu-item index="2-1-1-2">选项1</el-menu-item>
            <el-menu-item index="2-1-1-3">选项1</el-menu-item>
          </el-submenu>

          <el-submenu index="2-1-5">
            <template slot="title">组合</template>
            <el-menu-item index="2-1-1-1">选项1</el-menu-item>
            <el-menu-item index="2-1-1-2">选项1</el-menu-item>
            <el-menu-item index="2-1-1-3">选项1</el-menu-item>
          </el-submenu>

          <el-submenu index="2-1-6">
            <template slot="title">其他</template>
            <el-menu-item index="2-1-1-1">选项1</el-menu-item>
            <el-menu-item index="2-1-1-2">选项1</el-menu-item>
            <el-menu-item index="2-1-1-3">选项1</el-menu-item>
          </el-submenu>

        </el-submenu>

        <el-submenu index="2-2">
          <template slot="title">API</template>

          <el-submenu index="2-2-1">
            <template slot="title">property</template>
            <el-menu-item index="2-2-1-1">选项1</el-menu-item>
            <el-menu-item index="2-2-1-2">选项1</el-menu-item>
            <el-menu-item index="2-2-1-3">选项1</el-menu-item>
          </el-submenu>

          <el-submenu index="2-2-2">
            <template slot="title">数据</template>
            <el-menu-item index="2-2-2-1">选项1</el-menu-item>
            <el-menu-item index="2-2-2-2">选项1</el-menu-item>
            <el-menu-item index="2-2-2-3">选项1</el-menu-item>
          </el-submenu>

          <el-submenu index="2-2-3">
            <template slot="title">event</template>
            <el-menu-item index="2-2-3-1">选项1</el-menu-item>
            <el-menu-item index="2-2-3-2">选项1</el-menu-item>
            <el-menu-item index="2-2-3-3">选项1</el-menu-item>
          </el-submenu>

          <el-submenu index="2-2-4">
            <template slot="title">lifecycle</template>
            <el-menu-item index="2-2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-2-4-2">选项1</el-menu-item>
            <el-menu-item index="2-2-4-3">选项1</el-menu-item>
          </el-submenu>

        </el-submenu>

        <el-submenu index="2-3">
          <template slot="title">attribute</template>

          <el-submenu index="2-3-1">
            <template slot="title">directives</template>
            <el-menu-item index="2-3-1-1">选项1</el-menu-item>
            <el-menu-item index="2-3-1-2">选项1</el-menu-item>
            <el-menu-item index="2-3-1-3">选项1</el-menu-item>
          </el-submenu>

          <el-submenu index="2-3-2">
            <template slot="title">key, ref, is</template>
            <el-menu-item index="2-3-2-1">选项1</el-menu-item>
            <el-menu-item index="2-3-2-2">选项1</el-menu-item>
            <el-menu-item index="2-3-2-3">选项1</el-menu-item>
          </el-submenu>

        </el-submenu>

        <el-submenu index="2-4">
          <template slot="title">bulid-in cpn</template>

            <el-menu-item index="2-4-1">component</el-menu-item>
            <el-menu-item index="2-4-2">transition</el-menu-item>
            <el-menu-item index="2-4-3">transition-group</el-menu-item>
            <el-menu-item index="2-4-4">keep-alive</el-menu-item>
            <el-menu-item index="2-4-5">slot</el-menu-item>

        </el-submenu>

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
