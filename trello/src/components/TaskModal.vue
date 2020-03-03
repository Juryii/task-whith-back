<template>
  <div class="modal-window">
    <b-modal
      id="modalTask"
      center
      hide-header
      hide-footer
      hide-header-close
      p-0
    >
      <form @submit.prevent="updateTask">
        <b-container>
          <input type="text" v-model="title" class="input-title col-12" />

          <div class="row wrap-desc-sel col-12">
            <div class="col-12 col-md-8 description--wrap" style="padding: 0;">
              <div class="description--title">Описание задачи</div>
              <textarea class="description" v-model="description"></textarea>
            </div>

            <div class="select-wrap col-12 col-md-4">
              <div>
                <div class="select--title">Исполнитель</div>
                <select v-model="selectedUser" class="select select-user">
                  <option v-for="user in users" :value="user.id" :key="user.id">
                    {{ user.name }}
                  </option>
                </select>
              </div>
              <div>
                <div class="select--title">Приоритет</div>
                <select
                  v-model="selectedPriority"
                  class="select select-priority"
                >
                  <option
                    v-for="priority in priorities"
                    :value="priority.id"
                    :key="priority.id"
                  >
                    {{ priority.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <button class="btn-task btn-blue col-12 col-md-3" type="submit">
            Сохранить
          </button>
          <button
            class="btn-task btn-white col-12 col-md-3"
            @click="$bvModal.hide('modalTask')"
          >
            Отменить
          </button>
        </b-container>
      </form>
    </b-modal>
  </div>
</template>
<script>
import { mapState } from "vuex";
import http from "../services/http";

export default {
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      title: this.data.title,
      description: this.data.description,
      selectedUser: this.data.user_id,
      selectedPriority: this.data.priority_id
    };
  },
  watch: {
    data(data) {
      this.title = data.title;
      this.description = data.description;
      this.selectedUser = data.user_id;
      this.selectedPriority = data.priority_id;
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
  },
  methods: {
    updateTask() {
      const task = {
        id: this.data.id,
        title: this.title,
        description: this.description,
        user_id: this.selectedUser,
        priority_id: this.selectedPriority,
        column_id: this.data.column_id
      };
      http.patch("/tasks", task).then(response => {
        console.log(response.data);
        this.$emit("updateTask", response.data);
      });
      this.$bvModal.hide("modalTask");
    },
    updateSelectedUser(id) {
      this.selectedUser = id;
      this.updateTask();
    },
    updateSelectedPriority(id) {
      this.selectedPriority = id;
      this.updateTask();
    }
  }
};
</script>
<style>
.input-title {
  border: none;
  margin-top: 8px;
  width: 100%;
  margin-bottom: 12px;
  padding-left: 4px;
}
.wrap-desc-sel {
  display: flex;
  flex-direction: row;
}
.description--wrap {
  height: 150px;
  border: 1px solid #e4ebef;
  box-shadow: 0px 0px 3px rgba(216, 231, 240, 0.25);
  border-radius: 3px;
  margin-bottom: 18px;
  padding: 0;
}
.description--title {
  margin-left: 18px;
  margin-top: 12px;
  font-weight: normal;
  font-size: 11px;
  line-height: 13px;
  color: #727272;
  margin-bottom: 8px;
}
.description {
  width: 100%;
  height: 70%;
  border: none;
  padding-left: 18px;
}
.select-wrap {
  display: flex;
  flex-direction: column;
}
.select--title {
  margin-bottom: 5px;
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  line-height: 13px;
  color: #727272;
}

.select {
  width: 100%;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 18px;
  font-size: 15px;
  line-height: 132.19%;
  border-radius: 4px;
}
.btn-task {
  display: inline-block;
  text-align: center;
  text-decoration: none;
  border: none;
  padding: 16px 46px;
  font-size: 15px;
  line-height: 18px;
  border-radius: 4px;
  margin-right: 12px;
}
.btn-task:hover {
  box-shadow: 0px 1px 12px rgba(148, 177, 235, 0.46),
    0px 2px 4px rgba(26, 100, 210, 0.22);
}
.btn-blue {
  background-color: #023cab;
  color: #fff;
}
.btn-blue:hover {
  background-color: #044edc;
}

.btn-white {
  background-color: #fff;
  color: #201f40;
}
</style>
