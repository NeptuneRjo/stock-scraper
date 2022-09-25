"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const server = (0, supertest_1.default)(app);
describe('API tests', () => {
    it('GETs /all-coins', async () => {
        server.get('/all-coins').expect('Content-Type', /json/).expect(200);
    });
    it('GETs /half-coins', async () => {
        server.get('/half-coins').expect('Content-Type', /json/).expect(200);
    });
    it('GETs /:id', async () => {
        server.get('/bitcoin').expect('Content-Type', /json/).expect(200);
    });
});
