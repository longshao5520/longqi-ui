# Switch开关

## 基础用法
<demo src="./basic.vue" desc="表示两种相互对立的状态间的切换，多用于触发「开/关」"></demo>

## 默认值
<demo src="./defaultValue.vue" desc="value属性可以提供一个初始化的默认值"></demo>

## 禁用
<demo src="./disabled.vue" desc="通过 disabled 属性指定是否禁用"></demo>

## 文字描述
使用`activeText`属性与`inactiveText`属性来设置开关的文字描述。

使用`inlinePrompt`属性来控制文本是否显示在点内。
<demo src="./text.vue"></demo>

## 自定义图标
使用`inactiveIcon`和`activeIcon`属性来添加图标。 

使用`inlinePrompt`属性来控制图标显示在点内。
<demo src="./icon.vue"></demo>

## 扩展的value类型
你可以设置`activeValue`和`inactiveValue`属性， 它们接受`Boolean`、`String` 或 `Number`类型的值。
<demo src="./valueType.vue"></demo>
