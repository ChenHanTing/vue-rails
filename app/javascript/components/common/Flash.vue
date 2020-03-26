<template>
  <div class="flash" v-if="!hide">
    <div
      class="alert"
      :class="
        status ? 'alert-success alert-dismissible' : 'alert-error alert-warning'
      "
    >
      <button
        type="button"
        class="close"
        data-dismiss="alert"
        aria-hidden="true"
        @click="statusOnChange"
      >
        ×
      </button>
      <h5>
        <i
          :class="
            status ? 'icon fas fa-check-circle' : 'icon fas fa-check-triangle'
          "
        ></i>
        <span v-if="status">Success!</span>
        <span v-else>Error!</span>
      </h5>
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: String,
    status: Boolean,
    hide: Boolean
  },
  methods: {
    statusOnChange() {
      this.$emit("btnclick", true);
    }
  }
};
</script>
