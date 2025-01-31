import { execSync } from "child_process";
import { fileURLToPath } from "url";
import path from "path";

// Trova il percorso assoluto della directory corrente
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Percorso dello script di verifica delle dipendenze
const scriptPath = path.join(__dirname, "scripts", "check-peer-dependencies.js");

try {
  console.log("Eseguendo check-peer-dependencies.js...");
  execSync(`node ${scriptPath}`, { stdio: "inherit" });
  console.log("check-peer-dependencies.js eseguito con successo!");
} catch (error) {
  console.error("Errore nell'esecuzione di check-peer-dependencies.js", error);
  process.exit(1);
}

// Installa le dipendenze nella root dell'app principale
try {
  console.log("Installando dipendenze nella root dell'app...");
  execSync("npm install", { stdio: "inherit", cwd: process.cwd() });
  console.log("Dipendenze installate con successo!");
} catch (error) {
  console.error("Errore nell'installazione delle dipendenze:", error);
  process.exit(1);
}
