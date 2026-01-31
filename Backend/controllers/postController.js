const POST = require("../models/post");


exports.createPost = async (req, res, next) => {
  try {
    const { title, content, excerpt } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    const featuredImage = req.file
      ? req.file.path
      : "default-post-image.jpg";

    const post = await POST.create({
      title,
      content,
      excerpt,
      featuredImage,
      author: req.user._id,
    });

    await post.populate("author", "username email profileImage");

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: { post },
    });
  } catch (error) {
    next(error);
  }
};


exports.getAllPosts = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await POST.find()
      .populate("author", "username profileImage")
      .sort("-createdAt")
      .skip(skip)
      .limit(limit);

    const total = await POST.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        posts,
        page,
        total,
      },
    });
  } catch (error) {
    next(error);
  }
};


exports.getPostById = async (req, res, next) => {
  try {
    const post = await POST.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    post.views += 1;
    await post.save();

    res.status(200).json({
      success: true,
      data: { post },
    });
  } catch (error) {
    next(error);
  }
};


exports.updatePost = async (req, res, next) => {
  try {
    const post = await POST.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { title, content, excerpt } = req.body;

    if (title) post.title = title;
    if (content) post.content = content;
    if (excerpt) post.excerpt = excerpt;

    if (req.file) {
      post.featuredImage = req.file.path;
    }

    await post.save();
    await post.populate("author", "username profileImage");

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: { post },
    });
  } catch (error) {
    next(error);
  }
};


exports.deletePost = async (req, res, next) => {
  try {
    const post = await POST.findById(req.params.id);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await post.deleteOne();

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};


exports.getMyPosts = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await POST.find({ author: req.user._id })
      .sort("-createdAt")
      .skip(skip)
      .limit(limit);

    const total = await POST.countDocuments({
      author: req.user._id,
    });

    res.status(200).json({
      success: true,
      data: {
        posts,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};


