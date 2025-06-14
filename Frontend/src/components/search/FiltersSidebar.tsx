import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Filter, MapPin } from 'lucide-react';
import { FilterState } from '../../types';
import Button from '../common/Button';
import Input from '../common/Input';

interface FiltersSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  isOpen: boolean;
  onClose: () => void;
}

const FiltersSidebar: React.FC<FiltersSidebarProps> = ({
  filters,
  onFiltersChange,
  isOpen,
  onClose
}) => {
  const [isGpsLoading, setIsGpsLoading] = useState(false);

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleUseCurrentLocation = () => {
    setIsGpsLoading(true);
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      setIsGpsLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Coordinates:", position.coords.latitude, position.coords.longitude);
        alert("Location accessed! For now, we'll search for 'Bangalore'.");
        handleFilterChange('locationQuery', 'Bangalore');
        setIsGpsLoading(false);
      },
      () => {
        alert('Unable to retrieve your location.');
        setIsGpsLoading(false);
      }
    );
  };

  const clearFilters = () => {
    onFiltersChange({
      domain: 'All Domains', skills: [],
      locationType: 'any', locationQuery: '',
      duration: 'All Durations', sortBy: 'recent',
      searchQuery: filters.searchQuery
    });
  };
  
  const domains = ['All Domains', 'Software Development', 'Data Science', 'Design', 'Marketing', 'Sales', 'Finance', 'Human Resources', 'Content Writing', 'Business Development', 'Product Management', 'Research'];
  const durations = ['All Durations', '1-2 months', '3-4 months', '5-6 months', '6+ months', 'Part-time', 'Full-time'];

  return (
    <>
      {/* --- FIX: Mobile backdrop is now separate from the main component --- */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" onClick={onClose} />}

      {/* --- FIX: The main component is now 'aside' for better semantics --- */}
      <motion.aside
        initial={{ x: '-100%' }}
        animate={{ x: isOpen ? '0%' : '-100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        // This className handles both mobile (fixed) and desktop (relative) states
        className="fixed left-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl z-40 lg:relative lg:shadow-none lg:translate-x-0 lg:h-auto lg:z-auto"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <Filter className="h-5 w-5 mr-2" /> Filters
            </h2>
            <button onClick={onClose} className="p-2 rounded-md text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"><X className="h-5 w-5" /></button>
            <Button variant="ghost" size="sm" onClick={clearFilters} className="hidden lg:inline-flex">Clear all</Button>
        </div>

        <div className="p-6 overflow-y-auto h-[calc(100vh-80px)] lg:h-auto">
          <div className="space-y-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location Type</label>
              <div className="grid grid-cols-3 gap-2">
                {(['any', 'remote', 'hybrid', 'onsite'] as const).map(type => (
                  <Button key={type} variant={filters.locationType === type ? 'primary' : 'outline'} onClick={() => handleFilterChange('locationType', type)} className="capitalize text-xs !px-2">
                    {type}
                  </Button>
                ))}
              </div>
              <Input
                label="City or Country" type="text" placeholder="e.g., Bangalore, USA"
                value={filters.locationQuery} onChange={(e) => handleFilterChange('locationQuery', e.target.value)}
                fullWidth className="mt-4"
              />
              <Button onClick={handleUseCurrentLocation} loading={isGpsLoading} variant="ghost" fullWidth className="mt-2 text-primary-600 dark:text-primary-400">
                <MapPin className="h-4 w-4 mr-2" /> Use my current location
              </Button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Domain</label>
              <select value={filters.domain} onChange={(e) => handleFilterChange('domain', e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                {domains.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Duration</label>
              <select value={filters.duration} onChange={(e) => handleFilterChange('duration', e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                {durations.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sort By</label>
              <select value={filters.sortBy} onChange={(e) => handleFilterChange('sortBy', e.target.value as FilterState['sortBy'])} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                <option value="recent">Most Recent</option>
                <option value="stipend">Highest Stipend</option>
                <option value="deadline">Application Deadline</option>
              </select>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default FiltersSidebar;
