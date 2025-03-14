// Task class
class Task {
    constructor(taskText, taskDate) {
      this.taskText = taskText;
      this.taskDate = taskDate;
    }
  
    createElement() {
      const element = document.createElement("div");
      element.innerHTML = `
        <span class="task-text">${this.taskText}</span>
        <small class="time">${this.taskDate}</small>
      `;
      element.classList.add("card");
      element.setAttribute("draggable", true);
      element.addEventListener("dragstart", this.dragStart.bind(this));
      element.addEventListener("dragend", this.dragEnd.bind(this));
      element.addEventListener("contextmenu", this.showContextMenu.bind(this, element));
      return element;
    }
  
    dragStart() {
      this.element.classList.add("dragging");
      KanbanBoard.draggedCard = this;
      KanbanBoard.highlightDropZones();
    }
  
    dragEnd() {
      this.element.classList.remove("dragging");
      KanbanBoard.draggedCard = null;
      KanbanBoard.removeHighlightDropZones();
    }
  
    showContextMenu(element, e) {
      e.preventDefault();
      KanbanBoard.rightClickedCard = element;
      KanbanBoard.showContextMenu(e.pageX, e.pageY);
    }
  
    setElement(element) {
      this.element = element;
    }
  }
  
  // Column class
  class Column {
    constructor(columnId) {
      this.columnId = columnId;
      this.tasks = [];
      this.loadTasksFromLocalStorage();
    }
  
    loadTasksFromLocalStorage() {
      const tasks = JSON.parse(localStorage.getItem(this.columnId)) || [];
      tasks.forEach((task) => {
        const newTask = new Task(task.text, task.date);
        this.tasks.push(newTask);
        const taskElement = newTask.createElement();
        newTask.setElement(taskElement);
        document.getElementById(`${this.columnId}-tasks`).appendChild(taskElement);
      });
      this.updateTasksCount();
    }
  
    addTask(taskText, taskDate) {
      const newTask = new Task(taskText, taskDate);
      this.tasks.push(newTask);
      const taskElement = newTask.createElement();
      newTask.setElement(taskElement);
      document.getElementById(`${this.columnId}-tasks`).appendChild(taskElement);
      this.updateTasksCount();
      this.saveTasksToLocalStorage();
    }
  
    updateTasksCount() {
      const count = this.tasks.length;
      const countElement = document.getElementById(`${this.columnId}-count`);
      countElement.textContent = count;
    }
  
    saveTasksToLocalStorage() {
      const tasks = this.tasks.map((task) => ({ text: task.taskText, date: task.taskDate }));
      localStorage.setItem(this.columnId, JSON.stringify(tasks));
    }
  }
  
  // KanbanBoard class
  class KanbanBoard {
    static draggedCard = null;
    static rightClickedCard = null;
  
    constructor() {
      this.columns = [];
      this.init();
    }
  
    init() {
      document.addEventListener("DOMContentLoaded", () => {
        this.initializeColumnAnimations();
      });
  
      const columnIds = ["todo", "doing", "done"];
      columnIds.forEach((columnId) => {
        this.columns.push(new Column(columnId));
      });
  
      this.addEventListeners();
      this.initializeDropZones();
    }
  
    initializeColumnAnimations() {
      const columns = document.querySelectorAll(".column");
      columns.forEach((column, index) => {
        column.style.opacity = "0";
        column.style.transform = "translateY(30px)";
        setTimeout(() => {
          column.style.transition = "opacity 0.5s ease, transform 0.5s ease";
          column.style.opacity = "1";
          column.style.transform = "translateY(0)";
        }, 100 * index);
      });
    }
  
    addEventListeners() {
      document.addEventListener("click", () => {
        if (KanbanBoard.rightClickedCard !== null) {
          KanbanBoard.rightClickedCard = null;
          KanbanBoard.hideContextMenu();
        }
      });
    }
  
    initializeDropZones() {
      const dropZones = document.querySelectorAll(".tasks");
      dropZones.forEach((dropZone) => {
        dropZone.addEventListener("dragover", (e) => {
          e.preventDefault();
        });
        dropZone.addEventListener("dragenter", (e) => {
          e.preventDefault();
          dropZone.classList.add("active-dropzone");
        });
        dropZone.addEventListener("dragleave", () => {
          dropZone.classList.remove("active-dropzone");
        });
        dropZone.addEventListener("drop", () => {
          dropZone.classList.remove("active-dropzone");
          if (KanbanBoard.draggedCard !== null) {
            const task = KanbanBoard.draggedCard;
            const newColumnId = dropZone.id.replace("-tasks", "");
            const oldColumnId = task.element.parentElement.id.replace("-tasks", "");
            if (newColumnId !== oldColumnId) {
              this.moveTask(task, newColumnId);
            }
          }
        });
      });
    }
  
    highlightDropZones() {
      document.querySelectorAll(".tasks").forEach((tasksContainer) => {
        tasksContainer.classList.add("highlight-dropzone");
      });
    }
  
    removeHighlightDropZones() {
      document.querySelectorAll(".tasks").forEach((tasksContainer) => {
        tasksContainer.classList.remove("highlight-dropzone");
      });
    }
  
    showContextMenu(x, y) {
      const contextMenu = document.querySelector(".context-menu");
      contextMenu.style.display = "block";
      contextMenu.style.left = `${x}px`;
      contextMenu.style.top = `${y}px`;
      contextMenu.style.opacity = "0";
      contextMenu.style.transform = "scale(0.95)";
      setTimeout(() => {
        contextMenu.style.transition = "opacity 0.2s ease, transform 0.2s ease";
        contextMenu.style.opacity = "1";
        contextMenu.style.transform = "scale(1)";
      }, 10);
    }
  
    hideContextMenu() {
      const contextMenu = document.querySelector(".context-menu");
      contextMenu.style.opacity = "0";
      contextMenu.style.transform = "scale(0.95)";
      setTimeout(() => {
        contextMenu.style.display = "none";
      }, 200);
    }
  
    moveTask(task, newColumnId) {
      const oldColumnId = task.element.parentElement.id.replace("-tasks", "");
      const oldColumn = this.columns.find((column) => column.columnId === oldColumnId);
      const newColumn = this.columns.find((column) => column.columnId === newColumnId);
      oldColumn.tasks = oldColumn.tasks.filter((t) => t !== task);
      newColumn.tasks.push(task);
      oldColumn.saveTasksToLocalStorage();
      newColumn.saveTasksToLocalStorage();
      task.element.style.transition = "opacity 0.3s ease, transform 0.3s ease";
      task.element.style.opacity = "0";
      task.element.style.transform = "translateX(20px)";
      setTimeout(() => {
        task.element.remove();
        const newTaskElement = task.createElement();
        newTaskElement.style.opacity = "0";
        newTaskElement.style.transform = "translateY(20px)";
        document.getElementById(`${newColumnId}-tasks`).appendChild(newTaskElement);
        task.setElement(newTaskElement);
        setTimeout(() => {
          newTaskElement.style.opacity = "1";
          newTaskElement.style.transform = "translateY(0)";
        }, 10);
      }, 300);
      oldColumn.updateTasksCount();
      newColumn.updateTasksCount();
    }
  }
  
  // Usage
  const kanbanBoard = new KanbanBoard();
  
  // Functions
  function addTask(columnId) {
    const input = document.getElementById(`${columnId}-input`);
    const taskText = input.value.trim();
    if (taskText !== "") {
      const taskDate = new Date().toLocaleString("en-IN");
      const column = kanbanBoard.columns.find((column) => column.columnId === columnId);
      column.addTask(taskText, taskDate);
      input.value = "";
    } else {
      const inputElement = document.getElementById(`${columnId}-input`);
      inputElement.style.transition = "transform 0.1s ease";
      inputElement.style.transform = "translateX(5px)";
      setTimeout(() => {
        inputElement.style.transform = "translateX(-5px)";
        setTimeout(() => {
          inputElement.style.transform = "translateX(3px)";
          setTimeout(() => {
            inputElement.style.transform = "translateX(-3px)";
            setTimeout(() => {
              inputElement.style.transform = "translateX(0)";
            }, 100);
          }, 100);
        }, 100);
      }, 100);
    }
  }
  
  function editTask() {
    if (KanbanBoard.rightClickedCard !== null) {
      const taskTextElement = KanbanBoard.rightClickedCard.querySelector(".task-text");
      const currentText = taskTextElement.textContent;
      const newTaskText = prompt("Edit Task", currentText);
      if (newTaskText !== null && newTaskText.trim() !== "") {
        const newTaskDate = new Date().toLocaleString("en-IN");
        taskTextElement.textContent = newTaskText;
        KanbanBoard.rightClickedCard.querySelector(".time").textContent = newTaskDate;
        const columnId = KanbanBoard.rightClickedCard.parentElement.id.replace("-tasks", "");
        const column = kanbanBoard.columns.find((column) => column.columnId === columnId);
        column.saveTasksToLocalStorage();
      }
    }
  }
  
  function deleteTask() {
    if (KanbanBoard.rightClickedCard !== null) {
      const columnId = KanbanBoard.rightClickedCard.parentElement.id.replace("-tasks", "");
      const column = kanbanBoard.columns.find((column) => column.columnId === columnId);
      column.tasks = column.tasks.filter((task) => task.element !== KanbanBoard.rightClickedCard);
      KanbanBoard.rightClickedCard.style.transition = "opacity 0.3s ease, transform 0.3s ease";
      KanbanBoard.rightClickedCard.style.opacity = "0";
      KanbanBoard.rightClickedCard.style.transform = "translateX(20px)";
      setTimeout(() => {
        KanbanBoard.rightClickedCard.remove();
        column.saveTasksToLocalStorage();
        column.updateTasksCount();
      }, 300);
    }
  }
  
  // Helper functions
  function flashElement(element) {
    element.style.transition = "color 0.3s ease";
    const originalColor = window.getComputedStyle(element).color;
    element.style.color = "var(--accent)";
    setTimeout(() => {
      element.style.color = originalColor;
    }, 500);
  }
  
  function shakeElement(element) {
    element.style.transition = "transform 0.1s ease";
    element.style.transform = "translateX(5px)";
    setTimeout(() => {
      element.style.transform = "translateX(-5px)";
      setTimeout(() => {
        element.style.transform = "translateX(3px)";
        setTimeout(() => {
          element.style.transform = "translateX(-3px)";
          setTimeout(() => {
            element.style.transform = "translateX(0)";
          }, 100);
        }, 100);
      }, 100);
    }, 100);
  }
  
  // CSS for dropzone highlighting
  const style = document.createElement("style");
  style.textContent = `
    .highlight-dropzone {
      transition: background 0.3s ease;
    }
    .active-dropzone {
      background: rgba(56, 189, 248, 0.1);
      box-shadow: inset 0 0 0 2px var(--primary);
      border-radius: var(--card-radius);
    }
  `;
  document.head.appendChild(style);
  