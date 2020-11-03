// src/core/instance/state.js 源码路径
function initProps (vm: Component, propsOptions: Object) {
    const propsData = vm.$options.propsData || {}
    const props = vm._props = {}
    // cache prop keys so that future props updates can iterate using Array
    // instead of dynamic object key enumeration.
    const keys = vm.$options._propKeys = []
    const isRoot = !vm.$parent
    // root instance props should be converted
    if (!isRoot) {
      toggleObserving(false)
    }
    for (const key in propsOptions) {
      keys.push(key)
      const value = validateProp(key, propsOptions, propsData, vm)
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        const hyphenatedKey = hyphenate(key)
        if (isReservedAttribute(hyphenatedKey) ||
            config.isReservedAttr(hyphenatedKey)) {
          warn(
            `"${hyphenatedKey}" is a reserved attribute and cannot be used as component prop.`,
            vm
          )
        }
        defineReactive(props, key, value, () => {
          if (!isRoot && !isUpdatingChildComponent) {
            warn(
              `Avoid mutating a prop directly since the value will be ` +
              `overwritten whenever the parent component re-renders. ` +
              `Instead, use a data or computed property based on the prop's ` +
              `value. Prop being mutated: "${key}"`,
              vm
            )
          }
        })
      } else {
        defineReactive(props, key, value)
      }
      // static props are already proxied on the component's prototype
      // during Vue.extend(). We only need to proxy props defined at
      // instantiation here.
      if (!(key in vm)) {
        proxy(vm, `_props`, key)
      }
    }
    toggleObserving(true)
  }
  // src/core/observer/index.js
  /**
   * Define a reactive property on an Object.
   */
  export function defineReactive (
    obj: Object,
    key: string,
    val: any,
    customSetter?: ?Function,
    shallow?: boolean
  ) {
    const dep = new Dep()
  
    const property = Object.getOwnPropertyDescriptor(obj, key)
    if (property && property.configurable === false) {
      return
    }
  
    // cater for pre-defined getter/setters
    const getter = property && property.get
    const setter = property && property.set
    if ((!getter || setter) && arguments.length === 2) {
      val = obj[key]
    }
  
    let childOb = !shallow && observe(val)
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function reactiveGetter () {
        const value = getter ? getter.call(obj) : val
        if (Dep.target) {
          dep.depend()
          if (childOb) {
            childOb.dep.depend()
            if (Array.isArray(value)) {
              dependArray(value)
            }
          }
        }
        return value
      },
      set: function reactiveSetter (newVal) {
        const value = getter ? getter.call(obj) : val
        /* eslint-disable no-self-compare */
        if (newVal === value || (newVal !== newVal && value !== value)) {
          return
        }
        /* eslint-enable no-self-compare */
        if (process.env.NODE_ENV !== 'production' && customSetter) {
          customSetter()
        }
        // #7981: for accessor properties without setter
        if (getter && !setter) return
        if (setter) {
          setter.call(obj, newVal)
        } else {
          val = newVal
        }
        childOb = !shallow && observe(newVal)
        dep.notify()
      }
    })
  }