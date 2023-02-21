<template>
  <form class="card">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" id="title" v-model.trim="title" />
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input type="date" id="date" v-model="deadline" />
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea id="description" v-model.trim="desc"></textarea>
    </div>

    <button
      class="btn primary"
      @click.prevent="formHandle"
      :disabled="isBtnDisabled"
    >
      Создать
    </button>
  </form>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const router = useRouter()

    let title = ref("");
    let deadline = ref("");
    let desc = ref("");

    let timeDelta = computed(() => Date.parse(deadline.value) - Date.now());

    let isBtnDisabled = computed(() => {
      if (title.value && deadline.value && desc.value) {
        if (timeDelta.value > 0) {
          return false;
        }
      } 
      return true;
    });

    const formHandle = () => {
      deadline = new Date (Date.parse(deadline.value))
      createNewTask()
      router.push("/")
      
    };

    const createNewTask = () => {
      store.commit("createTask", { title, deadline, desc });
    };

    return {
      title,
      deadline,
      desc,
      formHandle,
      isBtnDisabled,
    };
  },
};
</script>
