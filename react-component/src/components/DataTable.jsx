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
        Cell: ({ cell }) => {
          const value = cell.getValue();
          return `${value || ''}, ${cell.row.original.zip?.split('-')[0] || ''}`;
        },
      },
      {
        accessorKey: 'zip',
        header: 'Zip',
      },
      {
        accessorKey: 'commercialorresidential',
        header: 'Property Type',
      },
      {
        accessorKey: 'opa_owner',
        header: 'Owner',
      },
      {
        accessorKey: 'permittype',
        header: 'Permit type',
        Cell: ({ cell }) => {
          console.log(cell.row.original);
          const value = cell.getValue();
          return `${value || ''}, ${cell.row.original.permitdescription || ''}`;
        },
      },
      {
        accessorKey: 'typeofwork',
        header: 'Type of work',
      },
      {
        accessorKey: 'approvedscopeofwork',
        header: 'Description of work',
      },
      {
        accessorKey: 'contractorname',
        header: 'Contractor',
        Cell: ({ cell }) => {
          const value = cell.getValue();
          return `${value || ''}, ${cell.row.original.contractoraddress1 || ''}`;
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
      },
    ],
    []
  );

  const uniqueStatuses = useMemo(() => {
    const allStatuses = data.map((item) => item.status);
    return ['ALL', ...new Set(allStatuses)];
  }, [data]);

  const statusOptions = useMemo(() => {
    return uniqueStatuses.map((status) => ({ value: status, label: status }));
  }, [uniqueStatuses]);

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
            data={statusOptions}
            value={statusFilter}
            onChange={(value) => setStatusFilter(value)}
          />
        </div>
      </div>
      <MantineReactTable
        columns={columns}
        columnResizeMode="onEnd"
        enableColumnActions={false}
        data={filteredData}
        enablePagination={false}
        initialState={{ density: 'xs' }}
        enableDensityToggle={false}
        enableColumnResizing={true}
        // TODO: implement this settings save localStorage
        // onColumnVisibilityChange={(data) => console.log(data())}
      />
    </div>
  );
};
