import Vue from "vue";
import { uid } from "quasar";
const state = {
  tasksDaily: {
    2020929: {
      ID1: {
        name: "Task1",
        completed: false,
        dueData: "2020/09/30",
        dueTime: "18:30",
        taskType: 'today',
        taskKey: 2020929
      },
      ID2: {
        name: "Task2",
        completed: false,
        dueData: "2020/09/29",
        dueTime: "18:30",
        taskType: 'today',
        taskKey: 2020929
      }
    }
  },
  tasksWeek: {
    2020928: {
      ID1: {
        name: "Week Task1",
        completed: false,
        dueData: "2020/09/30",
        dueTime: "18:30",
        taskType: 'week',
        taskKey: 2020928
      },
      ID2: {
        name: "Week Task2",
        completed: false,
        dueData: "2020/09/29",
        dueTime: "18:30",
        taskType: 'week',
        taskKey: 2020928
      }
    }
  },
  tasksMonth: {
    20209: {
      ID1: {
        name: "Month Task1",
        completed: false,
        dueData: "2020/09/30",
        dueTime: "18:30",
        taskType: 'month',
        taskKey: 20209
      },
      ID2: {
        name: "Month Task2",
        completed: false,
        dueData: "2020/09/29",
        dueTime: "18:30",
        taskType: 'month',
        taskKey: 20209
      }
    }
  },
  tasksYear: {
    2020: {
      ID1: {
        name: "Year Task1",
        completed: false,
        dueData: "2020/09/30",
        dueTime: "18:30",
        taskType: 'year',
        taskKey: 2020
      },
      ID2: {
        name: "Year Task2",
        completed: false,
        dueData: "2020/09/29",
        dueTime: "18:30",
        taskType: 'year',
        taskKey: 2020
      }
    }
  }
}

const mutations = {
  updateTask(state, payload) {
    var taskType = payload.updates.taskType
    var taskKey = payload.updates.taskKey
    if (taskType === 'today') {
      Object.assign(state.tasksDaily[parseInt(taskKey)][payload.id], payload.updates)
    }
    if (taskType === 'week') {
      Object.assign(state.tasksWeek[parseInt(taskKey)][payload.id], payload.updates)
    }
    if (taskType === 'month') {
      Object.assign(state.tasksMonth[parseInt(taskKey)][payload.id], payload.updates)
    }
    if (taskType === 'year') {
      Object.assign(state.tasksYear[parseInt(taskKey)][payload.id], payload.updates)
    }
  },
  deleteTask(state, id) {
    Vue.delete(state.tasksDaily, id)
  },
  addTask(state, payload) {
    var taskType = payload.task.taskType
    var taskKey = payload.task.taskKey
    if (taskType === 'today') {
      if (state.tasksDaily[parseInt(taskKey)]) {
        Vue.set(state.tasksDaily[parseInt(taskKey)], payload.id, payload.task)
      } else {
        Vue.set(state.tasksDaily, parseInt(taskKey), {})
        Vue.set(state.tasksDaily[parseInt(taskKey)], payload.id, payload.task)
      }
    }
    if (taskType === 'week') {
      if (state.tasksWeek[parseInt(taskKey)]) {
        Vue.set(state.tasksWeek[parseInt(taskKey)], payload.id, payload.task)
      } else {
        Vue.set(state.tasksWeek, parseInt(taskKey), {})
        Vue.set(state.tasksWeek[parseInt(taskKey)], payload.id, payload.task)
      }
    }
    if (taskType === 'month') {
      if (state.tasksMonth[parseInt(taskKey)]) {
        Vue.set(state.tasksMonth[parseInt(taskKey)], payload.id, payload.task)
      } else {
        Vue.set(state.tasksMonth, parseInt(taskKey), {})
        Vue.set(state.tasksMonth[parseInt(taskKey)], payload.id, payload.task)
      }
    }
    if (taskType === 'year') {
      if (state.tasksYear[parseInt(taskKey)]) {
        Vue.set(state.tasksYear[parseInt(taskKey)], payload.id, payload.task)
      } else {
        Vue.set(state.tasksYear, parseInt(taskKey), {})
        Vue.set(state.tasksYear[parseInt(taskKey)], payload.id, payload.task)
      }
    }
  }
}

const actions = {
  updateTask({ commit }, payload) {
    commit("updateTask", payload)
  },
  deleteTask({ commit }, id) {
    commit("deleteTask", id)
  },
  addTask({ commit }, task) {
    let taskId = uid()
    let payload = {
      id: taskId,
      task: task
    };
    commit("addTask", payload)
  }
}

const getters = {
  getTask: (state) => (taskType, taskKey) => {
    if (taskType === 'today') {
      if (state.tasksDaily[parseInt(taskKey)]) {
        return state.tasksDaily[parseInt(taskKey)]
      } else {
        return {}
      }
    }
    if (taskType === 'week') {
      if (state.tasksWeek[parseInt(taskKey)]) {
        return state.tasksWeek[parseInt(taskKey)]
      } else {
        return {}
      }
    }
    if (taskType === 'month') {
      if (state.tasksMonth[parseInt(taskKey)]) {
        return state.tasksMonth[parseInt(taskKey)]
      } else {
        return {}
      }
    }
    if (taskType === 'year') {
      if (state.tasksYear[parseInt(taskKey)]) {
        return state.tasksYear[parseInt(taskKey)]
      } else {
        return {}
      }
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
