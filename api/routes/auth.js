/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: User username 
 *         password:
 *           type: string
 *           description: User password
 */

/**
 * @swagger
 * tags:
 *   - name: User Login
 *     description: API endpoints for user login
 * paths:
 *   /api/auth/login:
 *     post:
 *       summary: Authenticate user credentials
 *       tags: [User Login]
 *       parameters:
 *         - name: username
 *           in: formData
 *           description: User's username
 *           required: true
 *           type: string
 *         - name: password
 *           in: formData
 *           description: User's password
 *           required: true
 *           type: string
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             example:
 *               username: John
 *               password: "12345"
 *       responses:
 *         200:
 *           description: User details
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 */


import express from "express";
import { login, register } from "../controllers/auth.js";

const router = express.Router()

router.post("/register", register)
router.post("/login", login)

export default router;