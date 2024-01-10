// List of appointments for a patient. It also has a button to create a new appointment which opens a modal to create it.
import TableList from '@/components/Appointments/TableList';
import { Card, Button } from 'react-bootstrap';
import { graphql, useFragment } from 'react-relay';
import type { Appointments_patient$key } from './__generated__/Appointments_patient.graphql';

type Props = {
  patient: Appointments_patient$key;
};

export default function Appointments(props: Props) {
  const data = useFragment(
    graphql`
      fragment Appointments_patient on Patient {
        appointments {
          id
          patientId
        }
      }
    `,
    props.patient,
  );

  console.log('Appointments', data);
  return (
    <>
      <Card>
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center">
            <Card.Title>My appointments</Card.Title>
            <Button variant="primary">New appointment</Button>
          </div>
        </Card.Header>
      </Card>
      <br />
      <TableList />
    </>
  );
}
