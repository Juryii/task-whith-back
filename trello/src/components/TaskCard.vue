<template>
  <div
    :class="[
      'task-card',
      {
        'card-highest-border': priority && priority.name == 'Highest'
      }
    ]"
  >
    <div class="title-card">
      {{ data.title }}
    </div>
    <div
      v-if="priority"
      :class="
        'card-' + priority.modifier + ' card-priority col-12 col-md-6 col-lg-4'
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
<style scoped>
.task-card {
  padding: 16px;
  box-shadow: 1px 3px 10px rgba(210, 210, 210, 0.56),
    0px 1px 2px rgba(0, 0, 0, 0.13);
  background: rgb(255, 255, 255);
  border-radius: 6px;
  margin-bottom: 8px;
}
.task-card:hover {
  background-color: #edf4fa;
}
.task-card:hover .title-card {
  color: #194db3;
}
.title-card {
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #0e0e0e;
}
.card-priority {
  border-radius: 3px;
  width: 30%;
  text-align: center;
  font-style: normal;
  font-weight: bold;
  font-size: 11px;
  line-height: 13px;
  text-transform: uppercase;
  padding: 4px 8px;
  margin-top: 16px;
  margin-bottom: 12px;
}
/* modifier classes */
.card-lowest {
  background: #a0ce8b;
  color: #388513;
}
.card-low {
  background: #dbf1d1;
  color: #6ca451;
}
.card-medium {
  background: #fbf0ca;
  color: #b5a15f;
}
.card-high {
  background: #f0a4ad;
  color: #ffffff;
}
.card-highest {
  background: #d5495a;
  color: #ffffff;
}
.card-highest-border {
  border: 2px solid rgba(245, 25, 25, 0.25);
}
</style>
