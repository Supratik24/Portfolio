import { createApiApp } from "../server/apiApp.js";

const { app } = createApiApp();

export default async function handler(req, res) {
  return app(req, res);
}

