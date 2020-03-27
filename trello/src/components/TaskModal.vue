<template>
  <!--  <div class="modal-window">-->
  <b-modal
    id="modalTask"
    center
    hide-header
    hide-footer
    hide-header-close
    p-0
    class="modal-item"
  >
    <form @submit.prevent="updateTask">
      <b-container>
        <input
          type="text"
          v-model="title"
          class="modal-item__input-title col-12"
        />

        <div class="row modal-item__content-wrap col-12">
          <div
            class="col-12 col-md-8 modal-item__description-block"
            style="padding: 0;"
          >
            <div class="modal-item__description-title">Описание задачи</div>
            <textarea
              class="modal-item__description-textarea"
              v-model="description"
            ></textarea>
          </div>

          <div class="modal-item__select-block col-12 col-md-4">
            <div>
              <div class="modal-item__select-title">Исполнитель</div>
              <select
                v-model="selectedUser"
                class="select  modal-item__select-user"
              >
                <option v-for="user in users" :value="user.id" :key="user.id">
                  {{ user.name }}
                </option>
              </select>
            </div>
            <div>
              <div class="modal-item__select-title">Приоритет</div>
              <select
                v-model="selectedPriority"
                class="select modal-item__select-priority"
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

        <button
          class="modal-item__btn modal-item__btn--blue col-12 col-md-3"
          type="submit"
        >
          Сохранить
        </button>
        <button
          class="modal-item__btn modal-item__btn--white col-12 col-md-3"
          @click="$bvModal.hide('modalTask')"
        >
          Отменить
        </button>
      </b-container>
    </form>
  </b-modal>
  <!--  </div>-->
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
<style scoped lang="scss">
.modal-item {
  &__input-title {
    border: none;
    margin-top: 8px;
    width: 100%;
    margin-bottom: 12px;
    padding-left: 4px;
  }
  &__content-wrap {
    display: flex;
    flex-direction: row;
  }
  &__description-block {
    height: 150px;
    border: 1px solid #e4ebef;
    box-shadow: 0px 0px 3px rgba(216, 231, 240, 0.25);
    border-radius: 3px;
    margin-bottom: 18px;
    padding: 0;
  }
  &__description-title {
    margin-left: 18px;
    margin-top: 12px;
    font-weight: normal;
    font-size: 11px;
    line-height: 13px;
    color: #727272;
    margin-bottom: 8px;
  }
  &__description-textarea {
    width: 100%;
    height: 70%;
    border: none;
    padding-left: 18px;
  }
  &__select-block {
    display: flex;
    flex-direction: column;
  }
  &__select-title {
    margin-bottom: 5px;
    font-style: normal;
    font-weight: normal;
    font-size: 11px;
    line-height: 13px;
    color: #727272;
  }
  &__btn {
    display: inline-block;
    text-align: center;
    text-decoration: none;
    border: none;
    padding: 16px 46px;
    font-size: 15px;
    line-height: 18px;
    border-radius: 4px;
    margin-right: 12px;
    :hover {
      box-shadow: 0px 1px 12px rgba(148, 177, 235, 0.46),
        0px 2px 4px rgba(26, 100, 210, 0.22);
    }
    &--blue {
      background-color: #023cab;
      color: #fff;
      &:hover {
        background-color: #044edc;
      }
    }
    &--white {
      background-color: #fff;
      color: #201f40;
    }
  }
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
</style>
