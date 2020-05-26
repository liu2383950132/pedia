<template>
  <div class="specificity">
    <h1>specificity 优先级/特殊性/权重</h1>
    <h2>浏览器通过优先级来判断哪些属性值与一个元素最为相关，从而在该元素上应用这些属性值</h2>

    <ul>
      <li>选择器类型的权重决定</li>
      <li>优先级相等 靠后的声明优先</li>
      <li>直接作用于元素的 CSS 规则 覆盖 从祖先元素继承的规则</li>
      <li>为目标元素直接添加样式，永远比继承样式的优先级高</li>
      <li>文档树中元素的接近度（Proximity of elements）对优先级没有影响</li>
      <li>div:not(.outer) p === div.outer p</li>
      <li>#foo > [id="foo"]</li>
      <li>bodyid="parent"h1msg/h1/body h1{} > #parent{}</li>
      <li>内联样式 覆盖外部样式表的任何样式 具有最高优先级</li>

      <li>使用 !important 规则 的样式声明 覆盖任何其他声明</li>
      <li>可在全局的 CSS 文件中写一些 !important 样式 覆盖掉 直接写在元素上的行内样式</li>
    </ul>

    <h2>复制简单的选择器以增加特异性!!!</h2>
      #app#app#app p{
        color:#008c8c
      }

    <h1>cascading 层叠</h1>
    <h2>定义了如何合并来自多个源的属性值的算法</h2>
    <h2>只有CSS声明，就是属性名值对，会参与层叠计算</h2>
    <h2>包含CSS声明以外实体的@规则不参与层叠计算</h2>

    <h2>css源</h2>
      用户代理样式 : 浏览器的基本样式表 给任何网页设置默认样式<br>
      部分浏览器允许用户修改用户代理样式<br>
      网页作者样式表<br>
      读者样式表 浏览器用户使用自定义样式表 定制使用体验<br>
      <hr>
      cascading <br>
      1. 不同源全部规则 过滤并保留 要应用到指定元素上的规则<br>
      2. 优先级<br>
        css transition &gt;<br>
        用户!important &gt; 页面作者!important &gt; 用户代理!important &gt;<br>
        页面作者 &gt; 用户 &gt; 用户代理<br>
      3. 层叠优先级相等 比较specificity

  </div>
</template>

<script>
export default {
  name: 'Specificity'
}
</script>
