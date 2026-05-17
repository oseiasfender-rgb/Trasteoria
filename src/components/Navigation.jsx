import { Button } from '@/components/ui/button.jsx';
import { BookOpen, Target, Zap, Play, Sparkles } from 'lucide-react';

export function Navigation({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'aprender', label: 'Aprender', icon: BookOpen },
    { id: 'praticar', label: 'Praticar', icon: Target },
    { id: 'explorar', label: 'Explorar', icon: Zap },
    { id: 'video', label: 'Vídeo', icon: Play },
    { id: 'exoticos', label: 'Exóticos & Sintéticos', icon: Sparkles, highlight: true }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "outline"}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 ${
              activeTab === tab.id 
                ? 'bg-primary text-primary-foreground' 
                : tab.highlight
                  ? 'bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 hover:from-violet-600/40 hover:to-fuchsia-600/40 border-violet-500/40 text-violet-300'
                  : 'bg-card/50 hover:bg-accent/50'
            }`}
          >
            <Icon size={16} />
            <span>{tab.label}</span>
          </Button>
        );
      })}
    </div>
  );
}
