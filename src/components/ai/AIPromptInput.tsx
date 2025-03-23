
import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, Loader2, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { processAIPrompt } from '@/utils/ai-utils';
import { Task } from '@/components/board/KanbanBoard';

interface AIPromptInputProps {
  onGenerateBoard: (tasks: Task[]) => void;
  className?: string;
}

const AIPromptInput: React.FC<AIPromptInputProps> = ({ onGenerateBoard, className }) => {
  const [prompt, setPrompt] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [processingStage, setProcessingStage] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a description of your project.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Show toast that we're analyzing the prompt
      toast({
        title: "Analyzing project description",
        description: "Identifying tasks, features, and requirements...",
      });
      
      setProcessingStage("Analyzing project description");
      // Small delay to show stages for UX
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setProcessingStage("Identifying key features");
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setProcessingStage("Generating tasks");
      // Get tasks from the AI processing function
      const generatedTasks = await processAIPrompt(prompt);
      
      // Log the generated tasks for debugging
      console.log('Generated tasks from AI:', generatedTasks);
      
      if (!generatedTasks || generatedTasks.length === 0) {
        throw new Error("No tasks could be generated");
      }
      
      setProcessingStage("Creating Kanban board");
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Pass the tasks to the parent component
      onGenerateBoard(generatedTasks);
      
      toast({
        title: `${generatedTasks.length} tasks generated`,
        description: "Your Kanban board has been created based on your project description.",
      });
      
      setPrompt('');
      setIsExpanded(false);
      setProcessingStage(null);
    } catch (error) {
      console.error('Error generating board:', error);
      toast({
        title: "Error",
        description: "Failed to generate board. Please try again with more details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setProcessingStage(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);
  
  const handleCancel = () => {
    setPrompt('');
    setIsExpanded(false);
  };

  const placeholderExamples = [
    "Describe your project and I'll create a Kanban board for you...",
    "E.g. 'Build an e-commerce website with user authentication and product search'",
    "E.g. 'Create a blog with commenting system and analytics tracking'",
    "E.g. 'Develop a mobile app with user profiles and notifications'"
  ];

  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  // Rotate placeholder examples
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholderExamples.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [placeholderExamples.length]);

  return (
    <div className={cn(
      "bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 border border-indigo-100 dark:border-indigo-500/20 rounded-lg overflow-hidden transition-all duration-300",
      isExpanded ? "shadow-md" : "shadow-sm",
      className
    )}>
      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex items-center mb-2">
          <div className="flex items-center bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 px-2 py-0.5 rounded-full text-xs font-medium">
            <Sparkles className="h-3 w-3 mr-1" />
            AI-Powered
          </div>
          <div className="flex-1" />
          {isExpanded && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={handleCancel}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <Textarea
          ref={inputRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsExpanded(true)}
          placeholder={placeholderExamples[placeholderIndex]}
          className={cn(
            "min-h-[60px] resize-none border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-base",
            isExpanded ? "min-h-[120px]" : "min-h-[60px]"
          )}
          disabled={isLoading}
        />
        
        {isExpanded && (
          <div className="flex items-center justify-between mt-4">
            {isLoading && processingStage ? (
              <p className="text-xs text-muted-foreground animate-pulse">
                {processingStage}...
              </p>
            ) : (
              <p className="text-xs text-muted-foreground">
                Press <kbd className="px-1 py-0.5 rounded bg-muted border text-[10px]">⌘</kbd> + 
                <kbd className="px-1 py-0.5 rounded bg-muted border text-[10px] ml-1">Enter</kbd> 
                <span className="mx-1">to submit</span>
              </p>
            )}
            
            <Button
              type="submit"
              className="rounded-full px-4"
              disabled={isLoading || !prompt.trim()}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {processingStage || "Analyzing Project..."}
                </>
              ) : (
                <>
                  Generate Board
                  <ArrowUp className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AIPromptInput;
