#!/bin/bash

# Setup script for automatic year update
# This script sets up a cron job to run the year update on January 1st, 2026

echo "🔧 Setting up automatic year update for January 1st, 2026..."

# Make the update script executable
chmod +x update-year.js

# Create a wrapper script that will commit and push changes
cat > year-update-wrapper.sh << 'EOF'
#!/bin/bash

# Wrapper script for year update with git operations
cd /Users/martingalmarino/Desktop/bornepasning

echo "🔄 Running automatic year update..."
node update-year.js

# Check if there were any changes
if [ $? -eq 0 ] && [ -n "$(git status --porcelain)" ]; then
    echo "📝 Changes detected, committing and pushing..."
    
    git add .
    git commit -m "AUTO: Update year from 2025 to 2026

✅ Automatic Year Update:
   - Updated all instances of '2025' to '2026'
   - Updated home page titles and content
   - Updated all 20 municipality pages
   - Updated generate-pages.js script
   - Updated template.html for future generations

✅ Files Updated:
   - index.html (home page)
   - kommuner/template.html
   - kommuner/*.html (all 20 municipality pages)
   - generate-pages.js

This update was performed automatically on January 1st, 2026."
    
    git push origin main
    
    echo "✅ Year update completed and pushed to repository"
else
    echo "ℹ️  No changes needed or update failed"
fi
EOF

# Make the wrapper script executable
chmod +x year-update-wrapper.sh

echo "📅 Setting up cron job..."

# Add cron job for January 1st, 2026 at 00:01
# Format: minute hour day month weekday command
(crontab -l 2>/dev/null; echo "1 0 1 1 * /Users/martingalmarino/Desktop/bornepasning/year-update-wrapper.sh >> /Users/martingalmarino/Desktop/bornepasning/year-update.log 2>&1") | crontab -

echo "✅ Cron job scheduled for January 1st, 2026 at 00:01"
echo ""
echo "📋 What was set up:"
echo "   - update-year.js: Main update script"
echo "   - year-update-wrapper.sh: Wrapper with git operations"
echo "   - Cron job: Runs automatically on Jan 1, 2026"
echo ""
echo "🧪 To test the script (dry run):"
echo "   node update-year.js --dry-run"
echo ""
echo "📝 To check scheduled cron jobs:"
echo "   crontab -l"
echo ""
echo "📊 To view logs after execution:"
echo "   cat year-update.log"
echo ""
echo "⚠️  Note: Make sure the repository path is correct in the cron job"
echo "   Current path: /Users/martingalmarino/Desktop/bornepasning"
