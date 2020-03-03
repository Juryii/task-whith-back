<template>
  <b-container fluid>
    <b-row>
      <b-col v-for="(column, idx) in columns" :key="column.id" cols="3">
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
</template>

<script>
import http from "../services/http";
import TasksColumn from "../components/TasksColumn";
import TaskModal from "../components/TaskModal";
import NewColumn from "../components/NewColumn";
// import columns from "../mock/columns";

export default {
  components: {
    TasksColumn,
    TaskModal,
    NewColumn
  },
  data() {
    return {
      columns: [],
      modalItem: {},
      itemIndexonModal: "",
      columnIndexModal: ""
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

<style>
body {
  font-family: "Roboto";
}
</style>
