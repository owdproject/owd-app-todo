import {ModuleApp} from "@owd-client/core/index";

// window components
import WindowTodo from "./windows/WindowTodo.vue";

export default class TodoModule extends ModuleApp {
  setup() {
    return {
      name: "todo",
      singleton: true,
      windows: [
        {
          component: WindowTodo,
          name: "WindowTodo",
          category: "accessories",
          title: "To-do list",
          icon: "mdi-format-list-bulleted",
          menu: true,
          minimized: false,
          resizable: true,
          noWindowContent: true,
          size: {
            width: 480,
            height: 320
          },
          position: {
            x: -1,
            y: 0,
            z: 0
          }
        }
      ]
    }
  }

  setupCommands({store}: OwdModuleAppSetupStoreContext) {
    return {
      'todo': function () {
        store.dispatch('core/window/windowOpen', 'WindowTodo');
      }
    }
  }
}