<template>
  <label class="filter-drop-item" :for="'check-' + index">
    <input
      type="checkbox"
      :id="'check-' + index"
      class="filter-drop-item__input"
    />
    <span class="filter-drop-item__icon">
    <svg-icon class="filter-drop-item__icon-img" name="ic-check" width="11" height="8"></svg-icon>
    </span>
    <span class="filter-drop-item__label-name">{{ name }}</span>
  </label>
</template>

<script>
export default {
  name: "MyCheckBox",
  props: {
    name: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  }
};
</script>

<style scoped lang="scss">
.filter-drop-item {
  display: flex;
  align-items: center;
  padding: 5px 20px;
  margin-left: -20px;
  margin-right: -20px;
  &__label-name{
    border-radius: 4px;
    margin-left: 10px;
    padding: 4px 6px;
  }
  :hover{
    background-color: #f7f9fb;
    cursor: pointer;
  }
  &__icon{
    width: 20px;
    height: 20px;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    padding: 6px;
    margin-right: 10px;
    &-img{
      opacity: 0;
      stroke: #fff;
    }
  }
  &__input{
    display: none;
    &:checked + .filter-drop-item__icon {
      background-color: #006eff;
    }
    &:checked ~ .filter-drop-item__label-name{
      border-radius: 4px;
      background-color: rgba(49, 139, 250, 0.2);
    }
    &:checked + .filter-drop-item__icon > .filter-drop-item__icon-img {
      opacity: 1;
    }
  }
}

</style>
