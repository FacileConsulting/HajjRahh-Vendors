import React from 'react';

// Dynamically import all components in the components directory
const components = { 
  Dashboard: React.lazy(() => import('../pages/Dashboard')),
  PackageManagementNew: React.lazy(() => import('../pages/PackageManagementNew')),
  PilgrimageBookingNew: React.lazy(() => import('../pages/PilgrimageBookingNew')),
  PilgrimageBookingList: React.lazy(() => import('../pages/PilgrimageBookingList')),
  PackageManagementList: React.lazy(() => import('../pages/PackageManagementList')),
  PilgrimageBookingView: React.lazy(() => import('../pages/PilgrimageBookingView')),
  PackageManagementView: React.lazy(() => import('../pages/PackageManagementView')),
  HotelProfileManagementList: React.lazy(() => import('../pages/HotelProfileManagementList')),
};

const PageRenderer = ({ componentName, data }) => {
  console.log('#@#@#@#@#@#', componentName, data);
  const Component = components[componentName];

  if (!Component) return <div>Component not found</div>;

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Component obj={data} />
    </React.Suspense>
  );
};

export default PageRenderer;
