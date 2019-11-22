<template>
    <div>page2    <async-component>1</async-component></div>

</template>
<script>
const asyncComponent = ()=>import(/* webpackChunkName: "AsyncComponent" */ './components/AsyncComponent')
export default {
    components:{
        asyncComponent
    }
}
</script>

