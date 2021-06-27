<template>
  <WindowApp>
    <div class="todo-container">
      <div class="todo-input">
        <TodoInput @todo-add="todoAdd" />
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
          <a :class="[{ active: todo.filter === 'all' }]" @click="todo.filter = 'all'">all</a>
          <a :class="[{ active: todo.filter === 'todo' }]" @click="todo.filter = 'todo'">to do</a>
          <a :class="[{ active: todo.filter === 'done' }]" @click="todo.filter = 'done'">done</a>
        </li>
      </ul>
    </div>
  </WindowApp>
</template>

<script setup>
import TodoInput from './todo/TodoInput.vue'
import TodoList from './todo/TodoList.vue'
import {onMounted, watch, ref, reactive, computed} from "vue";
import {loadStorage, saveStorage} from "@owd-client/core/src/helpers/helperStorage";

const storageTodo = 'todo';
const storageTodoFilter = 'todo-filter';

const todo = reactive({
  list: [],
  filter: 'todo'
});

const todoCount = computed(() => todo.list.length)
const todoCountCompleted = computed(() => todo.list.filter((item) => item.completed).length)
const todoCountNotCompleted = computed(() => todo.list.filter((item) => !item.completed).length)
const todoListFiltered = computed(() => {
  return todo.list
      //.sort((a, b) => (+b.completed) - (+a.completed) || a.title.localeCompare(b.title))
      .sort((a, b) => (+b.completed) - (+a.completed))
      .filter(function (item) {
        switch (todo.filter) {
          case 'todo':
            return item.completed === false;
          case 'done':
            return item.completed === true;
          default:
            return true;
        }
      })
})

watch(() => todo.filter, () => todoSaveFilter())

function todoAdd(item) {
  if (item && item.trim() !== '') {
    todo.list.push({
      title: item,
      completed: false,
      editing: false
    });

    // set show All if Done filter is active
    if (todo.filter === 'done') {
      todo.filter = 'all'
    }

    todoSave();
  }
}

/**
 * Remove to-do
 */
function todoRemove(item) {
  const index = todo.list.indexOf(item);

  if (index !== false) {
    todo.list.splice(index, 1);
    todoSave();
  }
}

/**
 * Save to-do filter
 */
function todoSaveFilter() {
  saveStorage(storageTodoFilter, todo.filter)
}

/**
 * Save to-do list to local storage
 */
function todoSave() {
  saveStorage(storageTodo, JSON.stringify(todo.list))
}

/**
 * Load to-do list from local storage
 */
function todoLoad() {
  // load to-do list from local storage
  todo.list = JSON.parse(loadStorage(storageTodo)) || []

  // load to-do filter from local storage
  const todoFilter = loadStorage(storageTodoFilter);

  if (todoFilter === 'todo' || todoFilter === 'done' || todoFilter === 'all') {
    todo.filter = todoFilter
  } else {
    todo.filter = 'all'
  }
}

onMounted(() => todoLoad())
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
    box-shadow: 0 0 0 1px $owd-window-content-border-color;
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
            color: $owd-window-item-text-color-hover;
          }
        }
      }
    }
  }
}
</style>
