export function sortTasks(tasks) {
  const priorityOrder = { high: 1, medium: 2, low: 3 };

  return tasks.sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}
