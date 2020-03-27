<template>
  <b-card class="tasks-column">
    <form @submit.prevent="addItem">
      <validation-provider rules="required" v-slot="{ errors, invalid }">
        <b-form-input
          ref="input"
          v-show="isShowInput"
          v-model="taskName"
          placeholder="Enter your task name"
          @blur="onInputBlur"
        />
        <span v-if="errors && isShowInput">{{ errors[0] }}</span>
        <b-button
          type="submit"
          class="mt-4 modal-item__btn"
          variant="light"
          block
          :disabled="isShowInput && invalid"
        >
          Добавить задачу
        </b-button>
      </validation-provider>
    </form>
    <template slot="header">
      <b-card-title class="task-column__title">
        {{ data.name }}: {{ lengthColumn }}
      </b-card-title>
      <svg-icon
        name="ic-dots"
        width="24"
        height="24"
        class="delete-column"
        @click="deleteColumn"
      ></svg-icon>
    </template>
    <div data-simplebar class="tasks-column__list">
      <div class="task-column__card" v-for="card in data.items" :key="card.id">
        <!--      add v-for idx before card  @click="showItem(idx)"-->
        <task-card :data="card"></task-card>
      </div>
    </div>
  </b-card>
</template>

<script>
import "simplebar";
import "simplebar/dist/simplebar.css";
import TaskCard from "./TaskCard";
import http from "../services/http";

export default {
  components: {
    TaskCard
  },
  data() {
    return {
      isShowInput: false,
      taskName: ""
    };
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    deleteColumn() {
      this.$emit("deleteColumn");
    },
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
    addItem() {
      if (!this.isShowInput) {
        this.showInput();
        this.$nextTick(() => {
          this.$refs.input.focus();
        });
        return;
      }
      if (!this.data.items) {
        this.data.items = [];
      }
      const items = [...this.data.items];
      // console.log(this.data.id);
      http
        .put("/tasks", {
          columnId: this.data.id,
          title: this.taskName
        })
        .then(response => {
          items.push(response.data);
        });

      this.isShowInput = false;
      this.taskName = "";

      this.$emit("change", {
        ...this.data,
        items
      });
    },
    showItem(idx) {
      // console.log(idx)
      this.$emit("show", idx);
    }
  },
  computed: {
    lengthColumn() {
      return this.data.items.length;
    }
  }
};
</script>
<style scoped lang="scss">
.tasks-column {
  border: none;
  background-color: #f9fafc;
  max-height: 500px;
  &__title {
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.22;
    letter-spacing: normal;
    img {
      width: 24px;
    }
  }
  &__btn-task {
    border-radius: 6px;
    border: solid 1px #ebedf2;
    width: 100%;
    margin-bottom: 15px;
  }
  &__list {
    height: 400px;
  }
}
.card-header {
  border: none;
  background-color: #f9fafc;
  display: flex;
  justify-content: space-between;
}
.card-header,
.card-body {
  padding: 0;
}

.delete-column:hover {
  cursor: pointer;
}
</style>
