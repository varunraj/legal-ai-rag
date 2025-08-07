#!/bin/bash

# Simple Backup Script (No GPG Required)
# Usage: ./scripts/backup-keys-simple.sh

echo "🔐 Creating simple backup of API keys..."

# Create backup directory
BACKUP_DIR="api-keys-backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"

echo "📁 Creating backup in: $BACKUP_DIR"

# Backup development keys (base64 encoded)
if [ -f .env.development ]; then
    base64 < .env.development > "$BACKUP_DIR/env-dev-backup.b64"
    echo "✅ Base64 encoded .env.development -> $BACKUP_DIR/env-dev-backup.b64"
fi

# Backup production keys (base64 encoded)
if [ -f .env.production ]; then
    base64 < .env.production > "$BACKUP_DIR/env-prod-backup.b64"
    echo "✅ Base64 encoded .env.production -> $BACKUP_DIR/env-prod-backup.b64"
fi

# Create README with instructions
cat > "$BACKUP_DIR/README.txt" << 'EOF'
🔐 LEGAL AI RAG - API KEYS BACKUP (SIMPLE)
============================================

This folder contains base64-encoded backups of your API keys.

📁 Files:
- env-dev-backup.b64 - Development API keys
- env-prod-backup.b64 - Production API keys

🔓 To Restore (if laptop is lost):

1. Download these files to your new computer
2. Decode the files:

   For development:
   base64 -d env-dev-backup.b64 > .env.development
   
   For production:
   base64 -d env-prod-backup.b64 > .env.production

3. Place the .env files in your legal-ai-rag project folder
4. Run: npm run dev

⚠️  SECURITY:
- This is base64 encoding (not encryption)
- Keep this backup secure
- Don't share these files
- Delete old backups when you create new ones

📅 Backup created: $(date)
EOF

echo ""
echo "📋 Backup Summary:"
echo "=================="
echo "📁 Backup folder: $BACKUP_DIR"
echo "📄 Files created:"
ls -la "$BACKUP_DIR/"

echo ""
echo "☁️  GOOGLE DRIVE UPLOAD INSTRUCTIONS:"
echo "======================================"
echo "1. Open Google Drive in your browser"
echo "2. Create a folder called 'Legal AI Backups'"
echo "3. Upload the entire '$BACKUP_DIR' folder"
echo "4. Keep this backup secure!"
echo ""
echo "💡 To restore later:"
echo "   - Download the backup folder from Google Drive"
echo "   - Follow instructions in README.txt"
echo ""
echo "✅ Simple backup ready for Google Drive upload!"
