<template>
  <q-card style="min-width:300px;">
    <model-header>Edit Tassk</model-header>
    <form @submit.prevent="submitForm">
      <q-card-section class="q-pt-none">
        <model-task-name
          :name.sync="tasktoSubmit.name"
          ref="modelTaskName"
        ></model-task-name>
        <model-due-date
          :dueData.sync="tasktoSubmit.dueData"
          @clear="clearDueDate"
        ></model-due-date>
        <model-due-time
          v-if="tasktoSubmit.dueData"
          :dueTime.sync="tasktoSubmit.dueTime"
        ></model-due-time>
      </q-card-section>
      <model-buttons></model-buttons>
    </form>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ["task", "id"],
  data () {
    return {
      tasktoSubmit: {}
    }
  },
  methods: {
    ...mapActions("tasks", ["updateTask"]),
    submitForm() {
      this.$refs.modelTaskName.$refs.name.validate()
      if (!this.$refs.modelTaskName.$refs.name.hasError) {
        this.submitTask()
      }
    },
    submitTask() {
      this.updateTask({
        id: this.id,
        updates: this.tasktoSubmit
      });
      this.$emit("close")
    },
    clearDueDate() {
      this.tasktoSubmit.dueData = "";
      this.tasktoSubmit.dueTime = "";
    }
  },
  components: {
    "model-header": require("./Shared/ModelHeader.vue").default,
    "model-task-name": require("./Shared/ModelTaskName.vue").default,
    "model-due-date": require("./Shared/ModelDueDate.vue").default,
    "model-due-time": require("./Shared/ModelDueTime.vue").default,
    "model-buttons": require("./Shared/ModelButtons.vue").default
  },
  mounted () {
    this.tasktoSubmit = Object.assign({}, this.task);
  }
};
</script>

<style></style>
