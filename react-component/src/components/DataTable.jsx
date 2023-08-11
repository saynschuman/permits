import { MantineReactTable } from 'mantine-react-table';
import { useMemo, useState, useEffect } from 'react';
import moment from 'moment';
import { Select } from '@mantine/core';
moment.locale('ru'); // Устанавливаем локализацию на русский язык

export const DataTable = ({ data }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [propertyType, setPropertyType] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    let result = [...data];

    if (propertyType !== 'ALL') {
      result = result.filter((item) => item.commercialorresidential === propertyType);
    }

    if (statusFilter !== 'ALL') {
      result = result.filter((item) => item.status === statusFilter);
    }

    setFilteredData(result);
  }, [data, propertyType, statusFilter]);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'permitissuedate',
        header: 'Date issued',
        size: 50,
        Cell: ({ cell }) => {
          const value = cell.getValue();
          return moment(value).format('MM/DD/YYYY');
        },
      },
      {
        accessorKey: 'address',
        header: 'Address',
        size: 50,
        Cell: ({ cell }) => {
          const value = cell.getValue();
          return `${value} ${cell.row.original.zip}`;
        },
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
        Cell: ({ cell }) => {
          const value = cell.getValue();
          return `${value}, ${cell.row.original.permitdescription}`;
        },
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
        Cell: ({ cell }) => {
          const value = cell.getValue();
          return `${value}, ${cell.row.original.contractoraddress1}`;
        },
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
        Cell: ({ cell }) => {
          const value = cell.getValue();
          return `${value}, \n \n ${cell.row.original.approvedscopeofwork?.slice(0, 25)}...`;
        },
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
    <div
      style={{
        padding: 20,
      }}
    >
      <div
        style={{
          display: 'flex',
          marginBottom: '20px',
        }}
      >
        <div style={{ maxWidth: '300px' }}>
          <Select
            style={{ marginRight: 10 }}
            label="Filter by Property Type"
            data={[
              { value: 'ALL', label: 'All' },
              { value: 'RESIDENTIAL', label: 'Residential' },
              { value: 'COMMERCIAL', label: 'Commercial' },
            ]}
            value={propertyType}
            onChange={(value) => setPropertyType(value)}
            fullWidth
          />
        </div>
        <div style={{ maxWidth: '300px' }}>
          <Select
            label="Filter by Status"
            data={[
              { value: 'ALL', label: 'All' },
              { value: 'ISSUED', label: 'Issued' },
              { value: 'COMPLETED', label: 'Completed' },
            ]}
            value={statusFilter}
            onChange={(value) => setStatusFilter(value)}
            fullWidth
          />
        </div>
      </div>
      <MantineReactTable
        columns={columns}
        enableColumnActions={false}
        data={filteredData}
        enablePagination={false}
        initialState={{ density: 'xs' }}
        enableDensityToggle={false}
      />
    </div>
  );
};
