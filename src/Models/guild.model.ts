import mongoose, { Schema, Document } from 'mongoose';
import { Char } from './char.model';

export class Guild {
    name?: string;
    description?: string;
    war?: boolean;
    totalmembers?: number;
    totalinvited?: number;
    world?: string;
    founded?: string;
    active?: boolean;
    guildlogo?: string;
    members?: Char[];
}

export interface IGuild extends Document {
    name?: string;
    description?: string;
    war?: boolean;
    totalmembers?: number;
    world?: string;
    founded?: string;
    active?: boolean;
    guildlogo?: string;
    members?: Char[];
}

const GuildSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  war: { type: Boolean },
  totalmembers: { type: Number },
  world: { type: String },
  founded: { type: String },
  active: { type: Boolean },
  guildlogo: { type: String },
  members: []  
});

export default mongoose.model<IGuild>('Guild', GuildSchema);