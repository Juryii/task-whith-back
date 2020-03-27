<template>
  <div class="task-card">
    <div class="task-card__header">
      <label class="card-check-box__status" :for="data.id">
        <input type="checkbox" :id="data.id" class="card-check-box__input" />
        <div class="card-check-box__icon">
          <svg-icon
            name="ic-check"
            width="11"
            height="8"
            class="card-check-box__icon-img"
          ></svg-icon>
        </div>
        <p class="card-check-box__label-name">Не выполнена</p>
      </label>
      <div class="card-check-box__actions-icon">
        <button class="card-check-box__btn">
          <svg-icon
            name="ic-fire"
            width="14"
            height="18"
            class="card-check-box__icon-img"
          ></svg-icon>
        </button>
        <button class="card-check-box__btn">
          <svg-icon
            name="ic-trash-filled"
            width="16"
            height="18"
            class="card-check-box__icon-img"
          ></svg-icon>
        </button>
      </div>
    </div>
    <div class="task-card__deadline">
      31 января 2018
    </div>
    <div class="task-card__title">
      {{ data.title }}
    </div>
    <div class="task-card__progress-bar">
      <div></div>
    </div>
    <div class="task-card__card-tags">
      <div><span>Работа</span></div>
      <div><span>Важно</span></div>
      <div><span>Супер-Важно</span></div>
    </div>
    <div
      v-if="priority"
      :class="
        'task-card__card-priority--' +
          priority.modifier +
          ' task-card__card-priority col-12 col-md-6 col-lg-4'
      "
    >
      {{ priority.name }}
    </div>
    <div v-if="user">{{ user.name }}</div>

    <br />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState({
      users: state => state.users.data,
      priorities: state => state.priorities.data
    }),
    user() {
      return this.users.find(({ id }) => this.data.user_id === id);
    },
    priority() {
      return this.priorities.find(({ id }) => this.data.priority_id === id);
    }
  }
};
</script>
<style scoped lang="scss">
.task-card {
  padding: 16px;
  box-shadow: 0 2px 2px 0 rgba(100, 109, 130, 0.08),
    0 1px 1px 0 rgba(100, 109, 130, 0.1);
  border-radius: 6px;
  margin-bottom: 8px;
  &__header {
    display: flex;
    justify-content: space-between;
  }
  &__deadline {
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: normal;
    color: #646d82;
    margin-bottom: 10px;
  }
  &__title {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    color: #0e0e0e;
    margin-bottom: 16px;
  }
  &__progress-bar {
    width: 200px;
    height: 5px;
    margin: 10px auto;
    border-radius: 3px;
    background-color: #f1f2f5;
    div {
      height: inherit;
      width: 94px;
      background: rgb(74, 166, 249);
      background: linear-gradient(
        90deg,
        rgba(74, 166, 249, 1) 0%,
        rgba(2, 87, 254, 1) 100%
      );
      border-radius: 3px;
    }
  }
  &__card-tags {
    display: flex;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #333333;
    div {
      border-radius: 4px;
      background-color: rgba(49, 139, 250, 0.2);
      margin: 5px;
      padding: 4px;
    }
  }
  &__card-priority {
    border-radius: 3px;
    text-align: center;
    font-style: normal;
    font-weight: bold;
    font-size: 11px;
    line-height: 13px;
    text-transform: uppercase;
    padding: 4px 8px;
    margin-top: 16px;
    margin-bottom: 12px;
    &--lowest {
      background: #a0ce8b;
      color: #388513;
    }
    &--low {
      background: #dbf1d1;
      color: #6ca451;
    }
    &--medium {
      background: #fbf0ca;
      color: #b5a15f;
    }
    &--high {
      background: #f0a4ad;
      color: #ffffff;
    }
    &--highest {
      background: #d5495a;
      color: #ffffff;
    }
  }
}

.card-check-box {
  &__status {
    display: flex;
    align-items: center;
    padding: 5px 20px;
    margin-left: -20px;
    margin-right: -20px;
    :hover {
      background-color: #f7f9fb;
      cursor: pointer;
    }
  }
  &__label-name {
    border-radius: 4px;
    padding: 4px 6px;
    margin-bottom: 0;
  }
  &__icon {
    width: 28px;
    height: 28px;
    border-radius: 4px;
    display: block;
    border: solid 1px #ebedf2;
    background-color: #ffffff;
    justify-content: center;
    align-items: center;
    padding: 6px;
    margin-right: 12px;
    &-img {
      display: block;
      opacity: 1;
      margin-top: 5px;
      margin-left: 2px;
    }
  }
  &__input {
    display: none;
    &:checked + .card-check-box__icon {
      background-color: #7ec016;
      border: none;
    }
  }
  &__actions-icon {
    display: flex;
    margin-bottom: 10px;
  }
  &__btn {
    border: none;
    background: inherit;
  }
}
</style>
