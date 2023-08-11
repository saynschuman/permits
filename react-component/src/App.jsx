import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DataTable } from './components/DataTable';
import { firestore } from './config';
import { collection, query, where, getDocs } from 'firebase/firestore';

const getPermitsByZipCodeAndDateRange = async (zipCode, startDate, endDate) => {
  try {
    const collRef = collection(firestore, zipCode);
    const q = query(
      collRef,
      where('permitissuedate', '>=', startDate),
      where('permitissuedate', '<=', endDate)
    );
    const querySnapshot = await getDocs(q);

    const results = [];
    querySnapshot.forEach((doc) => {
      results.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return results;
  } catch (error) {
    console.error('Error fetching permits:', error);
    return [];
  }
};

export default function DashboardLayout() {
  const [data, setData] = useState([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const zipCodesString = queryParams.get('zip_codes');
  const zipCodes = zipCodesString ? zipCodesString.split(',') : [];

  const daysBack = parseInt(queryParams.get('days_back'));

  const endDate = new Date().toISOString();
  const daysBackInt = parseInt(daysBack, 10);

  if (isNaN(daysBackInt)) {
    console.error('Invalid daysBack value:', daysBack);
    return <>hello</>;
  }

  const startDate = new Date(Date.now() - daysBackInt * 24 * 60 * 60 * 1000).toISOString();

  useEffect(() => {
    const fetchData = async () => {
      const allResults = [];
      for (const zip of zipCodes) {
        const res = await getPermitsByZipCodeAndDateRange(zip, startDate, endDate);
        allResults.push(...res);
      }
      setData(allResults);
    };

    fetchData();
  }, [zipCodes, startDate, endDate]);

  return <DataTable data={data} />;
}
