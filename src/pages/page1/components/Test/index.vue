<template>
  <div>
    page1
    <img src="../../assets/wave.jpg">
  </div>
</template>

<script>
export default {
  name: 'Test',
  app: 'page1',
  methods: {
    /**
         *
         * @param {String} obj 对象A
         * @returns number 返回
         */
    mapObjectA (obj) {
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
