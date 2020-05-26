<template>
  <div class="BFC">
    A block formatting context is a part of a visual CSS rendering of a web page
    It's the region in which the layout of block boxes occurs
    and in which floats interact with other elements
    <h1>create one : </h1>
    根元素html <br>
    float != none <br>
    overflow != visiable 块元素 <br>
    position = absolute&fixed <br>

    (display = flex & inline-flex) > * <br>
    (display = grid & inline-grid) > * <br>
    display = inline-block <br>
    display = flow-root <br>

    display = table <br>
    display = table-row <br>
    匿名表格单元格元素 <br>
    多列容器 <br>

    contain = layout & content & paint <br><hr>

    浮动定位和清除浮动时只会应用于同一个BFC内的元素<br>
    浮动不会影响其它BFC中元素的布局<br>
    而清除浮动只能清除同一BFC中在它前面的元素的浮动<br>
    外边距折叠（Margin collapsing）也只会发生在属于同一BFC的块级元素之间<br>

  </div>
</template>

<script>
export default {
  name: 'BFC'
}
</script>
