<template>
    <div>page2    <async-component>1</async-component></div>

</template>
<script>
const asyncComponent = ()=>import(/* webpackChunkName: "./page2/components/_PayResult" */ './asyncComponent')
export default {
    components:{
        asyncComponent
    }
}
</script>

