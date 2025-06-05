"use client";

import { useState } from 'react';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { NormCategory } from '@/types/project';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface ReviewStepProps {
  formData: any;
  onSubmit: () => void;
  onPrev: () => void;
  normCategories: NormCategory[];
}

export default function ReviewStep({ formData, onSubmit, onPrev, normCategories }: ReviewStepProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    onSubmit();
    setIsLoading(false);
  };

  const getQuestionPrompt = (questionKey: string): string => {
    const questionMap: Record<string, string> = {
      voltageLevel: 'Spänningsnivå',
      networkType: 'Nättyp',
      hasTransformer: 'Inkluderar transformatorstationer',
      pipeType: 'Rörtyp',
      pipeSize: 'Rördimension',
      cableType: 'Kabeltyp',
      installationType: 'Installationstyp',
      genericQuestion: 'Projektstorlek',
    };
    
    return questionMap[questionKey] || questionKey;
  };

  const getFormattedAnswer = (questionKey: string, answerValue: string): string => {
    if (questionKey === 'hasTransformer') {
      return answerValue === 'yes' ? 'Ja' : 'Nej';
    }
    return answerValue;
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Granska projektinformation</h3>
        <p className="text-sm text-muted-foreground">
          Kontrollera att all information är korrekt innan du skapar projektet.
        </p>
      </div>
      
      <div className="space-y-6">
        <div>
          <h4 className="font-medium text-sm uppercase text-muted-foreground mb-2">Projektinformation</h4>
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-md">
            <div className="mb-2">
              <span className="text-muted-foreground">Namn:</span>{' '}
              <span className="font-medium">{formData.name}</span>
            </div>
            
            {formData.description && (
              <div className="mb-2">
                <span className="text-muted-foreground">Beskrivning:</span>{' '}
                <span>{formData.description}</span>
              </div>
            )}
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <span className="text-muted-foreground">Startdatum:</span>{' '}
                <span>{format(new Date(formData.startDate), 'PPP', { locale: sv })}</span>
              </div>
              
              <div>
                <span className="text-muted-foreground">Slutdatum:</span>{' '}
                <span>{format(new Date(formData.endDate), 'PPP', { locale: sv })}</span>
              </div>
              
              <div>
                <span className="text-muted-foreground">Plats:</span>{' '}
                <span>{formData.location}</span>
              </div>
              
              <div>
                <span className="text-muted-foreground">Region:</span>{' '}
                <span>{formData.region}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-sm uppercase text-muted-foreground mb-2">Infrastruktur</h4>
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-md">
            <Badge className="mb-2">
              {formData.infraType}
            </Badge>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-sm uppercase text-muted-foreground mb-2">Valda normkategorier</h4>
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-md flex flex-wrap gap-2">
            {formData.selectedNorms && formData.selectedNorms.map((normId: string) => {
              const norm = normCategories.find(n => n.id === normId);
              return norm ? (
                <Badge key={normId} variant="outline">
                  {norm.name}
                </Badge>
              ) : null;
            })}
          </div>
        </div>
        
        {formData.quizAnswers && formData.quizAnswers.length > 0 && (
          <div>
            <h4 className="font-medium text-sm uppercase text-muted-foreground mb-2">Specifika detaljer</h4>
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-md">
              <div className="space-y-2">
                {formData.quizAnswers.map((answer: any, index: number) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-muted-foreground">{getQuestionPrompt(answer.questionKey)}:</span>
                    <span>{getFormattedAnswer(answer.questionKey, answer.answerValue)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Separator />
      
      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onPrev} disabled={isLoading}>
          Tillbaka
        </Button>
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? 'Skapar projekt...' : 'Skapa projekt'}
        </Button>
      </div>
    </div>
  );
}