<template>
  <span :class="status">{{message}}</span>
</template>

<script>
import { computed, props } from "vue";
export default {
  props: {
    type: {
      type: String,
      reqired: true,
    },
  },
  setup(props) {
    let status = computed(() => {
      switch (props.type) {
        case "active":
          return { "badge": true, "primary": true };
          break;
        case "inWork":
          return { "badge": true, "primary": true };
          break;
        case "canceled":
          return { "badge": true, "danger": true };
          break;
        default:
          return { "badge": true };
          break;
      }
    });

    let message = computed(()=>{
      switch (props.type) {
        case "active":
          return "Активна"
          break;
        case "canceled":
          return "Отменена"
          break;
        case "inWork":
          return "В работе"
          break;
        default:
          return "Завершено";
          break;
      }
    }) 

    return {
      status,
      message,
    };
  },
};
</script>
