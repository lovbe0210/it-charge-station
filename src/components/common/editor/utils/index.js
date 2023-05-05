import Vue from "vue"
function creatComponent(component, containter, props = {}, emitEvent = {}) {
  const comp = new Vue({
    render(createElement) {
      return createElement(component, {
        props,
        on: emitEvent
      })
    }
  }).$mount()

  containter.appendChild(comp.$el)

  // comp.remove = (): void => {
  //   containter.removeChild(comp.$el);
  //   comp.$destroy();
  // };
  return comp
}

export { creatComponent }
