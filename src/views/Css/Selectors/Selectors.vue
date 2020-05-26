<template>
  <div class="selectors">
    <img src="@/assets/specifishity.png" alt="">
    0
    组选择器 Grouping Selectors
      A,B
    组合器 Combinators
      A B Descendant combinator
      A > B Child combinator
      A ~ B General sibling combinator
      A + B Adjacent sibling combinator
    通用选择器 Universal selector
    0-1
    类型(元素)选择器 Type selector
    伪元素
      ::after
      ::before
      ::selection
      ::first-line
      ::first-letter
      ::slotted
      ::cue
    0-1-0
    类选择器 Class selector
    伪类
      :active
      :checked
      :default
      :defined
      :disabled
      :empty
      :enabled
      :first
      :first-child
      :first-of-type
      :focus
      :focus-within
      :host
      :host()
      :hover
      :indeterminate
      :in-range
      :invalid
      :lang()
      :last-child
      :last-of-type
      :left
      :link
      :not()
      :nth-child()
      :nth-last-child()
      :nth-last-of-type()
      :nth-of-type()
      :only-child
      :only-of-type
      :optional
      :out-of-range
      :read-only
      :read-write
      :required
      :right
      :root
      :scope
      :target
      :valid
      :visited
    属性选择器 Attribute selector
      attr
      尾部 空格+s区分大小写 空格+i反之
        attr=
        attr*=
        attr^=
        attr$=
        attr~=
          属性是一个以空格作为分隔的值列表，其中至少有一个值为 value
        attr|=
          属性值为“value”或是以“value-”为前缀（"-"为连字符，Unicode 编码为 U+002D）开头

    0-1-0-0
    ID 选择器 ID selector
    1-0-0-0
    内联 in-line
    1-0-0-0-0
    !important

    最后一种
    AB选择器，我找不到相关文档
  </div>
</template>

<script>
export default {
  name: 'Selectors'

}
</script>

<style lang="stylus" scoped>
  .selectors img
    height 100vh
</style>
