import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card.jsx';

export const SectionPlaceholder = ({ title }) => {
  return (
    <Card className="w-full bg-card/30 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Esta seção está sendo preparada com conteúdo de alta qualidade para o seu aprendizado musical. 
          Em breve, você terá acesso a lições completas, exercícios interativos e muito mais.
        </p>
      </CardContent>
    </Card>
  );
};

export default SectionPlaceholder;
