<template>
  <b-card class="tasks-column">
    <template slot="header">
      <b-card-title class="column-title">
        {{ data.name }}: {{ lengthColumn }}
        <img
          src="@/assets/ic-close.svg"
          class="delete-column"
          @click="deleteColumn"
        />
      </b-card-title>
    </template>
    <div class="task-column-list">
      <div
        class="task=column__card"
        v-for="(card, idx) in data.items"
        :key="card.id"
        button
        @click="showItem(idx)"
      >
        <task-card :data="card"></task-card>
      </div>
    </div>

    <form class="mt-4" @submit.prevent="addItem">
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
          class="mt-4 btn-task"
          variant="light"
          block
          :disabled="isShowInput && invalid"
        >
          Добавить задачу
        </b-button>
      </validation-provider>
    </form>
  </b-card>
</template>

<script>
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
<style scoped>
.column-title {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  line-height: 21px;
  color: #727272;
}
/* .task-column__card {
  padding: 16px;
  border: 2px solid rgba(245, 25, 25, 0.25);
  box-shadow: 1px 3px 10px rgba(210, 210, 210, 0.56),
    0px 1px 2px rgba(0, 0, 0, 0.13);
  background: rgb(255, 255, 255);
  border-radius: 6px;
  margin-bottom: 8px;
} */
.delete-column:hover {
  cursor: pointer;
}
</style>
