import type { ToRefs } from "vue";
import { computed } from "vue";
export function propsToRefs<T extends object>(props: T, emit: (event: any, ...args: any[]) => void): ToRefs<T> {
  const ret: any = {};
  for (const key in props) {
    // ret[key] = toRef(props, key);
    ret[key] = computed({
      get() {
        return props[key];
      },
      set(v) {
        emit(`update:${key}`, v);
      },
    });
  }
  return ret;
}
