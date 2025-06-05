"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import ProjectInfoStep from '@/components/create-project/project-info-step';
import InfraTypeStep from '@/components/create-project/infra-type-step';
import NormCategoryStep from '@/components/create-project/norm-category-step';
import QuizStep from '@/components/create-project/quiz-step';
import ReviewStep from '@/components/create-project/review-step';
import { normCategories, regions, infraTypes } from '@/lib/mock-data';

// Define the schema for the entire form
const projectSchema = z.object({
  name: z.string().min(2, { message: 'Namnet måste vara minst 2 tecken' }),
  description: z.string().optional(),
  startDate: z.string().min(1, { message: 'Välj ett startdatum' }),
  endDate: z.string().min(1, { message: 'Välj ett slutdatum' }),
  infraType: z.string().min(1, { message: 'Välj en infrastrukturtyp' }),
  location: z.string().min(1, { message: 'Ange plats' }),
  region: z.string().min(1, { message: 'Välj en region' }),
  selectedNorms: z.array(z.string()).min(1, { message: 'Välj minst en normkategori' }),
  quizAnswers: z.array(
    z.object({
      questionKey: z.string(),
      answerValue: z.string()
    })
  ).optional()
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function CreateProjectPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<ProjectFormValues>>({});
  
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      infraType: '',
      location: '',
      region: '',
      selectedNorms: [],
      quizAnswers: []
    }
  });

  const updateFormData = (data: Partial<ProjectFormValues>) => {
    setFormData(prev => ({ ...prev, ...data }));
    Object.entries(data).forEach(([key, value]) => {
      form.setValue(key as any, value as any);
    });
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const onSubmit = (data: ProjectFormValues) => {
    // In a real app, you would call your API to create the project
    console.log('Form submitted with data:', data);
    
    toast({
      title: 'Projekt skapat!',
      description: 'Ditt projekt har skapats framgångsrikt.',
    });
    
    // Redirect to the dashboard
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ProjectInfoStep 
            formData={formData} 
            updateFormData={updateFormData}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <InfraTypeStep 
            formData={formData} 
            updateFormData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
            infraTypes={infraTypes}
            regions={regions}
          />
        );
      case 3:
        return (
          <NormCategoryStep 
            formData={formData} 
            updateFormData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
            normCategories={normCategories}
          />
        );
      case 4:
        return (
          <QuizStep 
            formData={formData} 
            updateFormData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 5:
        return (
          <ReviewStep 
            formData={formData} 
            onSubmit={() => form.handleSubmit(onSubmit)()}
            onPrev={prevStep}
            normCategories={normCategories}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6">
      <div className="flex items-center gap-4 mb-8 pb-4 border-b">
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-muted-foreground hover:text-foreground"
          asChild
        >
          <Link href="/dashboard">
            <ChevronLeft className="h-4 w-4" />
            <span>Tillbaka till dashboard</span>
          </Link>
        </Button>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Skapa nytt projekt</h1>
        <p className="text-muted-foreground">
          Skapa ett nytt infrastrukturprojekt för att hantera relevanta normer.
        </p>
      </div>

      <Card className="p-6">
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4, 5].map((step) => (
              <div 
                key={step}
                className={`flex flex-col items-center ${step < currentStep 
                  ? 'text-blue-600' 
                  : step === currentStep 
                    ? 'text-slate-900 dark:text-slate-100' 
                    : 'text-slate-400'}`}
              >
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                    step < currentStep 
                      ? 'bg-blue-600 text-white' 
                      : step === currentStep 
                        ? 'bg-white border-2 border-blue-600 text-blue-600 dark:bg-slate-800' 
                        : 'bg-slate-100 text-slate-400 dark:bg-slate-800'
                  }`}
                >
                  {step}
                </div>
                <span className="text-xs hidden sm:block">
                  {step === 1 && 'Projektinfo'}
                  {step === 2 && 'Infrastruktur'}
                  {step === 3 && 'Normkategorier'}
                  {step === 4 && 'Detaljerad quiz'}
                  {step === 5 && 'Granska'}
                </span>
              </div>
            ))}
          </div>
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 bg-slate-100 dark:bg-slate-800"></div>
            <div
              className="absolute top-1/2 left-0 -translate-y-1/2 h-1 bg-blue-600 transition-all duration-300"
              style={{ width: `${(currentStep - 1) * 25}%` }}
            ></div>
          </div>
        </div>

        <Separator className="mb-6" />

        <form>{renderStep()}</form>
      </Card>
    </div>
  );
}