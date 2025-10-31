# My React Todo App

A simple and intuitive Todo list application built with React, TypeScript, and Material-UI. It features optional date and time tracking for tasks and persists data using local browser storage.

## Features

- **Add Tasks:** Quickly add new todo items with a title.
- **Optional Due Date:** Attach an optional date and time to any task using the integrated date and time picker.
- **Mark as Complete:** Mark tasks as completed with a single click. A timestamp is automatically recorded for when the task was finished.
- **Data Persistence:** All tasks are saved to your browser's local storage, so they will persist even after closing the tab.
- **Multi-Page Navigation:** Includes three pages: Home (the Todo list), About, and Contact.

## Technologies Used

- **React:** For building the user interface.
- **TypeScript:** For static typing and improved code quality.
- **Material-UI (MUI):** A comprehensive React UI library for styling and components.
- **MUI X:** A suite of advanced components, specifically the `DateTimePicker` for handling dates.
- **`dayjs`:** A lightweight library for parsing, validating, manipulating, and displaying dates and times.
- **`react-router-dom`:** For handling navigation between the different pages.

## Getting Started

### Prerequisites

- Node.js (version 20.19.0 or higher)
- npm
- Docker
- Windows Subsystem for Linux

### Installation

1.  Clone the repository:
    ```sh
    git clone <your-repo-url>
    cd react-todo-list-localstorage
    ```
2.  Start or recreate all services defined in your docker-compose.yml file
    ```sh
    docker-compose up -d --build 
    ```
    The application will be accessible in your browser, typically at `http://localhost:8000`.

## Project Structure

- `src/App.tsx`: The main application component, handling the application's state, data persistence via `localStorage`, and defining the application's routing. It contains the content for the main Todo list page.
- `src/main.tsx`: The application's entry point, where the necessary providers (`LocalizationProvider`, `BrowserRouter`, `ThemeProvider`) are set up.
- `src/components/Navbar.tsx`: A reusable navigation component that appears on all pages.
- `src/pages/AboutPage.tsx`: A simple "About" page.
- `src/pages/ContactPage.tsx`: A simple "Contact" page.

## Usage

- **Add a Todo:** Type your task into the text field and click the "Add" button or press Enter.
- **Set a Due Date:** Click the "Optional Due Date" field to open the date and time picker.
- **Complete a Todo:** Click the checkbox next to a task to mark it as completed. The text will be crossed out, and a completion timestamp will appear.
- **Navigate:** Use the navigation links in the header to switch between the Home, About, and Contact pages.

## License

This project is licensed under the MIT License.
