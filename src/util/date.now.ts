import { ref } from "vue";

export const date$ = ref(new Date());
setInterval(() => {
  date$.value = new Date();
}, 100);
