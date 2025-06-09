import React from 'react';
import { useParams } from 'react-router-dom';
import CountryTemplate from '../templates/CountryTemplate';
import CountryDetails from '../data/countryDetails';

export default function CountryPage() {
  const { countryCode } = useParams();

  return (
    <CountryTemplate 
      countryData={CountryDetails[countryCode?.toUpperCase()]} 
      sections={['hero', 'overview', 'culture', 'gastronomy', 'geography']}
    />
  );
}