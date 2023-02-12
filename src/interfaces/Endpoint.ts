import { Router } from "express";

export interface Endpoint {
  path: string,
  handler: Router
}