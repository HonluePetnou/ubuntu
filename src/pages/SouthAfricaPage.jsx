import CountryTemplate from '../templates/CountryTemplate';
import CountryDetails from '../data/countryDetails';

/**
 * Page spécifique pour l'Afrique du Sud utilisant le template
 * Design moderne avec hero section
 */
export default function SouthAfricaPage() {
  // Données spécifiques à l'Afrique du Sud
  const southAfricaData = CountryDetails.ZA;
  
  // Configuration du thème Afrique du Sud (couleurs du drapeau)
  const theme = {
    primaryColor: '#007A4D', // Vert du drapeau
    secondaryColor: '#FFB612', // Jaune du drapeau
    accentColor: '#DE3831' // Rouge du drapeau
  };
  
  return (
    <CountryTemplate
      countryData={southAfricaData}
      countryCode="ZA"
      theme={theme}
    />
  );
}