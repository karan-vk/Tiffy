<template>
  <v-snackbar v-model="snakactivate" :timeout="5000" :color="type">
    <slot></slot>
    <v-btn outlined color="white" @click="snackbar = false">Close </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  props: [ "type", "snackbar"],
  data() {
    return {};
  },
  computed: {
    snakactivate: {
      get() {
        return this.snackbar;
      },

      set() {
        return this.snackbar;
      },
    },
  },
};
</script>

<style></style>
