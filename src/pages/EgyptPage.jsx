import CountryTemplate from '../templates/CountryTemplate';
import CountryDetails from '../data/countryDetails';

/**
 * Page spécifique pour l'Égypte utilisant le template
 * Design moderne avec hero section
 */
export default function EgyptPage() {
  // Données spécifiques à l'Égypte
  const egyptData = CountryDetails.EG;
  
  // Configuration du thème Égypte (couleurs du drapeau)
  const theme = {
    primaryColor: '#CE1126', // Rouge du drapeau
    secondaryColor: '#000000', // Noir du drapeau
    accentColor: '#C09300' // Or (aigle doré)
  };
  
  return (
    <CountryTemplate
      countryData={egyptData}
      countryCode="EG"
      theme={theme}
    />
  );
}