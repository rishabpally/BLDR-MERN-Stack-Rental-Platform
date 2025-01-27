const fs = require('fs');
const Item = require('../models/Item'); // Ensure the correct path to the Item model

async function backupToJSON() {
  try {
    const items = await Item.find({});
    fs.writeFileSync('./data/items_backup.json', JSON.stringify(items, null, 2), 'utf8'); // Backup to JSON
    console.log('Backup completed!');
  } catch (error) {
    console.error('Failed to create backup:', error);
  }
}

module.exports = {
  backupToJSON,
};
