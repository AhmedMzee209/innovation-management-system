export const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">401</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">Unauthorized access</p>
    </div>
  );
};
