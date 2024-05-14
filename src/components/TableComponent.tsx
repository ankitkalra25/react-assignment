import { Table, ScrollArea } from '@mantine/core';
function TableComponent({ RowOne, aggregateData }: {
  RowOne: { label: string, name: string }[],
  aggregateData: { max_crop: number, min_crop: number, year: Number }[]
}) {
  
  const rows = aggregateData.map((element: any) => (
    <Table.Tr key={element.year}>
      <Table.Td>{element.year}</Table.Td>
      <Table.Td>{element.max_crop}</Table.Td>
      <Table.Td>{element.min_crop}</Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea h={330}>
    <Table stickyHeader h={50} striped highlightOnHover withTableBorder withColumnBorders>
      <Table.Thead>

        <Table.Tr>
          {RowOne.map((item) => (
            <Table.Th key={item.name}>{item.label}</Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
    </ScrollArea>
  );
}
export default TableComponent