import { Types } from 'mongoose';
import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { AppointmentModel } from '../../appointment/AppointmentModel';
import { DoctorModel } from '../../doctor/DoctorModel';
import { AppointmentType } from '../../appointment/AppointmentType';
import { GraphQLContext } from '../../../graphql/context';

interface ScheduleAppointmentMutationArgs {
  doctorId: Types.ObjectId;
  startsAt: string;
  date: string;
}

const ScheduleAppointmentMutation = mutationWithClientMutationId({
  name: 'ScheduleAppointmentMutation',
  inputFields: {
    doctorId: { type: new GraphQLNonNull(GraphQLString) },
    startsAt: { type: new GraphQLNonNull(GraphQLString) },
    date: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async (
    args: ScheduleAppointmentMutationArgs,
    ctx: GraphQLContext,
  ) => {
    const { doctorId, startsAt, date } = args;

    // TODO: middleware?
    if (!ctx.user) throw new Error('You are not logged in. Try again!');

    const doctor = await DoctorModel.findById(doctorId);

    if (!doctor) throw new Error("Doctor doesn't exist. Try again.");

    const appointment = new AppointmentModel({
      date,
      startsAt,
      doctorId: doctor._id,
      patientId: ctx?.user._id,
    });

    await Promise.all([
      appointment.save(),
      doctor.updateOne({
        $addToSet: { appointments: [...doctor.appointments, appointment._id] },
      }),
      ctx.user.updateOne({
        $addToSet: {
          appointments: [...(ctx.user.appointments || []), appointment._id],
        },
      }),
    ]);

    return { id: ctx?.user._id, success: 'Appointment has been created!' };
  },
  outputFields: {
    appointment: {
      type: AppointmentType,
      resolve: async ({ id }) => await AppointmentModel.findById(id),
    },
  },
});

export { ScheduleAppointmentMutation };
