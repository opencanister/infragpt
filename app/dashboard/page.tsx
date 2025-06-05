"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PlusCircle, BellElectric as Electricity, Loader as Road, Droplet, Building, Signal, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import ProjectCard from '@/components/dashboard/project-card';
import { mockProjects } from '@/lib/mock-data';

export default function Dashboard() {
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [projects, setProjects] = useState(mockProjects);

  const handleCreateProject = () => {
    router.push('/create-project');
  };

  const handleDeleteClick = (projectId: string) => {
    setProjectToDelete(projectId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (projectToDelete) {
      setProjects(projects.filter(project => project.id !== projectToDelete));
      setDeleteDialogOpen(false);
      setProjectToDelete(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projekt</h1>
          <p className="text-muted-foreground">
            Hantera dina infrastrukturprojekt och normer.
          </p>
        </div>
        <Button onClick={handleCreateProject} className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          <span>Skapa nytt projekt</span>
        </Button>
      </div>

      {projects.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-12 flex flex-col items-center justify-center text-center">
            <div className="rounded-full bg-blue-50 p-3 mb-4">
              <PlusCircle className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">Inga projekt än</h3>
            <p className="text-muted-foreground max-w-sm mb-4">
              Skapa ditt första projekt för att börja använda InfraNorm.
            </p>
            <Button onClick={handleCreateProject}>Skapa nytt projekt</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onDelete={() => handleDeleteClick(project.id)}
            />
          ))}
        </div>
      )}

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ta bort projekt</DialogTitle>
            <DialogDescription>
              Är du säker att du vill ta bort detta projekt? Detta går inte att ångra.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Avbryt
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Ta bort
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}