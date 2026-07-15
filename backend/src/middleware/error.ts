import type { NextFunction, Request, Response } from "express";
import { AuthError } from "../lib/auth.js";
import { UploadError } from "../lib/s3.js";

export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>,
) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof AuthError || err instanceof UploadError) {
    const status = err instanceof AuthError ? err.status : 400;
    return res.status(status).json({ error: err.message });
  }

  console.error(err);
  return res.status(500).json({ error: "Something went wrong" });
}
