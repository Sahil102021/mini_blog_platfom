const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authProtect = require('../middleware/auth');
const uploader = require('../config/multer');

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.post('/', authProtect.protect , uploader.single('featuredImage') , postController.createPost);
router.put('/:id', authProtect.protect, uploader.single('featuredImage'), postController.updatePost);
router.delete('/:id', authProtect.protect, postController.deletePost);
router.get('/user/my-posts', authProtect.protect, postController.getMyPosts);

module.exports = router;