import { NextFunction, Request, Response } from 'express';
import Blog from '../models/blog.models';
import mongoose from 'mongoose';

const create = (req: Request, res: Response, next: NextFunction) => {
  const { title, content, picture } = req.body;

  const blog = new Blog({
    title,
    content,
    picture,
  });

  return blog
    .save()
    .then((newBlog) => {
      return res.status(201).json({ blog: newBlog });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
      });
    });
};

const read = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.blogID;

  Blog.findById(id)
    .exec()
    .then((blog) => {
      if (blog) {
        return res.status(200).json({ blog });
      } else {
        return res.status(404).json({
          error: 'Blog not found.',
        });
      }
    })
    .catch((error) => {
      return res.status(500).json({
        error: error.message,
      });
    });
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
  Blog.find()
    .exec()
    .then((blogs) => {
      return res.status(200).json({
        count: blogs.length,
        blogs: blogs,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
      });
    });
};

const query = (req: Request, res: Response, next: NextFunction) => {
  Blog.find(req.body)
    .exec()
    .then((blogs) => {
      return res.status(200).json({
        count: blogs.length,
        blogs: blogs,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
      });
    });
};

const update = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.blogID;

  Blog.findById(id)
    .exec()
    .then((blog) => {
      if (blog) {
        blog.set(req.body);
        blog
          .save()
          .then((savedBlog) => {
            return res.status(201).json({
              blog: savedBlog,
            });
          })
          .catch((error) => {
            return res.status(500).json({
              message: error.message,
            });
          });
      } else {
        return res.status(401).json({
          message: 'NOT FOUND',
        });
      }
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
      });
    });
};

const deleteBlog = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.blogID;

  Blog.findByIdAndDelete(id)
    .exec()
    .then(() => {
      return res.status(201).json({
        message: 'Blog deleted',
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
      });
    });
};

export default {
  create,
  read,
  readAll,
  query,
  update,
  deleteBlog,
};
