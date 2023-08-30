import { NextFunction, Request, Response } from 'express'

export default function errorHandlerMiddleware(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.log(error?.name ?? error?.message)
  res
    .status(400)
    .json({ status: false, message: error?.message ?? error?.name })
}
