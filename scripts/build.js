#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🚀 Starting TaskQwek production build...\n');

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function runCommand(command, description) {
    try {
        log(`📦 ${description}...`, 'blue');
        execSync(command, { stdio: 'inherit' });
        log(`✅ ${description} completed`, 'green');
        return true;
    } catch (error) {
        log(`❌ ${description} failed: ${error.message}`, 'red');
        return false;
    }
}

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
    log('❌ Error: package.json not found. Please run this script from the project root.', 'red');
    process.exit(1);
}

// Clean previous builds
log('🧹 Cleaning previous builds...', 'yellow');
if (fs.existsSync('public/assets/dist')) {
    fs.rmSync('public/assets/dist', { recursive: true, force: true });
    log('✅ Cleaned previous builds', 'green');
}

// Install dependencies if needed
if (!fs.existsSync('node_modules')) {
    log('📥 Installing dependencies...', 'blue');
    if (!runCommand('npm install', 'Dependency installation')) {
        process.exit(1);
    }
}

// Run production build
log('\n🔨 Building production assets...', 'magenta');

// Build SCSS
if (!runCommand('npm run compile:sass', 'SCSS compilation')) {
    process.exit(1);
}

// Build webpack production bundle
if (!runCommand('npm run webpack:build:prod', 'Webpack production build')) {
    process.exit(1);
}

// Verify build output
const distPath = path.join('public', 'assets', 'dist');
if (!fs.existsSync(distPath)) {
    log('❌ Build output directory not found', 'red');
    process.exit(1);
}

const files = fs.readdirSync(distPath);
log(`\n📁 Build output: ${files.join(', ')}`, 'cyan');

// Check file sizes
let totalSize = 0;
files.forEach(file => {
    const filePath = path.join(distPath, file);
    const stats = fs.statSync(filePath);
    const sizeInKB = (stats.size / 1024).toFixed(2);
    totalSize += stats.size;
    log(`   ${file}: ${sizeInKB} KB`, 'cyan');
});

const totalSizeInKB = (totalSize / 1024).toFixed(2);
log(`\n📊 Total build size: ${totalSizeInKB} KB`, 'green');

// Create build info
const buildInfo = {
    timestamp: new Date().toISOString(),
    version: require('../package.json').version,
    nodeVersion: process.version,
    buildSize: totalSizeInKB + ' KB',
    files: files
};

fs.writeFileSync(
    path.join(distPath, 'build-info.json'),
    JSON.stringify(buildInfo, null, 2)
);

log('\n🎉 Production build completed successfully!', 'green');
log('📍 Build output: public/assets/dist/', 'cyan');
log('🚀 Ready for deployment!', 'green');
