"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const port = 3000;
const prisma = new client_1.PrismaClient();
app.get('/', (_req, res) => {
    res.send('Hello World!!!');
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
