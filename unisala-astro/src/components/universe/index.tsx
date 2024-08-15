import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface Article {
  postText: string;
  user: {
    firstName: string;
    lastName: string;
    picture: string | null;
  };
}

interface MediumFeedProps {
  articles: Article[];
  staffPicks: any[];
  topics: string[];
}

const MediumFeed: React.FC<MediumFeedProps> = ({ articles, staffPicks, topics }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState(articles);

  useEffect(() => {
    const searchInput = document.getElementById('search-input') as HTMLInputElement;
    searchInput.addEventListener('input', handleSearch);

    return () => {
      searchInput.removeEventListener('input', handleSearch);
    };
  }, []);

  const handleSearch = (event: Event) => {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      const filtered = articles.filter(article =>
        article.postText.toLowerCase().includes(query)
      );
      setFilteredArticles(filtered);
    } else {
      setFilteredArticles(articles);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Articles</h2>
          {filteredArticles.map((article, index) => (
            <Card key={index} className="mb-4">
              <CardContent>
                <h3 className="text-xl font-semibold mb-2">
                  {article.postText.replace(/<[^>]*>/g, '').substring(0, 100)}...
                </h3>
                <p className="text-gray-600">
                  {article.user.firstName} {article.user.lastName}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Staff Picks</h2>
          {staffPicks.map((pick, index) => (
            <Card key={index} className="mb-4">
              <CardContent>
                <h3 className="text-lg font-semibold mb-2">{pick.title}</h3>
                <p className="text-gray-600">
                  {pick.user.firstName} {pick.user.lastName}
                </p>
              </CardContent>
            </Card>
          ))}
          <h2 className="text-2xl font-bold mt-8 mb-4">Topics</h2>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic, index) => (
              <span key={index} className="bg-gray-200 rounded-full px-3 py-1 text-sm">
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediumFeed;