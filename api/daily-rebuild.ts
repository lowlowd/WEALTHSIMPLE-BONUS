import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  console.log('[Cron] Daily rebuild function invoked at:', new Date().toISOString());

  const hookUrl = process.env.VERCEL_DEPLOY_HOOK;

  if (!hookUrl) {
    console.error('[Cron] ERROR: VERCEL_DEPLOY_HOOK environment variable not set');
    return res.status(500).json({
      error: 'VERCEL_DEPLOY_HOOK environment variable not set',
      timestamp: new Date().toISOString(),
    });
  }

  console.log('[Cron] Triggering deploy hook...');

  try {
    const response = await fetch(hookUrl, { method: 'POST' });

    if (response.ok) {
      console.log('[Cron] SUCCESS: Deploy hook triggered successfully');
      return res.status(200).json({
        message: 'Triggered daily rebuild',
        timestamp: new Date().toISOString(),
      });
    } else {
      console.error('[Cron] ERROR: Deploy hook returned status', response.status);
      return res.status(response.status).json({
        error: 'Failed to trigger rebuild',
        status: response.status,
        timestamp: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error('[Cron] ERROR: Exception thrown:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
    });
  }
}
