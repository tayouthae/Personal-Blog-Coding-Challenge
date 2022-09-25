import { Document } from 'mongoose';

export default interface IBlog extends Document {
  title: string;
  content: string;
  picture?: string;
}
