#!/usr/bin/env node

/**
 * testSamples.js - Script para testar carregamento e qualidade de samples
 * 
 * Uso:
 *   node scripts/testSamples.js [--type=all|keyboards|strings|drums|bass]
 * 
 * Exemplos:
 *   node scripts/testSamples.js
 *   node scripts/testSamples.js --type=keyboards
 *   node scripts/testSamples.js --type=strings
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SAMPLES_CONFIG } from '../src/config/samplesConfig.js';

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
  cyan: '\x1b[36m',
  magenta: '\x1b[35m'
};

/**
 * Log com cores
 */
function log(message, color = 'reset') {
}

/**
 * Testar se arquivo existe
 */
function fileExists(filepath) {
  return fs.existsSync(filepath);
}

/**
 * Obter tamanho do arquivo
 */
function getFileSize(filepath) {
  try {
    const stats = fs.statSync(filepath);
    return stats.size;
  } catch {
    return 0;
  }
}

/**
 * Formatar tamanho em bytes
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Testar estrutura de diretórios
 */
function testDirectoryStructure() {
  log('\n📁 Testando Estrutura de Diretórios...', 'cyan');
  log('=====================================\n', 'cyan');

  const directories = [
    { path: samplesDir, name: 'Root' },
    { path: path.join(samplesDir, 'drums'), name: 'Drums' },
    { path: path.join(samplesDir, 'bass'), name: 'Bass' },
    { path: path.join(samplesDir, 'keyboards'), name: 'Keyboards' },
    { path: path.join(samplesDir, 'strings'), name: 'Strings' }
  ];

  let passed = 0;
  let failed = 0;

  for (const dir of directories) {
    if (fileExists(dir.path)) {
      log(`✓ ${dir.name}: ${dir.path}`, 'green');
      passed++;
    } else {
      log(`✗ ${dir.name}: ${dir.path} (NÃO ENCONTRADO)`, 'red');
      failed++;
    }
  }

  log(`\nResultado: ${passed} passaram, ${failed} falharam\n`, passed > failed ? 'green' : 'yellow');
  return failed === 0;
}

/**
 * Testar estrutura de timbres de teclado
 */
function testKeyboardStructure() {
  log('\n🎹 Testando Estrutura de Teclados...', 'cyan');
  log('=====================================\n', 'cyan');

  const keyboardsDir = path.join(samplesDir, 'keyboards');
  const timbres = Object.keys(SAMPLES_CONFIG.keyboards.timbres);

  let passed = 0;
  let failed = 0;

  for (const timbre of timbres) {
    const timbreDir = path.join(keyboardsDir, timbre);
    if (fileExists(timbreDir)) {
      log(`✓ ${timbre}`, 'green');
      passed++;
    } else {
      log(`✗ ${timbre} (NÃO ENCONTRADO)`, 'red');
      failed++;
    }
  }

  log(`\nResultado: ${passed}/${timbres.length} timbres encontrados\n`, passed === timbres.length ? 'green' : 'yellow');
  return failed === 0;
}

/**
 * Testar estrutura de cordas
 */
function testStringStructure() {
  log('\n🎻 Testando Estrutura de Cordas...', 'cyan');
  log('=====================================\n', 'cyan');

  const stringsDir = path.join(samplesDir, 'strings');
  const timbres = Object.keys(SAMPLES_CONFIG.strings.timbres);
  const techniques = ['arco', 'pizzicato', 'tremolo', 'staccato', 'legato', 'spiccato'];

  let passed = 0;
  let failed = 0;

  for (const timbre of timbres) {
    const timbreDir = path.join(stringsDir, timbre);
    
    if (fileExists(timbreDir)) {
      log(`✓ ${timbre}`, 'green');
      passed++;

      // Verificar técnicas
      for (const technique of techniques) {
        const techniqueDir = path.join(timbreDir, technique);
        if (!fileExists(techniqueDir)) {
          log(`  ✗ Técnica ${technique} não encontrada`, 'yellow');
          failed++;
        }
      }
    } else {
      log(`✗ ${timbre} (NÃO ENCONTRADO)`, 'red');
      failed++;
    }
  }

  log(`\nResultado: ${passed}/${timbres.length} timbres encontrados\n`, passed === timbres.length ? 'green' : 'yellow');
  return failed === 0;
}

/**
 * Testar estrutura de bateria
 */
function testDrumStructure() {
  log('\n🥁 Testando Estrutura de Bateria...', 'cyan');
  log('=====================================\n', 'cyan');

  const drumsDir = path.join(samplesDir, 'drums');
  const styles = Object.keys(SAMPLES_CONFIG.drums.styles);

  let passed = 0;
  let failed = 0;

  for (const style of styles) {
    const styleDir = path.join(drumsDir, style);
    if (fileExists(styleDir)) {
      log(`✓ ${style}`, 'green');
      passed++;
    } else {
      log(`✗ ${style} (NÃO ENCONTRADO)`, 'red');
      failed++;
    }
  }

  log(`\nResultado: ${passed}/${styles.length} estilos encontrados\n`, passed === styles.length ? 'green' : 'yellow');
  return failed === 0;
}

/**
 * Testar estrutura de baixo
 */
function testBassStructure() {
  log('\n🎸 Testando Estrutura de Baixo...', 'cyan');
  log('=====================================\n', 'cyan');

  const bassDir = path.join(samplesDir, 'bass');
  const styles = Object.keys(SAMPLES_CONFIG.bass.styles);

  let passed = 0;
  let failed = 0;

  for (const style of styles) {
    const styleDir = path.join(bassDir, style);
    if (fileExists(styleDir)) {
      log(`✓ ${style}`, 'green');
      passed++;
    } else {
      log(`✗ ${style} (NÃO ENCONTRADO)`, 'red');
      failed++;
    }
  }

  log(`\nResultado: ${passed}/${styles.length} estilos encontrados\n`, passed === styles.length ? 'green' : 'yellow');
  return failed === 0;
}

/**
 * Testar arquivos de configuração
 */
function testConfigFiles() {
  log('\n📋 Testando Arquivos de Configuração...', 'cyan');
  log('=====================================\n', 'cyan');

  const files = [
    { path: path.join(samplesDir, 'manifest.json'), name: 'manifest.json' },
    { path: path.join(samplesDir, 'README.md'), name: 'README.md' },
    { path: path.join(samplesDir, 'DOWNLOAD_INSTRUCTIONS.md'), name: 'DOWNLOAD_INSTRUCTIONS.md' }
  ];

  let passed = 0;
  let failed = 0;

  for (const file of files) {
    if (fileExists(file.path)) {
      const size = getFileSize(file.path);
      log(`✓ ${file.name} (${formatBytes(size)})`, 'green');
      passed++;
    } else {
      log(`✗ ${file.name} (NÃO ENCONTRADO)`, 'red');
      failed++;
    }
  }

  log(`\nResultado: ${passed} arquivos encontrados\n`, passed === files.length ? 'green' : 'yellow');
  return failed === 0;
}

/**
 * Testar manifesto
 */
function testManifest() {
  log('\n📦 Testando Manifesto...', 'cyan');
  log('=====================================\n', 'cyan');

  const manifestPath = path.join(samplesDir, 'manifest.json');

  try {
    const manifestContent = fs.readFileSync(manifestPath, 'utf-8');
    const manifest = JSON.parse(manifestContent);

    log(`✓ Manifesto válido`, 'green');
    log(`  - Versão: ${manifest.version}`, 'dim');
    log(`  - Gerado em: ${manifest.generatedAt}`, 'dim');
    log(`  - Instrumentos:`, 'dim');
    log(`    - Drums: ${manifest.instruments.drums.styles.length} estilos`, 'dim');
    log(`    - Bass: ${manifest.instruments.bass.styles.length} estilos`, 'dim');
    log(`    - Keyboards: ${manifest.instruments.keyboards.timbres.length} timbres`, 'dim');
    log(`    - Strings: ${manifest.instruments.strings.timbres.length} timbres`, 'dim');

    return true;
  } catch (error) {
    log(`✗ Erro ao ler manifesto: ${error.message}`, 'red');
    return false;
  }
}

/**
 * Testar samples de áudio
 */
function testAudioSamples() {
  log('\n🎵 Testando Samples de Áudio...', 'cyan');
  log('=====================================\n', 'cyan');

  let totalSamples = 0;
  let foundSamples = 0;

  // Contar samples esperados
  const keyboardsDir = path.join(samplesDir, 'keyboards');
  const stringsDir = path.join(samplesDir, 'strings');
  const drumsDir = path.join(samplesDir, 'drums');
  const bassDir = path.join(samplesDir, 'bass');

  // Verificar teclados
  log('\n🎹 Teclados:', 'magenta');
  const keyboardTimbres = Object.keys(SAMPLES_CONFIG.keyboards.timbres);
  for (const timbre of keyboardTimbres) {
    const timbreDir = path.join(keyboardsDir, timbre);
    if (fileExists(timbreDir)) {
      try {
        const files = fs.readdirSync(timbreDir).filter(f => f.endsWith('.wav') || f.endsWith('.mp3'));
        foundSamples += files.length;
        log(`  ${timbre}: ${files.length} samples`, 'dim');
      } catch {
        log(`  ${timbre}: erro ao ler diretório`, 'yellow');
      }
    }
  }

  // Verificar cordas
  log('\n🎻 Cordas:', 'magenta');
  const stringTimbres = Object.keys(SAMPLES_CONFIG.strings.timbres);
  for (const timbre of stringTimbres) {
    const timbreDir = path.join(stringsDir, timbre);
    if (fileExists(timbreDir)) {
      try {
        const techniques = fs.readdirSync(timbreDir);
        let timbreTotal = 0;
        for (const technique of techniques) {
          const techniqueDir = path.join(timbreDir, technique);
          if (fs.statSync(techniqueDir).isDirectory()) {
            const files = fs.readdirSync(techniqueDir).filter(f => f.endsWith('.wav') || f.endsWith('.mp3'));
            timbreTotal += files.length;
          }
        }
        foundSamples += timbreTotal;
        log(`  ${timbre}: ${timbreTotal} samples`, 'dim');
      } catch {
        log(`  ${timbre}: erro ao ler diretório`, 'yellow');
      }
    }
  }

  // Verificar bateria
  log('\n🥁 Bateria:', 'magenta');
  const drumStyles = Object.keys(SAMPLES_CONFIG.drums.styles);
  for (const style of drumStyles) {
    const styleDir = path.join(drumsDir, style);
    if (fileExists(styleDir)) {
      try {
        const files = fs.readdirSync(styleDir).filter(f => f.endsWith('.wav') || f.endsWith('.mp3'));
        foundSamples += files.length;
        log(`  ${style}: ${files.length} samples`, 'dim');
      } catch {
        log(`  ${style}: erro ao ler diretório`, 'yellow');
      }
    }
  }

  // Verificar baixo
  log('\n🎸 Baixo:', 'magenta');
  const bassStyles = Object.keys(SAMPLES_CONFIG.bass.styles);
  for (const style of bassStyles) {
    const styleDir = path.join(bassDir, style);
    if (fileExists(styleDir)) {
      try {
        const files = fs.readdirSync(styleDir).filter(f => f.endsWith('.wav') || f.endsWith('.mp3'));
        foundSamples += files.length;
        log(`  ${style}: ${files.length} samples`, 'dim');
      } catch {
        log(`  ${style}: erro ao ler diretório`, 'yellow');
      }
    }
  }

  log(`\nTotal de samples encontrados: ${foundSamples}`, foundSamples > 0 ? 'green' : 'yellow');
  return true;
}

/**
 * Gerar relatório final
 */
function generateReport(results) {
  log('\n\n📊 RELATÓRIO FINAL', 'bright');
  log('=====================================\n', 'cyan');

  const passed = Object.values(results).filter(r => r).length;
  const total = Object.keys(results).length;

  log(`Testes Passados: ${passed}/${total}`, passed === total ? 'green' : 'yellow');

  log('\nDetalhes:', 'cyan');
  for (const [test, result] of Object.entries(results)) {
    const status = result ? '✓' : '✗';
    const color = result ? 'green' : 'red';
    log(`  ${status} ${test}`, color);
  }

  if (passed === total) {
    log('\n✅ TODOS OS TESTES PASSARAM!', 'green');
    log('\nPróximos passos:', 'cyan');
    log('1. Baixe samples reais de Freesound.org ou Philharmonia', 'yellow');
    log('2. Organize os arquivos em public/samples/', 'yellow');
    log('3. Execute: npm run dev', 'yellow');
    log('4. Teste o carregamento de samples no navegador', 'yellow');
  } else {
    log('\n⚠️  ALGUNS TESTES FALHARAM', 'yellow');
    log('\nAções recomendadas:', 'cyan');
    log('1. Verifique se a estrutura de diretórios foi criada', 'yellow');
    log('2. Execute: node scripts/downloadSamples.js', 'yellow');
    log('3. Verifique as permissões de arquivo', 'yellow');
  }

  log('\n');
}

/**
 * Função principal
 */
async function main() {
  log('\n🎵 TrasTeoria - Sample Testing Suite', 'bright');
  log('=====================================\n', 'cyan');

  const results = {};

  try {
    // Executar testes
    results['Estrutura de Diretórios'] = testDirectoryStructure();
    results['Estrutura de Teclados'] = testKeyboardStructure();
    results['Estrutura de Cordas'] = testStringStructure();
    results['Estrutura de Bateria'] = testDrumStructure();
    results['Estrutura de Baixo'] = testBassStructure();
    results['Arquivos de Configuração'] = testConfigFiles();
    results['Manifesto'] = testManifest();
    results['Samples de Áudio'] = testAudioSamples();

    // Gerar relatório
    generateReport(results);

  } catch (error) {
    log(`\n❌ Erro: ${error.message}`, 'red');
    process.exit(1);
  }
}

// Executar
main();
