import React, { useState, useEffect } from 'react';

interface Draft {
    id: string;
    title: string;
    lastUpdated: number;
}

const DraftsList: React.FC = () => {
    const [drafts, setDrafts] = useState<Draft[]>([]);

    useEffect(() => {
        const storedDrafts = Object.entries(localStorage)
            .filter(([key]) => key.includes('.postTitle'))
            .map(([key, value]) => {
                const [timestamp, field] = key.split('.');
                return {
                    id: timestamp,
                    title: value || 'Untitled',
                    lastUpdated: parseInt(timestamp)
                };
            })
            .sort((a, b) => b.lastUpdated - a.lastUpdated);

        setDrafts(storedDrafts);
    }, []);

    return (
        <ul className="space-y-4">
            {drafts.map((draft) => (
                <li key={draft.id} className="bg-white shadow rounded-lg p-4">
                    <a href={`/new-story?id=${draft.id}`} className="text-xl font-semibold hover:text-blue-600">
                        {draft.title}
                    </a>
                    <p className="text-sm text-gray-500 mt-1">
                        Created: {new Date(parseInt(draft.id)).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                        Last updated: {new Date(draft.lastUpdated).toLocaleString()}
                    </p>
                </li>
            ))}
        </ul>
    );
};

export default DraftsList;