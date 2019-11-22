# rhy-mutiply-page
Vue 多页应用工程

## 目录结构
```
src 
|- pages
|-- Page1               // 单独页面工程 Page1
|--- components         // Page1 页面的组件
|---- ComponentA        // 组件包ComponentA
|----- index.vue        // 组件包ComponentA入口vue文件
|----- index.less       // 组件包ComponentA入口style文件
|----- index.js         // 组件包ComponentA入口js
|--- assets             // 静态资源文件
|--- utils              // 页面utils
|--- services           // service层 用于封装请求网络数据api
|--- models             // model层 定义ts实体对象（可选）
|---- request           // model层 定义ts请求实体对象（可选）
|---- reponse           // model层 定义ts响应实体对象（可选）
|--- router             // 路由模块（可选）
|-- Page2               // 单独页面工程 Page2
|--  ...
|--  ...
|- public               // 复用模块
```

## 编码规范

### 命名
1.  页面、组件使用包结构的模式,包名始终是单词大写开头,入口文件始终使用index全小写的命名。
如：

```
|-- Page1               // 单独页面工程 Page1
|--- components         // Page1 页面的组件
|---- ComponentA        // 组件包ComponentA
|----- index.vue        // 组件包ComponentA入口vue文件
|----- index.less       // 组件包ComponentA入口style文件
|----- index.js         // 组件包ComponentA入口js
```

2. 组件引用采用包名引用，包名注册，包名使用。其中使用时不含children的组件要使用自闭合使用。如：

``` javascript
// 应用
import ComponentA from './ComponentA'

// 注册
export default {
    components:{
        ComponentA
    }
}

// 使用
<template>

    <ComponentA/>

    <ComponentA>
        demo
    </ComponentA>
</template>
```

3. 在声明 prop 的时候，其命名应该始终使用 camelCase，而在模板和 JSX 中应该始终使用 kebab-case。如：

``` javascript
// 声明
props: {
  propA: String
}


// 使用
<template>
    <ComponentA prop-a="demo"/>
</template>

```

4.  在父子组件事件分发的的时候时候，其事件、模板和 JSX 中应该始终使用 kebab-case。如：

``` javascript
// 子组件分发事件

<template>
    <div @click="$emit('on-demo-click','demo')">demo</div>
</template>

// 父组件监听
<template>
    <ComponentA @on-demo-click="onComponentADemoClick"/>
</template>

```


5.  计算属性compute的命名应遵循computeAaBb的命名规范。如：

``` javascript
export default {
    compute:{
        computeAa(){
            return ''
        }
    }
}
```

6.  监听模版上组件的命名，应遵循 on[Component][EventPrefix][Event]。其中Component组件名，EventPrefix事件修饰符，Event事件如：


``` javascript
// 父组件监听
<template>
    <ComponentA @on-demo-click="onComponentADemoClick"/>
</template>

export default {
    ...
    methods:{
        onComponentADemoClick(demo){
            console.log(demo)
        }
    }
}

```

7. 状态管理的action统一命名为dispatchAaBb,mutation统一命名为commitAaBb,如：

``` javascript

// action
const action  ={
    dispacthActionDemoA(state,value){

    }
}

// mutation
const mutation = {
    commitMutationDemoB(state,value){

    }
}
```

8. 其余命名。如：

```javascript

// 格式化ObjectA
function normalizeObjectA(){

}

// 唤起EventA
function invokeEventA(){

}

// 请求NetworkA
function requestNetworkA(){

}

// 获取ObjectA
function getObjectA(){

}

// 映射ObjectA
function mapObjectA(){

}

```


## 注意事项

1.  每个页面异步引入组件的时候需要加上 webpackChunkName。如：

```javascript
// Page1/router.vue
const Test = () => import(/* webpackChunkName: "Test" */ "./components/Test");
```
