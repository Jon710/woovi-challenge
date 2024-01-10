import { hashSync, compareSync } from 'bcryptjs';
import { Schema, model, Document, Types } from 'mongoose';

interface IDoctor {
  _id: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  password: string;
  appointments: Types.ObjectId[];
  encryptPassword: (password: string) => string;
  authenticate: (plainTextPassword: string) => boolean;
}

type DoctorDocument = Document & IDoctor;

const DoctorSchema = new Schema<DoctorDocument>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      hidden: true,
      required: true,
    },
    appointments: {
      type: [Types.ObjectId],
      ref: 'Appointment',
    },
  },
  {
    collection: 'Doctor',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);

DoctorSchema.methods = {
  authenticate(plainTextPassword: string) {
    return compareSync(plainTextPassword, this.password);
  },

  encryptPassword(password: string) {
    return hashSync(password);
  },
};

DoctorSchema.pre('save', function encryptPasswordHook(next) {
  if (this.isModified('password')) {
    this.password = this.encryptPassword(this.password);
  }

  return next();
});

const DoctorModel = model<DoctorDocument>('Doctor', DoctorSchema);

export type { DoctorDocument };
export { DoctorModel };
