import React from 'react';

// Dynamically import all components in the components directory
const components = { 
  PackageManagementNew: React.lazy(() => import('../../pages/vendors/PackageManagementNew')),
  PilgrimageBookingNew: React.lazy(() => import('../../pages/vendors/PilgrimageBookingNew')),
  PilgrimageBookingList: React.lazy(() => import('../../pages/vendors/PilgrimageBookingList')),
  PackageManagementList: React.lazy(() => import('../../pages/vendors/PackageManagementList')),
  PilgrimageBookingView: React.lazy(() => import('../../pages/vendors/PilgrimageBookingView')),
  PackageManagementView: React.lazy(() => import('../../pages/vendors/PackageManagementView')),
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
