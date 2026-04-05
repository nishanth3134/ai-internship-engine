import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IStudent extends Document {
  userId: Types.ObjectId;
  resumeUrl?: string;
  bio?: string;
  skills: string[];
  experience: string;
  gpa?: number;
  university?: string;
  degree?: string;
  expectedGraduation?: Date;
  interests: string[];
  preferences: {
    location?: string;
    internshipType?: string;
    duration?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const studentSchema = new Schema<IStudent>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    resumeUrl: String,
    bio: String,
    skills: [String],
    experience: {
      type: String,
      default: 'Beginner',
    },
    gpa: Number,
    university: String,
    degree: String,
    expectedGraduation: Date,
    interests: [String],
    preferences: {
      location: String,
      internshipType: String,
      duration: String,
    },
  },
  { timestamps: true }
);

export const Student =
  mongoose.models.Student || mongoose.model<IStudent>('Student', studentSchema);
