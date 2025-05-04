import { useState, useEffect } from 'react';
import { X, Search, MapPin } from 'lucide-react';
import { useLocation as useLocationContext } from '../context/LocationContext';
import { LocationData } from '../types';

const mockLocations: LocationData[] = [
  {
    id: '1',
    address: 'HSR Layout, Bengaluru',
    fullAddress: '1st Main, HSR Layout, Bengaluru, Karnataka 560102',
    lat: 12.9141,
    lng: 77.6806,
  },
  {
    id: '2',
    address: 'Indiranagar, Bengaluru',
    fullAddress: '12th Main, Indiranagar, Bengaluru, Karnataka 560038',
    lat: 12.9784,
    lng: 77.6408,
  },
  {
    id: '3',
    address: 'Koramangala, Bengaluru',
    fullAddress: '7th Block, Koramangala, Bengaluru, Karnataka 560095',
    lat: 12.9279,
    lng: 77.6271,
  },
];

type LocationSelectorProps = {
  onClose: () => void;
};

const LocationSelector = ({ onClose }: LocationSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<LocationData[]>([]);
  const [recentLocations, setRecentLocations] = useState<LocationData[]>([]);
  const { setLocation, currentLocation } = useLocationContext();

  useEffect(() => {
    // Load recent locations from localStorage
    const savedLocations = localStorage.getItem('recentLocations');
    if (savedLocations) {
      setRecentLocations(JSON.parse(savedLocations));
    }

    // Focus the search input
    const searchInput = document.getElementById('location-search');
    if (searchInput) {
      searchInput.focus();
    }

    // Handle outside click
    const handleOutsideClick = (e: MouseEvent) => {
      const modal = document.getElementById('location-modal');
      if (modal && !modal.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [onClose]);

  useEffect(() => {
    // Simple search implementation
    if (searchQuery.trim() === '') {
      setSearchResults([]);
    } else {
      const query = searchQuery.toLowerCase();
      const results = mockLocations.filter(
        (location) =>
          location.address.toLowerCase().includes(query) ||
          location.fullAddress.toLowerCase().includes(query)
      );
      setSearchResults(results);
    }
  }, [searchQuery]);

  const handleSelectLocation = (location: LocationData) => {
    setLocation(location);

    // Add to recent locations
    const updatedRecentLocations = [
      location,
      ...recentLocations.filter((loc) => loc.id !== location.id),
    ].slice(0, 3);

    setRecentLocations(updatedRecentLocations);
    localStorage.setItem('recentLocations', JSON.stringify(updatedRecentLocations));

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div
        id="location-modal"
        className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Choose delivery location</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              id="location-search"
              type="text"
              placeholder="Search for area, street name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button 
            className="mt-3 flex items-center justify-center w-full py-2.5 bg-primary rounded-md text-black font-medium"
          >
            <MapPin size={18} className="mr-2" />
            Use current location
          </button>
        </div>

        {/* Results */}
        <div className="overflow-y-auto flex-grow">
          {searchResults.length > 0 && (
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">SEARCH RESULTS</h3>
              <ul className="space-y-3">
                {searchResults.map((location) => (
                  <li key={location.id}>
                    <button
                      onClick={() => handleSelectLocation(location)}
                      className="w-full flex items-start p-2 hover:bg-gray-50 rounded-md text-left"
                    >
                      <MapPin size={18} className="text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-sm">{location.address}</p>
                        <p className="text-xs text-gray-500">{location.fullAddress}</p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {searchQuery.trim() === '' && recentLocations.length > 0 && (
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">RECENT LOCATIONS</h3>
              <ul className="space-y-3">
                {recentLocations.map((location) => (
                  <li key={location.id}>
                    <button
                      onClick={() => handleSelectLocation(location)}
                      className="w-full flex items-start p-2 hover:bg-gray-50 rounded-md text-left"
                    >
                      <MapPin size={18} className="text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-sm">{location.address}</p>
                        <p className="text-xs text-gray-500">{location.fullAddress}</p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {searchQuery.trim() !== '' && searchResults.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-gray-500">No locations found matching "{searchQuery}"</p>
              <p className="text-sm text-gray-400 mt-1">
                Try searching with a different area or street name
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationSelector;