import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from "url";

console.log('Sono entrato nello script');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const findAppRoot = () => {
  let dir = process.cwd();
  while (!fs.existsSync(path.join(dir, "package.json"))) {
    const parentDir = path.dirname(dir);
    if (parentDir === dir) {
      throw new Error("package.json not found in any parent directory.");
    }
    dir = parentDir;
  }
  return dir;
};

const appRoot = findAppRoot();
const packageJsonPath = path.join(appRoot, "package.json");

const installPeerDependencies = () => {
  const peerDependencies = {
    "react-router-dom": "^7.0.0",
    axios: "^1.0.0",
    tailwindcss: "^3.0.0",
    "react-icons": "^5.4.0",
    "jwt-decode": "^3.1.2"
  };

  if (!fs.existsSync(packageJsonPath)) {
    console.error("Error: package.json not found");
    return;
  }

  Object.keys(peerDependencies).forEach((pkg) => {
    try {
      const installedVersion = execSync(`npm list ${pkg} --depth=0 --json`, { cwd: appRoot, encoding: "utf8" });
      const parsedVersion = JSON.parse(installedVersion).dependencies?.[pkg]?.version;

      if (!parsedVersion) {
        console.log(`📦 Installing ${pkg}@${peerDependencies[pkg]}...`);
        execSync(`npm install ${pkg}@${peerDependencies[pkg]}`, { stdio: "inherit", cwd: appRoot });
      } else {
        console.log(`✅ ${pkg} already installed (version: ${parsedVersion}).`);
      }
    } catch (error) {
      console.log(`📦 Installing ${pkg}@${peerDependencies[pkg]}...`);
      execSync(`npm install ${pkg}@${peerDependencies[pkg]}`, { stdio: "inherit", cwd: appRoot });
    }
  });
};

const installTailwind = () => {
  console.log("Checking if Tailwind CSS is installed...");

  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

    if (!packageJson.devDependencies?.tailwindcss) {
      console.log("📦 Installing Tailwind CSS...");
      execSync("npm install -D tailwindcss@3", { stdio: "inherit", cwd: appRoot });
      execSync("npx tailwindcss init", { stdio: "inherit", cwd: appRoot });
      console.log("✅ Tailwind CSS installed.");
    } else {
      console.log("✅ Tailwind CSS already installed.");
    }
  } catch (error) {
    console.error("❌ Error installing Tailwind CSS:", error);
  }
};

const modifyTailwindConfig = () => {
  const tailwindConfigPath = path.join(appRoot, "tailwind.config.js");

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
  const cssPath = path.join(appRoot, "src", "index.css");

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