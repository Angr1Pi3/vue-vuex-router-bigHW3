<template>
  <nav class="navbar">
    <h3 @click="toTasklist">Task Manager</h3>

    <ul class="navbar-menu">
      <li>
        <router-link to="/">Все задачи</router-link>
      </li>
      <li>
        <router-link to="/new">Создать</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
  setup(){
    const router = useRouter()
    const toTasklist = () =>{
      router.push('/')
    }

    return {
      toTasklist
    }
  }
};
</script>

<style scoped>
.navbar h3{
  cursor: pointer;
}
</style>
