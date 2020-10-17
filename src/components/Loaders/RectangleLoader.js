import ContentLoader from 'react-content-loader';
import React from 'react';

export const RectangleLoader = (props) => (
  <ContentLoader
    speed={2}
    width={200}
    height={50}
    viewBox='0 0 200 50'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
    {...props}
  >
    <rect x='20' y='6' rx='10' ry='10' width='166' height='35' />
  </ContentLoader>
);
