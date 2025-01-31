import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Trova il percorso assoluto dello script
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

try {
  const appRoot = findAppRoot();
  const packageJsonPath = path.join(appRoot, "package.json");
  console.log("✅ package.json trovato in:", packageJsonPath);
} catch (error) {
  console.error("❌ Errore nella ricerca del package.json:", error);
  process.exit(1);
}