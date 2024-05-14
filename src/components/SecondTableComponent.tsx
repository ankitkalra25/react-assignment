import { Table, ScrollArea } from '@mantine/core';
function SecondComponent({ RowTwo, aggregateAverageData }: {
  RowTwo: { label: string, name: string }[],
  aggregateAverageData: { crop: string, avg_yield: string, avg_cult: string }[]
}) {
  const rows = aggregateAverageData.map((element: any) => (
    <Table.Tr key={element.crop}>
      <Table.Td>{element.crop}</Table.Td>
      <Table.Td>{element.avg_yield}</Table.Td>
      <Table.Td>{element.avg_cult}</Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea h={330}>
    <Table stickyHeader striped highlightOnHover withTableBorder withColumnBorders>
      <Table.Thead>

        <Table.Tr>
          {RowTwo.map((item) => (
            <Table.Th key={item.name}>{item.label}</Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
    </ScrollArea>
  );
}
export default SecondComponent