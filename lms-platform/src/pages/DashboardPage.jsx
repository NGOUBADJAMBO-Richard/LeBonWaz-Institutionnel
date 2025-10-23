import React from 'react';

const DashboardPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Tableau de bord</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">Stat 1</div>
        <div className="card">Stat 2</div>
        <div className="card">Stat 3</div>
      </div>
    </div>
  );
};

export default DashboardPage;
