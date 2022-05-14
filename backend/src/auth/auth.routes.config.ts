import express from "express";
import { CommonRoutesConfig } from "../common/common.routes.config";
import AuthController from "./auth.controller";
import { loginValidation } from "./auth.validator";

export class AuthRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "AuthRoutes");
  }

  configureRoutes() {
    // request to /login
    this.app
      .route(`/login`)
      .post(AuthController.authenticate, loginValidation);

    return this.app;
  }
}
