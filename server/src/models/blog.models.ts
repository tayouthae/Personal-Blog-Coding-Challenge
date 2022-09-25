import mongoose, { Schema } from 'mongoose';
import IBlog from '../interfaces/blog.interfaces';

const BlogSchema: Schema = new Schema(
  {
    title: { type: String, unique: true },
    content: { type: String, unique: true },
    picture: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IBlog>('Blog', BlogSchema);
