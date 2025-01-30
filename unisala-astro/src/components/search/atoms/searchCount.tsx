export const ResultCount = ({ count }: { count: number }) => (
    <div className="text-sm text-gray-500 dark:text-gray-400">
      {count.toLocaleString()} results
    </div>
  );