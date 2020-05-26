<template>
  <div class="flex">
    <div class="flex-wrapper">
      <div class="one"># display: flex/inline-flex; => 容器成为 flex container</div>
      <div class="one"># 容器属性</div>
      <div class="one">flex-direction : row | row-reverse | column | column-reverse</div>
      <div class="one">flex-wrap : wrap | nowrap | wrap-reverse</div>
      <div class="one">flex-flow : flex-direction flex-wrap;</div>

      <div class="one">justify-content : flex-start | flex-end | center | space-between | space-around | space-evenly; 主轴方向</div>
      <div class="one">align-items : flex-start | flex-end | center | baseline | stretch; 交叉轴方向</div>
      <div class="one">align-content : flex-start | flex-end | center | space-between | space-around | stretch; 交叉轴方向多行</div>

      <div class="one"># 成员属性</div>
      <div class="one">flex-basis</div>
      <div class="one">flex-grow</div>
      <div class="one">flex-shrink</div>
      <div class="one">flex : flex-basis flex-grow flex-shrink;</div>
      <div class="one">order</div>
      <div class="one">align-self: auto | flex-start | flex-end | center | baseline | stretch; 可覆盖align-item</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Flex'
}
</script>

<style lang="stylus">
.flex .flex-wrapper
  display flex
  flex-wrap wrap
  font-size 3vh
  .one
    box-sizing border-box
    border-bottom 2px solid #ccc
    margin 0
    flex-basis 100%
</style>
