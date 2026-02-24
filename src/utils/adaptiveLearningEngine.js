/**
 * 🧠 Adaptive Learning Engine
 * Sistema inteligente que adapta dificuldade baseado no desempenho
 */

class AdaptiveLearningEngine {
  constructor() {
    // Níveis de habilidade (1-10)
    this.skillLevels = {
      intervals: 1,
      chords: 1,
      scales: 1,
      improvisation: 1,
      theory: 1,
      earTraining: 1,
      reading: 1,
      technique: 1
    };
    
    // Histórico de performance
    this.performanceHistory = [];
    this.maxHistoryLength = 100;
    
    // Configurações
    this.levelUpThreshold = 0.80; // 80% de acerto para subir
    this.levelDownThreshold = 0.50; // 50% de acerto para descer
    this.minAttempts = 5; // Mínimo de tentativas para ajustar
    
    // Recomendações
    this.recommendations = [];
    
    // Carregar dados
    this.loadData();
  }
  
  /**
   * Registrar tentativa
   */
  recordAttempt(category, difficulty, success, timeSpent = 0) {
    const attempt = {
      category,
      difficulty,
      success,
      timeSpent,
      timestamp: Date.now()
    };
    
    this.performanceHistory.push(attempt);
    
    if (this.performanceHistory.length > this.maxHistoryLength) {
      this.performanceHistory.shift();
    }
    
    // Atualizar nível de habilidade
    this.updateSkillLevel(category);
    
    // Gerar novas recomendações
    this.generateRecommendations();
    
    // Salvar
    this.saveData();
    
    return this.getSkillLevel(category);
  }
  
  /**
   * Atualizar nível de habilidade
   */
  updateSkillLevel(category) {
    const recentAttempts = this.getRecentAttempts(category, 10);
    
    if (recentAttempts.length < this.minAttempts) {
      return; // Não ajustar ainda
    }
    
    const successRate = this.calculateSuccessRate(recentAttempts);
    const currentLevel = this.skillLevels[category];
    
    // Subir de nível
    if (successRate >= this.levelUpThreshold && currentLevel < 10) {
      this.skillLevels[category] = Math.min(10, currentLevel + 1);
    }
    
    // Descer de nível
    else if (successRate <= this.levelDownThreshold && currentLevel > 1) {
      this.skillLevels[category] = Math.max(1, currentLevel - 1);
    }
  }
  
  /**
   * Obter tentativas recentes
   */
  getRecentAttempts(category, count) {
    return this.performanceHistory
      .filter(attempt => attempt.category === category)
      .slice(-count);
  }
  
  /**
   * Calcular taxa de sucesso
   */
  calculateSuccessRate(attempts) {
    if (attempts.length === 0) return 0;
    
    const successes = attempts.filter(a => a.success).length;
    return successes / attempts.length;
  }
  
  /**
   * Obter nível de habilidade
   */
  getSkillLevel(category) {
    return this.skillLevels[category] || 1;
  }
  
  /**
   * Obter todos os níveis
   */
  getAllSkillLevels() {
    return { ...this.skillLevels };
  }
  
  /**
   * Obter dificuldade recomendada
   */
  getRecommendedDifficulty(category) {
    const level = this.getSkillLevel(category);
    
    // Mapear nível (1-10) para dificuldade (1-4)
    if (level <= 2) return 1; // Iniciante
    if (level <= 5) return 2; // Intermediário
    if (level <= 8) return 3; // Avançado
    return 4; // Expert
  }
  
  /**
   * Gerar recomendações personalizadas
   */
  generateRecommendations() {
    this.recommendations = [];
    
    // Analisar cada categorObject.entries(this.skillLevels).forEach(([category]) => {
      const recentAttempts = this.getRecentAttempts(category, 10);
      
      if (recentAttempts.length === 0) {
        // Categoria não praticada
        this.recommendations.push({
          category,
          type: 'start',
          priority: 'high',
          message: `Comece a praticar ${this.getCategoryName(category)}`,
          reason: 'Você ainda não praticou esta área'
        });
      } else {
        const successRate = this.calculateSuccessRate(recentAttempts);
        
        // Taxa de sucesso muito baixa
        if (successRate < 0.5) {
          this.recommendations.push({
            category,
            type: 'practice',
            priority: 'high',
            message: `Pratique mais ${this.getCategoryName(category)}`,
            reason: `Taxa de acerto: ${Math.round(successRate * 100)}%`
          });
        }
        
        // Taxa de sucesso muito alta
        else if (successRate > 0.9 && level < 10) {
          this.recommendations.push({
            category,
            type: 'advance',
            priority: 'medium',
            message: `Avance em ${this.getCategoryName(category)}`,
            reason: `Você está dominando! (${Math.round(successRate * 100)}%)`
          });
        }
        
        // Categoria não praticada recentemente
        const lastAttempt = recentAttempts[recentAttempts.length - 1];
        const daysSinceLastAttempt = (Date.now() - lastAttempt.timestamp) / (1000 * 60 * 60 * 24);
        
        if (daysSinceLastAttempt > 3) {
          this.recommendations.push({
            category,
            type: 'review',
            priority: 'low',
            message: `Revise ${this.getCategoryName(category)}`,
            reason: `Última prática: ${Math.round(daysSinceLastAttempt)} dias atrás`
          });
        }
      }
    });
    
    // Ordenar por prioridade
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    this.recommendations.sort((a, b) => 
      priorityOrder[b.priority] - priorityOrder[a.priority]
    );
  }
  
  /**
   * Obter recomendações
   */
  getRecommendations(count = 5) {
    return this.recommendations.slice(0, count);
  }
  
  /**
   * Obter nome da categoria
   */
  getCategoryName(category) {
    const names = {
      intervals: 'Intervalos',
      chords: 'Acordes',
      scales: 'Escalas',
      improvisation: 'Improvisação',
      theory: 'Teoria Musical',
      earTraining: 'Treinamento Auditivo',
      reading: 'Leitura Musical',
      technique: 'Técnica'
    };
    
    return names[category] || category;
  }
  
  /**
   * Obter estatísticas gerais
   */
  getOverallStats() {
    const totalAttempts = this.performanceHistory.length;
    const successes = this.performanceHistory.filter(a => a.success).length;
    const successRate = totalAttempts > 0 ? successes / totalAttempts : 0;
    
    const avgLevel = Object.values(this.skillLevels).reduce((a, b) => a + b, 0) / 
                     Object.values(this.skillLevels).length;
    
    const totalTimeSpent = this.performanceHistory.reduce((sum, a) => sum + (a.timeSpent || 0), 0);
    
    return {
      totalAttempts,
      successes,
      failures: totalAttempts - successes,
      successRate: Math.round(successRate * 100),
      averageLevel: Math.round(avgLevel * 10) / 10,
      totalTimeSpent: Math.round(totalTimeSpent / 60), // em minutos
      recommendations: this.recommendations.length
    };
  }
  
  /**
   * Obter curva de aprendizado
   */
  getLearningCurve(category, days = 30) {
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;
    const curve = [];
    
    for (let i = days; i >= 0; i--) {
      const dayStart = now - (i * dayMs);
      const dayEnd = dayStart + dayMs;
      
      const dayAttempts = this.performanceHistory.filter(a => 
        a.category === category &&
        a.timestamp >= dayStart &&
        a.timestamp < dayEnd
      );
      
      const successRate = this.calculateSuccessRate(dayAttempts);
      
      curve.push({
        day: i,
        attempts: dayAttempts.length,
        successRate: Math.round(successRate * 100)
      });
    }
    
    return curve.reverse();
  }
  
  /**
   * Resetar dados
   */
  reset() {
    this.skillLevels = {
      intervals: 1,
      chords: 1,
      scales: 1,
      improvisation: 1,
      theory: 1,
      earTraining: 1,
      reading: 1,
      technique: 1
    };
    
    this.performanceHistory = [];
    this.recommendations = [];
    
    this.saveData();
  }
  
  /**
   * Salvar dados
   */
  saveData() {
    try {
      localStorage.setItem('adaptiveLearningSkills', JSON.stringify(this.skillLevels));
      localStorage.setItem('adaptiveLearningHistory', JSON.stringify(this.performanceHistory));
    // eslint-disable-next-line no-empty
    } catch (error) {
      // eslint-disable-next-line no-empty
    }
  }
  
  /**
   * Carregar dados
   */
  loadData() {
    try {
      const savedSkills = localStorage.getItem('adaptiveLearningSkills');
      const savedHistory = localStorage.getItem('adaptiveLearningHistory');
      
      if (savedSkills) {
        this.skillLevels = JSON.parse(savedSkills);
      }
      
      if (savedHistory) {
        this.performanceHistory = JSON.parse(savedHistory);
      }
      
      // Gerar recomendações iniciais
      this.generateRecommendations();
    // eslint-disable-next-line no-empty
    } catch (error) {
      // eslint-disable-next-line no-empty
    }
  }
}

// Exportar instância singleton
export const adaptiveLearningEngine = new AdaptiveLearningEngine();
export default AdaptiveLearningEngine;

