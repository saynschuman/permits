import { MantineReactTable } from 'mantine-react-table';
import { useMemo, useState, useEffect } from 'react';
import moment from 'moment';
import { Select } from '@mantine/core';
import Sliced from './Sliced';
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
        sortMethod: (a, b) => {
          const timestampA = moment(a).valueOf();
          const timestampB = moment(b).valueOf();
          return timestampA - timestampB;
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
        size: 350,
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
        size: 350,
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
        size: 200,
        Cell: ({ cell }) => {
          const value = cell.getValue();
          return (
            <Sliced
              text={`${value}, \n \n ${cell.row.original.approvedscopeofwork}`}
              maxLength={50}
            />
          );
        },
      },
      {
        accessorKey: 'approvedscopeofwork',
        header: 'Approved Scope of Work',
        size: 200,
        Cell: ({ cell }) => {
          const value = cell.getValue();

          return <Sliced text={value} maxLength={50} />;
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
