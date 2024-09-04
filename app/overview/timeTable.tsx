import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "../../components/ui/table";

export default function Timetable() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Employee</TableCell>
          <TableCell>Monday</TableCell>
          <TableCell>Tuesday</TableCell>
          <TableCell>Wednesday</TableCell>
          <TableCell>Thursday</TableCell>
          <TableCell>Friday</TableCell>
          <TableCell>Saturday</TableCell>
          <TableCell>Sunday</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{/* Rows for each employee and shifts */}</TableBody>
    </Table>
  );
}
