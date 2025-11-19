import type { VercelRequest, VercelResponse } from '@vercel/node';

export const config = {
  schedule: '0 0 * * *',
};

export default async function handler(_: VercelRequest, res: VercelResponse) {
  const hookUrl = process.env.VERCEL_DEPLOY_HOOK;

  if (!hookUrl) {
    return res.status(500).json({ error: 'VERCEL_DEPLOY_HOOK environment variable not set' });
  }

  try {
    const response = await fetch(hookUrl, { method: 'POST' });
    if (response.ok) {
      res.status(200).json({ message: 'Triggered daily rebuild' });
    } else {
      res.status(response.status).json({ error: 'Failed to trigger rebuild' });
    }
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
}
