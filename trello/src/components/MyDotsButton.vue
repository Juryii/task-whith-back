<template>
  <as-popover append-to-body trigger="click">
    <div class="column-drop-list">
      <button class="column-drop-list__item">Удалить колонку</button>

      <as-popover append-to-body>
        <button slot="ref" class="column-drop-list__item">
          Переместить задачи
        </button>
        <div>
          <ul v-for="column in columns" :key="column.id">
            <li @click="moveTasks(column.id)">
              {{ column.name }}
              <span v-if="column.id === currentIdColumn">текущая</span>
            </li>
          </ul>
        </div>
      </as-popover>
    </div>
    <svg-icon
      slot="ref"
      name="ic-dots"
      width="24"
      height="24"
      class="delete-column"
    >
    </svg-icon>
  </as-popover>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AsPopover from "../components/AsPopover";

export default {
  name: "MyDotsButton",
  components: {
    AsPopover
  },
  computed: {
    ...mapState({
      columns: state => state.columns.data
    })
  },
  methods: {
    moveTasks(columnId) {
      if (columnId === this.currentIdColumn) {
        alert(
          "к сожалению перемещение не возможно, т.к задачи уже находятся в этой колонке"
        );
        return;
      }
      const payload = {
        column_id: columnId,
        old_column_id: this.currentIdColumn
      };
      this.moveTasksColumn(payload);
      console.log(payload);
    },
    ...mapActions({ moveTasksColumn: "columns/moveTasks" })
  },
  props: {
    currentIdColumn: {
      type: Number,
      required: true
    }
  }
};
</script>

<style scoped lang="scss">
.column-drop-list__item {
  background-color: #fff;
  border: solid 1px #ebedf2;
  padding: 15px;
  border-radius: 6px;
}
</style>
