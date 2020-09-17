<template>
  <Window :title="data.title" :window="data">
    <div class="todo-container">
        <div class="todo-input">
          <TodoInput
            :value="todoNew"
            @todo-add="todoAdd">
          </TodoInput>
        </div>

        <div class="todo-list">
          <ul>
            <template v-for="(todo, index) in todoListFiltered">
              <TodoList :key="index" :todo="todo" @todo-save="todoSave" @todo-remove="todoRemove" />
            </template>
          </ul>
        </div>

        <ul class="todo-stats">
          <li>
            To do: {{ todoCountNotCompleted }}
          </li>
          <li v-if="todoCount > 0">
            Completed: {{ todoCountCompleted }} / {{ todoCount }}
          </li>
          <li>
            <a :class="[{ active: todoFilter === 'all' }]" @click="todoFilter = 'all'">all</a>
            <a :class="[{ active: todoFilter === 'todo' }]" @click="todoFilter = 'todo'">to do</a>
            <a :class="[{ active: todoFilter === 'done' }]" @click="todoFilter = 'done'">done</a>
          </li>
        </ul>
      </div>
  </Window>
</template>

<script>
  import TodoInput from './todo/TodoInput.vue'
  import TodoList from './todo/TodoList.vue'
  import Window from "../../../core/components/window/Window";

  const localstorage_todo = 'todo';
  const localstorage_todo_filter = 'todo-filter';

  export default {
    name: "WindowTodo",
    components: {
      Window,
      TodoInput,
      TodoList
    },
    props: {
      data: Object
    },
    data() {
      return {
        todoNew: '',
        todoList: [],
        todoFilter: 'todo'
      }
    },
    watch: {
      todoFilter: function () {
        this.todoSaveFilter()
      }
    },
    computed: {
      todoCount: function () {
        return this.todoList.length
      },
      todoCountCompleted: function () {
        return this.todoList.filter(function (item) {
          return item.completed
        }).length
      },
      todoCountNotCompleted: function () {
        return this.todoList.filter(function (item) {
          return !item.completed
        }).length
      },
      todoListFiltered: function () {
        let todoList = this.todoList;
        let todoFilter = this.todoFilter;

        return todoList
          //.sort((a, b) => (+b.completed) - (+a.completed) || a.title.localeCompare(b.title))
          .sort((a, b) => (+b.completed) - (+a.completed))
          .filter(function (item) {
            switch (todoFilter) {
              case 'todo':
                return item.completed === false;
              case 'done':
                return item.completed === true;
              default:
                return true;
            }
          })
      }
    },
    methods: {
      /**
       * Add to-do
       */
      todoAdd: function (value) {
        if (value && value.trim() !== '') {
          this.todoList.push({
            title: value,
            completed: false,
            editing: false
          });

          // set show All if Done filter is active
          if (this.todoFilter === 'done') {
            this.todoFilter = 'all'
          }

          this.todoSave();
        }
      },

      /**
       * Remove to-do
       */
      todoRemove: function (todo) {
        let index = this.todoList.indexOf(todo);
        if (index !== false) {
          this.todoList.splice(index, 1);
          this.todoSave();
        }
      },

      /**
       * Save to-do filter
       */
      todoSaveFilter: function () {
        localStorage.setItem(localstorage_todo_filter, this.todoFilter)
      },

      /**
       * Save all to-do to local storage
       */
      todoSave: function () {
        localStorage.setItem(localstorage_todo, JSON.stringify(this.todoList))
      },

      /**
       * Load all to-do from local storage
       */
      todoLoad: function () {
        // load to-do list
        if (localStorage.getItem(localstorage_todo)) {
          try {
            this.todoList = JSON.parse(localStorage.getItem(localstorage_todo))
          } catch (e) {
            localStorage.removeItem(localstorage_todo)
          }
        }

        // load to-do filter from local storage
        if (localStorage.getItem(localstorage_todo_filter)) {
          try {
            let todoFilter = localStorage.getItem(localstorage_todo_filter);
            if (todoFilter === 'todo' || todoFilter === 'done' || todoFilter === 'all') {
              this.todoFilter = todoFilter
            } else {
              this.todoFilter = 'all'
            }
          } catch (e) {
            localStorage.removeItem(localstorage_todo_filter)
          }
        }
      }
    },
    mounted() {
      this.todoLoad()
    }
  }
</script>

<style scoped lang="scss">
  .todo-container {
    height: calc(100% - 40px);

    .todo-list {
      overflow-y: auto;
      height: calc(100% - 59px);

      ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
      }
    }

    .todo-stats {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 12px;
      font-size: 12px;
      color: #656565;
      border-top: 1px solid rgba(255, 255, 255, 0.03);
      margin: 0;
      list-style-type: none;
      cursor: default;
      user-select: none;

      li {
        float: left;
        margin-right: 10px;

        &:last-child {
          float: right;
          margin: 0 0 0 10px;

          a {
            cursor: pointer;
            color: #656565;
            padding: 10px 5px;

            &.active {
              color: #AAA;
            }
          }
        }
      }
    }
  }
</style>
