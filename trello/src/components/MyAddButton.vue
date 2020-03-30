<template>
  <div>
    <as-popover trigger="click">
      <button class="add-drop-icon" slot="ref">
        <svg-icon name="ic-plus" width="24" height="24"></svg-icon>
      </button>
      <div class="add-drop-menu">
        <ul>
          <li>Создать задачу</li>
          <li>Создать колонку</li>
        </ul>
      </div>
    </as-popover>
  </div>
</template>

<script>
import AsPopover from "../components/AsPopover";

export default {
  name: "MyAddButton",
  components: {
    AsPopover
  }
};
</script>

<style scoped lang="scss">
.add-drop-icon {
  margin-right: 10px;
  background: none;
  border: solid 1px #ebedf2;
  padding: 15px;
  border-radius: 6px;
}
.add-drop-menu {
  background-color: #fff;
}
</style>
