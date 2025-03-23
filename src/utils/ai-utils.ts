
// This file contains utility functions for AI-related features

import { Task } from '@/components/board/KanbanBoard';

/**
 * Process an AI prompt and generate tasks based on the project description
 */
export const processAIPrompt = async (prompt: string): Promise<Task[]> => {
  console.log('Processing AI prompt:', prompt);
  
  // Analyze the prompt to extract key information
  const projectType = extractProjectType(prompt);
  const features = extractFeatures(prompt);
  const complexity = determineComplexity(prompt);
  
  console.log('Extracted project type:', projectType);
  console.log('Extracted features:', features);
  console.log('Determined complexity:', complexity);
  
  // Generate tasks based on the extracted information
  const tasks = generateTasksFromFeatures(projectType, features, complexity);
  
  return tasks;
};

/**
 * Extract the type of project from the prompt
 */
const extractProjectType = (prompt: string): string => {
  const promptLower = prompt.toLowerCase();
  
  const projectTypes = [
    { type: 'e-commerce', keywords: ['e-commerce', 'ecommerce', 'online store', 'shop', 'marketplace'] },
    { type: 'blog', keywords: ['blog', 'content management', 'articles', 'posts'] },
    { type: 'portfolio', keywords: ['portfolio', 'showcase', 'personal site'] },
    { type: 'social network', keywords: ['social network', 'social media', 'community'] },
    { type: 'mobile app', keywords: ['mobile app', 'ios', 'android', 'application'] },
    { type: 'dashboard', keywords: ['dashboard', 'admin panel', 'analytics'] },
    { type: 'game', keywords: ['game', 'interactive', 'gaming'] },
    { type: 'productivity', keywords: ['productivity', 'todo', 'task manager', 'calendar'] },
  ];
  
  for (const { type, keywords } of projectTypes) {
    if (keywords.some(keyword => promptLower.includes(keyword))) {
      return type;
    }
  }
  
  return 'web application'; // Default project type
};

/**
 * Extract potential features from the prompt
 */
const extractFeatures = (prompt: string): string[] => {
  const promptLower = prompt.toLowerCase();
  const potentialFeatures = [
    { name: 'authentication', keywords: ['auth', 'login', 'signin', 'register', 'user accounts'] },
    { name: 'search', keywords: ['search', 'filter', 'find'] },
    { name: 'payments', keywords: ['payment', 'checkout', 'stripe', 'paypal'] },
    { name: 'notifications', keywords: ['notification', 'alert', 'message'] },
    { name: 'responsive design', keywords: ['responsive', 'mobile', 'desktop'] },
    { name: 'dark mode', keywords: ['dark mode', 'theme', 'light mode'] },
    { name: 'analytics', keywords: ['analytics', 'tracking', 'statistics'] },
    { name: 'api integration', keywords: ['api', 'integration', 'third party'] },
    { name: 'user profiles', keywords: ['profile', 'user info', 'accounts'] },
    { name: 'data visualization', keywords: ['chart', 'graph', 'visualization'] },
    { name: 'file upload', keywords: ['upload', 'file', 'image', 'document'] },
    { name: 'comments', keywords: ['comment', 'discussion', 'reply'] },
    { name: 'social sharing', keywords: ['social', 'share', 'facebook', 'twitter'] },
    { name: 'cart', keywords: ['cart', 'basket', 'shopping'] },
    { name: 'admin panel', keywords: ['admin', 'dashboard', 'management'] },
    { name: 'real-time', keywords: ['real-time', 'live', 'websocket'] },
    { name: 'subscription', keywords: ['subscription', 'recurring', 'plan'] },
    { name: 'multi-language', keywords: ['localization', 'language', 'translation'] },
    { name: 'SEO', keywords: ['seo', 'search engine', 'metadata'] },
    { name: 'user permissions', keywords: ['permission', 'role', 'access control'] },
  ];
  
  const features: string[] = [];
  
  // Extract features based on keywords
  for (const { name, keywords } of potentialFeatures) {
    if (keywords.some(keyword => promptLower.includes(keyword))) {
      features.push(name);
    }
  }
  
  // Add common features based on project type
  const projectType = extractProjectType(prompt);
  if (projectType === 'e-commerce') {
    if (!features.includes('cart')) features.push('cart');
    if (!features.includes('payments')) features.push('payments');
    if (!features.includes('product listings')) features.push('product listings');
  }
  
  if (projectType === 'blog') {
    if (!features.includes('content management')) features.push('content management');
    if (!features.includes('comments')) features.push('comments');
  }
  
  // If we have very few features, add some based on common sense
  if (features.length < 3) {
    if (!features.includes('responsive design')) features.push('responsive design');
    if (!features.includes('authentication') && ['e-commerce', 'social network', 'dashboard'].includes(projectType)) {
      features.push('authentication');
    }
  }
  
  return features;
};

/**
 * Determine the complexity of the project
 */
const determineComplexity = (prompt: string): 'low' | 'medium' | 'high' => {
  const features = extractFeatures(prompt);
  
  if (features.length > 8) {
    return 'high';
  } else if (features.length > 4) {
    return 'medium';
  } else {
    return 'low';
  }
};

/**
 * Generate an array of tasks based on the extracted features
 */
const generateTasksFromFeatures = (
  projectType: string, 
  features: string[], 
  complexity: 'low' | 'medium' | 'high'
): Task[] => {
  const tasks: Task[] = [];
  const now = new Date();
  
  // Define task structure for project setup
  tasks.push({
    id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    title: `Initial project setup for ${projectType}`,
    description: `Set up the basic project structure, configure build tools, and establish the main architecture.`,
    priority: 'high',
    tags: ['setup', 'architecture'],
    dueDate: new Date(now.setDate(now.getDate() + 2)).toISOString().split('T')[0],
  });
  
  // Create UI/UX design task
  tasks.push({
    id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    title: 'Create UI/UX design mockups',
    description: 'Design mockups for all key screens and user flows.',
    priority: 'high',
    tags: ['design', 'ui/ux'],
    dueDate: new Date(now.setDate(now.getDate() + 3)).toISOString().split('T')[0],
  });
  
  // Generate feature-specific tasks
  const assignees = [
    { id: 'user-1', name: 'Alex Johnson' },
    { id: 'user-2', name: 'Taylor Smith' },
    { id: 'user-3', name: 'Jordan Lee' },
    { id: 'user-4', name: 'Morgan Chen' },
  ];
  
  // Generate tasks for each feature
  features.forEach((feature, index) => {
    // Create frontend task
    tasks.push({
      id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      title: `Implement ${feature} UI components`,
      description: `Create and style all UI components needed for the ${feature} feature.`,
      priority: index < 3 ? 'high' : index < 6 ? 'medium' : 'low',
      tags: ['frontend', 'ui', feature.toLowerCase().replace(/\s+/g, '-')],
      assignee: assignees[index % assignees.length],
      dueDate: new Date(now.setDate(now.getDate() + 3 + index)).toISOString().split('T')[0],
    });
    
    // Create backend task (if applicable)
    if (!['responsive design', 'dark mode', 'SEO'].includes(feature)) {
      tasks.push({
        id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        title: `Develop ${feature} backend functionality`,
        description: `Implement server-side logic and API endpoints for the ${feature} feature.`,
        priority: index < 3 ? 'high' : index < 6 ? 'medium' : 'low',
        tags: ['backend', 'api', feature.toLowerCase().replace(/\s+/g, '-')],
        assignee: assignees[(index + 2) % assignees.length],
        dueDate: new Date(now.setDate(now.getDate() + 4 + index)).toISOString().split('T')[0],
      });
    }
    
    // Create testing task for important features
    if (index < 5) {
      tasks.push({
        id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        title: `Write tests for ${feature}`,
        description: `Create unit and integration tests for ${feature} functionality.`,
        priority: 'medium',
        tags: ['testing', feature.toLowerCase().replace(/\s+/g, '-')],
        assignee: assignees[(index + 1) % assignees.length],
        dueDate: new Date(now.setDate(now.getDate() + 5 + index)).toISOString().split('T')[0],
      });
    }
  });
  
  // Add deployment task
  tasks.push({
    id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    title: 'Setup deployment pipeline',
    description: 'Configure CI/CD pipeline for automated testing and deployment.',
    priority: 'medium',
    tags: ['devops', 'deployment'],
    dueDate: new Date(now.setDate(now.getDate() + 10)).toISOString().split('T')[0],
  });
  
  // Add documentation task
  tasks.push({
    id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    title: 'Write project documentation',
    description: 'Create comprehensive documentation for the project, including setup instructions and API docs.',
    priority: 'low',
    tags: ['documentation'],
    dueDate: new Date(now.setDate(now.getDate() + 12)).toISOString().split('T')[0],
  });
  
  return tasks;
};
