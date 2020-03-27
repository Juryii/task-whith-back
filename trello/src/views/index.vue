<template>
  <div>
    <the-header></the-header>
    <div class="the-content">
      <div class="the-content-header">
        <h1 class="the-content-header__text">Мои планы</h1>
        <div class="the-content-header__menu">
          <button
            class="the-content-header__menu-filter the-content-header__icon"
            @click="isFilterBox = true"
          >
            <svg-icon name="ic-filter" width="22" height="20"></svg-icon>
            <div
              class="filter-drop-list"
              v-show="isFilterBox"
              @blur="isFilterBox = false"
            >
              <p class="filter-drop-list__header">Показать задачи с меткой</p>
              <my-check-box
                v-for="(checkboxName, index) in ChecboxLabelsName"
                :key="checkboxName"
                :name="checkboxName"
                :index="index"
              ></my-check-box>
              <div class="filter-drop-list__buttons">
                <input
                  type="button"
                  value="Показать все"
                  class="filter-drop-list__button"
                />
                <input
                  type="button"
                  value="Отфильтровать"
                  class="filter-drop-list__button"
                />
              </div>
            </div>
          </button>
          <button
            class="the-content-header__menu-plus-icon the-content-header__icon"
          >
            <svg-icon name="ic-plus" width="24" height="24"></svg-icon>
            <!--            <img src="@/assets/icons/ic-plus.svg" alt="add" />-->
          </button>
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
          <b-col cols="3">
            <new-column @submit="addNewColumn" />
          </b-col>
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
import NewColumn from "../components/NewColumn";
import TheHeader from "../components/TheHeader";
import MyCheckBox from "../components/MyCheckBox";
// import columns from "../mock/columns";

export default {
  components: {
    TasksColumn,
    TaskModal,
    NewColumn,
    TheHeader,
    MyCheckBox
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
.filter-drop-list {
  top: 65px;
  padding: 26px 20px 0px 20px;
  z-index: 10;
  width: 300px;
  background-color: #fff;
  position: absolute;
  box-shadow: 0 12px 31px 0 rgba(0, 0, 0, 0.1), 0 0 2px 0 rgba(0, 0, 0, 0.03);
  &__header {
  }
  &__buttons {
    display: flex;
    border-top: 1px solid;
    margin-left: -20px;
    margin-right: -20px;
  }
  &__button {
    background: white;
    border: none;
    height: 100%;
    padding: 10px 20px;
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
