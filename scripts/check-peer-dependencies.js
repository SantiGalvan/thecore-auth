import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Trova il percorso assoluto dello script
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dipendenze rischieste
const requiredDependencies = [
  "axios",
  "react-router-dom",
  "react-icons",
  "jwt-decode",
  "tailwindcss",
]

// Funzione per trovare il package.json dell'applicazione principale
const findAppRoot = () => {
  let dir = path.resolve(__dirname, "../.."); // Risali dalla directory del pacchetto (node_modules/thecore-auth)
  
  while (!fs.existsSync(path.join(dir, "package.json"))) {
    const parentDir = path.dirname(dir);
    if (parentDir === dir) {
      console.error("❌ package.json dell'applicazione non trovato.");
      process.exit(1);
    }
    dir = parentDir;
  }
  return dir;
};

// Funzione per leggere e stampare le dipendenze
const printDependencies = (packageJsonPath) => {
  try {
    const packageJsonContent = fs.readFileSync(packageJsonPath, "utf-8");
    const packageJson = JSON.parse(packageJsonContent);

    console.log("📦 Dipendenze installate:");
    if (packageJson.dependencies) {
      console.log("🔹 dependencies:", packageJson.dependencies);
    } else {
      console.log("⚠️ Nessuna dependencies trovata.");
    }

    if (packageJson.devDependencies) {
      console.log("🔹 devDependencies:", packageJson.devDependencies);
    } else {
      console.log("⚠️ Nessuna devDependencies trovata.");
    }

  } catch (error) {
    console.error("❌ Errore nella lettura del package.json:", error);
    process.exit(1);
  }
};

// Funzione per controllare se le dipendenze richieste sono installate
const checkDependencies = (packageJsonPath) => {
  try {
    const packageJsonContent = fs.readFileSync(packageJsonPath, "utf-8");
    const packageJson = JSON.parse(packageJsonContent);

    const dependencies = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };

    console.log("📦 Verifica delle dipendenze richieste:");

    let allDependenciesFound = true;
    requiredDependencies.forEach((dep) => {
      if (dependencies[dep]) {
        console.log(`✅ ${dep} è installato (versione: ${dependencies[dep]})`);
      } else {
        console.log(`❌ ${dep} NON è installato`);
        allDependenciesFound = false;
      }
    });

    if (!allDependenciesFound) {
      console.warn(
        "\n⚠️ Alcune dipendenze richieste non sono installate. Assicurati di aggiungerle manualmente o tramite npm/yarn."
      );
    }

  } catch (error) {
    console.error("❌ Errore nella lettura del package.json:", error);
    process.exit(1);
  }
};


// Trova la root dell'app e stampa le dipendenze
try {
  const appRoot = findAppRoot();
  const packageJsonPath = path.join(appRoot, "package.json");
  console.log("✅ package.json trovato in:", packageJsonPath);
  
  // Stampa le dipendenze
  printDependencies(packageJsonPath);

  // Controlla le dipendenze
  checkDependencies(packageJsonPath);

} catch (error) {
  console.error("❌ Errore generale:", error);
  process.exit(1);
}
