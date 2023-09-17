import { Request, Response } from 'express';
import { GetStatusService } from '../services/GetStatusService';

export class StatusController {
  constructor(private readonly getStatusService: GetStatusService) {}

  async getStatus(req: Request, res: Response) {
    return res.json(await this.getStatusService.execute());
  }
}
