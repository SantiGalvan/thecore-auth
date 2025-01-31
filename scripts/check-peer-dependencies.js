import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('Sono entrato nello script');

const installPeerDependencies = () => {
  const peerDependencies = {
    "react-router-dom": "^7.0.0",
    axios: "^1.0.0",
    tailwindcss: "^3.0.0",
    "react-icons": "^5.4.0",
    "jwt-decode": "^3.1.2"
  };

  const packageJsonPath = path.resolve(process.cwd(), "package.json");

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
      execSync(`npm install ${pkg}@${requiredVersion}`, { stdio: "inherit", cwd: process.cwd() });
    } else {
      console.log(`Peer dependency "${pkg}" is already installed (version: ${installedVersion}).`);
    }
  });
};

const installTailwind = () => {
  console.log("Checking if Tailwind CSS is installed...");

  try {
    const packageJsonPath = path.resolve(process.cwd(), "package.json");
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

    if (!packageJson.devDependencies || !packageJson.devDependencies.tailwindcss) {
      console.log("Tailwind CSS not found. Installing...");
      execSync("npm install -D tailwindcss@3", { stdio: "inherit", cwd: process.cwd() });
      execSync("npx tailwindcss init", { stdio: "inherit", cwd: process.cwd() });
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
  const tailwindConfigPath = path.resolve(process.cwd(), "tailwind.config.js");

  if (fs.existsSync(tailwindConfigPath)) {
    console.log("Modifying tailwind.config.js...");
    const configContent = fs.readFileSync(tailwindConfigPath, "utf8");

    if (!configContent.includes("content:")) {
      const updatedConfigContent = configContent.replace(
        /module\.exports\s*=\s*{/,
        `module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],`
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
  const cssPath = path.resolve(process.cwd(), "src/index.css");

  if (!fs.existsSync(cssPath)) {
    console.log("index.css not found, creating it...");
    fs.writeFileSync(cssPath, "");
  }

  if (fs.existsSync(cssPath)) {
    console.log("Adding Tailwind directives to the beginning of index.css...");
    const cssContent = fs.readFileSync(cssPath, "utf8");
    const tailwindDirectives = `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n`;

    if (!cssContent.startsWith(tailwindDirectives)) {
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

checkAndInstallDependencies();
