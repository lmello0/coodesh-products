import { NextFunction, Request, Response } from 'express';
import { GetUserService } from '../services/GetUserService';
import { NotFoundException } from '../exceptions/NotFoundException';
import { UpdateUserService } from '../services/UpdateUserService';

export class UserController {
  constructor(
    private readonly getUserService: GetUserService,
    private readonly updateUserService: UpdateUserService,
  ) {}

  async validateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const apiKey = req.header('X-api-key');
      const MAX_USAGE = 1000;

      if (apiKey) {
        const account = await this.getUserService.execute(apiKey);
        const today = new Date().toISOString().split('T')[0];

        const usageCount = account.usageQuota.findIndex(
          (day) => day.day == today,
        );

        if (usageCount >= 0) {
          if (account.usageQuota[usageCount].usage >= MAX_USAGE) {
            return res.status(429).json({
              error: 'Max API calls exceeded.',
            });
          }

          account.usageQuota[usageCount].usage++;
          await this.updateUserService.execute(account);
          return next();
        }

        account.usageQuota.push({ day: today, usage: 1 });
        await this.updateUserService.execute(account);
        return next();
      }

      return res.status(401).json({ error: 'API Key not provided' });
    } catch (err) {
      console.error(err);

      if (err instanceof NotFoundException) {
        return res.status(404).json({ error: `API Key not found` });
      }

      return res.status(500).json({ error: 'Unexpected error' });
    }
  }
}
