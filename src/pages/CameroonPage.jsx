import React from 'react';
import CountryTemplate from '../templates/CountryTemplate';
import CountryDetails from '../data/countryDetails';

/**
 * Page spécifique pour le Cameroun utilisant le template
 * Design moderne avec hero section
 */
export default function CameroonPage() {
  // Données spécifiques au Cameroun
  const cameroonData = CountryDetails.CM;
  
  return (
    <CountryTemplate
      countryData={cameroonData}
      theme="green"
    />
  );
}