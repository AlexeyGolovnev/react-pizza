import ContentLoader from 'react-content-loader';
import React from 'react';

export const PizzaItemLoader = (props) => (
  <ContentLoader
    speed={2}
    width={320}
    height={560}
    viewBox='0 0 320 560'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
    {...props}
  >
    <rect x='26' y='393' rx='10' ry='10' width='106' height='29' />
    <rect x='55' y='275' rx='10' ry='10' width='180' height='33' />
    <rect x='55' y='231' rx='10' ry='10' width='179' height='33' />
    <rect x='22' y='322' rx='10' ry='10' width='247' height='57' />
    <circle cx='142' cy='116' r='101' />
    <rect x='163' y='393' rx='10' ry='10' width='106' height='29' />
  </ContentLoader>
);
