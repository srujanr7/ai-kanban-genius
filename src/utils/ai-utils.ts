
import { Task } from '@/components/board/KanbanBoard';

// Simulated AI processing function
export const processAIPrompt = async (prompt: string): Promise<Task[]> => {
  // In a real implementation, this would call an AI service
  return new Promise((resolve) => {
    setTimeout(() => {
      const tasks = generateMockTasksFromPrompt(prompt);
      resolve(tasks);
    }, 2000); // Simulate API call delay
  });
};

// Generate mock tasks based on the prompt
const generateMockTasksFromPrompt = (prompt: string): Task[] => {
  const promptLower = prompt.toLowerCase();
  const tasks: Task[] = [];
  const today = new Date();
  
  // Development tasks
  if (promptLower.includes('website') || promptLower.includes('app') || promptLower.includes('develop')) {
    tasks.push({
      id: `task-${Date.now()}-1`,
      title: 'Setup project structure',
      description: 'Initialize repository and configure build tools',
      priority: 'high',
      tags: ['development', 'setup'],
      assignee: {
        id: 'user-1',
        name: 'John Doe',
      },
      dueDate: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    });
    
    tasks.push({
      id: `task-${Date.now()}-2`,
      title: 'Create component library',
      description: 'Design and implement reusable UI components',
      priority: 'medium',
      tags: ['development', 'ui'],
      assignee: {
        id: 'user-2',
        name: 'Alice Smith',
      },
      dueDate: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    });
  }
  
  // Login/Authentication
  if (promptLower.includes('login') || promptLower.includes('auth') || promptLower.includes('user')) {
    tasks.push({
      id: `task-${Date.now()}-3`,
      title: 'Implement authentication flow',
      description: 'Setup user registration, login, and password recovery',
      priority: 'high',
      tags: ['security', 'feature'],
      assignee: {
        id: 'user-3',
        name: 'Bob Johnson',
      },
      dueDate: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    });
  }
  
  // E-commerce
  if (promptLower.includes('e-commerce') || promptLower.includes('shop') || promptLower.includes('cart') || promptLower.includes('checkout')) {
    tasks.push({
      id: `task-${Date.now()}-4`,
      title: 'Design product listing page',
      description: 'Create responsive grid layout for products',
      priority: 'medium',
      tags: ['design', 'feature'],
      assignee: {
        id: 'user-4',
        name: 'Emily Chen',
      },
      dueDate: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    });
    
    tasks.push({
      id: `task-${Date.now()}-5`,
      title: 'Implement shopping cart',
      description: 'Add/remove items, update quantities, calculate totals',
      priority: 'high',
      tags: ['feature', 'development'],
      assignee: {
        id: 'user-1',
        name: 'John Doe',
      },
      dueDate: new Date(today.getTime() + 6 * 24 * 60 * 60 * 1000).toISOString(),
    });
    
    tasks.push({
      id: `task-${Date.now()}-6`,
      title: 'Create checkout process',
      description: 'Payment integration, order confirmation, and email notifications',
      priority: 'high',
      tags: ['feature', 'development'],
      assignee: {
        id: 'user-3',
        name: 'Bob Johnson',
      },
      dueDate: new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    });
  }
  
  // Performance
  if (promptLower.includes('performance') || promptLower.includes('speed') || promptLower.includes('optimization')) {
    tasks.push({
      id: `task-${Date.now()}-7`,
      title: 'Optimize image loading',
      description: 'Implement lazy loading and responsive images',
      priority: 'medium',
      tags: ['performance', 'improvement'],
      assignee: {
        id: 'user-2',
        name: 'Alice Smith',
      },
      dueDate: new Date(today.getTime() + 8 * 24 * 60 * 60 * 1000).toISOString(),
    });
    
    tasks.push({
      id: `task-${Date.now()}-8`,
      title: 'Implement caching strategy',
      description: 'Set up browser caching and service workers',
      priority: 'low',
      tags: ['performance', 'improvement'],
      assignee: {
        id: 'user-5',
        name: 'Mike Wilson',
      },
      dueDate: new Date(today.getTime() + 12 * 24 * 60 * 60 * 1000).toISOString(),
    });
  }
  
  // Security
  if (promptLower.includes('security') || promptLower.includes('secure')) {
    tasks.push({
      id: `task-${Date.now()}-9`,
      title: 'Security audit',
      description: 'Review code for potential vulnerabilities',
      priority: 'high',
      tags: ['security', 'bug'],
      assignee: {
        id: 'user-3',
        name: 'Bob Johnson',
      },
      dueDate: new Date(today.getTime() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    });
    
    tasks.push({
      id: `task-${Date.now()}-10`,
      title: 'Implement CSRF protection',
      description: 'Add CSRF tokens to all forms',
      priority: 'high',
      tags: ['security', 'bug'],
      assignee: {
        id: 'user-5',
        name: 'Mike Wilson',
      },
      dueDate: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    });
  }
  
  // If we don't have enough tasks, add some generic ones
  if (tasks.length < 3) {
    tasks.push({
      id: `task-${Date.now()}-11`,
      title: 'Initial project setup',
      description: 'Create repository and configure development environment',
      priority: 'high',
      tags: ['setup'],
      assignee: {
        id: 'user-1',
        name: 'John Doe',
      },
      dueDate: new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    });
    
    tasks.push({
      id: `task-${Date.now()}-12`,
      title: 'Design system implementation',
      description: 'Create core UI components and style guide',
      priority: 'medium',
      tags: ['design', 'ui'],
      assignee: {
        id: 'user-4',
        name: 'Emily Chen',
      },
      dueDate: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    });
    
    tasks.push({
      id: `task-${Date.now()}-13`,
      title: 'Documentation',
      description: 'Create comprehensive development documentation',
      priority: 'low',
      tags: ['documentation'],
      assignee: {
        id: 'user-2',
        name: 'Alice Smith',
      },
      dueDate: new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    });
  }
  
  return tasks;
};
