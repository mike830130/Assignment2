<template>
  <q-item
    v-ripple
    @click="updateTask({ id: id, updates: { completed: !task.completed } })"
    clickable
    :class="!task.completed ? 'bg-grey-1' : 'bg-green-2'"
  >
    <q-item-section side top>
      <q-checkbox v-model="task.completed"></q-checkbox>
    </q-item-section>
    <q-item-section>
      <q-item-label :class="{ 'text-strickethrough': task.completed }">
        {{ task.name }}
      </q-item-label>
    </q-item-section>
    <q-item-section side v-if="task.dueData">
      <div class="row">
        <q-icon size="18px" name="event" />
        <div class="colum">
          <q-item-label caption>{{ task.dueData }}</q-item-label>
          <small>
            <q-item-label caption class="row justify-end">{{
              task.dueTime
            }}</q-item-label>
          </small>
        </div>
      </div>
    </q-item-section>

    <q-item-section side>
      <div class="row">
        <q-btn
          @click.stop="showEditTask = true"
          flat
          round
          color="primary "
          icon="edit"
        />
        <q-btn
          @click.stop="promptToDelete(id)"
          flat
          round
          color="red"
          icon="delete"
        />
      </div>
    </q-item-section>
    <q-dialog v-model="showEditTask">
      <edittask :task="task" :id="id" @close="showEditTask = false" />
    </q-dialog>
  </q-item>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['task', 'id'],
  data () {
    return {
      showEditTask: false
    };
  },
  methods: {
    ...mapActions('tasks', ['updateTask', 'deleteTask']),
    promptToDelete (id) {
      this.$q
        .dialog ({
          title: 'Confirm',
          message: 'Confirm Delete?',
          cancel: true,
          persistent: true
        })
        .onOk (() => {
          this.deleteTask(id)
        })
    }
  },
  components: {
    edittask: require('./Models/EditTask.vue').default
  }
};
</script>

<style></style>
