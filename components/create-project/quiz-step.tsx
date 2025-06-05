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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface QuizStepProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

// This would normally come from an API based on infraType
const getQuizQuestions = (infraType: string) => {
  switch (infraType) {
    case 'El':
      return [
        {
          id: 'voltageLevel',
          prompt: 'Vilken spänningsnivå gäller?',
          type: 'radio',
          options: [
            { value: '230V', label: '230 V' },
            { value: '10kV', label: '10 kV' },
            { value: '20kV', label: '20 kV' },
            { value: '40kV', label: '40 kV' },
          ],
        },
        {
          id: 'networkType',
          prompt: 'Är detta ett distributions- eller transmissionsnät?',
          type: 'radio',
          options: [
            { value: 'Distribution', label: 'Distribution' },
            { value: 'Transmission', label: 'Transmission' },
          ],
        },
        {
          id: 'hasTransformer',
          prompt: 'Kommer projektet inkludera mätarinstallation eller transformatorstationer?',
          type: 'radio',
          options: [
            { value: 'yes', label: 'Ja' },
            { value: 'no', label: 'Nej' },
          ],
        },
      ];
    case 'VA':
      return [
        {
          id: 'pipeType',
          prompt: 'Vilken typ av rör används primärt?',
          type: 'select',
          options: [
            { value: 'plastic', label: 'Plast' },
            { value: 'metal', label: 'Metall' },
            { value: 'concrete', label: 'Betong' },
          ],
        },
        {
          id: 'pipeSize',
          prompt: 'Vad är den primära rördimensionen?',
          type: 'select',
          options: [
            { value: '100mm', label: '100 mm' },
            { value: '200mm', label: '200 mm' },
            { value: '300mm', label: '300 mm' },
            { value: '400mm', label: '400 mm' },
          ],
        },
      ];
    case 'Tele & Datakabel':
      return [
        {
          id: 'cableType',
          prompt: 'Vilken typ av kabel installeras?',
          type: 'radio',
          options: [
            { value: 'fiber', label: 'Fiber' },
            { value: 'copper', label: 'Koppar' },
            { value: 'coaxial', label: 'Koaxial' },
          ],
        },
        {
          id: 'installationType',
          prompt: 'Hur installeras kabeln?',
          type: 'radio',
          options: [
            { value: 'underground', label: 'Markförlagd' },
            { value: 'aerial', label: 'Luftburen' },
            { value: 'building', label: 'Inomhus i byggnad' },
          ],
        },
      ];
    default:
      return [
        {
          id: 'genericQuestion',
          prompt: 'Är detta ett större eller mindre projekt?',
          type: 'radio',
          options: [
            { value: 'small', label: 'Mindre (< 1 miljon SEK)' },
            { value: 'medium', label: 'Medel (1-10 miljoner SEK)' },
            { value: 'large', label: 'Stort (> 10 miljoner SEK)' },
          ],
        },
      ];
  }
};

export default function QuizStep({ formData, updateFormData, onNext, onPrev }: QuizStepProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  // Get questions based on infraType
  const quizQuestions = getQuizQuestions(formData.infraType || '');
  
  // Build schema based on questions
  const schemaObj: Record<string, z.ZodType> = {};
  quizQuestions.forEach(q => {
    schemaObj[q.id] = z.string().min(1, { message: 'Detta fält är obligatoriskt' });
  });
  const quizSchema = z.object(schemaObj);
  
  // Set existing answers as default values
  const initialDefaultValues: Record<string, string> = {};
  if (formData.quizAnswers && formData.quizAnswers.length > 0) {
    formData.quizAnswers.forEach((answer: any) => {
      initialDefaultValues[answer.questionKey] = answer.answerValue;
    });
  }

  const form = useForm({
    resolver: zodResolver(quizSchema),
    defaultValues: initialDefaultValues,
  });

  function onSubmit(values: any) {
    setIsLoading(true);
    
    // Format answers for the API
    const quizAnswers = Object.entries(values).map(([questionKey, answerValue]) => ({
      questionKey,
      answerValue: answerValue as string,
    }));
    
    // Simulate processing
    setTimeout(() => {
      updateFormData({ quizAnswers });
      setIsLoading(false);
      onNext();
    }, 500);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="mb-4">
          <h3 className="text-lg font-medium">Detaljerad information</h3>
          <p className="text-sm text-muted-foreground">
            Baserat på ditt val av {formData.infraType || 'infrastruktur'}, svara på följande frågor:
          </p>
        </div>
        
        {quizQuestions.map((question) => (
          <FormField
            key={question.id}
            control={form.control}
            name={question.id}
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>{question.prompt}</FormLabel>
                <FormControl>
                  {question.type === 'radio' ? (
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                      disabled={isLoading}
                    >
                      {question.options.map((option: any) => (
                        <FormItem
                          key={option.value}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={option.value} />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            {option.label}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  ) : (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Välj ett alternativ" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {question.options.map((option: any) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        
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