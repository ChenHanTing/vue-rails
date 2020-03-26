<template>
  <div>
    <Flash
      :message="flash_message"
      :status="flash_seccess"
      :hide="flash_hidden"
      @btnclick="updateHiddenStatus"
    />

    <div class="container">
      <h1>Todo Lists</h1>
      <div class="row">
        <div class="col-md-4 col-sm-6">
          <input
            type="text"
            id="account"
            name="account"
            autofocus="true"
            v-model="account"
            class="form-control"
            placeholder="請輸入會員帳號（email）"
          />
        </div>
        <div class="col-md-2 col-sm-2">
          <button
            type="button"
            class="btn btn-secondary"
            @click="fetchTodoLists()"
            :disabled="!account.length"
          >
            查詢
          </button>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-6 col-sm-6">
          <input
            type="text"
            v-model="todo"
            class="form-control"
            autofocus="true"
          />
        </div>
        <div class="col-md-2 col-sm-2">
          <select v-model="selected" class="form-control">
            <option selected value="">請選擇</option>
            <option v-for="option in options" :value="option.value">
              {{ option.text }}
            </option>
          </select>
          <p>Selected: {{ selected }}</p>
        </div>
        <div class="col-md-2 col-sm-2">
          <button
            @click="addTodo()"
            class="btn btn-primary"
            :disabled="!(todo.length && selected)"
          >
            加入
          </button>
        </div>
      </div>
      <br />
      <table class="table">
        <thead>
          <tr>
            <th>id</th>
            <th>Item</th>
            <th>operate</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="todo in list">
            <td>{{ todo.id }}</td>
            <td>
              <span @click="changeTodo(todo)" v-show="todo.editable">
                {{ todo.item }}</span
              >
              <input v-show="!todo.editable" v-model="todo.item" />
              <button
                v-show="!todo.editable"
                @click="updateTodo(todo)"
                class="btn btn-primary"
              >
                Update Todo
              </button>
            </td>
            <td>
              <button @click="deleteTodo(todo.id)" class="btn btn-danger">
                Delete Todo
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "../packs/axios_utils";
import Flash from "./common/Flash.vue";

export default {
  data: function() {
    return {
      todo: "",
      list: [
        { id: 1, item: "Foo" },
        { id: 2, item: "Bar" }
      ],
      account: "",
      selected: "",
      options: [
        { value: 1, text: 1 },
        { value: 2, text: 2 },
        { value: 3, text: 3 },
        { value: 4, text: 4 },
        { value: 5, text: 5 },
        { value: 6, text: 6 },
        { value: 7, text: 7 },
        { value: 8, text: 8 },
        { value: 9, text: 9 },
        { value: 10, text: 10 }
      ],
      flash_message: "",
      flash_seccess: new Boolean(),
      flash_hidden: true
    };
  },
  created: function() {
    this.fetchTodoLists();
  },
  components: {
    Flash
  },
  methods: {
    addTodo() {
      axios
        .post(
          "todolists.json",
          { item: this.todo, number: this.selected },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          const { message, success, shape } = res.data;
          this.flash_message = message;
          this.flash_seccess = success;
          this.flash_hidden = false;
          console.log(res.data);

          this.fetchTodoLists();
          this.todo = "";
        })
        .catch(error => console.log("Got a problem" + error));
    },
    deleteTodo(todo_id) {
      axios
        .delete("todolists/" + todo_id + ".json", {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          const { message, success, shape } = res.data;
          this.flash_message = message;
          this.flash_seccess = success;
          this.flash_hidden = false;

          this.fetchTodoLists();
        })
        .catch(error => console.log("Got a problem" + error));
    },
    changeTodo(todoItem) {
      todoItem.editable = !todoItem.editable;
    },
    updateTodo(todoItem) {
      axios
        .put(
          "todolists/" + todoItem.id,
          { item: todoItem.item },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          const { message, success, shape } = res.data;
          this.flash_message = message;
          this.flash_seccess = success;
          this.flash_hidden = false;

          this.fetchTodoLists();
        })
        .catch(error => console.log("Got a problem" + error));
    },
    fetchTodoLists() {
      axios.get(`todolists.json?account=${this.account}`).then(response => {
        const newList = response.data.map(oldItem => {
          return { ...oldItem, editable: true };
        });
        this.list = newList;
      });
      // this.$resource("/todolists.json/{ id }")
      //   .get()
      //   .then(function(response) {
      //     const newList = response.data.map(oldItem => {
      //       return { ...oldItem, editable: true };
      //     });
      //     this.list = newList;
      //   });
    },
    updateHiddenStatus(hide) {
      this.flash_hidden = hide;
    }
  }
};
</script>
