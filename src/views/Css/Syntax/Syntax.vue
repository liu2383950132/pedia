<template>
  <div class="syntax">
    <h1># declaration 声明</h1>
    <h2>属性与值的键值对(大小写不敏感)</h2>
    <textarea name id cols="30" rows="10">
      冒号 U+003A 隔开 两边空白不必需

      CSS 属性有 100 多个 值几乎有无限多个
      并非所有的属性与值的配对都是被允许的
      每个属性都定义了它的合法值

      如果值对给定的属性而言非法时
      声明就会被视为无效的
      整个声明就会被CSS引擎忽略
    </textarea>
    <hr />

    <h1># declaration block 声明块</h1>
    <textarea name id cols="30" rows="10">
      左大括号U+007B开始 右大括号U+007D结束
      分号 U+003B 隔开声明
      声明之间的空格会被忽略
      声明块里最后一个声明可不用分号
    </textarea>
    <hr />

    <h1># ruleset 规则集(简称规则)</h1>
    <h2>group of selectors + declaration block</h2>
    <textarea name id cols="30" rows="10">
      一个元素可能被多个选择器选中
      因此会有多个规则
      有可能以不同的值去设置同一属性
      层叠（cascade) 算法会规定哪个优先级最高并生效

      用一组选择器来定义的单个规则集
      比用多个单一选择器来定义的多个规则集更加简洁

      却会导致一个重要的后果：
        如果其中的一个*选择器无效*
        如使用了一个未知的伪元素或伪类
        会导致整个选择器都会无效
        同时对应的规则都会被忽略

      h1, h2:hoverer
        // :hoverer伪类不存在，h1的color也失效
        color:#008c8c
    </textarea>
    <hr />

    <h1>statement 语句</h1>

  </div>
</template>

<script>
export default {
  name: 'Syntax'
}
</script>

<style lang="stylus" scoped>
h1, h2:hoverer
  color:#008c8c
</style>
