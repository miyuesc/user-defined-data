import { broadcast } from "@/utils/utils";
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Emitter extends Vue {
  dispatch(componentName: string, eventName: string, params: any) {
    let parent: any = this.$parent || this.$root;
    let name: string = parent.$options.name;

    while (parent && (!name || name !== componentName)) {
      parent = parent.$parent;

      if (parent) {
        name = parent.$options.name;
      }
    }
    if (parent) {
      parent.$emit.apply(parent, [eventName].concat(params));
    }
  }

  broadcast(componentName: string, eventName: string, params: any) {
    broadcast.call(this, componentName, eventName, params);
  }
}
