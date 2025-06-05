import { format } from 'date-fns';
import { sv } from 'date-fns/locale';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Project, NormCategory } from '@/types/project';

interface ProjectInfoTabProps {
  project: Project;
  normCategories: NormCategory[];
}

export default function ProjectInfoTab({ project, normCategories }: ProjectInfoTabProps) {
  // Function to get question prompt based on question key
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

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Projektinformation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Namn</p>
            <p className="text-base">{project.name}</p>
          </div>
          
          {project.description && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">Beskrivning</p>
              <p className="text-base">{project.description}</p>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row sm:gap-8">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Infrastrukturtyp</p>
              <p className="text-base">{project.infraType}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-muted-foreground">Region</p>
              <p className="text-base">{project.region}</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:gap-8">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Plats</p>
              <p className="text-base">{project.location}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-muted-foreground">Skapad</p>
              <p className="text-base">
                {format(new Date(project.createdAt), 'PPP', { locale: sv })}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Valda normkategorier</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {project.selectedNorms.map(normId => {
                const norm = normCategories.find(n => n.id === normId);
                return norm ? (
                  <Badge key={normId} variant="outline">
                    {norm.name}
                  </Badge>
                ) : null;
              })}
            </div>
          </CardContent>
        </Card>

        {project.quizAnswers && project.quizAnswers.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Projektdetaljer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {project.quizAnswers.map((answer, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-muted-foreground">{getQuestionPrompt(answer.questionKey)}:</span>
                    <span>{answer.answerValue}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}