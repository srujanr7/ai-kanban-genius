import React, { useState } from 'react';
import { CalendarDays, Filter, Plus, Search, Users } from 'lucide-react';
import KanbanBoard, { BoardData, Task } from '@/components/board/KanbanBoard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AIPromptInput from '@/components/ai/AIPromptInput';
import { toast } from '@/components/ui/use-toast';

const mockTasks: Record<string, Task> = {
  'task-1': {
    id: 'task-1',
    title: 'Create login page',
    description: 'Implement UI components for the login screen',
    priority: 'high',
    tags: ['feature', 'ui'],
    assignee: {
      id: 'user-1',
      name: 'John Doe',
    },
    dueDate: '2023-05-20',
  },
  'task-2': {
    id: 'task-2',
    title: 'Setup authentication API',
    description: 'Integrate with backend authentication service',
    priority: 'high',
    tags: ['api', 'security'],
    assignee: {
      id: 'user-2',
      name: 'Alice Smith',
    },
    dueDate: '2023-05-18',
  },
  'task-3': {
    id: 'task-3',
    title: 'Design system documentation',
    description: 'Create comprehensive documentation for UI components',
    priority: 'medium',
    tags: ['documentation', 'design'],
    assignee: {
      id: 'user-3',
      name: 'Bob Johnson',
    },
    dueDate: '2023-05-25',
  },
  'task-4': {
    id: 'task-4',
    title: 'User profile page',
    description: 'Implement user profile page with settings',
    priority: 'medium',
    tags: ['feature', 'ui'],
    assignee: {
      id: 'user-1',
      name: 'John Doe',
    },
    dueDate: '2023-05-22',
  },
  'task-5': {
    id: 'task-5',
    title: 'Fix navigation bug',
    description: 'Resolve issue with navigation menu on mobile',
    priority: 'high',
    tags: ['bug', 'ui'],
    assignee: {
      id: 'user-4',
      name: 'Emily Chen',
    },
  },
  'task-6': {
    id: 'task-6',
    title: 'Implement dark mode',
    description: 'Add dark mode support and theme toggle',
    priority: 'low',
    tags: ['improvement', 'ui'],
    assignee: {
      id: 'user-2',
      name: 'Alice Smith',
    },
    dueDate: '2023-05-30',
  },
};

const mockBoardData: BoardData = {
  tasks: mockTasks,
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      taskIds: ['task-3', 'task-6'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: ['task-1', 'task-4'],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: ['task-2', 'task-5'],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

const Board: React.FC = () => {
  const [showAIPrompt, setShowAIPrompt] = useState(false);
  const [boardData, setBoardData] = useState<BoardData>(mockBoardData);
  const [boardTitle, setBoardTitle] = useState<string>("E-commerce Project Board");
  const [prompt, setPrompt] = useState<string>("");
  
  const handleGenerateBoard = (tasks: Task[]) => {
    console.log('Tasks received in Board component:', tasks);
    
    if (!tasks || tasks.length === 0) {
      toast({
        title: "No tasks generated",
        description: "Try a more detailed project description.",
        variant: "destructive",
      });
      return;
    }
    
    // Convert the tasks array to the format expected by the board
    const newTasks: Record<string, Task> = {};
    const todoTaskIds: string[] = [];
    
    tasks.forEach(task => {
      // Ensure the task has a valid ID
      if (!task.id) {
        task.id = `task-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      }
      
      // Add task to the tasks record
      newTasks[task.id] = task;
      
      // Add task ID to the "To Do" column
      todoTaskIds.push(task.id);
    });
    
    // Create a new board with the generated tasks
    const newBoardData: BoardData = {
      tasks: newTasks,
      columns: {
        'column-1': {
          id: 'column-1',
          title: 'To Do',
          taskIds: todoTaskIds,
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
    
    console.log('New board data:', newBoardData);
    
    // Extract project type from tasks and set board title
    const projectType = extractProjectTypeFromTasks(tasks);
    setBoardTitle(`${projectType} Project Board`);
    
    // Update the board with the new data
    setBoardData(newBoardData);
    
    // Show success toast
    toast({
      title: `${tasks.length} tasks created`,
      description: "Your Kanban board has been generated successfully."
    });
    
    // Hide the AI prompt
    setShowAIPrompt(false);
  };

  // Helper to extract project type from tasks
  const extractProjectTypeFromTasks = (tasks: Task[]): string => {
    // Look for setup task that might contain project type
    const setupTask = tasks.find(task => 
      task.title.toLowerCase().includes('setup') || 
      task.title.toLowerCase().includes('initial')
    );
    
    if (setupTask) {
      const titleWords = setupTask.title.split(' ');
      // Find "for [project type]" in the title
      const forIndex = titleWords.findIndex(word => word.toLowerCase() === 'for');
      if (forIndex !== -1 && forIndex < titleWords.length - 1) {
        // Return everything after "for"
        return titleWords.slice(forIndex + 1).join(' ').replace(/[.,]/g, '');
      }
    }
    
    // Get all tags from tasks
    const allTags = tasks.flatMap(task => task.tags || []);
    
    // Check for specific feature tags that might indicate project type
    if (allTags.includes('cart') || allTags.includes('product-listings')) {
      return 'E-commerce';
    }
    
    if (allTags.includes('content-management') || allTags.includes('blog')) {
      return 'Blog';
    }
    
    if (allTags.includes('dashboard') || allTags.includes('analytics')) {
      return 'Dashboard';
    }
    
    if (allTags.includes('user-profiles') && allTags.includes('social-sharing')) {
      return 'Social Network';
    }
    
    if (allTags.includes('game')) {
      return 'Game Development';
    }
    
    // Check if tasks titles contain project type indicators
    for (const task of tasks) {
      const lowerTitle = task.title.toLowerCase();
      const taskDescription = (task.description || '').toLowerCase();
      
      const projectTypeIndicators = [
        { type: 'E-commerce', terms: ['e-commerce', 'ecommerce', 'shop', 'store'] },
        { type: 'Blog', terms: ['blog', 'content management'] },
        { type: 'Dashboard', terms: ['dashboard', 'admin panel'] },
        { type: 'Mobile App', terms: ['mobile app', 'ios', 'android'] },
        { type: 'Social Network', terms: ['social network', 'community'] },
        { type: 'Portfolio', terms: ['portfolio', 'personal site'] },
      ];
      
      for (const { type, terms } of projectTypeIndicators) {
        if (terms.some(term => lowerTitle.includes(term) || taskDescription.includes(term))) {
          return type;
        }
      }
    }
    
    // Default project type if none detected
    return "New";
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">{boardTitle}</h1>
            <p className="text-muted-foreground">Manage your tasks and track progress</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9">
              <CalendarDays className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Timeline</span>
            </Button>
            <Button variant="outline" size="sm" className="h-9">
              <Users className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Team</span>
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              className="h-9"
              onClick={() => setShowAIPrompt(!showAIPrompt)}
            >
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">New from AI</span>
            </Button>
          </div>
        </div>
        
        {showAIPrompt && (
          <div className="mb-6 animate-in">
            <AIPromptInput onGenerateBoard={handleGenerateBoard} />
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search tasks..." 
              className="pl-10 h-9"
            />
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-9">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-x-auto pb-8">
        <KanbanBoard initialData={boardData} className="min-h-[500px]" />
      </div>
    </div>
  );
};

export default Board;
