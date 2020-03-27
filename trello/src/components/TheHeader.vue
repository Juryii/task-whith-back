<template>
  <!--  TheHeaderWrap-->
  <div class="header">
    <div class="header__logo">
      <svg-icon name="as_logo" height="42px"></svg-icon>
      <div class="header__search">
        <label for="header__search">
          <svg-icon name="ic-search" width="24" height="24"></svg-icon>
          <input
            class="header__search-input"
            type="text"
            id="header__search"
            placeholder="Введите название задачи"
          />
        </label>
      </div>
    </div>
    <div class="header__icons">
      <div class="header__icon-calendar">
        <svg-icon name="ic-calendar" width="24" height="24"></svg-icon>
      </div>
      <div class="header__icon-bell">
        <svg-icon name="ic-bell" width="24" height="24"></svg-icon>
      </div>
      <div class="header__icon-user-avatar">U</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheHeader"
};
</script>

<style scoped lang="scss">
.header {
  background-color: #ffffff;
  display: flex;
  height: 70px;
  align-items: center;
  justify-content: space-between;
  padding-left: 135px;
  padding-right: 135px;
  &__logo {
    display: flex;
    align-items: center;
    &__img {
    }
  }
  &__search {
    margin-left: 50px;
    label {
      .header__search-input {
        border: none;
        margin-left: 18px;
        width: 200px;
      }
    }
  }
  &__icons {
    display: flex;
    align-items: center;
  }
  &__icon-calendar {
    margin-left: 25px;
    &__img {
    }
  }
  &__icon-bell {
    margin-left: 25px;
    margin-right: 25px;
    &__img {
    }
  }
  &__icon-user-avatar {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background-color: darkgrey;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
  }
}
</style>
