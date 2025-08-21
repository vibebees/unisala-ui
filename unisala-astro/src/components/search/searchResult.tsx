import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

const SearchResultsPage = () => {
  const tabs = [
    { value: 'stories', label: 'Stories' },
    { value: 'people', label: 'People' },
    { value: 'publications', label: 'Publications' },
    { value: 'topics', label: 'Topics' },
    { value: 'lists', label: 'Lists' }
  ];

  const topics = [
    'Deep Learning',
    'Deep Learning Framework',
    'Deep Learning Course',
    'Deep Learning Project',
    'Deep Learning Models',
    'Deep Learning Book'
  ];

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4">
      {/* Hero Section */}
      <div className="py-8">
        <div className="relative w-full h-64 bg-purple-50 rounded-2xl overflow-hidden mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src="/api/placeholder/400/320" 
              alt="Search Hero" 
              className="w-1/2 h-auto object-cover"
            />
          </div>
        </div>
      </div>

      {/* Search Results Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Results for <span className="text-black">search term</span>
        </h1>
      </div>

      {/* Navigation Tabs */}
      <Tabs defaultValue="stories" className="mb-8">
        <TabsList className="border-b border-gray-200 w-full justify-start">
          {tabs.map((tab) => (
            <TabsTrigger 
              key={tab.value} 
              value={tab.value}
              className="px-4 py-2 text-sm"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Results */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search Results */}
          <div className="space-y-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0" />
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg mb-1">Result Title</h3>
                  <p className="text-gray-600 text-sm mb-2">Description text goes here...</p>
                  <Button variant="outline" size="sm">Follow</Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Topics & Related */}
        <div className="space-y-8">
          {/* Topics Section */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-4">Topics matching search term</h3>
            <div className="flex flex-wrap gap-2">
              {topics.map((topic) => (
                <Button 
                  key={topic} 
                  variant="outline" 
                  size="sm"
                  className="bg-white hover:bg-gray-50"
                >
                  {topic}
                </Button>
              ))}
            </div>
            <Button variant="link" className="mt-4 text-green-600">
              See all
            </Button>
          </div>

          {/* Publications Section */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-4">Publications matching search term</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-gray-200" />
                  <div className="flex-grow">
                    <p className="font-medium">Publication Name</p>
                  </div>
                  <Button variant="outline" size="sm">Follow</Button>
                </div>
              ))}
            </div>
            <Button variant="link" className="mt-4 text-green-600">
              See all
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;