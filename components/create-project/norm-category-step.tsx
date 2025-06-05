"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Checkbox } from '@/components/ui/checkbox';
import { NormCategory } from '@/types/project';

const normSchema = z.object({
  selectedNorms: z.array(z.string()).min(1, { message: 'Välj minst en normkategori' }),
});

type NormValues = z.infer<typeof normSchema>;

interface NormCategoryStepProps {
  formData: any;
  updateFormData: (data: Partial<NormValues>) => void;
  onNext: () => void;
  onPrev: () => void;
  normCategories: NormCategory[];
}

export default function NormCategoryStep({ 
  formData, 
  updateFormData, 
  onNext, 
  onPrev, 
  normCategories 
}: NormCategoryStepProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  // Calculate initial selected norms directly
  const initialSelectedNorms = formData.infraType && (!formData.selectedNorms || formData.selectedNorms.length === 0)
    ? normCategories
        .filter(cat => cat.name === formData.infraType)
        .map(cat => cat.id)
    : formData.selectedNorms || [];
  
  const form = useForm<NormValues>({
    resolver: zodResolver(normSchema),
    defaultValues: {
      selectedNorms: initialSelectedNorms,
    },
  });

  function onSubmit(values: NormValues) {
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
          name="selectedNorms"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Normkategorier</FormLabel>
                <p className="text-sm text-muted-foreground">
                  Välj vilka normkategorier som är relevanta för ditt projekt.
                </p>
              </div>
              
              <div className="space-y-4">
                {normCategories.map((category) => (
                  <FormField
                    key={category.id}
                    control={form.control}
                    name="selectedNorms"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={category.id}
                          className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(category.id)}
                              onCheckedChange={(checked) => {
                                const updatedValue = checked
                                  ? [...field.value, category.id]
                                  : field.value?.filter(
                                      (value) => value !== category.id
                                    );
                                field.onChange(updatedValue);
                              }}
                              disabled={isLoading}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="font-medium">
                              {category.name}
                            </FormLabel>
                            {category.description && (
                              <p className="text-sm text-muted-foreground">
                                {category.description}
                              </p>
                            )}
                          </div>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
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