
import { Task } from '@/components/board/KanbanBoard';

// Simulated AI processing function
export const processAIPrompt = async (prompt: string): Promise<Task[]> => {
  console.log('Processing AI prompt:', prompt);
  
  // In a real implementation, this would call an AI service
  return new Promise((resolve) => {
    setTimeout(() => {
      const tasks = generateTasksFromPrompt(prompt);
      console.log('Generated tasks:', tasks);
      resolve(tasks);
    }, 2000); // Simulate API call delay
  });
};

// Generate tasks based on the prompt content
const generateTasksFromPrompt = (prompt: string): Task[] => {
  const promptLower = prompt.toLowerCase();
  const tasks: Task[] = [];
  const today = new Date();
  
  // Extract potential project type from prompt
  const projectType = determineProjectType(promptLower);
  
  // Extract potential features from prompt
  const features = extractFeatures(promptLower);
  
  // Generate tasks based on project type
  generateProjectBaseTasks(tasks, projectType, today);
  
  // Generate feature-specific tasks
  features.forEach(feature => {
    generateFeatureTasks(tasks, feature, today);
  });
  
  // If we don't have enough tasks, add some generic ones
  if (tasks.length < 3) {
    generateGenericTasks(tasks, today);
  }
  
  // Log information about what was generated
  console.log(`Generated ${tasks.length} tasks for project type: ${projectType}`);
  console.log('Features detected:', features);
  
  return tasks;
};

// Determine the primary project type from the prompt
const determineProjectType = (promptLower: string): string => {
  if (promptLower.includes('e-commerce') || promptLower.includes('shop') || promptLower.includes('store')) {
    return 'e-commerce';
  } else if (promptLower.includes('blog') || promptLower.includes('cms') || promptLower.includes('content')) {
    return 'blog';
  } else if (promptLower.includes('dashboard') || promptLower.includes('admin') || promptLower.includes('analytics')) {
    return 'dashboard';
  } else if (promptLower.includes('mobile') || promptLower.includes('app') || promptLower.includes('android') || promptLower.includes('ios')) {
    return 'mobile-app';
  } else if (promptLower.includes('game') || promptLower.includes('gaming')) {
    return 'game';
  } else if (promptLower.includes('social') || promptLower.includes('network') || promptLower.includes('community')) {
    return 'social-network';
  } else {
    return 'website';
  }
};

// Extract potential features from the prompt
const extractFeatures = (promptLower: string): string[] => {
  const features: string[] = [];
  
  // Authentication features
  if (promptLower.includes('login') || promptLower.includes('auth') || promptLower.includes('user account')) {
    features.push('authentication');
  }
  
  // E-commerce features
  if (promptLower.includes('cart') || promptLower.includes('checkout') || promptLower.includes('payment')) {
    features.push('shopping-cart');
  }
  if (promptLower.includes('product') || promptLower.includes('catalog') || promptLower.includes('inventory')) {
    features.push('product-catalog');
  }
  
  // Content features
  if (promptLower.includes('search') || promptLower.includes('filter')) {
    features.push('search');
  }
  if (promptLower.includes('comment') || promptLower.includes('review')) {
    features.push('comments');
  }
  
  // Technical requirements
  if (promptLower.includes('performance') || promptLower.includes('speed') || promptLower.includes('optimization')) {
    features.push('performance');
  }
  if (promptLower.includes('security') || promptLower.includes('secure')) {
    features.push('security');
  }
  if (promptLower.includes('responsive') || promptLower.includes('mobile-friendly')) {
    features.push('responsive-design');
  }
  if (promptLower.includes('api') || promptLower.includes('backend') || promptLower.includes('database')) {
    features.push('api-integration');
  }
  
  // Additional features
  if (promptLower.includes('notification') || promptLower.includes('alert')) {
    features.push('notifications');
  }
  if (promptLower.includes('admin') || promptLower.includes('dashboard')) {
    features.push('admin-panel');
  }
  if (promptLower.includes('analytics') || promptLower.includes('tracking')) {
    features.push('analytics');
  }
  
  return features;
};

// Generate base tasks for the project type
const generateProjectBaseTasks = (tasks: Task[], projectType: string, today: Date): void => {
  // Common setup tasks for all project types
  tasks.push({
    id: `task-${Date.now()}-setup`,
    title: `Setup ${projectType} project structure`,
    description: 'Initialize repository and configure build tools',
    priority: 'high',
    tags: ['development', 'setup'],
    assignee: {
      id: 'user-1',
      name: 'John Doe',
    },
    dueDate: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });
  
  // Project-specific base tasks
  switch (projectType) {
    case 'e-commerce':
      tasks.push({
        id: `task-${Date.now()}-ecommerce-1`,
        title: 'Design product listing page',
        description: 'Create responsive grid layout for product catalog',
        priority: 'high',
        tags: ['design', 'feature'],
        assignee: {
          id: 'user-4',
          name: 'Emily Chen',
        },
        dueDate: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      });
      break;
      
    case 'blog':
      tasks.push({
        id: `task-${Date.now()}-blog-1`,
        title: 'Design blog post template',
        description: 'Create responsive layout for blog articles with typography guidelines',
        priority: 'high',
        tags: ['design', 'feature'],
        assignee: {
          id: 'user-4',
          name: 'Emily Chen',
        },
        dueDate: new Date(today.getTime() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      });
      break;
      
    case 'dashboard':
      tasks.push({
        id: `task-${Date.now()}-dashboard-1`,
        title: 'Design dashboard layout',
        description: 'Create responsive grid with widgets and data visualization components',
        priority: 'high',
        tags: ['design', 'feature'],
        assignee: {
          id: 'user-4',
          name: 'Emily Chen',
        },
        dueDate: new Date(today.getTime() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      });
      break;
      
    case 'mobile-app':
      tasks.push({
        id: `task-${Date.now()}-mobile-1`,
        title: 'Design mobile navigation',
        description: 'Create navigation flow and UI components for mobile app',
        priority: 'high',
        tags: ['design', 'feature'],
        assignee: {
          id: 'user-4',
          name: 'Emily Chen',
        },
        dueDate: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      });
      break;
      
    case 'game':
      tasks.push({
        id: `task-${Date.now()}-game-1`,
        title: 'Design game UI components',
        description: 'Create buttons, menus, and game interface elements',
        priority: 'high',
        tags: ['design', 'ui'],
        assignee: {
          id: 'user-4',
          name: 'Emily Chen',
        },
        dueDate: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      });
      break;
      
    case 'social-network':
      tasks.push({
        id: `task-${Date.now()}-social-1`,
        title: 'Design user profile page',
        description: 'Create responsive layout for user profiles with activity feed',
        priority: 'high',
        tags: ['design', 'feature'],
        assignee: {
          id: 'user-4',
          name: 'Emily Chen',
        },
        dueDate: new Date(today.getTime() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      });
      break;
      
    default: // Website or other
      tasks.push({
        id: `task-${Date.now()}-website-1`,
        title: 'Design homepage layout',
        description: 'Create responsive homepage with key sections and navigation',
        priority: 'high',
        tags: ['design', 'ui'],
        assignee: {
          id: 'user-4',
          name: 'Emily Chen',
        },
        dueDate: new Date(today.getTime() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      });
  }
};

// Generate tasks for specific features
const generateFeatureTasks = (tasks: Task[], feature: string, today: Date): void => {
  const getRandomAssignee = (): { id: string; name: string } => {
    const assignees = [
      { id: 'user-1', name: 'John Doe' },
      { id: 'user-2', name: 'Alice Smith' },
      { id: 'user-3', name: 'Bob Johnson' },
      { id: 'user-4', name: 'Emily Chen' },
      { id: 'user-5', name: 'Mike Wilson' },
    ];
    return assignees[Math.floor(Math.random() * assignees.length)];
  };
  
  const getRandomDueDate = (): string => {
    const days = Math.floor(Math.random() * 14) + 3; // 3 to 16 days from now
    return new Date(today.getTime() + days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  };
  
  // Create feature-specific tasks
  switch (feature) {
    case 'authentication':
      tasks.push({
        id: `task-${Date.now()}-auth-1`,
        title: 'Implement user authentication flow',
        description: 'Create registration, login, and password recovery functionality',
        priority: 'high',
        tags: ['security', 'feature'],
        assignee: getRandomAssignee(),
        dueDate: getRandomDueDate(),
      });
      
      tasks.push({
        id: `task-${Date.now()}-auth-2`,
        title: 'Design auth UI components',
        description: 'Create login forms, registration pages, and error states',
        priority: 'medium',
        tags: ['design', 'ui'],
        assignee: getRandomAssignee(),
        dueDate: getRandomDueDate(),
      });
      break;
      
    case 'shopping-cart':
      tasks.push({
        id: `task-${Date.now()}-cart-1`,
        title: 'Implement shopping cart functionality',
        description: 'Add/remove items, update quantities, and calculate totals',
        priority: 'high',
        tags: ['feature', 'development'],
        assignee: getRandomAssignee(),
        dueDate: getRandomDueDate(),
      });
      
      tasks.push({
        id: `task-${Date.now()}-cart-2`,
        title: 'Create checkout process',
        description: 'Add payment integration, shipping options, and order confirmation',
        priority: 'high',
        tags: ['feature', 'development'],
        assignee: getRandomAssignee(),
        dueDate: getRandomDueDate(),
      });
      break;
      
    case 'product-catalog':
      tasks.push({
        id: `task-${Date.now()}-catalog-1`,
        title: 'Implement product catalog',
        description: 'Build product listings with filtering and sorting capabilities',
        priority: 'high',
        tags: ['feature', 'development'],
        assignee: getRandomAssignee(),
        dueDate: getRandomDueDate(),
      });
      
      tasks.push({
        id: `task-${Date.now()}-catalog-2`,
        title: 'Create product detail page',
        description: 'Design and implement detailed product view with images and specifications',
        priority: 'medium',
        tags: ['design', 'development'],
        assignee: getRandomAssignee(),
        dueDate: getRandomDueDate(),
      });
      break;
      
    case 'search':
      tasks.push({
        id: `task-${Date.now()}-search-1`,
        title: 'Implement search functionality',
        description: 'Create search interface with filters and sorting options',
        priority: 'medium',
        tags: ['feature', 'development'],
        assignee: getRandomAssignee(),
        dueDate: getRandomDueDate(),
      });
      break;
      
    case 'comments':
      tasks.push({
        id: `task-${Date.now()}-comments-1`,
        title: 'Design comments/review system',
        description: 'Create UI for user comments, reviews, and ratings',
        priority: 'low',
        tags: ['feature', 'design'],
        assignee: getRandomAssignee(),
        dueDate: getRandomDueDate(),
      });
      
      tasks.push({
        id: `task-${Date.now()}-comments-2`,
        title: 'Implement comments/review functionality',
        description: 'Add backend integration for storing and retrieving user feedback',
        priority: 'low',
        tags: ['feature', 'development'],
        assignee: getRandomAssignee(),
        dueDate: getRandomDueDate(),
      });
      break;
      
    case 'performance':
      tasks.push({
        id: `task-${Date.now()}-perf-1`,
        title: 'Optimize image loading',
        description: 'Implement lazy loading and responsive images',
        priority: 'medium',
        tags: ['performance', 'improvement'],
        assignee: getRandomAssignee(),
        dueDate: getRandomDueDate(),
      });
      
      tasks.push({
        id: `task-${Date.now()}-perf-2`,
        title: 'Performance audit and optimization',
        description: 'Run Lighthouse audits and address performance bottlenecks',
        priority: 'medium',
        tags: ['performance', 'improvement'],
        assignee: getRandomAssignee(),
        dueDate: getRandomDueDate(),
      });
      break;
      
    case 'security':
      tasks.push({
        id: `task-${Date.now()}-sec-1`,
        title: 'Security audit',
        description: 'Review code for potential vulnerabilities',
        priority: 'high',
        tags: ['security', 'bug'],
        assignee: getRandomAssignee(),
        dueDate: getRandomDueDate(),
      });
      
      tasks.push({
        id: `task-${Date.now()}-sec-2`,
        title: 'Implement security measures',
        description: 'Add CSRF protection, XSS prevention, and input validation',
        priority: 'high',
        tags: ['security', 'bug'],
        assignee: getRandomAssignee(),
        dueDate: getRandomDueDate(),
      });
      break;
      
    case 'responsive-design':
      tasks.push({
        id: `task-${Date.now()}-resp-1`,
        title: 'Implement responsive layouts',
        description: 'Ensure all pages adapt to various screen sizes',
        priority: 'high',
        tags: ['design', 'ui'],
        assignee: getRandomAssignee(),
        dueDate: getRandomDueDate(),
      });
      
      tasks.push({
        id: `task-${Date.now()}-resp-2`,
        title: 'Mobile compatibility testing',
        description: 'Test functionality on various mobile devices and browsers',
        priority: 'medium',
        tags: ['testing', 'qa'],
        assignee: getRandomAssignee(),
        dueDate: getRandomDueDate(),
      });
      break;
      
    case 'api-integration':
      tasks.push({
        id: `task-${Date.now()}-api-1`,
        title: 'Design API structure',
        description: 'Define API endpoints, authentication, and data models',
        priority: 'high',
        tags: ['development', 'backend'],
        assignee: getRandomAssignee(),
        dueDate: getRandomDueDate(),
      });
      
      tasks.push({
        id: `task-${Date.now()}-api-2`,
        title: 'Implement API integration',
        description: 'Connect frontend with backend API services',
        priority: 'high',
        tags: ['development', 'backend'],
        assignee: getRandomAssignee(),
        dueDate: getRandomDueDate(),
      });
      break;
      
    case 'notifications':
      tasks.push({
        id: `task-${Date.now()}-notif-1`,
        title: 'Implement notification system',
        description: 'Create UI for alerts, messages, and notifications',
        priority: 'medium',
        tags: ['feature', 'development'],
        assignee: getRandomAssignee(),
        dueDate: getRandomDueDate(),
      });
      break;
      
    case 'admin-panel':
      tasks.push({
        id: `task-${Date.now()}-admin-1`,
        title: 'Design admin dashboard',
        description: 'Create UI for administrative controls and data management',
        priority: 'medium',
        tags: ['design', 'ui'],
        assignee: getRandomAssignee(),
        dueDate: getRandomDueDate(),
      });
      
      tasks.push({
        id: `task-${Date.now()}-admin-2`,
        title: 'Implement admin functionality',
        description: 'Add user management, content editing, and system settings',
        priority: 'medium',
        tags: ['feature', 'development'],
        assignee: getRandomAssignee(),
        dueDate: getRandomDueDate(),
      });
      break;
      
    case 'analytics':
      tasks.push({
        id: `task-${Date.now()}-analytics-1`,
        title: 'Integrate analytics tracking',
        description: 'Add tracking code and event monitoring',
        priority: 'low',
        tags: ['feature', 'development'],
        assignee: getRandomAssignee(),
        dueDate: getRandomDueDate(),
      });
      
      tasks.push({
        id: `task-${Date.now()}-analytics-2`,
        title: 'Create analytics dashboard',
        description: 'Design UI for viewing usage metrics and trends',
        priority: 'low',
        tags: ['design', 'development'],
        assignee: getRandomAssignee(),
        dueDate: getRandomDueDate(),
      });
      break;
  }
};

// Generate generic tasks when needed
const generateGenericTasks = (tasks: Task[], today: Date): void => {
  tasks.push({
    id: `task-${Date.now()}-generic-1`,
    title: 'Initial project setup',
    description: 'Create repository and configure development environment',
    priority: 'high',
    tags: ['setup'],
    assignee: {
      id: 'user-1',
      name: 'John Doe',
    },
    dueDate: new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });
  
  tasks.push({
    id: `task-${Date.now()}-generic-2`,
    title: 'Design system implementation',
    description: 'Create core UI components and style guide',
    priority: 'medium',
    tags: ['design', 'ui'],
    assignee: {
      id: 'user-4',
      name: 'Emily Chen',
    },
    dueDate: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });
  
  tasks.push({
    id: `task-${Date.now()}-generic-3`,
    title: 'Documentation',
    description: 'Create comprehensive development documentation',
    priority: 'low',
    tags: ['documentation'],
    assignee: {
      id: 'user-2',
      name: 'Alice Smith',
    },
    dueDate: new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });
};

