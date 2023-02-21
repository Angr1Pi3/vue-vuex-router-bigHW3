<template>
  <div class="card" v-if="task">
    <h2>{{task.title}}</h2>
    <p><strong>Статус</strong>: <StatusBar :type="task.status" /></p>
    <p><strong>Дэдлайн</strong>: {{ task.deadline.toLocaleDateString() }}</p>
    <p><strong>Описание</strong>: {{task.desc}}</p>
    <div>
      <button class="btn" @click="takeInWork">Взять в работу</button>
      <button class="btn primary" @click="doneTask">Завершить</button>
      <button class="btn danger" @click="cancelTask">Отменить</button>
    </div>
  </div>
  <h3 class="text-white center" v-else>
    Задачи с id = <strong>{{taskId}}</strong> нет.
  </h3>
</template>

<script>
import StatusBar from '../components/StatusBar'
import {ref, props} from 'vue'
import { useStore } from 'vuex';

export default {
  props: ["taskId"],
  components: {StatusBar},
  setup(props){
    const store = useStore();
    const taskId = parseInt(props.taskId)
    const task = store.getters.getTask(taskId);
    console.log(task);

    // active , inWork, canceled
    const takeInWork = () => {
      store.commit('setTaskStatus', {id :taskId, status: "inWork"})
    }
    const cancelTask = () => {
      store.commit('setTaskStatus', {id :taskId, status: "canceled"})
    }
    const doneTask = () => {
      store.commit('setTaskStatus', {id :taskId, status: "done"})
    }

    return {
      task, taskId, takeInWork, cancelTask, doneTask
    }
  }
}
</script>

<style scoped>

</style>