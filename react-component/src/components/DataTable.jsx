import { MantineReactTable } from 'mantine-react-table';
import { useMemo } from 'react';
import { usersMock } from './usersMock';

export const DataTable = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },
      {
        accessorKey: 'address',
        header: 'Address',
      },
      {
        accessorKey: 'city',
        header: 'City',
      },
      {
        accessorKey: 'state',
        header: 'State',
      },
    ],
    []
  );
  return (
    <MantineReactTable
      columns={columns}
      data={Object.values(usersMock).map((value) => ({
        firstName: value.firstName,
        lastName: value.lastName,
        address: value.address,
        city: value.city,
        state: value.state,
      }))}
      mantinePaperProps={{ shadow: '0', withBorder: false }}
    />
  );
};
