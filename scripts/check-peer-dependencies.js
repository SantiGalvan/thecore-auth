import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from "url";

console.log('📌 Avvio dello script di installazione dipendenze...');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const findAppRoot = () => {
  let dir = process.cwd();
  while (!fs.existsSync(path.join(dir, "package.json"))) {
    const parentDir = path.dirname(dir);
    if (parentDir === dir) {
      throw new Error("❌ package.json non trovato in nessuna directory superiore.");
    }
    dir = parentDir;
  }
  return dir;
};

const appRoot = findAppRoot();
const packageJsonPath = path.join(appRoot, "package.json");

const installDependencies = (dependencies, isDev = false) => {
  Object.keys(dependencies).forEach((pkg) => {
    try {
      const installedVersion = execSync(`npm list ${pkg} --depth=0 --json`, { cwd: appRoot, encoding: "utf8" });
      const parsedVersion = JSON.parse(installedVersion).dependencies?.[pkg]?.version;

      if (!parsedVersion) {
        console.log(`📦 Installing ${pkg}@${dependencies[pkg]}...`);
        execSync(`npm install ${isDev ? "-D" : ""} ${pkg}@${dependencies[pkg]}`, { stdio: "inherit", cwd: appRoot });
      } else {
        console.log(`✅ ${pkg} già installato (versione: ${parsedVersion}).`);
      }
    } catch (error) {
      console.log(`📦 Installing ${pkg}@${dependencies[pkg]}...`);
      execSync(`npm install ${isDev ? "-D" : ""} ${pkg}@${dependencies[pkg]}`, { stdio: "inherit", cwd: appRoot });
    }
  });
};

const installPeerDependencies = () => {
  const peerDependencies = {
    "react-router-dom": "^7.0.0",
    axios: "^1.0.0",
    tailwindcss: "^3.0.0",
    "react-icons": "^5.4.0",
    "jwt-decode": "^3.1.2"
  };

  installDependencies(peerDependencies);
};

const installTailwind = () => {
  console.log("🔍 Controllo installazione Tailwind CSS...");
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
    if (!packageJson.devDependencies?.tailwindcss) {
      console.log("📦 Installazione Tailwind CSS...");
      installDependencies({ tailwindcss: "^3.0.0" }, true);
      execSync("npx tailwindcss init", { stdio: "inherit", cwd: appRoot });
      console.log("✅ Tailwind CSS installato con successo.");
    } else {
      console.log("✅ Tailwind CSS già installato.");
    }
  } catch (error) {
    console.error("❌ Errore durante l'installazione di Tailwind CSS:", error);
  }
};

const modifyTailwindConfig = () => {
  const tailwindConfigPath = path.join(appRoot, "tailwind.config.js");
  if (fs.existsSync(tailwindConfigPath)) {
    console.log("✍️ Modifica tailwind.config.js...");
    const configContent = fs.readFileSync(tailwindConfigPath, "utf8");

    if (!configContent.includes("content:")) {
      const updatedConfigContent = configContent.replace(
        /module\.exports\s*=\s*{/,
        `module.exports = {
  content: [
    \"./src/**/*.{js,jsx,ts,tsx}\",
    \"./public/index.html\",
  ],`
      );
      fs.writeFileSync(tailwindConfigPath, updatedConfigContent);
      console.log("✅ Percorsi content aggiunti a tailwind.config.js.");
    } else {
      console.log("✅ Il file tailwind.config.js è già configurato correttamente.");
    }
  } else {
    console.error("❌ tailwind.config.js non trovato");
  }
};

const modifyIndexCss = () => {
  const cssPath = path.join(appRoot, "src", "index.css");

  if (!fs.existsSync(cssPath)) {
    console.log("📄 Creazione file index.css...");
    fs.writeFileSync(cssPath, "");
  }

  if (fs.existsSync(cssPath)) {
    console.log("✍️ Aggiunta direttive Tailwind a index.css...");
    const cssContent = fs.readFileSync(cssPath, "utf8");
    const tailwindDirectives = `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n`;

    if (!cssContent.startsWith(tailwindDirectives)) {
      fs.writeFileSync(cssPath, tailwindDirectives + cssContent);
      console.log("✅ Direttive Tailwind aggiunte a index.css.");
    } else {
      console.log("✅ Le direttive Tailwind sono già presenti in index.css.");
    }
  } else {
    console.error("❌ index.css non trovato");
  }
};

const checkAndInstallDependencies = () => {
  installPeerDependencies();
  installTailwind();
  modifyTailwindConfig();
  modifyIndexCss();
};

checkAndInstallDependencies();