import { hashSync, compareSync } from "bcryptjs";
import { Schema, model, Document, Types } from "mongoose";

interface IPatient {
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

// https://github.com/Automattic/mongoose/issues/11615
type PatientDocument = Document & IPatient;

const PatientSchema = new Schema<PatientDocument>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, hidden: true, required: true },
    appointments: { type: [Types.ObjectId], ref: "Appointment" },
  },
  {
    collection: "Patient",
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

PatientSchema.methods = {
  authenticate(plainTextPassword: string) {
    return compareSync(plainTextPassword, this.password);
  },

  encryptPassword(password: string) {
    return hashSync(password);
  },
};

PatientSchema.pre("save", function encryptPasswordHook(next) {
  if (this.isModified("password")) {
    this.password = this.encryptPassword(this.password);
  }

  return next();
});

const PatientModel = model<PatientDocument>("Patient", PatientSchema);

export type { PatientDocument };
export { PatientModel };
