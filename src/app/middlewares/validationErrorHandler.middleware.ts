import { NextFunction, Request, Response } from 'express'
import {
  FieldValidationError,
  Result,
  validationResult
} from 'express-validator'

export default function validationErrorHandlerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const validationResponse: Result = validationResult(req)
  // if there are any validation errors
  if (!validationResponse.isEmpty()) {
    const errors: {
      field: string
      error: string
    }[] = validationResponse.array().map((error: FieldValidationError) => {
      return { field: error.path, error: error.msg }
    })
    return res.status(400).json({
      status: false,
      message: 'Data Validation Error(s)',
      errors
    })
  }
  next()
}
