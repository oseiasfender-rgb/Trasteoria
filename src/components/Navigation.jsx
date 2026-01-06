import { Button } from '@/components/ui/button.jsx';
import { BookOpen, Target, Zap, Play } from 'lucide-react';

export function Navigation({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'aprender', label: 'Aprender', icon: BookOpen },
    { id: 'praticar', label: 'Praticar', icon: Target },
    { id: 'explorar', label: 'Explorar', icon: Zap },
    { id: 'video', label: 'Vídeo', icon: Play }
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

