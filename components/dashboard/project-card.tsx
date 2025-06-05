import { useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';
import { MoreVertical, BellElectric as Electricity, Loader as Road, Droplet, Building, Signal, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Project } from '@/types/project';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  onDelete: () => void;
}

export default function ProjectCard({ project, onDelete }: ProjectCardProps) {
  const getInfraIcon = (type: string) => {
    switch (type) {
      case 'El':
        return <Electricity className="h-4 w-4" />;
      case 'Gata & Väg':
        return <Road className="h-4 w-4" />;
      case 'VA':
        return <Droplet className="h-4 w-4" />;
      case 'Byggnad & Anläggning':
        return <Building className="h-4 w-4" />;
      case 'Tele & Datakabel':
        return <Signal className="h-4 w-4" />;
      case 'Miljö, Buller & Markförorening':
        return <Leaf className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getInfraColor = (type: string) => {
    switch (type) {
      case 'El':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Gata & Väg':
        return 'bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-300';
      case 'VA':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Byggnad & Anläggning':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'Tele & Datakabel':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'Miljö, Buller & Markförorening':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge className={cn("font-normal mb-2 flex items-center gap-1", getInfraColor(project.infraType))}>
            {getInfraIcon(project.infraType)}
            {project.infraType}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Öppna meny</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/projects/${project.id}`}>Öppna</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/projects/${project.id}/edit`}>Redigera</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDelete} className="text-red-600 dark:text-red-400">
                Ta bort
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardTitle className="text-xl line-clamp-2">{project.name}</CardTitle>
        <CardDescription className="line-clamp-1">
          {project.region}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground mb-1">
          Skapat: {format(new Date(project.createdAt), 'PPP', { locale: sv })}
        </p>
        {project.description && (
          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mt-2">
            {project.description}
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" asChild className="w-full">
          <Link href={`/projects/${project.id}`}>Öppna</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}