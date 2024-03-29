### 目标

我们的最终目标是写一个库，借助这个库，开发者可以方便的声明一个[AntDesign](https://ant.design/)风格的表单。同时开发者可以通过简单的代码，对该表单进行赋值、取值、声明联动逻辑和校验逻辑等操作。

### 实现思路

我们会按以下顺序开展工作

1. 按照具体的功能点选择合适的框架，如 Form Builder, JSON Schema Validator 等
2. 根据所选框架提供的底层 API 实现我们的库需要的功能点
3. 汇总功能点，形成我们自己的库的 API

前期的探索阶段，我们会在`src/cases`目录下展示各个功能点、对比各个框架性能。

### 要实现哪些特性

- 为了解决性能问题，需要能够方便地拆分成子表单

  - 拆分成子表单之后，赋初始值、取值、联动要对开发者透明

- 方便地声明字段联动关系

  - 支持多级联动(A -> B -> C)
  - 检测并提示形成闭环的联动(A -> B -> C -> A)
  - 标识出被联动影响的字段(如使用`Form.Item`的`warning`样式)

- 支持字段权限控制(不可见、只读、无限制)

  - 不可见和只读字段，在表单取值时也需要能取到值

- 方便地声明校验逻辑

  - 支持异步校验

- 动态表单

  - 动态增减表单项
  - 动态修改表单项校验规则

### TODO

- [ ] 表单性能如何度量(直观感受，非必要 render 次数)
- [ ] 抽象联动逻辑，判断一组联动逻辑是否成环
- [ ] 拆分子表单
  - [ ] 子表单取值
  - [ ] 子表单间的联动
- [ ] 抽象校验逻辑
- [ ] 如何声明表单，JSX 还是 JSONSchema

### 参考资料

- [React Final Form](https://github.com/final-form/react-final-form)
- [Formik](https://github.com/jaredpalmer/formik)
- [Ajv](https://github.com/epoberezkin/ajv)
- [React JSON Schema Form](https://github.com/mozilla-services/react-jsonschema-form)
- [UForm](https://github.com/alibaba/uform)
