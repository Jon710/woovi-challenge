import { Document, Types, Schema, model } from "mongoose";

export interface Appointment extends Document {
  _id: Types.ObjectId;
  date: string;
  startsAt: string;
  patientId: Types.ObjectId;
  doctorId: Types.ObjectId;
}

export type AppointmentDocument = Document & Appointment;

const AppointmentSchema = new Schema<Appointment>(
  {
    date: { type: String, required: true },
    startsAt: { type: String, required: true },
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
      index: true,
    },
    doctorId: { type: Schema.Types.ObjectId, required: true, ref: "Doctor" },
  },
  {
    collection: "Appointment",
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

export const AppointmentModel = model<AppointmentDocument>(
  "Appointment",
  AppointmentSchema
);
