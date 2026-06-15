import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function errorHandler(
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction
): void {
  void _next;

  if (error instanceof ZodError) {
    response.status(400).json({
      error: "Validation error",
      details: error.errors.map((e) => ({
        path: e.path.join("."),
        message: e.message
      }))
    });
    return;
  }

  const message =
    error instanceof Error ? error.message : "Internal server error";
  const status =
    error instanceof Error && "status" in error
      ? (error as Error & { status: number }).status
      : 500;

  console.error("[API Error]", message);

  response.status(status).json({
    error: message
  });
}
