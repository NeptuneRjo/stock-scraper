"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiControllers_1 = require("../controllers/apiControllers");
const router = (0, express_1.Router)();
router.route('/all-coins').get(apiControllers_1.get_all_coins);
router.route('/half-coins').get(apiControllers_1.get_top_fifty_coins);
router.route('/:id').get(apiControllers_1.get_single_coin);
exports.default = router;
