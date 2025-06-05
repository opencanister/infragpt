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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const infraSchema = z.object({
  infraType: z.string().min(1, { message: 'Välj en infrastrukturtyp' }),
  location: z.string().min(1, { message: 'Ange plats' }),
  region: z.string().min(1, { message: 'Välj en region' }),
});

type InfraValues = z.infer<typeof infraSchema>;

interface InfraTypeStepProps {
  formData: any;
  updateFormData: (data: Partial<InfraValues>) => void;
  onNext: () => void;
  onPrev: () => void;
  infraTypes: string[];
  regions: string[];
}

export default function InfraTypeStep({ 
  formData, 
  updateFormData, 
  onNext, 
  onPrev,
  infraTypes,
  regions
}: InfraTypeStepProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<InfraValues>({
    resolver: zodResolver(infraSchema),
    defaultValues: {
      infraType: formData.infraType || '',
      location: formData.location || '',
      region: formData.region || '',
    },
  });

  function onSubmit(values: InfraValues) {
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
          name="infraType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Infrastrukturkategori</FormLabel>
              <Select
                disabled={isLoading}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Välj infrastrukturtyp" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {infraTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plats</FormLabel>
              <FormControl>
                <Input
                  placeholder="T.ex. 'Stockholm', 'Lund', etc."
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
          name="region"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Region</FormLabel>
              <Select
                disabled={isLoading}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Välj region" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={onPrev} disabled={isLoading}>
            Tillbaka
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Bearbetar...' : 'Nästa'}
          </Button>
        </div>
      </form>
    </Form>
  );
}