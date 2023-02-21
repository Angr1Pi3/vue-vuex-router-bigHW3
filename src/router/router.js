import { createRouter, createWebHistory } from "vue-router";
import TaskList from '../views/Tasks.vue'
import TaskCreation from '../views/New.vue'
import TaskScreen from '../views/Task.vue'

const router = createRouter({
    history: createWebHistory(),
    
    linkActiveClass : "active",
    linkExactActiveClass : "active",
    
    routes: [
        {path: "/", component: TaskList},
        {path: "/new", component: TaskCreation},
        {path: "/task/:taskId?", component: TaskScreen, props: true},
        {path: "/:notFound(.*)", redirect: "/"},
    ]
})

export default router