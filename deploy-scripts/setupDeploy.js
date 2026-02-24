#!/usr/bin/env node

console.log("Script di deploy eseguito! 🚀");

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

// Percorso corrente in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cartella installations nella root
const installationsDir = path.join(__dirname, '..', 'installations');

// -------------------- FUNZIONI -------------------- //

// Controlla e crea la cartella installations
const checkAndCreateDir = () => {
    if (fs.existsSync(installationsDir)) {
        console.log('La cartella "installations" esiste già ✅');
    } else {
        fs.mkdirSync(installationsDir, { recursive: true });
        console.log('Cartella "installations" creata con successo 🚀');
    }
};

// Controlla e crea i file Docker dentro installations
const checkAndCreateFiles = () => {
    const files = ['docker-compose.net.yml', 'docker-compose.yml', 'Dockerfile'];

    files.forEach(fileName => {
        const filePath = path.join(installationsDir, fileName);
        if (fs.existsSync(filePath)) {
            console.log(`File "${fileName}" esiste ✅`);
        } else {
            let content = '';
            if (fileName.endsWith('.yml')) content = '# Placeholder YAML\n';
            if (fileName === 'Dockerfile') content = '# Placeholder Dockerfile\n';
            fs.writeFileSync(filePath, content);
            console.log(`File "${fileName}" creato 🚀`);
        }
    });
};

// Controlla e crea la cartella abslabs_dev
const checkAndCreateAbslabsDev = () => {
    const devDir = path.join(installationsDir, 'abslabs_dev');
    if (fs.existsSync(devDir)) {
        console.log('La cartella "abslabs_dev" esiste già ✅');
    } else {
        fs.mkdirSync(devDir, { recursive: true });
        console.log('Cartella "abslabs_dev" creata con successo 🚀');
    }
    return devDir;
};

// Controlla e crea i file dentro abslabs_dev tranne docker.env
const checkAndCreateDevFiles = (devDir) => {
    const devFiles = ['docker_host']; // docker.env gestito a parte

    devFiles.forEach(fileName => {
        const filePath = path.join(devDir, fileName);
        if (fs.existsSync(filePath)) {
            console.log(`File "${fileName}" esiste ✅`);
        } else {
            fs.writeFileSync(filePath, `# Placeholder ${fileName}\n`);
            console.log(`File "${fileName}" creato 🚀`);
        }
    });
};

// Controlla e crea .gitlab-ci.yml nella root
const checkAndCreateGitlabCI = () => {
    const gitlabFile = path.join(__dirname, '..', '.gitlab-ci.yml');
    if (fs.existsSync(gitlabFile)) {
        console.log('File ".gitlab-ci.yml" esiste già ✅');
    } else {
        const content = `# Placeholder GitLab CI\nstages:\n  - deploy\n`;
        fs.writeFileSync(gitlabFile, content);
        console.log('File ".gitlab-ci.yml" creato 🚀');
    }
};

// Legge e logga il contenuto dei file Docker dentro installations
const readDockerFiles = () => {
    const dockerFiles = ['docker-compose.net.yml', 'docker-compose.yml', 'Dockerfile'];

    dockerFiles.forEach(fileName => {
        const filePath = path.join(installationsDir, fileName);
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf-8');
            // console.log(`\nContenuto di "${fileName}":\n${content}`);
        } else {
            console.log(`File "${fileName}" non trovato ❌`);
        }
    });
};

// Funzione per chiedere in console il nome dell'app
const askAppName = () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise(resolve => {
        rl.question('Inserisci il nome dell\'app per docker.env: ', (answer) => {
            rl.close();
            resolve(answer.trim());
        });
    });
};

// Sincronizza un singolo file con il template
const syncFileWithDefault = (sourcePath, targetPath) => {
    const defaultContent = fs.readFileSync(sourcePath, 'utf-8');

    let needsUpdate = false;

    if (fs.existsSync(targetPath)) {
        const currentContent = fs.readFileSync(targetPath, 'utf-8');
        if (currentContent !== defaultContent) {
            needsUpdate = true;
        }
    } else {
        needsUpdate = true;
    }

    if (needsUpdate) {
        fs.writeFileSync(targetPath, defaultContent);
        console.log(`File "${targetPath}" aggiornato con contenuto default 🚀`);
    } else {
        console.log(`File "${targetPath}" è già corretto ✅`);
    }
};

// Sincronizza più file da templates
const syncFilesFromTemplates = (files, targetDir) => {
    const templatesDir = path.join(__dirname, 'templates');

    files.forEach(fileName => {
        const source = path.join(templatesDir, fileName);
        const target = path.join(targetDir, fileName);
        syncFileWithDefault(source, target);
    });
};

// Sincronizza docker.env sostituendo {{APP_NAME}} solo se necessario
const syncDockerEnvWithAppName = async (templatePath, targetPath) => {
    let currentContent = '';
    if (fs.existsSync(targetPath)) {
        currentContent = fs.readFileSync(targetPath, 'utf-8');
    }

    // Controlla se il file contiene già un valore per APP_NAME
    const appNameMatch = currentContent.match(/APP_NAME=(.+)/);
    if (appNameMatch && appNameMatch[1].trim() !== '') {
        console.log(`docker.env già contiene il nome dell'app: "${appNameMatch[1].trim()}" ✅`);
        return; // non serve fare nulla
    }

    // Se non c'è o è vuoto, chiediamo il nome all'utente
    const appName = await askAppName();
    let content = fs.readFileSync(templatePath, 'utf-8');
    content = content.replace(/{{APP_NAME}}/g, appName);

    fs.writeFileSync(targetPath, content);
    console.log(`File "${targetPath}" aggiornato con nome app "${appName}" 🚀`);
};

// -------------------- ESECUZIONE PRINCIPALE -------------------- //

const main = async () => {
    checkAndCreateDir();
    checkAndCreateFiles();

    const devDir = checkAndCreateAbslabsDev();
    checkAndCreateDevFiles(devDir);

    checkAndCreateGitlabCI();

    readDockerFiles();

    // Sincronizzazione con template
    const installationsFiles = ['docker-compose.net.yml', 'docker-compose.yml', 'Dockerfile'];
    const abslabsDevFiles = ['docker_host']; // docker.env lo gestiamo a parte
    const rootFiles = ['.gitlab-ci.yml'];

    syncFilesFromTemplates(installationsFiles, installationsDir);
    syncFilesFromTemplates(abslabsDevFiles, devDir);
    syncFilesFromTemplates(rootFiles, path.join(__dirname, '..'));

    // docker.env dinamico
    const dockerEnvTemplate = path.join(__dirname, 'templates', 'docker.env');
    const dockerEnvTarget = path.join(devDir, 'docker.env');
    await syncDockerEnvWithAppName(dockerEnvTemplate, dockerEnvTarget);
};

main();