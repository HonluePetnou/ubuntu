import CountryTemplate from '../templates/CountryTemplate';
import CountryDetails from '../data/countryDetails';

/**
 * Page spécifique pour le Kenya utilisant le template
 * Design moderne avec hero section
 */
export default function KenyaPage() {
  // Données spécifiques au Kenya
  const kenyaData = CountryDetails.KE;
  
  // Configuration du thème Kenya (couleurs du drapeau)
  const theme = {
    primaryColor: '#000000', // Noir du drapeau
    secondaryColor: '#CE1126', // Rouge du drapeau
    accentColor: '#006B3F' // Vert du drapeau
  };
  
  return (
    <CountryTemplate
      countryData={kenyaData}
      countryCode="KE"
      theme={theme}
    />
  );
}