
import React, { useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { MoreHorizontal, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Task from './Task';
import { type Column, type Task as TaskType } from './KanbanBoard';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ColumnProps {
  column: Column;
  tasks: TaskType[];
  index: number;
}

const Column: React.FC<ColumnProps> = ({ column, tasks, index }) => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAddTask = () => {
    console.log('Adding task:', newTaskTitle);
    setNewTaskTitle('');
    setIsAddingTask(false);
  };

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="shrink-0 w-72 animate-in"
        >
          <div className="bg-kanban-column rounded-lg shadow-sm border border-border/40 h-full flex flex-col overflow-hidden">
            <div
              {...provided.dragHandleProps}
              className="p-3 bg-kanban-columnHeader border-b border-border/40 flex items-center justify-between"
            >
              <h3 className="font-medium text-sm">{column.title}</h3>
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground font-medium px-2 py-0.5 bg-background/50 rounded">
                  {tasks.length}
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Rename</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <Droppable droppableId={column.id} type="task">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={cn(
                    "p-2 flex-1 overflow-y-auto",
                    snapshot.isDraggingOver ? "bg-primary/5" : ""
                  )}
                >
                  {tasks.map((task, index) => (
                    <Task key={task.id} task={task} index={index} />
                  ))}
                  {provided.placeholder}
                  
                  {isAddingTask && (
                    <div className="bg-white dark:bg-card p-3 rounded-md shadow-task border border-border/40 mb-2">
                      <input
                        type="text"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        placeholder="Enter task title..."
                        className="w-full px-2 py-1.5 text-sm bg-transparent border border-input rounded focus:outline-none focus:ring-1 focus:ring-primary"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleAddTask();
                          if (e.key === 'Escape') setIsAddingTask(false);
                        }}
                      />
                      <div className="flex gap-2 mt-2">
                        <Button
                          size="sm"
                          onClick={handleAddTask}
                          disabled={!newTaskTitle.trim()}
                          className="h-7 text-xs"
                        >
                          Add
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setIsAddingTask(false)}
                          className="h-7 text-xs"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Droppable>
            
            <div className="p-2 border-t border-border/40">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-muted-foreground hover:text-foreground"
                onClick={() => setIsAddingTask(true)}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Task
              </Button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
