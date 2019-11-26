<template>
  <div>
    page2
    <AsyncComponent>1</AsyncComponent>
    <Button>test</Button>
    <Checkbox v-model="checked">
      复选框
    </Checkbox>
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
  components: {
    AsyncComponent,
    Button,
    Checkbox
  },
  data () {
    return {
      checked: false
    }
  }
}
</script>
