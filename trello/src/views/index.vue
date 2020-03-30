<template>
  <div>
    <the-header></the-header>
    <div class="the-content">
      <div class="the-content-header">
        <h1 class="the-content-header__text">Мои планы</h1>
        <div class="the-content-header__menu">
          <!-- filter button -->
          <my-filter-button></my-filter-button>
          <!--  add button   -->
          <my-add-button></my-add-button>
          <button
            class="the-content-header__task-button the-content-header__button"
          >
            <svg-icon name="ic-done" width="22" height="20"></svg-icon>
            Задачи
          </button>
          <button
            class="the-content-header__calendar-button the-content-header__button"
          >
            <svg-icon name="ic-calendar" width="16" height="18"></svg-icon>
            Календарь
          </button>
        </div>
      </div>
      <b-container fluid class="the-content-block">
        <b-row class="the-content-row">
          <b-col
            v-for="(column, idx) in columns"
            :key="column.id"
            cols="3"
            class="the-content-row-item"
          >
            <tasks-column
              :data="column"
              @change="onColumnChange(idx, $event)"
              @show="showCard(idx, $event)"
              @deleteColumn="deleteColumn(column.id, idx)"
            />
          </b-col>
          <!--           <b-col cols="3">
            <new-column @submit="addNewColumn" />
          </b-col> -->
        </b-row>
        <task-modal :data="modalItem" @updateTask="updateTask" />
      </b-container>
    </div>
  </div>
</template>

<script>
import http from "../services/http";
import TasksColumn from "../components/TasksColumn";
import TaskModal from "../components/TaskModal";
import MyFilterButton from "../components/MyFilterButton.vue";
import TheHeader from "../components/TheHeader";
import MyAddButton from "../components/MyAddButton";

export default {
  components: {
    TasksColumn,
    TaskModal,
    // NewColumn,
    TheHeader,
    MyFilterButton,
    MyAddButton
  },
  data() {
    return {
      ChecboxLabelsName: ["Работа", "Важно", "Супер-важно", "Читать", "Книги"],
      columns: [],
      modalItem: {},
      itemIndexonModal: "",
      columnIndexModal: "",
      isFilterBox: false
    };
  },
  mounted() {
    http.get("/columns").then(response => {
      this.columns = response.data;
    });

    this.$store.dispatch("users/getList");
    this.$store.dispatch("priorities/getList");
  },
  methods: {
    updateTask(task) {
      // console.log(this.columnIndexModal, this.itemIndexonModal)
      // this.columns[this.itemIndexonModal].items[this.itemIndexonModal] = task;
      this.$set(
        this.columns[this.columnIndexModal].items,
        this.itemIndexonModal,
        task
      );
    },
    deleteColumn(columnId, idx) {
      http
        .delete("/columns", {
          data: {
            id: columnId
          }
        })
        .catch(err => {
          console.error(err);
          // this.errors.push(e)
        });

      this.columns.splice(idx, 1);
    },
    addNewColumn(column) {
      http
        .put("/columns", {
          name: column.name
        })
        .then(response => {
          this.columns.push({
            ...response.data,
            items: []
          });
        })
        .catch(err => {
          console.error(err);
          // this.errors.push(e)
        });
    },
    onColumnChange(idx, column) {
      console.log(idx, column);
      this.$set(this.columns, idx, column);
    },

    showCard(idx, itemIndex) {
      // console.log(idx, itemIndex)
      this.modalItem = this.columns[idx].items[itemIndex];
      this.itemIndexonModal = itemIndex;
      this.columnIndexModal = idx;
      this.$bvModal.show("modalTask");
    }
  }
};
</script>

<style lang="scss">
.the-content-header {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  margin-bottom: 16px;
  &__text {
  }
  &__menu {
    display: flex;
    height: 52px;
    align-items: center;
    &-filter {
      position: relative;
    }
  }
  &__icon {
    display: flex;
    justify-content: center;
    margin-right: 15px;
    height: 52px;
    width: 52px;
    border-radius: 6px;
    border: solid 1px #ebedf2;
    img {
      width: 24px;
    }
  }
  &__menu-plus-icon {
  }
  &__button {
    padding: 14px 24px;
    border-radius: 6px;
    justify-content: center;
    align-items: center;
    svg {
      margin-right: 10px;
    }
  }
  &__task-button {
    background-color: #ffffff;
  }
  &__calendar-button {
    border: solid 1px #ebedf2;
  }
}
.the-content-block {
  position: relative;
}
.the-content-row-item:first-child {
  padding-left: 0;
}
.the-content {
  margin-left: 135px;
  margin-right: 135px;
}
</style>
