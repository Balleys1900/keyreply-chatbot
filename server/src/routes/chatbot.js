const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/ChatbotController');
const { setUserStatus } = require('../middlewares/chatbot');

/**
 * @swagger
 * components:
 *   schemas:
 *     History:
 *       type: object
 *       required:
 *         - chatArr
 *       properties:
 *         chatArr:
 *           type: string
 *       example:
 *         chatArr : Xem danh sách sản phẩm
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Text:
 *       type: string
 *       properties:
 *         command:
 *           type: string
 *       example:
 *         command: list_items
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Notice:
 *       type: object
 *       properties:
 *         notice:
 *           type: object
 *       example:
 *         notice: Body is a button
 */

/**
 * @swagger
 * /api/v1/chatbot/history:
 *   get:
 *     security:
 *          - bearerAuth: []
 *     summary: Returns the chatArr history
 *     responses:
 *       200:
 *         description: The history of chat Array
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: The Token not found
 */
router.get('/history', chatbotController.getHistory);

/**
 * @swagger
 * /api/v1/chatbot/history:
 *   post:
 *     summary: Store the chatArr history
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/History'
 *     responses:
 *      200:
 *         description: Store chatArr history success
 *      401:
 *         description: Unauthorized
 *      403:
 *         description: Forbidden
 *      404:
 *         description: The token not found
 */
router.post('/history', chatbotController.storeHistory);

/**
 * @swagger
 * /api/v1/chatbot/navigateNode:
 *   post:
 *     summary: Get the navigate Node
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notice'
 *     responses:
 *      200:
 *         description:  Success
 *      401:
 *         description: Unauthorized
 *      403:
 *         description: Forbidden
 */
router.post('/navigateNode', setUserStatus, chatbotController.navigateNode);

/**
 * @swagger
 * /api/v1/chatbot/command:
 *   post:
 *     summary: Return next Button
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Text'
 *     responses:
 *      200:
 *         description: Success
 *      401:
 *         description: Unauthorized
 *      403:
 *         description: Forbidden
 *      404:
 *         description: The token not found
 */
router.post('/command', chatbotController.commandHandler);

router.get('/start', chatbotController.startHandler);

module.exports = router;
