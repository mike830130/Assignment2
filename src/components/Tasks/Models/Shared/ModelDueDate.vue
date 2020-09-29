<template>
  <div class="row q-mb-sm">
    <q-input
      outlined
      :value="dueData"
      @input="$emit('update:dueData', $event)"
      label="Due Date(YYYY/MM/DD)"
      style="width:100%"
    >
      <template v-slot:append>
        <q-icon
          name="close"
          @click="$emit('clear')"
          class="cursor-pointer"
          v-if="dueData"
        />
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy>
            <q-date :value="dueData" @input="$emit('update:dueData', $event)" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  props: ["dueData"]
};
</script>

<style></style>
