<template>
  <div>
    page2
    <AsyncComponent>1</AsyncComponent>
    <Button>test</Button>
    <Checkbox v-model="checked">复选框</Checkbox>
  </div>
</template>
<script>
import { Button, Checkbox } from 'vant'

const AsyncComponent = () =>
  import(
    /* webpackChunkName: "AsyncComponent" */
    './components/AsyncComponent'
  )
export default {
  data () {
    return {
      checked: false
    }
  },
  components: {
    AsyncComponent,
    Button,
    Checkbox
  }
}
</script>
