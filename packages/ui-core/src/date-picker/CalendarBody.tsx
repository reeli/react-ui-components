import { Month } from "./Month";

export function CalendarBody({
  month,
  year,
  onSelect,
  selectedValue,
}: {
  month: number;
  year: number;
  onSelect: (value: string | number) => void;
  selectedValue?: string | null;
}) {
  return (
    <table>
      <thead>
        <tr>
          <th>日</th>
          <th>一</th>
          <th>二</th>
          <th>三</th>
          <th>四</th>
          <th>五</th>
          <th>六</th>
        </tr>
      </thead>
      <tbody>
        <Month month={month} year={year} onSelect={onSelect} selectedValue={selectedValue} />
      </tbody>
    </table>
  );
}
