import { reactive, computed } from "vue";

/** 返回一个 params对象 与 href 字符串computed ,href 依赖于 params
 * @example
 * ```js
 *   const [AppOptions, href] = useParamsObj(undefined, {});
 *   // 将基于 AppOptions 计算得来的 href 设置到 history
 *   watchEffect(() => history.replaceState("", "", href.value));
 * ```
 */
export function useParamsObj<T extends object>(
  urlStr = document.location.toString(),
  defaultParams: T
) {
  const url = new URL(urlStr);
  const searchParams = url.searchParams;

  const params = reactive(defaultParams);

  searchParams.forEach((v, k) => {
    try {
      (params as any)[k] = atob(v);
    } catch (error) {
      // 兼容直接输入的情况
      (params as any)[k] = v;
    }
  });

  const href = computed(() => {
    Object.keys(params).forEach((k) => {
      const v = btoa((params as any)[k] || "");
      searchParams.set(k, v);
    });
    return url.href;
  });
  return [params, href] as const;
}