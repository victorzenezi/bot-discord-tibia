import mongoose, { Schema, Document } from 'mongoose';

export class Char{
  name?: string;
  level?: number;
  vocation?: string;
  currentExp?: number;
  dailyExp?: number;
}

export interface IChar extends Document {
  name: string;
  level: number;
  vocation: string;
  currentExp: number;
  dailyExp: number;
}

const CharSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  level: { type: Number, required: true },
  vocation: { type: String, required: true },
  currentExp: { type: Number, required: true },
  dailyExp: { type: Number, required: false }
});

export default mongoose.model<IChar>('Char', CharSchema);