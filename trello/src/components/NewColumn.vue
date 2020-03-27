<template>
  <b-card>
    <form @submit.prevent="onSubmit">
      <b-form-input
        ref="input"
        v-show="isShowInput"
        v-model="columnName"
        placeholder="Enter your column name"
        class="mb-4"
        @blur="onInputBlur"
      />
      <b-button type="submit" class="modal-item__btn" block
        >Добавить колонку</b-button
      >
    </form>
  </b-card>
</template>

<script>
export default {
  data() {
    return {
      isShowInput: false,
      columnName: ""
    };
  },
  methods: {
    showInput() {
      this.isShowInput = true;
    },
    hideInput() {
      this.isShowInput = false;
    },
    onInputBlur() {
      setTimeout(() => {
        this.hideInput();
      }, 200);
    },
    onSubmit() {
      if (!this.isShowInput) {
        this.showInput();
        this.$nextTick(() => {
          this.$refs.input.focus();
        });
        return;
      }

      this.$emit("submit", {
        name: this.columnName,
        items: []
      });

      this.isShowInput = false;
      this.columnName = "";
    }
  }
};
</script>
