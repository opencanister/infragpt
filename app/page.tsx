import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight, BarChart3, Database, MessageSquare } from 'lucide-react';
import LandingNavbar from '@/components/landing/landing-navbar';
import FeatureCard from '@/components/landing/feature-card';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingNavbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-950 dark:to-teal-950 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-blue-900 dark:text-blue-50">
                InfraNorm <span className="text-teal-600 dark:text-teal-400">Sverige</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 max-w-2xl">
                Din partner för svenska infrastruktursnormer
              </p>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
                Få enkel tillgång till standarder, nätägares regler och interaktiv vägledning för dina infrastrukturprojekt.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Link href="/register" className="flex items-center gap-2">
                    Registrera dig <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  <Link href="/login">Logga in</Link>
                </Button>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative w-full max-w-lg h-80 bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-teal-500/5"></div>
                <div className="absolute top-8 left-8 right-8 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-md"></div>
                <div className="absolute top-32 left-8 right-8 h-8 bg-teal-100 dark:bg-teal-900/30 rounded-md"></div>
                <div className="absolute top-48 left-8 right-8 h-8 bg-teal-100 dark:bg-teal-900/30 rounded-md"></div>
                <div className="absolute top-64 left-8 right-8 h-8 bg-teal-100 dark:bg-teal-900/30 rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Funktioner</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              InfraNorm ger dig allt du behöver för att hantera och navigera infrastrukturella normer.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Database className="h-10 w-10 text-blue-500" />}
              title="Projektbaserad filtrering"
              description="Skapa projekt och se normer som är relevanta just för ditt infrastrukturprojekt."
            />
            <FeatureCard 
              icon={<BarChart3 className="h-10 w-10 text-teal-500" />}
              title="Överblick av normer"
              description="Få en strukturerad överblick över alla tillämpliga normer för din specifika infrastrukturtyp."
            />
            <FeatureCard 
              icon={<MessageSquare className="h-10 w-10 text-orange-500" />}
              title="Interaktiv chat"
              description="Ställ frågor om normerna och få svar direkt genom vår intuitiva chatfunktion."
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-blue-50 dark:bg-blue-900">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Redo att förenkla ditt arbete med infrastrukturnormer?
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            Registrera dig idag och börja skapa dina första infrastrukturprojekt.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="/register" className="flex items-center gap-2">
              Kom igång <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-slate-100 dark:bg-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <p className="text-lg font-bold text-slate-900 dark:text-white">InfraNorm</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">© {new Date().getFullYear()} InfraNorm Sverige</p>
            </div>
            <div className="flex gap-8">
              <Link href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                Om oss
              </Link>
              <Link href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                Kontakt
              </Link>
              <Link href="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                Integritetspolicy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}