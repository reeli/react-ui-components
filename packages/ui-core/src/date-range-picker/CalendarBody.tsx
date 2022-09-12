import { Month } from "./Month";

export function CalendarBody({
  month,
  year,
  onClick,
  startDate,
  endDate,
}: {
  month: number;
  year: number;
  onClick: (value?: Date) => void;
  startDate: Date | null;
  endDate: Date | null;
}) {
  return (
    <table css={{ border: "1px solid #ccc" }}>
      <thead>
        <tr>
          <th>Su</th>
          <th>Mo</th>
          <th>Tu</th>
          <th>We</th>
          <th>Th</th>
          <th>Fr</th>
          <th>Sa</th>
        </tr>
      </thead>
      <tbody>
        <Month month={month} year={year} onClick={onClick} startDate={startDate} endDate={endDate} />
      </tbody>
    </table>
  );
}
