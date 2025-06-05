import { mockProjects } from '@/lib/mock-data';
import ProjectDetailClient from '@/components/projects/project-detail-client';

// This is a Server Component
export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = mockProjects.find(p => p.id === params.id);
  
  if (!project) {
    return <div className="flex justify-center items-center h-64">Projektet hittades inte</div>;
  }

  return <ProjectDetailClient project={project} />;
}

export function generateStaticParams() {
  return mockProjects.map((project) => ({
    id: project.id,
  }));
}