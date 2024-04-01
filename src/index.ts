import express from "express";
import {
  buildCreateTransactionController,
  buildFindTransactionByFiltersController,
  buildGetTotalAmountController,
  buildRevertTransactionController,
  buildFindTransactionByIdController,
  buildDeleteTransactionController,
  buildCreateAccountController,
  buildDeleteAccountController,
  buildFindAllAccountController,
} from "./infra/factories/controller-factory";
import path from "path";
import { ZodError } from "zod";

console.log(`PORT: (${process.env.PORT})`);

const PORT = process.env.PORT || 3000;
const API_BASE_RESOURCE = "/api/v1";

const createTransactionController = buildCreateTransactionController();
const findTransactionByFiltersController =
  buildFindTransactionByFiltersController();
const getTotalAmountController = buildGetTotalAmountController();
const revertTransactionController = buildRevertTransactionController();
const findTransactionByIdController = buildFindTransactionByIdController();
const deleteTransactionController = buildDeleteTransactionController();

const createAccountController = buildCreateAccountController();
const deleteAccountController = buildDeleteAccountController();
const findAllAccountController = buildFindAllAccountController();

const app = express();

app.use(
  "/web",
  express.static(path.join(__dirname, "..", "assets", "public", "web"))
);

app.use(express.json());

app.post(API_BASE_RESOURCE + "/account/", async (request, response, next) => {
  try {
    const result = await createAccountController.handle(request);
    return response.json(result);
  } catch (err) {
    return next(err);
  }
});

app.delete(
  API_BASE_RESOURCE + "/account/:account",
  async (request, response, next) => {
    try {
      const result = await deleteAccountController.handle(request);
      return response.json(result);
    } catch (err) {
      return next(err);
    }
  }
);

app.get(API_BASE_RESOURCE + "/account/", async (request, response, next) => {
  try {
    const result = await findAllAccountController.handle(request);
    return response.json(result);
  } catch (err) {
    return next(err);
  }
});

app.post(
  API_BASE_RESOURCE + "/account/:account/transaction/",
  async (request, response, next) => {
    try {
      const result = await createTransactionController.handle(request);
      return response.json(result);
    } catch (err) {
      return next(err);
    }
  }
);

app.get(
  API_BASE_RESOURCE + "/account/:account/transaction/",
  async (request, response, next) => {
    try {
      const result = await findTransactionByFiltersController.handle(request);
      return response.json(result);
    } catch (err) {
      return next(err);
    }
  }
);

app.get(
  API_BASE_RESOURCE + "/account/:account/total",
  async (request, response, next) => {
    try {
      const result = await getTotalAmountController.handle(request);
      return response.json(result);
    } catch (err) {
      return next(err);
    }
  }
);

app.get(
  API_BASE_RESOURCE + "/account/:account/transaction/:id",
  async (request, response, next) => {
    try {
      const result = await findTransactionByIdController.handle(request);
      return response.json(result);
    } catch (err) {
      return next(err);
    }
  }
);

app.delete(
  API_BASE_RESOURCE + "/account/:account/transaction/:id",
  async (request, response, next) => {
    try {
      const result = await deleteTransactionController.handle(request);
      return response.json(result);
    } catch (err) {
      return next(err);
    }
  }
);

app.patch(
  API_BASE_RESOURCE + "/account/:account/transaction/:id/revert",
  async (request, response, next) => {
    try {
      const result = await revertTransactionController.handle(request);
      return response.json(result);
    } catch (err) {
      return next(err);
    }
  }
);

app.use((error: Error, request: any, response: any, next: any) => {
  console.log({ error });
  if (error.name == "ZodError")
    return response.status(400).json({
      error: (error as ZodError).errors.map((el) => el.message).join("; "),
    });

  return response.status(500).json({ error: error.message });
});

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
