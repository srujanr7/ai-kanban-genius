
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ColumnComponent from './Column';
import { cn } from '@/lib/utils';
import { reorderTasks, moveTask } from '@/utils/board-utils';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  tags: string[];
  assignee?: {
    id: string;
    name: string;
    avatar?: string;
  };
  dueDate?: string;
}

export interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

export interface BoardData {
  tasks: Record<string, Task>;
  columns: Record<string, Column>;
  columnOrder: string[];
}

interface KanbanBoardProps {
  initialData?: BoardData;
  className?: string;
}

const defaultBoardData: BoardData = {
  tasks: {},
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      taskIds: [],
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: [],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

const KanbanBoard: React.FC<KanbanBoardProps> = ({ initialData, className }) => {
  const [boardData, setBoardData] = useState<BoardData>(initialData || defaultBoardData);
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');

  useEffect(() => {
    if (initialData) {
      setBoardData(initialData);
    }
  }, [initialData]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Handle column reordering
    if (type === 'column') {
      const newColumnOrder = Array.from(boardData.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      setBoardData({
        ...boardData,
        columnOrder: newColumnOrder,
      });
      return;
    }

    // Handle task reordering
    const startColumn = boardData.columns[source.droppableId];
    const finishColumn = boardData.columns[destination.droppableId];

    if (startColumn === finishColumn) {
      const newColumn = reorderTasks(
        startColumn,
        source.index,
        destination.index
      );

      setBoardData({
        ...boardData,
        columns: {
          ...boardData.columns,
          [newColumn.id]: newColumn,
        },
      });
      return;
    }

    // Moving task from one column to another
    const { newStartColumn, newFinishColumn } = moveTask(
      startColumn,
      finishColumn,
      source.index,
      destination.index,
      draggableId
    );

    setBoardData({
      ...boardData,
      columns: {
        ...boardData.columns,
        [newStartColumn.id]: newStartColumn,
        [newFinishColumn.id]: newFinishColumn,
      },
    });
  };

  const handleAddColumn = () => {
    if (!newColumnTitle.trim()) return;

    const newColumnId = `column-${Date.now()}`;
    const newColumn: Column = {
      id: newColumnId,
      title: newColumnTitle,
      taskIds: [],
    };

    setBoardData({
      ...boardData,
      columns: {
        ...boardData.columns,
        [newColumnId]: newColumn,
      },
      columnOrder: [...boardData.columnOrder, newColumnId],
    });

    setNewColumnTitle('');
    setIsAddingColumn(false);
  };

  return (
    <div className={cn("h-full", className)}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-columns" direction="horizontal" type="column">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex h-full gap-4 pb-2"
            >
              {boardData.columnOrder.map((columnId, index) => {
                const column = boardData.columns[columnId];
                const tasks = column.taskIds.map(
                  (taskId) => boardData.tasks[taskId]
                );

                return (
                  <ColumnComponent
                    key={column.id}
                    column={column}
                    tasks={tasks}
                    index={index}
                  />
                );
              })}
              {provided.placeholder}

              <div className="shrink-0 w-72 animate-in">
                {isAddingColumn ? (
                  <div className="bg-kanban-column rounded-lg shadow-sm border border-border/40 overflow-hidden">
                    <div className="p-3 bg-kanban-columnHeader border-b border-border/40">
                      <input
                        type="text"
                        value={newColumnTitle}
                        onChange={(e) => setNewColumnTitle(e.target.value)}
                        placeholder="Enter column title..."
                        className="w-full px-2 py-1 text-sm font-medium bg-transparent border border-input rounded focus:outline-none focus:ring-1 focus:ring-primary"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleAddColumn();
                          if (e.key === 'Escape') setIsAddingColumn(false);
                        }}
                      />
                    </div>
                    <div className="p-2 flex gap-2">
                      <Button
                        size="sm"
                        onClick={handleAddColumn}
                        disabled={!newColumnTitle.trim()}
                      >
                        Add
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setIsAddingColumn(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    className="h-12 w-full border-dashed hover:border-solid hover:border-primary hover:text-primary transition-colors"
                    onClick={() => setIsAddingColumn(true)}
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Add Column
                  </Button>
                )}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
