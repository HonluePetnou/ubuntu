import { useState, useEffect } from 'react';
import CountryDetails from '../data/countryDetails';
import CountryDescriptions from '../data/countryDescriptions';

export const useCountryData = (countryCode) => {
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!countryCode) {
      setError('Code pays requis');
      setLoading(false);
      return;
    }

    try {
      const countryData = CountryDetails[countryCode];
      const description = CountryDescriptions[countryCode];
      
      if (!countryData) {
        setError(`Pays non trouvé: ${countryCode}`);
        setLoading(false);
        return;
      }

      setCountry({
        ...countryData,
        description,
        code: countryCode
      });
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des données du pays');
    } finally {
      setLoading(false);
    }
  }, [countryCode]);

  return { country, loading, error };
};

export const useAllCountries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const allCountries = Object.keys(CountryDetails).map(code => ({
        code,
        ...CountryDetails[code],
        description: CountryDescriptions[code]
      }));
      
      setCountries(allCountries);
    } catch (err) {
      console.error('Erreur lors du chargement des pays:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { countries, loading };
};