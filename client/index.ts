import {ModuleApp} from "@owd-client/core/index";

// window components
import WindowTodo from "./windows/WindowTodo.vue";

export default class TodoModule extends ModuleApp {
  loadModule() {
    return {
      name: "todo",
      version: "2.0.0",
      license: "MIT",
      homepage: "https://github.com/hacklover/owd-todo",
      author: {
        name: "hacklover",
        url: "https://github.com/hacklover"
      },
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

  loadCommands({store}: OwdModuleAppLoadStoreContext) {
    return {
      'todo': function () {
        store.dispatch('core/window/windowOpen', 'WindowTodo');
      }
    }
  }
}