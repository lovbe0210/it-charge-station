import Vue from "vue"
import Select from "./component.vue"

export { Select }

export default (container, defaultValue, onSelect) => {
  const vm = new Vue({
    render: h => {
      return h(Select, {
        props: {
          defaultValue,
          onSelect
        }
      })
    }
  })
  container.append(vm.$mount().$el)
  return vm
}
