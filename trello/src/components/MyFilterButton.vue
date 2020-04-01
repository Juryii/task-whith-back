<template>
  <div class="filter-frop">
    <as-popover append-to-body trigger="click">
      <button slot="ref" class="filter-drop-icon">
        <svg-icon name="ic-filter" width="22" height="20"></svg-icon>
      </button>
      <div class="filter-drop-list">
        <p class="filter-drop-list__header">Показать задачи с меткой</p>
        <my-check-box
          v-for="(filterLink, index) in filterLinks"
          :key="index"
          :nameIcon="filterLink.name"
          :id="filterLink.id"
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
    </as-popover>
  </div>
</template>

<script>
import { mapState } from "vuex";
import MyCheckBox from "../components/MyCheckBox";
export default {
  components: {
    MyCheckBox
  },
  computed: {
    ...mapState({
      users: state => state.users.data,
      priorities: state => state.priorities.data
    }),
    filterLinks: function() {
      return [...this.users, ...this.priorities];
    }
  }
};
</script>
<style lang="scss">
.filter-drop {
  position: relative;
}
.filter-drop-icon {
  margin-right: 10px;
  background: none;
  border: solid 1px #ebedf2;
  padding: 15px;
  border-radius: 6px;
  :hover {
    cursor: pointer;
  }
}
.filter-drop-list {
  padding: 26px 20px 0px 20px;
  background-color: #fff;
  bottom: 0;
  z-index: 100;
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
</style>
