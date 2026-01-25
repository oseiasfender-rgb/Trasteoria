#!/usr/bin/env node

/**
 * downloadSamples.js - Script para baixar e organizar samples de múltiplas fontes
 * 
 * Uso:
 *   node scripts/downloadSamples.js [--type=strings|keyboards|drums] [--source=freesound|philharmonia]
 * 
 * Exemplos:
 *   node scripts/downloadSamples.js --type=strings --source=philharmonia
 *   node scripts/downloadSamples.js --type=keyboards
 *   node scripts/downloadSamples.js
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';
import { SAMPLES_CONFIG, getInstrumentConfig } from '../src/config/samplesConfig.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.dirname(__dirname);
const publicDir = path.join(projectRoot, 'public');
const samplesDir = path.join(publicDir, 'samples');

// Cores para terminal
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

/**
 * Log com cores
 */
function log(message, color = 'reset') {
}

/**
 * Criar diretório recursivamente
 */
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    log(`✓ Diretório criado: ${dir}`, 'green');
  }
}

/**
 * Baixar arquivo de URL
 */
function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Status ${response.statusCode}`));
        return;
      }

      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve(filepath);
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Deletar arquivo em caso de erro
      reject(err);
    });
  });
}

/**
 * Criar estrutura de diretórios para samples
 */
async function createSamplesStructure() {
  log('\n📁 Criando estrutura de diretórios...', 'cyan');

  // Diretório raiz
  ensureDir(samplesDir);

  // Diretórios de instrumentos
  const instrumentTypes = ['drums', 'bass', 'keyboards', 'strings'];
  
  for (const type of instrumentTypes) {
    const typeDir = path.join(samplesDir, type);
    ensureDir(typeDir);

    // Diretórios específicos por instrumento
    const config = SAMPLES_CONFIG[type];
    
    if (type === 'keyboards' || type === 'strings') {
      const timbres = Object.keys(config.timbres);
      for (const timbre of timbres) {
        const timbreDir = path.join(typeDir, timbre);
        ensureDir(timbreDir);

        // Para cordas, criar diretórios de técnicas
        if (type === 'strings') {
          const techniques = ['arco', 'pizzicato', 'tremolo', 'staccato', 'legato', 'spiccato'];
          for (const technique of techniques) {
            const techniqueDir = path.join(timbreDir, technique);
            ensureDir(techniqueDir);
          }
        }
      }
    } else if (type === 'drums') {
      const styles = Object.keys(config.styles);
      for (const style of styles) {
        const styleDir = path.join(typeDir, style);
        ensureDir(styleDir);
      }
    } else if (type === 'bass') {
      const styles = Object.keys(config.styles);
      for (const style of styles) {
        const styleDir = path.join(typeDir, style);
        ensureDir(styleDir);
      }
    }
  }

  log('✓ Estrutura de diretórios criada com sucesso!', 'green');
}

/**
 * Gerar arquivo README para cada diretório
 */
async function generateReadmeFiles() {
  log('\n📝 Gerando arquivos README...', 'cyan');

  const readmeContent = (type, name) => `# ${name} Samples

Este diretório contém samples de ${type.toLowerCase()}.

## Estrutura

\`\`\`
${type}/
├── [instrumentos]/
│   ├── [notas ou técnicas].wav
│   └── ...
└── README.md
\`\`\`

## Fontes

- Philharmonia Orchestra
- Freesound.org
- Pixabay Sound Effects
- Zapsplat

## Licença

Todos os samples estão sob licença Creative Commons ou equivalente.

## Como Adicionar Samples

1. Coloque os arquivos .wav neste diretório
2. Nomeie os arquivos de acordo com as notas (ex: C4.wav, D4.wav, etc.)
3. O sistema carregará automaticamente

## Mais Informações

Consulte \`TIMBRES_TECLADO_EXPANDIDOS.md\` e \`STRINGS_SAMPLES_GUIDE.md\` para detalhes técnicos.
`;

  const directories = [
    { path: path.join(samplesDir, 'drums'), name: 'Drums' },
    { path: path.join(samplesDir, 'bass'), name: 'Bass' },
    { path: path.join(samplesDir, 'keyboards'), name: 'Keyboards' },
    { path: path.join(samplesDir, 'strings'), name: 'Strings' }
  ];

  for (const dir of directories) {
    const readmePath = path.join(dir.path, 'README.md');
    fs.writeFileSync(readmePath, readmeContent(dir.name, `${dir.name} Samples`));
    log(`✓ README criado: ${readmePath}`, 'green');
  }
}

/**
 * Criar arquivo de manifesto
 */
async function createManifest() {
  log('\n📋 Criando manifesto de samples...', 'cyan');

  const manifest = {
    version: SAMPLES_CONFIG.version,
    generatedAt: new Date().toISOString(),
    instruments: {
      drums: {
        enabled: SAMPLES_CONFIG.drums.enabled,
        styles: Object.keys(SAMPLES_CONFIG.drums.styles)
      },
      bass: {
        enabled: SAMPLES_CONFIG.bass.enabled,
        styles: Object.keys(SAMPLES_CONFIG.bass.styles)
      },
      keyboards: {
        enabled: SAMPLES_CONFIG.keyboards.enabled,
        timbres: Object.keys(SAMPLES_CONFIG.keyboards.timbres)
      },
      strings: {
        enabled: SAMPLES_CONFIG.strings.enabled,
        timbres: Object.keys(SAMPLES_CONFIG.strings.timbres)
      }
    },
    sources: SAMPLES_CONFIG.sources,
    cache: SAMPLES_CONFIG.cache
  };

  const manifestPath = path.join(samplesDir, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  log(`✓ Manifesto criado: ${manifestPath}`, 'green');
}

/**
 * Criar arquivo de instruções de download
 */
async function createDownloadInstructions() {
  log('\n📖 Criando instruções de download...', 'cyan');

  const instructions = `# Instruções de Download de Samples

## Fontes Recomendadas

### 1. Philharmonia Orchestra (RECOMENDADO)
- **URL:** https://philharmonia.co.uk/resources/sound-samples/
- **Licença:** Free to use
- **Qualidade:** Profissional
- **Instrumentos:** Violino, Viola, Violoncelo, Contrabaixo
- **Como baixar:**
  1. Acesse https://philharmonia.co.uk/resources/sound-samples/
  2. Clique em "Download strings samples"
  3. Extraia os arquivos em \`public/samples/strings/\`

### 2. Freesound.org
- **URL:** https://freesound.org
- **Licença:** Creative Commons
- **Qualidade:** Variável
- **Instrumentos:** Todos
- **Como baixar:**
  1. Pesquise por "violin samples" ou "cello samples"
  2. Filtre por licença Creative Commons 0 ou Sampling Plus
  3. Baixe os arquivos .wav
  4. Organize em \`public/samples/strings/[instrumento]/[técnica]/\`

### 3. Pixabay Sound Effects
- **URL:** https://pixabay.com/sound-effects
- **Licença:** Creative Commons
- **Qualidade:** Boa
- **Como baixar:**
  1. Pesquise por "violin" ou "string instruments"
  2. Baixe os arquivos
  3. Organize em \`public/samples/strings/\`

## Estrutura de Diretórios

\`\`\`
public/samples/
├── drums/
│   ├── rock/
│   ├── blues/
│   ├── jazz/
│   ├── bossa/
│   ├── funk/
│   └── ballad/
├── bass/
│   ├── fingerstyle/
│   ├── slap/
│   └── pick/
├── keyboards/
│   ├── acoustic_piano/
│   ├── electric_piano/
│   ├── hammond_organ/
│   ├── analog_synth/
│   ├── digital_synth/
│   ├── synth_pad/
│   ├── synth_lead/
│   ├── synth_strings/
│   ├── vibraphone/
│   ├── marimba/
│   ├── xylophone/
│   └── harpsichord/
└── strings/
    ├── violin/
    │   ├── arco/
    │   ├── pizzicato/
    │   ├── tremolo/
    │   ├── staccato/
    │   ├── legato/
    │   └── spiccato/
    ├── viola/
    ├── cello/
    ├── double_bass/
    ├── solo_violin/
    ├── ensemble_violin/
    └── orchestral_strings/
\`\`\`

## Nomenclatura de Arquivos

### Para Teclados e Cordas
- Nomeie os arquivos com as notas: \`C4.wav\`, \`C#4.wav\`, \`D4.wav\`, etc.
- Exemplo: \`public/samples/keyboards/acoustic_piano/C4.wav\`

### Para Bateria
- Nomeie os arquivos com os instrumentos: \`kick.wav\`, \`snare.wav\`, \`hihat_closed.wav\`, etc.
- Exemplo: \`public/samples/drums/rock/kick.wav\`

### Para Baixo
- Nomeie os arquivos com as notas: \`B0.wav\`, \`C1.wav\`, \`C#1.wav\`, etc.
- Exemplo: \`public/samples/bass/fingerstyle/C1.wav\`

## Formatos Suportados

- **WAV** (recomendado para qualidade máxima)
- **MP3** (para economizar espaço)
- **OGG** (alternativa comprimida)

## Dicas

1. **Qualidade:** Use samples em 16-bit, 44.1 kHz ou superior
2. **Tamanho:** Comprima os arquivos se necessário (máx 100 MB por instrumento)
3. **Organização:** Mantenha a estrutura de diretórios consistente
4. **Teste:** Após adicionar samples, teste o carregamento no navegador

## Próximos Passos

1. Baixe os samples das fontes recomendadas
2. Organize os arquivos conforme a estrutura acima
3. Execute o teste de carregamento: \`npm run test:samples\`
4. Verifique no console do navegador se os samples foram carregados

## Suporte

Para problemas com download ou organização, consulte:
- \`TIMBRES_TECLADO_EXPANDIDOS.md\`
- \`STRINGS_SAMPLES_GUIDE.md\`
- \`IMPLEMENTACAO_SAMPLES_PROFISSIONAIS.md\`
`;

  const instructionsPath = path.join(samplesDir, 'DOWNLOAD_INSTRUCTIONS.md');
  fs.writeFileSync(instructionsPath, instructions);
  log(`✓ Instruções criadas: ${instructionsPath}`, 'green');
}

/**
 * Função principal
 */
async function main() {
  log('\n🎵 TrasTeoria - Sample Download Manager', 'bright');
  log('=====================================\n', 'cyan');

  try {
    // Criar estrutura de diretórios
    await createSamplesStructure();

    // Gerar arquivos README
    await generateReadmeFiles();

    // Criar manifesto
    await createManifest();

    // Criar instruções de download
    await createDownloadInstructions();

    log('\n✅ Estrutura de samples criada com sucesso!', 'green');
    log('\n📋 Próximos passos:', 'cyan');
    log('1. Acesse: https://philharmonia.co.uk/resources/sound-samples/', 'yellow');
    log('2. Baixe os samples de cordas', 'yellow');
    log('3. Organize os arquivos em public/samples/strings/', 'yellow');
    log('4. Execute: npm run test:samples', 'yellow');
    log('\n📖 Para mais detalhes, consulte: public/samples/DOWNLOAD_INSTRUCTIONS.md\n', 'cyan');

  } catch (error) {
    log(`\n❌ Erro: ${error.message}`, 'red');
    process.exit(1);
  }
}

// Executar
main();
