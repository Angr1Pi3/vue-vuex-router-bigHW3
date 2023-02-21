import { createStore } from "vuex";

let localTaskList = JSON.parse(localStorage.getItem("localTaskList"));
console.log(localTaskList);

if (!localTaskList) {
  localTaskList = [];
}

const store = createStore({
  state() {
    return {
      tasklist: localTaskList
    };
  },
  getters: {
    getTask: (state) => (id) => {
      return state.tasklist.find((task) => task.id === id);
    },
    // getTask(state, id) {
    //   return state.tasklist.find((task) => task.id === id)
    // },
    getActiveTasks(state) {
      return state.tasklist.filter((task) => task.status === "active");
    },
  },
  mutations: {
    updateStorage(state){
      localStorage.setItem("localTaskList", JSON.stringify(state.tasklist));
    },
    setTaskStatus(state, { id, status }) {
      const task = this.getters.getTask(id);
      task.status = status;
      this.commit("updateStorage")
    },

    createTask(state, { title, deadline, desc }) {
      const newTask = {
        id: Date.now(),
        title: title,
        status: "active",
        deadline: deadline,
        desc: desc,
      };
      state.tasklist.push(newTask);
      this.commit("updateStorage")
    },

    filterOutdatedTasks(state) {
      state.tasklist.forEach((task) => {
        if (task.deadline - Date.now() < 0) {
          task.status = "canceled";
        }
      });
    },

    fixDate(state) {
      state.tasklist.forEach((task) => {
        task.deadline = new Date(Date.parse(task.deadline))
      });
    },

    sortTaskList(state) {
      const compare = (el1, el2) => {
        if(el1.status < el2.status) {
          return -1
        }
        if(el1.status > el2.status) {
          return 1
        }
        return 0
      }

      state.tasklist = state.tasklist.sort(compare)
      this.commit("updateStorage")
    }
  },
  actions: {},
});

export default store;
