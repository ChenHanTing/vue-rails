<template>
  <div>
    <h1>Todo Lists</h1>

    <input type="text" v-model="todo" class="form-control" autofocus="true" />
    <button @click="addTodo()" class="btn btn-primary" :disabled="!todo.length">
      Add Todo
    </button>

    <table class="table">
      <thead>
        <tr>
          <th>#</th>
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
            <button @click="deleteTodo(todo.id)" class="btn btn-primary">
              Delete Todo
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "../packs/axios_utils";

export default {
  data: function() {
    return {
      todo: "",
      list: [
        { id: 1, item: "Foo" },
        { id: 2, item: "Bar" }
      ]
    };
  },
  created: function() {
    this.fetchTodoLists();
  },
  methods: {
    addTodo() {
      axios
        .post(
          "todolists.json",
          { item: this.todo },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => this.fetchTodoLists(), (this.todo = ""))
        .catch(error => console.log("Got a problem" + error));
    },
    deleteTodo(todo_id) {
      this.$http
        .delete("todolists/" + todo_id + ".json", {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => this.fetchTodoLists())
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
        .then(res => this.fetchTodoLists())
        .catch(error => console.log("Got a problem" + error));
    },
    fetchTodoLists() {
      axios.get("/todolists.json").then(response => {
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
    }
  }
};
</script>
