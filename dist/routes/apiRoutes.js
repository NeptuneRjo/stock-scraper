"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiControllers_1 = require("../controllers/apiControllers");
const router = (0, express_1.Router)();
router.route('/all-coins').get(apiControllers_1.get_all_coins);
router.route('/top-50').get(apiControllers_1.get_top_fifty_coins);
router.route('/coin/:id').get((req, res) => res.send('get url'));
exports.default = router;
