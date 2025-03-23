
import React from 'react';
import { CalendarDays, GitPullRequest, List, BarChart3, Clock, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AIPromptInput from '@/components/ai/AIPromptInput';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  const stats = [
    { name: 'Active Projects', value: '4', icon: Star, color: 'text-purple-500' },
    { name: 'Open Tasks', value: '16', icon: List, color: 'text-blue-500' },
    { name: 'Current Sprint', value: 'Sprint 3', icon: GitPullRequest, color: 'text-green-500' },
    { name: 'Upcoming Deadline', value: 'May 18', icon: CalendarDays, color: 'text-amber-500' },
  ];
  
  const recentActivity = [
    { action: 'Created task', item: 'Add dark mode support', user: 'John Doe', time: '2 hours ago' },
    { action: 'Completed task', item: 'Implement login UI', user: 'Alice Smith', time: '3 hours ago' },
    { action: 'Updated task', item: 'Fix navigation bug', user: 'Bob Johnson', time: '5 hours ago' },
    { action: 'Added comment', item: 'Database schema design', user: 'Emily Chen', time: '6 hours ago' },
    { action: 'Started sprint', item: 'Sprint 3', user: 'Mike Wilson', time: '2 days ago' },
  ];
  
  const handleGenerateBoard = (tasks: any[]) => {
    // Process the generated tasks and navigate to the board page
    console.log('Generated tasks:', tasks);
    navigate('/board');
  };
  
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
        <p className="text-muted-foreground">
          Start by using AI to create a new project board, or continue working on an existing one.
        </p>
      </div>
      
      <AIPromptInput onGenerateBoard={handleGenerateBoard} className="mb-6" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="animate-in delay-100">
            <CardContent className="p-6 flex items-center">
              <div className={`h-12 w-12 rounded-full bg-opacity-15 flex items-center justify-center mr-4 ${stat.color.replace('text-', 'bg-')}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-medium">{stat.name}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
        <Card className="lg:col-span-4 animate-in delay-200">
          <CardHeader>
            <CardTitle>Active Projects</CardTitle>
            <CardDescription>Your current project status and progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="p-3 border rounded-md hover:bg-secondary/50 transition-colors cursor-pointer">
                <div className="flex justify-between mb-1">
                  <h4 className="font-medium">E-commerce Website</h4>
                  <span className="text-xs text-green-500 font-medium">On track</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Implementing checkout and payment features</p>
                <div className="flex justify-between text-xs">
                  <span>Progress: 65%</span>
                  <span>Due: May 24</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '65%' }} />
                </div>
              </div>
              
              <div className="p-3 border rounded-md hover:bg-secondary/50 transition-colors cursor-pointer">
                <div className="flex justify-between mb-1">
                  <h4 className="font-medium">Mobile App Redesign</h4>
                  <span className="text-xs text-amber-500 font-medium">At risk</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Updating UI components and navigation</p>
                <div className="flex justify-between text-xs">
                  <span>Progress: 32%</span>
                  <span>Due: May 18</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '32%' }} />
                </div>
              </div>
              
              <div className="p-3 border rounded-md hover:bg-secondary/50 transition-colors cursor-pointer">
                <div className="flex justify-between mb-1">
                  <h4 className="font-medium">AI Chatbot</h4>
                  <span className="text-xs text-blue-500 font-medium">In planning</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Defining requirements and architecture</p>
                <div className="flex justify-between text-xs">
                  <span>Progress: 10%</span>
                  <span>Due: June 10</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '10%' }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2 animate-in delay-300">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest team activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 text-sm">
                  <Clock className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                  <div>
                    <p>
                      <span className="font-medium">{activity.user}</span>{' '}
                      <span className="text-muted-foreground">{activity.action}</span>{' '}
                      <span className="font-medium">{activity.item}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
