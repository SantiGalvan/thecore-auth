import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const installTailwind = () => {
  console.log("Installing Tailwind CSS...");

  try {
    // Installa le dipendenze necessarie
    execSync("npm install tailwindcss postcss autoprefixer", { stdio: "inherit" });

    // Crea il file tailwind.config.js se non esiste
    const tailwindConfigPath = path.resolve("tailwind.config.js");
    if (!fs.existsSync(tailwindConfigPath)) {
      console.log("Creating tailwind.config.js...");
      fs.writeFileSync(
        tailwindConfigPath,
        `/** @type {import('tailwindcss').Config} */
            module.exports = {
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
    }

    // Crea il file postcss.config.js se non esiste
    const postcssConfigPath = path.resolve("postcss.config.js");
    if (!fs.existsSync(postcssConfigPath)) {
      console.log("Creating postcss.config.js...");
      fs.writeFileSync(
        postcssConfigPath,
        `module.exports = {
            plugins: {
                tailwindcss: {},
                autoprefixer: {},
            },
        };`
      );
    }

    // Verifica se index.css esiste e aggiungi le direttive di Tailwind
    const cssPath = path.resolve("src/index.css");
    if (fs.existsSync(cssPath)) {
      console.log("Adding Tailwind directives to the beginning of index.css...");

      const cssContent = fs.readFileSync(cssPath, "utf8");

      // Controlla se le direttive di Tailwind sono già presenti nel file
      const tailwindDirectives = `
        @tailwind base;
        @tailwind components;
        @tailwind utilities;
        `;

      if (!cssContent.includes("@tailwind base;")) {
        // Aggiungi le direttive all'inizio del file
        const updatedCssContent = tailwindDirectives + cssContent;
        fs.writeFileSync(cssPath, updatedCssContent);
        console.log("Tailwind directives added to index.css.");
      } else {
        console.log("Tailwind directives already present in index.css.");
      }
    } else {
      console.log("Creating index.css and adding Tailwind directives...");
      fs.writeFileSync(
        cssPath,
        `@tailwind base;
         @tailwind components;
         @tailwind utilities;`
      );
    }

  } catch (error) {
    console.error("Error installing Tailwind CSS:", error);
    process.exit(1);
  }
};

const checkPeerDependencies = () => {
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
      console.log(`Peer dependency "${pkg}" is missing.`);
      if (pkg === "tailwindcss") {
        installTailwind(); // Installa e configura automaticamente Tailwind se mancante
      } else {
        execSync(`npm install ${pkg}`, { stdio: "inherit" });
      }
    } else {
      console.log(`Peer dependency "${pkg}" is installed (version: ${installedVersion}).`);
    }
  });
};

checkPeerDependencies();
