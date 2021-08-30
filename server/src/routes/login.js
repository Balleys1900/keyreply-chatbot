const express = require("express");
const router = express.Router();
const LoginController = require("../controllers/LoginController");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *       properties:
 *         username:
 *           type: string
 *           description: Username
 *       example:
 *         username: Alexander K. Dewey
 */

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Login and return the token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The history of chat Array
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: The token not found
 */
router.post("/", LoginController.login);

module.exports = router;
