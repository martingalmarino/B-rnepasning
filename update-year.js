#!/usr/bin/env node

/**
 * Automatic Year Update Script
 * Updates all instances of "2025" to "2026" across the website
 * Designed to run automatically on January 1st, 2026
 */

const fs = require('fs');
const path = require('path');

// Configuration
const OLD_YEAR = '2025';
const NEW_YEAR = '2026';
const DRY_RUN = process.argv.includes('--dry-run');

// Files and directories to update
const FILES_TO_UPDATE = [
    'index.html',
    'kommuner/template.html',
    'generate-pages.js',
    'sitemap.xml'
];

const DIRECTORIES_TO_UPDATE = [
    'kommuner'
];

// Statistics
let filesUpdated = 0;
let totalReplacements = 0;

console.log(`🔄 Starting year update: ${OLD_YEAR} → ${NEW_YEAR}`);
console.log(`📅 Date: ${new Date().toISOString()}`);
console.log(`🧪 Dry run: ${DRY_RUN ? 'YES' : 'NO'}`);
console.log('─'.repeat(50));

/**
 * Update a single file
 */
function updateFile(filePath) {
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  File not found: ${filePath}`);
        return;
    }

    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const updatedContent = content.replace(new RegExp(OLD_YEAR, 'g'), NEW_YEAR);
        
        const replacements = (content.match(new RegExp(OLD_YEAR, 'g')) || []).length;
        
        if (replacements > 0) {
            console.log(`📝 ${filePath}: ${replacements} replacement(s)`);
            
            if (!DRY_RUN) {
                fs.writeFileSync(filePath, updatedContent, 'utf8');
            }
            
            filesUpdated++;
            totalReplacements += replacements;
        }
    } catch (error) {
        console.error(`❌ Error updating ${filePath}:`, error.message);
    }
}

/**
 * Update all municipality HTML files
 */
function updateMunicipalityFiles() {
    const kommunerDir = path.join(__dirname, 'kommuner');
    
    if (!fs.existsSync(kommunerDir)) {
        console.log('⚠️  Kommuner directory not found');
        return;
    }

    const files = fs.readdirSync(kommunerDir);
    const htmlFiles = files.filter(file => file.endsWith('.html') && file !== 'template.html');
    
    console.log(`📁 Found ${htmlFiles.length} municipality files`);
    
    htmlFiles.forEach(file => {
        const filePath = path.join(kommunerDir, file);
        updateFile(filePath);
    });
}

/**
 * Update the generate-pages.js script
 */
function updateGeneratePagesScript() {
    const scriptPath = path.join(__dirname, 'generate-pages.js');
    
    if (!fs.existsSync(scriptPath)) {
        console.log('⚠️  generate-pages.js not found');
        return;
    }

    try {
        const content = fs.readFileSync(scriptPath, 'utf8');
        
        // Update the year in the template replacement
        const updatedContent = content.replace(
            new RegExp(`\\.replace\\(/\\{\\{YEAR\\}\\}/g, currentYear\\)`, 'g'),
            `.replace(/{{YEAR}}/g, currentYear)`
        );
        
        // Update any hardcoded 2025 references
        const finalContent = updatedContent.replace(new RegExp(OLD_YEAR, 'g'), NEW_YEAR);
        
        const replacements = (content.match(new RegExp(OLD_YEAR, 'g')) || []).length;
        
        if (replacements > 0) {
            console.log(`📝 generate-pages.js: ${replacements} replacement(s)`);
            
            if (!DRY_RUN) {
                fs.writeFileSync(scriptPath, finalContent, 'utf8');
            }
            
            filesUpdated++;
            totalReplacements += replacements;
        }
    } catch (error) {
        console.error('❌ Error updating generate-pages.js:', error.message);
    }
}

/**
 * Main execution
 */
function main() {
    console.log('🔍 Scanning files...\n');
    
    // Update main files
    FILES_TO_UPDATE.forEach(file => {
        updateFile(file);
    });
    
    // Update municipality files
    updateMunicipalityFiles();
    
    // Update generate-pages.js specifically
    updateGeneratePagesScript();
    
    // Regenerate sitemap with new year
    console.log('\n🔄 Regenerating sitemap with updated year...');
    try {
        const { execSync } = require('child_process');
        execSync('node generate-sitemap.js', { stdio: 'pipe' });
        console.log('✅ Sitemap regenerated successfully');
        filesUpdated++;
    } catch (error) {
        console.log('⚠️  Could not regenerate sitemap:', error.message);
    }
    
    console.log('\n' + '─'.repeat(50));
    console.log('📊 SUMMARY:');
    console.log(`   Files updated: ${filesUpdated}`);
    console.log(`   Total replacements: ${totalReplacements}`);
    
    if (DRY_RUN) {
        console.log('\n🧪 DRY RUN COMPLETED - No files were actually modified');
        console.log('   Run without --dry-run to apply changes');
    } else {
        console.log('\n✅ YEAR UPDATE COMPLETED SUCCESSFULLY');
        console.log(`   All instances of "${OLD_YEAR}" have been updated to "${NEW_YEAR}"`);
        
        if (filesUpdated > 0) {
            console.log('\n🔄 Next steps:');
            console.log('   1. Test the website to ensure everything works');
            console.log('   2. Commit and push changes to repository');
            console.log('   3. Deploy to production');
        }
    }
    
    console.log('\n🎉 Script completed successfully!');
}

// Run the script
if (require.main === module) {
    main();
}

module.exports = { main, updateFile, updateMunicipalityFiles };
