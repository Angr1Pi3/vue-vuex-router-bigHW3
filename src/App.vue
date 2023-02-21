<template>
  <the-navbar />
  <div class="container with-nav">
    <router-view />
  </div>
</template>

<script>
import TheNavbar from "./components/TheNavbar.vue";
import { onBeforeMount } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore()
    onBeforeMount(()=>{
      store.commit("fixDate")
      store.commit("filterOutdatedTasks")
      store.commit("sortTaskList")
    })
    return {};
  },
  components: {
    "the-navbar": TheNavbar,
  },
};
</script>

<style></style>
