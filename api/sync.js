// ===================================================================
// VERCEL SERVERLESS SYNC API (/api/sync)
// Cross-Origin Cloud Sync Endpoint for Vercel Deployments
// ===================================================================

const fs = require('fs');
const path = require('path');

let cacheStore = null;

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const body = req.body;
      if (body) {
        body.updatedAt = Date.now();
        cacheStore = body;
        return res.status(200).json({
          success: true,
          message: 'Synced to Vercel memory instance',
          updatedAt: body.updatedAt
        });
      }
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  }

  // GET
  if (cacheStore) {
    res.setHeader('Cache-Control', 'no-cache, no-store');
    return res.status(200).json(cacheStore);
  }

  try {
    const filePath = path.join(process.cwd(), 'data', 'store_data.json');
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      res.setHeader('Cache-Control', 'no-cache, no-store');
      return res.status(200).json(JSON.parse(data));
    }
  } catch (err) {}

  return res.status(200).json({ status: 'ready', message: 'Swift Jackets Cloud API' });
};
