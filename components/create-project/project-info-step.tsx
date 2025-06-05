"use client";

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const projectInfoSchema = z.object({
  name: z.string().min(2, { message: 'Namnet måste vara minst 2 tecken' }),
  description: z.string().optional(),
});

type ProjectInfoValues = z.infer<typeof projectInfoSchema>;

interface ProjectInfoStepProps {
  formData: any;
  updateFormData: (data: Partial<ProjectInfoValues>) => void;
  onNext: () => void;
}

export default function ProjectInfoStep({ formData, updateFormData, onNext }: ProjectInfoStepProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<ProjectInfoValues>({
    resolver: zodResolver(projectInfoSchema),
    defaultValues: {
      name: formData.name || '',
      description: formData.description || '',
    },
  });

  function onSubmit(values: ProjectInfoValues) {
    setIsLoading(true);
    
    // Simulate processing
    setTimeout(() => {
      updateFormData(values);
      setIsLoading(false);
      onNext();
    }, 500);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Projektnamn</FormLabel>
              <FormControl>
                <Input
                  placeholder="T.ex. 'Stockholm Fiber Expansion Q2/2025'"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Beskrivning <span className="text-muted-foreground">(valfritt)</span></FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Beskriv projektet kortfattat"
                  className="min-h-32"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Bearbetar...' : 'Nästa'}
          </Button>
        </div>
      </form>
    </Form>
  );
}