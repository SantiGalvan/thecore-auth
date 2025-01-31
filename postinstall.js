import { execSync } from "child_process";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

// Trova il percorso assoluto della directory corrente
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Percorso corretto dello script
const scriptPath = path.join(__dirname, "scripts", "check-peer-dependencies.js");

console.log("📂 Percorso calcolato:", scriptPath);

if (!fs.existsSync(scriptPath)) {
  console.error("❌ ERRORE: Il file check-peer-dependencies.js non esiste!");
  process.exit(1);
}

try {
  console.log("📌 Eseguendo check-peer-dependencies.js...");
  execSync(`node ${scriptPath}`, { stdio: "inherit" });
  console.log("✅ check-peer-dependencies.js eseguito con successo!");
} catch (error) {
  console.error("❌ Errore nell'esecuzione di check-peer-dependencies.js", error);
  process.exit(1);
}

