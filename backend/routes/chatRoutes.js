/**
 * Chat Routes
 * Defines API endpoints for chat operations
 */

import express from 'express';
import { chat, getSuggestions } from '../controllers/chatController.js';

const router = express.Router();

/**
 * @route POST /api/chat
 * @desc Send chat message and get AI response
 * @access Public
 */
router.post('/', chat);

/**
 * @route GET /api/chat/suggestions/:documentId
 * @desc Get suggested questions for a document
 * @access Public
 */
router.get('/suggestions/:documentId', getSuggestions);

export default router;
