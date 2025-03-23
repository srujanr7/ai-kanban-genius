
import { Column } from '@/components/board/KanbanBoard';

// Reorder tasks within a column
export const reorderTasks = (
  column: Column,
  startIndex: number,
  endIndex: number
): Column => {
  const newTaskIds = Array.from(column.taskIds);
  const [removed] = newTaskIds.splice(startIndex, 1);
  newTaskIds.splice(endIndex, 0, removed);

  return {
    ...column,
    taskIds: newTaskIds,
  };
};

// Move a task from one column to another
export const moveTask = (
  startColumn: Column,
  finishColumn: Column,
  startIndex: number,
  endIndex: number,
  taskId: string
): { newStartColumn: Column; newFinishColumn: Column } => {
  const newStartTaskIds = Array.from(startColumn.taskIds);
  newStartTaskIds.splice(startIndex, 1);

  const newFinishTaskIds = Array.from(finishColumn.taskIds);
  newFinishTaskIds.splice(endIndex, 0, taskId);

  return {
    newStartColumn: {
      ...startColumn,
      taskIds: newStartTaskIds,
    },
    newFinishColumn: {
      ...finishColumn,
      taskIds: newFinishTaskIds,
    },
  };
};
