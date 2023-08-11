import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DataTable } from './components/DataTable';

import { firestore } from './config';
import { collection, query, where, getDocs } from 'firebase/firestore';

const getPermitsByZipCodeAndDate = async (zipCode, date) => {
  try {
    const collRef = collection(firestore, zipCode);
    const q = query(collRef, where('permitissuedate', '==', date));
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

  const zipCode = queryParams.get('zip_code');
  const daysBack = queryParams.get('days_back');

  useEffect(() => {
    const fetchData = async () => {
      const res = await getPermitsByZipCodeAndDate(zipCode, '2019-08-14T08:26:27Z');
      setData(res);
    };

    fetchData();
  }, []);

  console.log(data, zipCode, daysBack);

  return <DataTable />;
}
