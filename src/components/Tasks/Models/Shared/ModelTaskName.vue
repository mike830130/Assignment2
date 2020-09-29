<template>
  <div class="row q-mb-sm">
    <q-input
      outlined
      :value="name"
      @input="$emit('update:name', $event)"
      label="Task Name"
      class="col"
      :rules="[val => !!val || 'Field is required']"
      autofocus
      ref="name"
    >
      <template v-slot:append v-if="name">
        <q-icon
          name="close"
          @click="$emit('update:name', '')"
          class="cursor-pointer"
        />
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  props: ["name"]
};
</script>

<style></style>
