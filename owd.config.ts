export default defineDesktopApp({
  id: "org.owdproject.todo",
  name: "Todo",
  category: "productivity",
  icon: "mdi:format-list-bulleted",
  windows: {
    main: {
      component: () => import('./app/components/Window/WindowTodo.vue'),
      name: "WindowTodo",
      category: "accessories",
      title: "ToDo",
      icon: "mdi:format-list-bulleted",
      pinned: true,
      resizable: false,
      size: {
        width: 480,
        height: 320
      },
      position: {
        x: 400,
        y: 240,
        z: 0
      },
    }
  },
  commands: {
    todo: (app) => {
      app.openWindow("main")
    }
  },
  onLaunch: (app) => {
    app.openWindow('main')
  }
})