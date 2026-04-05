import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IApplication extends Document {
  internshipId: Types.ObjectId;
  studentId: Types.ObjectId;
  status: 'applied' | 'shortlisted' | 'rejected' | 'accepted';
  appliedAt: Date;
  resume?: string;
  coverLetter?: string;
  matchScore?: number;
  feedback?: string;
  updatedAt: Date;
}

const applicationSchema = new Schema<IApplication>(
  {
    internshipId: {
      type: Schema.Types.ObjectId,
      ref: 'Internship',
      required: true,
    },
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    status: {
      type: String,
      enum: ['applied', 'shortlisted', 'rejected', 'accepted'],
      default: 'applied',
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
    resume: String,
    coverLetter: String,
    matchScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    feedback: String,
  },
  { timestamps: true }
);

export const Application =
  mongoose.models.Application || mongoose.model<IApplication>('Application', applicationSchema);
