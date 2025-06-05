"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Pencil, Trash2, ArrowLeft, ChevronLeft } from 'lucide-react';
import { normCategories } from '@/lib/mock-data';
import { Project } from '@/types/project';
import ProjectInfoTab from '@/components/projects/project-info-tab';
import ProjectChatTab from '@/components/projects/project-chat-tab';
import { useToast } from '@/hooks/use-toast';

interface ProjectDetailClientProps {
  project: Project;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDelete = () => {
    setDeleteDialogOpen(false);
    toast({
      title: 'Projekt borttaget',
      description: 'Projektet har tagits bort.',
    });
    router.push('/dashboard');
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 pb-4 border-b">
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

      <div className="flex flex-col lg:flex-row justify-between gap-6 bg-gradient-to-br from-blue-50/50 to-teal-50/50 dark:from-blue-950/50 dark:to-teal-950/50 rounded-lg p-6">
        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge className="font-normal text-sm">
              {project.infraType}
            </Badge>
            <Badge variant="outline" className="font-normal text-sm">
              {project.region}
            </Badge>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-blue-900 dark:text-blue-100 mb-2">
            {project.name}
          </h1>
          {project.description && (
            <p className="text-slate-600 dark:text-slate-300 max-w-3xl">
              {project.description}
            </p>
          )}
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm"
          >
            <Pencil className="h-4 w-4" />
            <span>Redigera</span>
          </Button>
          <Button 
            variant="destructive" 
            className="flex items-center gap-2"
            onClick={() => setDeleteDialogOpen(true)}
          >
            <Trash2 className="h-4 w-4" />
            <span>Ta bort</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="info" className="space-y-6">
        <TabsList className="bg-white dark:bg-slate-900 p-1 border">
          <TabsTrigger value="info" className="flex-1">Info</TabsTrigger>
          <TabsTrigger value="tjanster" className="flex-1">Tjänster</TabsTrigger>
          <TabsTrigger value="dokument" disabled className="flex-1">Dokument</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info" className="space-y-6">
          <ProjectInfoTab 
            project={project} 
            normCategories={normCategories} 
          />
        </TabsContent>
        
        <TabsContent value="tjanster">
          <ProjectChatTab 
            projectId={project.id} 
            projectName={project.name}
          />
        </TabsContent>
        
        <TabsContent value="dokument">
          <Card className="border-dashed">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-slate-100 dark:bg-slate-800 p-4 mb-4">
                  <ExternalLink className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">Dokumenthantering</h3>
                <p className="text-muted-foreground mb-4 max-w-md">
                  Här kommer du kunna ladda upp och hantera dokument relaterade till ditt projekt.
                </p>
                <Button disabled variant="outline">Kommer snart</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ta bort projekt</DialogTitle>
            <DialogDescription>
              Är du säker att du vill ta bort projektet "{project.name}"? Detta går inte att ångra.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Avbryt
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Ta bort
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}