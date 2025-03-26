<p align="center">
  <img src="media/screenshot.png" alt="OWD Todo App" width="400" />
</p>

# Todo App

> Simple to-do list application for your Open Web Desktop client

## Overview

The OWD Todo App is a module to manage your to-do list within the OWD environment.

## Quick Installation

1. Navigate to your OWD client folder in your terminal:
    ```bash
    cd owd-client
    ```
2. Install the module using npm or yarn:
    ```bash
    npm install [https://github.com/owdproject/owd-app-todo](https://github.com/owdproject/owd-app-todo)
    ```
3. Register the application in your OWD configuration file (`owd.config.ts`):
    ```typescript
    // owd.config.ts
    export const owdConfig = {
        theme: 'github:owdproject/owd-theme-gnome',
        apps: [
            'owd-app-todo'
        ]
    }
    ```

## Compatibility

This application is compatible with Open Web Desktop client version `v2.0.0-beta.5`.

## License

This project is released under the [MIT License](LICENSE).