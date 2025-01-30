import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const installPeerDependencies = () => {
  const peerDependencies = {
    react: "^18.0.0",
    "react-dom": "^18.0.0",
    "react-router-dom": "^7.0.0",
    axios: "^1.0.0",
    tailwindcss: "^3.0.0",
    "react-icons": "^5.4.0",
    "jwt-decode": "^3.1.2"
  };

  const packageJsonPath = path.resolve("package.json");

  if (!fs.existsSync(packageJsonPath)) {
    console.error("Error: package.json not found");
    return;
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  const installedDependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
    ...packageJson.peerDependencies,
  };

  Object.keys(peerDependencies).forEach((pkg) => {
    const requiredVersion = peerDependencies[pkg];
    const installedVersion = installedDependencies[pkg];

    if (!installedVersion) {
      console.log(`Peer dependency "${pkg}" is missing. Installing...`);
      execSync(`npm install ${pkg}@${requiredVersion}`, { stdio: "inherit" });
    } else {
      console.log(`Peer dependency "${pkg}" is already installed (version: ${installedVersion}).`);
    }
  });
};

const installTailwind = () => {
  console.log("Checking if Tailwind CSS is installed...");

  try {
    // Verifica se tailwindcss è già presente nelle dipendenze
    const packageJsonPath = path.resolve("package.json");
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

    if (!packageJson.devDependencies || !packageJson.devDependencies.tailwindcss) {
      console.log("Tailwind CSS not found. Installing...");

      // Esegui i comandi per installare tailwindcss
      execSync("npm install -D tailwindcss@3", { stdio: "inherit" });

      // Esegui npx per generare tailwind.config.js
      execSync("npx tailwindcss init", { stdio: "inherit" });

      console.log("Tailwind CSS installed successfully.");
    } else {
      console.log("Tailwind CSS is already installed.");
    }
  } catch (error) {
    console.error("Error checking or installing Tailwind CSS:", error);
    process.exit(1);
  }
};

const modifyTailwindConfig = () => {
  const tailwindConfigPath = path.resolve("tailwind.config.js");

  // Verifica se il file tailwind.config.js esiste
  if (fs.existsSync(tailwindConfigPath)) {
    console.log("Modifying tailwind.config.js...");

    // Leggi il contenuto del file
    const configContent = fs.readFileSync(tailwindConfigPath, "utf8");

    // Aggiungi la configurazione content (assicurati che non esista già)
    if (!configContent.includes("content:")) {
      const updatedConfigContent = configContent.replace(
        `module.exports = {
            content: [
              "./src/**/*.{js,jsx,ts,tsx}",
              "./public/index.html",
            ],
            theme: {
              extend: {},
            },
            plugins: [],
          };`
      );
      fs.writeFileSync(tailwindConfigPath, updatedConfigContent);
      console.log("Added content path to tailwind.config.js.");
    } else {
      console.log("content path already present in tailwind.config.js.");
    }
  } else {
    console.error("tailwind.config.js not found");
  }
};

const modifyIndexCss = () => {
  const cssPath = path.resolve("src/index.css");

  // Verifica se il file index.css esiste
  if (fs.existsSync(cssPath)) {
    console.log("Adding Tailwind directives to the beginning of index.css...");

    // Leggi il contenuto del file CSS
    const cssContent = fs.readFileSync(cssPath, "utf8");

    // Direttive di Tailwind da aggiungere
    const tailwindDirectives = `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n`;

    // Aggiungi le direttive all'inizio del file se non sono già presenti
    if (!cssContent.includes("@tailwind base;")) {
      const updatedCssContent = tailwindDirectives + cssContent;
      fs.writeFileSync(cssPath, updatedCssContent);
      console.log("Tailwind directives added to index.css.");
    } else {
      console.log("Tailwind directives already present in index.css.");
    }
  } else {
    console.error("index.css not found");
  }
};

const checkAndInstallDependencies = () => {
  installPeerDependencies();
  installTailwind();
  modifyTailwindConfig();
  modifyIndexCss();
};

// Esegui tutto
checkAndInstallDependencies();
