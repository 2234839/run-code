/** ════════════════════════🏳‍🌈 实用功能 🏳‍🌈════════════════════════
 *  利用 composition-api 实现的一些实用功能
 ** ════════════════════════🚧 实用功能 🚧════════════════════════ */
import { customRef, nextTick, watch, watchEffect, WatchSource } from "vue";

class PromiseObj<T, Err = Error> {
  pending = false;
  fulfilled = false;
  rejected = false;
  data = {} as T;
  error = {} as Err;
  private p = Promise.resolve() as Promise<unknown>;
  setP(p: Promise<unknown>) {
    this.p = p;
  }
  equalP(p: Promise<unknown>) {
    return this.p === p;
  }
  reLoad() {}
}

interface usePromiseComputedOptions<T> {
  /** 函数内的依赖变更的时候就重新计算,指定了 deps 则不会依赖于 getter 内的 ref 了
   *  tips: 可以将其设置为 `()=>[]` 从而不主动执行 getter(), 可以通过调用返回的 reLoad 来调用 getter()
   */
  deps?: WatchSource<any>;
  /** data 的默认值 */
  defaultData?: T;
  getter: () => Promise<T>;
  /** 处理数据是否要和之前的数据进行合并 */
  dataMergeFun?: (oldData: T, newData: T) => T;
}
export function usePromiseComputed<T, Err = Error>({
  deps,
  getter,
  dataMergeFun = (oldData, newData) => newData,
  defaultData,
}: usePromiseComputedOptions<T>) {
  const r = new PromiseObj<T, Err>();
  if (defaultData !== undefined) {
    r.data = defaultData;
  }
  return customRef<PromiseObj<T, Err>>((track, trigger) => {
    if (!deps) {
      watchEffect(() => update(getter()));
    } else if (deps) {
      if (deps instanceof Function) {
        const depsSource = deps();
        if (Array.isArray(depsSource) && depsSource.length === 0) {
          // 特性，传递空数组则先不执行 getter ，由用户自己决定时机执行 reload
        } else {
          watch(deps, () => update(getter()), { immediate: true });
        }
      } else {
        watch(deps, () => update(getter()), { immediate: true });
      }
    }
    function update(p: Promise<T>) {
      r.setP(p);
      r.pending = true;
      r.fulfilled = false;
      r.rejected = false;

      // 立即触发会导致死循环，所以包裹一层
      nextTick(trigger);
      p.then((res) => {
        // 避免 「求值fun」 第一次执行产生的 promise 比 第二次产生的后结束 导致 数据错误的采用了第一次的
        if (r.equalP(p)) {
          r.pending = false;
          r.fulfilled = true;
          r.data = dataMergeFun(r.data, res);
        }
      })
        .catch((e) => {
          if (r.equalP(p)) {
            r.pending = false;
            r.rejected = true;
            r.error = e;
          }
        })
        .finally(() => {
          if (r.equalP(p)) {
            trigger();
          }
        });
    }
    r.reLoad = () => {
      update(getter());
    };
    return {
      get() {
        track();
        return r;
      },
      set(newValue) {
        console.warn("不可设置值");
      },
    };
  });
}

/** 防抖的 ref */
export function useDebouncedRef<T>(value: T, delay = 200) {
  let timeout = 0;
  return customRef<T>((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          value = newValue;
          trigger();
        }, delay) as unknown as number;
      },
    };
  });
}
