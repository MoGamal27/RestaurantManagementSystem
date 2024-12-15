const { signup, signIn } = require("../controllers/authController");
const { signupValidator, signinValidator } = require("../utils/validators/authValidator");
const express = require("express");

const router = express.Router();

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: Login to the system
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUserInput'
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */

router.post("/signup", signupValidator ,signup);
router.post("/signin", signinValidator ,signIn);

module.exports = router