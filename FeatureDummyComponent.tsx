import React, { useContext } from 'react';
import { FeatureFlag } from './FeatureContext';

function FeatureDummyComponent() {
  const { feature, isLoading, error } = useContext(FeatureFlag);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <FeatureComponent featured={"googlePay"}>Google</FeatureComponent>
      <FeatureComponent featured={"ApplePay"}>Apple</FeatureComponent>
    </>
  );
}

const FeatureComponent = ({ featured, children }) => {
  const { feature } = useContext(FeatureFlag);

  return feature[featured] ? children : null; // Show feature if enabled
};

export default FeatureDummyComponent;



// import React, { useContext, useEffect } from 'react';
// import { FeatureFlag } from './FeatureContext';

// function FeatureDummyComponent() {
//   const { feature, isLoading, error, fetchFeatures } = useContext(FeatureFlag);

//   // Simulate multiple components making the call
//   useEffect(() => {
//     setTimeout(() => {
//       console.log("Component 1 calling fetchFeatures");
//       fetchFeatures(); // First call
//     }, 100);

//     setTimeout(() => {
//       console.log("Component 2 calling fetchFeatures");
//       fetchFeatures(); // Second call, should not trigger a new network request
//     }, 300);

//     setTimeout(() => {
//       console.log("Component 3 calling fetchFeatures");
//       fetchFeatures(); // Third call, should also not trigger a new network request
//     }, 500);
//   }, [fetchFeatures]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <>
//       <div>Google Pay is {feature.googlePay ? 'Enabled' : 'Disabled'}</div>
//       <div>Apple Pay is {feature.ApplePay ? 'Enabled' : 'Disabled'}</div>
//     </>
//   );
// }

// export default FeatureDummyComponent;
