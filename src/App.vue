<template>
  <div id="app">
    <!--
    <div id="nav">
      <router-link to="/pedia">
        <el-button plain @click="topedia">pedia</el-button>
      </router-link>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    -->
    <router-view/>
  </div>
</template>

<style lang="stylus">
@import url(./style/reset.css);
#app
  height 100%
body
  margin 0
  overflow-x hidden

#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #2c3e50
</style>
