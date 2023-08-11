import { MantineReactTable } from 'mantine-react-table';
import { useMemo } from 'react';

export const DataTable = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'permitissuedate',
        header: 'Date issued',
        size: 50,
        Cell: ({ cell }) => {
          const value = cell.getValue();
          const dateObj = new Date(value);

          const readableDate = dateObj.toLocaleDateString('en-EN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });

          
          return readableDate;
        },
      },
      {
        accessorKey: 'address',
        header: 'Address',
        size: 50,
      },
      {
        accessorKey: 'zip',
        header: 'Zip',
        size: 50,
      },
      {
        accessorKey: 'commercialorresidential',
        header: 'Property Type',
        size: 50,
      },
      {
        accessorKey: 'opa_owner',
        header: 'Owner',
        size: 50,
      },
      {
        accessorKey: 'permittype',
        header: 'Permit type',
        size: 50,
      },
      {
        accessorKey: 'permitdescription',
        header: 'Description of work',
        size: 50,
      },
      {
        accessorKey: 'contractorname',
        header: 'Contractor',
        size: 50,
      },
      {
        accessorKey: 'contractoraddress1',
        header: 'Contractor Address',
        size: 50,
      },
      {
        accessorKey: 'typeofwork',
        header: 'Type of work',
        size: 50,
      },
      {
        accessorKey: 'approvedscopeofwork',
        header: 'Approved Scope of Work',
        size: 50,
        Cell: ({ cell }) => {
          const value = cell.getValue();
          return <span>{value?.length < 50 ? value : `${value.slice(0, 50)}...`}</span>;
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 50,
      },
    ],
    []
  );

  return (
    <MantineReactTable
      className="wrap-text-table"
      columns={columns}
      enableColumnActions={false}
      data={data}
      enablePagination={false}
      initialState={{ density: 'xs' }}
      enableDensityToggle={false}
    />
  );
};
