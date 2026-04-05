import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IInternship extends Document {
  title: string;
  company: string;
  description: string;
  requirements: string[];
  skills: string[];
  location: string;
  duration: string;
  stipend?: number;
  startDate: Date;
  endDate: Date;
  positionsAvailable: number;
  applicants: Types.ObjectId[];
  createdBy: Types.ObjectId;
  status: 'active' | 'closed' | 'filled';
  internshipType: string;
  createdAt: Date;
  updatedAt: Date;
}

const internshipSchema = new Schema<IInternship>(
  {
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: [String],
    skills: [String],
    location: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    stipend: Number,
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    positionsAvailable: {
      type: Number,
      required: true,
      default: 1,
    },
    applicants: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Application',
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'closed', 'filled'],
      default: 'active',
    },
    internshipType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Internship =
  mongoose.models.Internship || mongoose.model<IInternship>('Internship', internshipSchema);
