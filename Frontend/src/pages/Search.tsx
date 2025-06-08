import React, { useState, useEffect } from 'react';
import { mockInternships } from '../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { Internship, FilterState } from '../types';
import FiltersSidebar from '../components/search/FiltersSidebar';
import InternshipCard from '../components/internships/InternshipCard';
import SkeletonLoader from '../components/common/SkeletonLoader';
import Button from '../components/common/Button';

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [savedInternships, setSavedInternships] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [filters, setFilters] = useState<FilterState>({
    domain: 'All Domains',
    skills: [],
    locationType: 'any',
    locationQuery: searchParams.get('location') || '',
    duration: 'All Durations',
    sortBy: 'recent',
    searchQuery: searchParams.get('q') || '',
  });

  const [internships, setInternships] = useState<Internship[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let filtered = mockInternships;

    if (filters.domain !== 'All Domains') {
      filtered = filtered.filter(internship => internship.domain === filters.domain);
    }
    
    if (filters.locationType !== 'any') {
      filtered = filtered.filter(internship => internship.location.type === filters.locationType);
    }
    if (filters.locationQuery) {
        const query = filters.locationQuery.toLowerCase();
        filtered = filtered.filter(i => 
            i.location.city?.toLowerCase().includes(query) || 
            i.location.country?.toLowerCase().includes(query)
        );
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(internship =>
        internship.title.toLowerCase().includes(query) ||
        internship.company.name.toLowerCase().includes(query) ||
        internship.skills.some(skill => skill.toLowerCase().includes(query))
      );
    }

    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'stipend':
          return (b.stipend?.amount || 0) - (a.stipend?.amount || 0);
        case 'deadline':
          return new Date(a.applicationDeadline).getTime() - new Date(b.applicationDeadline).getTime();
        case 'recent':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    setInternships(filtered);
  }, [filters]);

  const handleSaveInternship = (id: string) => {
    setSavedInternships(prev =>
      prev.includes(id) ? prev.filter(savedId => savedId !== id) : [...prev, id]
    );
  };

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row lg:gap-8">
          
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <FiltersSidebar
              filters={filters}
              onFiltersChange={setFilters}
              isOpen={true}
              onClose={() => {}}
            />
          </aside>

          <main className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Internship Search</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {isLoading ? 'Loading...' : `${internships.length} internships found`}
                </p>
              </div>
              <Button variant="outline" onClick={() => setIsFiltersOpen(true)} className="lg:hidden">
                <SlidersHorizontal className="h-4 w-4 mr-2" /> Filters
              </Button>
            </div>
            
            <AnimatePresence>
              {(filters.domain !== 'All Domains' || filters.locationType !== 'any' || filters.locationQuery || filters.duration !== 'All Durations') && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6 border dark:border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Active Filters</h3>
                    <button onClick={() => setFilters(prev => ({ ...prev, domain: 'All Domains', locationType: 'any', locationQuery: '', duration: 'All Durations' }))}
                      className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
                      Clear filters
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 text-sm">
                    {filters.domain !== 'All Domains' && <span className="filter-tag bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">{filters.domain}</span>}
                    {filters.locationType !== 'any' && <span className="filter-tag bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200 capitalize">{filters.locationType}</span>}
                    {filters.locationQuery && <span className="filter-tag bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200">{filters.locationQuery}</span>}
                    {filters.duration !== 'All Durations' && <span className="filter-tag bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200">{filters.duration}</span>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6"><SkeletonLoader variant="card" count={8} /></div>
            ) : internships.length > 0 ? (
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence>
                  {internships.map((internship) => (
                    <motion.div key={internship.id} variants={itemVariants} layout exit={{ opacity: 0, scale: 0.8 }}>
                      <InternshipCard internship={internship} onSave={handleSaveInternship} isSaved={savedInternships.includes(internship.id)} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div className="text-center py-12" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <div className="text-gray-400 dark:text-gray-500 mb-4"><Filter className="h-12 w-12 mx-auto" /></div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No internships found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Try adjusting your filters or search terms.</p>
                <Button variant="primary" onClick={() => setFilters({ domain: 'All Domains', skills: [], locationType: 'any', locationQuery: '', duration: 'All Durations', sortBy: 'recent', searchQuery: '' })} glow>
                  Clear All Filters
                </Button>
              </motion.div>
            )}
          </main>
        </div>

        <div className="lg:hidden">
          <FiltersSidebar
            filters={filters}
            onFiltersChange={setFilters}
            isOpen={isFiltersOpen}
            onClose={() => setIsFiltersOpen(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
