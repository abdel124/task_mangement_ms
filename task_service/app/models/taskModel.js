class Task {
  constructor(userId, taskId, title, description, completed) {
      this.userId = userId;      // User ID to associate the task with a user
      this.taskId = taskId;      // Unique ID for the task
      this.title = title;
      this.description = description;
      this.completed = completed;
  }
}

module.exports = Task;
