<template>
  <as-popover trigger="click">
    <div class="column-drop-list">
      <button class="column-drop-list__item">Удалить колонку</button>

      <as-popover>
        <button slot="ref" class="column-drop-list__item">
          Переместить задачи
        </button>
        <div>
          <ul>
            <li>columns</li>
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
import AsPopover from "../components/AsPopover";

export default {
  name: "MyDotsButton",
  components: {
    AsPopover
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
