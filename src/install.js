import components from './components/components'

const plugin = {
  install (Vue) {
    console.log("Initializing Vue Bootstrap components");
    for (const prop in components) {
        console.log(`Component: ${prop}`);
        const component = components[prop]
        Vue.component(component.name, component)
    }
  }
}

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

import './styles/styles.scss'
export * from './composables'
export default plugin
