<template>
    <div>page1
        <img src="../../assets/wave.jpg"/>

    </div>
</template>

<script>
import { METHODS } from 'http';
export default {
    name:'test',
    app:'page1',
    methods:{
        mapObjectA(obj){
            return 1
        }
    }
}
</script>

<style scoped>
img{
    background: white;
}
</style>


