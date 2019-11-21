<template>
    <div>page2    <async-component>1</async-component></div>

</template>
<script>
const asyncComponent = ()=>import(/* webpackChunkName: "asyncComponent" */ './asyncComponent')
export default {
    components:{
        asyncComponent
    }
}
</script>

