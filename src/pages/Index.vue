<template>
  <q-page class="q-pa-md">
    <q-list bordered separator v-if="Object.keys(tasks).length">
      <task
        v-for="(task, key) in tasks"
        :key="key"
        :task="task"
        :id="key"
      ></task>
    </q-list>

    <div class="absolute-bottom text-center q-mb-lg">
      <q-btn
        round
        color="primary"
        size="24px"
        icon="add"
        @click="showAddTask = true"
      />
    </div>

    <q-dialog v-model="showAddTask">
      <addtask @close="showAddTask = false" :taskType="taskType" :taskKey="taskKey"/>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
export default {
  props: ['taskType', 'taskKey'],
  data () {
    return {
      showAddTask: false
    }
  },
  computed: {
    tasks() {
      return this.$store.getters["tasks/getTask"](this.taskType, this.taskKey);
    }
  },
  components: {
    task: require("components/Tasks/tasks.vue").default,
    addtask: require("components/Tasks/Models/AddTask.vue").default
  }
};
</script>

<style>
.text-strickethrough {
  text-decoration: line-through;
}
</style>
