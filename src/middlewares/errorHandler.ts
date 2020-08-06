import type { Request, Response } from "express";

const errorHandler = (err: Error, req: Request, res: Response) => {
  res.status(500).json(err);
};

export default errorHandler;
