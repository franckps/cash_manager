import express from "express";
import {
  buildCreateTransactionController,
  buildFindTransactionByFiltersController,
  buildGetTotalAmountController,
  buildRevertTransactionController,
  buildFindTransactionByIdController,
} from "./infra/factories/controller-factory";
import path from "path";

console.log(`PORT: (${process.env.PORT})`);

const PORT = process.env.PORT || 3000;
const API_BASE_RESOURCE = "/api/v1";

const createTransactionController = buildCreateTransactionController();
const findTransactionByFiltersController =
  buildFindTransactionByFiltersController();
const getTotalAmountController = buildGetTotalAmountController();
const revertTransactionController = buildRevertTransactionController();
const findTransactionByIdController = buildFindTransactionByIdController();

const app = express();

app.use(
  "/web",
  express.static(path.join(__dirname, "..", "assets", "public", "web"))
);

app.use(express.json());

app.post(API_BASE_RESOURCE + "/", async (request, response) => {
  const result = await createTransactionController.handle(request);
  return response.json(result);
});

app.get(API_BASE_RESOURCE + "/", async (request, response) => {
  const result = await findTransactionByFiltersController.handle(request);
  return response.json(result);
});

app.get(API_BASE_RESOURCE + "/total", async (request, response) => {
  const result = await getTotalAmountController.handle(request);
  return response.json(result);
});

app.get(API_BASE_RESOURCE + "/:id", async (request, response) => {
  const result = await findTransactionByIdController.handle(request);
  return response.json(result);
});

app.delete(API_BASE_RESOURCE + "/:id", async (request, response) => {
  const result = await revertTransactionController.handle(request);
  return response.json(result);
});

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
