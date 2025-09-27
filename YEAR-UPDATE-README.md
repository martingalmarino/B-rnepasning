# 🔄 Automatic Year Update System

This system automatically updates all instances of "2025" to "2026" on January 1st, 2026, without any manual intervention.

## 📁 Files Created

### 1. `update-year.js`
- **Main update script** that replaces all "2025" with "2026"
- Updates: `index.html`, `kommuner/template.html`, `generate-pages.js`, and all municipality pages
- Includes dry-run mode for testing
- Provides detailed logging and statistics

### 2. `setup-year-update.sh`
- **Setup script** for local cron job automation
- Creates wrapper script with git operations
- Schedules cron job for January 1st, 2026 at 00:01

### 3. `.github/workflows/year-update.yml`
- **GitHub Actions workflow** for cloud-based automation
- Runs automatically on January 1st at 00:00 UTC
- Includes automatic commit and push to repository

## 🚀 Setup Options

### Option 1: Local Cron Job (Recommended)
```bash
# Make setup script executable and run it
chmod +x setup-year-update.sh
./setup-year-update.sh
```

### Option 2: GitHub Actions (Alternative)
- The workflow is already created in `.github/workflows/year-update.yml`
- Will run automatically on January 1st, 2026
- No additional setup needed if using GitHub

## 🧪 Testing

### Test the update script (dry run):
```bash
node update-year.js --dry-run
```

This will show what changes would be made without actually modifying files.

### Test with actual changes:
```bash
node update-year.js
```

## 📊 What Gets Updated

### Files Updated:
- ✅ `index.html` (home page)
- ✅ `kommuner/template.html` (template for municipality pages)
- ✅ `generate-pages.js` (generation script)
- ✅ All 20 municipality HTML files in `kommuner/`

### Content Updated:
- ✅ Page titles: "Børnepasning i [Kommune] 2025" → "2026"
- ✅ Meta descriptions with year references
- ✅ FAQ content mentioning "2025"
- ✅ Footer copyright years
- ✅ Any other hardcoded "2025" references

## 🔍 Monitoring

### Check cron job status:
```bash
crontab -l
```

### View execution logs:
```bash
cat year-update.log
```

### Check GitHub Actions:
- Go to your repository's "Actions" tab
- Look for "Automatic Year Update" workflow

## ⚙️ Customization

### To update different years:
Edit the `OLD_YEAR` and `NEW_YEAR` constants in `update-year.js`:
```javascript
const OLD_YEAR = '2025';
const NEW_YEAR = '2026';
```

### To change the schedule:
Edit the cron expression in `setup-year-update.sh` or `.github/workflows/year-update.yml`

## 🛡️ Safety Features

- **Dry run mode** for testing without changes
- **Detailed logging** of all operations
- **Error handling** for file operations
- **Git integration** with automatic commits
- **Backup safety** through version control

## 📅 Timeline

- **January 1st, 2026 00:01** (local cron) or **00:00 UTC** (GitHub Actions)
- Script runs automatically
- Changes are committed and pushed
- Vercel automatically deploys updated site
- Website shows "2026" content immediately

## 🎯 Benefits

- ✅ **Zero manual work** required
- ✅ **Consistent updates** across all pages
- ✅ **Automatic deployment** via Vercel
- ✅ **Version control** with detailed commit messages
- ✅ **Rollback capability** if needed
- ✅ **Future-proof** for subsequent years

## 🔧 Troubleshooting

### If the script fails:
1. Check logs: `cat year-update.log`
2. Run manually: `node update-year.js`
3. Check file permissions
4. Verify git repository status

### If GitHub Actions fails:
1. Check the Actions tab in your repository
2. Review the workflow logs
3. Ensure repository has proper permissions

---

**🎉 Your website will automatically stay current with the new year!**
