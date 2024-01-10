import { Table, Container } from 'react-bootstrap';

export default function TableList() {
  console.log('TableList');
  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Time</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>2022-10-10</td>
            <td>10:00 AM</td>
            <td>Room A</td>
          </tr>
          <tr>
            <td>2</td>
            <td>2022-10-11</td>
            <td>2:30 PM</td>
            <td>Room B</td>
          </tr>
          <tr>
            <td>3</td>
            <td>2022-10-12</td>
            <td>9:15 AM</td>
            <td>Room C</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}
