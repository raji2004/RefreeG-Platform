const Updates: React.FC = () => {
  return (
    <div className="w-full px-4 py-8">
      <h2 className="text-lg font-semibold text-center mb-6">
        There are no updates on this cause yet!
      </h2>
      <div className="flex justify-center items-center">
        <div className="w-full md:w-1/2 p-4 border rounded-md shadow-md">
          <p className="text-center text-sm text-gray-700 mb-4">
            Latest Updates: Stay Connected to the Impact
          </p>
          <button className="w-full py-2 text-center text-blue-500 hover:underline">
            Learn more &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Updates;
