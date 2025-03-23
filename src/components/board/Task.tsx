
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Calendar, User } from 'lucide-react';
import { type Task as TaskType } from './KanbanBoard';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface TaskProps {
  task: TaskType;
  index: number;
}

const priorityColors = {
  low: 'bg-priority-low/10 text-priority-low border-priority-low/20',
  medium: 'bg-priority-medium/10 text-priority-medium border-priority-medium/20',
  high: 'bg-priority-high/10 text-priority-high border-priority-high/20',
};

const tagColors = {
  bug: 'bg-tag-bug/10 text-tag-bug border-tag-bug/20',
  feature: 'bg-tag-feature/10 text-tag-feature border-tag-feature/20',
  improvement: 'bg-tag-improvement/10 text-tag-improvement border-tag-improvement/20',
  task: 'bg-tag-task/10 text-tag-task border-tag-task/20',
};

const Task: React.FC<TaskProps> = ({ task, index }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const getTagColor = (tag: string) => {
    const normalizedTag = tag.toLowerCase();
    if (normalizedTag in tagColors) {
      return tagColors[normalizedTag as keyof typeof tagColors];
    }
    return 'bg-muted text-muted-foreground border-muted-foreground/20';
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(
            "bg-kanban-task rounded-md shadow-task border border-border/40 p-3 mb-2 select-none hover:shadow-task-hover transition-all hover:-translate-y-0.5",
            snapshot.isDragging ? "shadow-md bg-background border-primary/50" : "",
            "animate-in"
          )}
        >
          <h4 className="text-sm font-medium mb-2">{task.title}</h4>
          
          {task.description && (
            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
              {task.description}
            </p>
          )}
          
          <div className="flex flex-wrap gap-1.5 mb-3">
            {task.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className={cn("px-1.5 py-0 text-2xs font-medium border", getTagColor(tag))}
              >
                {tag}
              </Badge>
            ))}
            <Badge
              variant="outline"
              className={cn("px-1.5 py-0 text-2xs font-medium border", priorityColors[task.priority])}
            >
              {task.priority}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            {task.assignee ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center">
                      <Avatar className="h-5 w-5 mr-1">
                        <AvatarImage src={task.assignee.avatar} />
                        <AvatarFallback className="text-[8px] bg-primary text-primary-foreground">
                          {task.assignee.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="truncate max-w-[100px]">{task.assignee.name}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p className="text-xs">{task.assignee.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <div className="flex items-center text-muted-foreground/70">
                <User className="h-3 w-3 mr-1" />
                <span>Unassigned</span>
              </div>
            )}
            
            {task.dueDate && (
              <div className="flex items-center text-muted-foreground/70">
                <Calendar className="h-3 w-3 mr-1" />
                <span>{formatDate(task.dueDate)}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
