<p align="center">
  <img src="assets/screenshot.png" alt="OWD Todo App" />
</p>

# Todo App

> Simple to-do list application for your Open Web Desktop client

## Overview

The OWD Todo App is a module to manage your to-do list within the OWD environment.

## Quick Installation

1.  Navigate to your OWD client folder in your terminal:

    ```bash
    cd owd-client
    ```

2.  Install the module using npm or yarn:

    ```bash
    npm install github:owdproject/app-todo
    ```

3.  Register the application in your OWD configuration file:

    ```typescript
    // owd.config.ts
    import AppTodo from 'owd-app-todo/owd.config'
    
    export const owdConfig = {
        theme: ['github:owdproject/theme-win95', { install: true }],
    
        apps: [
           './node_modules/owd-app-todo',
        ],
    
        loader: async () => {
            await defineDesktopApp(AppTodo)
        }
    }
    ```

## Compatibility

This application is compatible with Open Web Desktop client version `3.0.0-alpha.0`.

## License

This project is released under the [MIT License](LICENSE).