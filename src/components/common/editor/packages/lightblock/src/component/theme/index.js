import Vue from "vue"
import ThemeSelector from "./ThemeSelector";


export { ThemeSelector }

export default (container, language, value, onChange) => {
  const vm = new Vue({
    render: h => {
      return h(ThemeSelector, {
        props: {
          language,
          value,
          onChange
        }
      })
    }
  })
  container.append(vm.$mount().$el)
  return vm
}
