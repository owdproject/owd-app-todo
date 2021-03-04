<template>
  <Window :window="window">
    <div class="todo-container">
      <div class="todo-input">
        <TodoInput
            :value="todoNew"
            @todo-add="todoAdd"
        />
      </div>

      <div class="todo-list">
        <ul>
          <template v-for="(todo, index) in todoListFiltered" :key="index">
            <TodoList :todo="todo" @todo-save="todoSave" @todo-remove="todoRemove"/>
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
import Window from "@owd-client/core/src/components/window/Window";
import TodoInput from './todo/TodoInput.vue'
import TodoList from './todo/TodoList.vue'

const localstorage_todo = 'todo';
const localstorage_todo_filter = 'todo-filter';

export default {
  components: {
    Window,
    TodoInput,
    TodoList
  },
  props: {
    window: Object
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
  display: grid;
  grid-template-rows: 60px calc(100% - 94px) 34px;
  max-height: 100%;

  .todo-list {
    overflow-y: auto;

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
    height: 34px;
    line-height: 34px;
    font-size: 12px;
    box-shadow: 0 0 0 1px $windowContentBorder;
    margin: 0;
    padding: 0 12px;
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
          padding: 10px 5px;

          &.active {
            color: $windowColorActive;
          }
        }
      }
    }
  }
}
</style>
