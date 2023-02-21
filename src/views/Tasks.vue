<template>
  <h1 v-if="taskList.length === 0" class="text-white center">Задач пока нет</h1>
  <div v-else>
    <h3 class="text-white">Всего активных задач: {{ activeCount }}</h3>
    <div class="card" v-for="task in taskList" :key="task.id">
      <h2 class="card-title">
        {{ task.title }}
        <StatusBar :type="task.status" />
      </h2>
      <p>
        <strong>
          <small>
            {{ task.deadline.toLocaleDateString()  }}
          </small>
        </strong>
      </p>
      <router-link :to="'/task/' + task.id" custom v-slot="{ navigate }"
        ><button class="btn primary" @click="navigate">
          Посмотреть
        </button></router-link
      >
    </div>
  </div>
</template>

<script>
import StatusBar from "../components/StatusBar";
import { ref, reactive, computed ,} from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const taskList = computed(() => store.state.tasklist);
    let activeCount = computed(() => store.getters.getActiveTasks.length);

    return {
      activeCount,
      taskList,
    };
  },
  components: { StatusBar },
};
</script>
