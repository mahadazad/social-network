// @flow
import * as React from 'react';

type svgProps = {
  viewBox: string,
  width?: string,
  height?: string,
  className?: string,
};

const svg = ({ viewBox, width, height, className }: svgProps) => (Graphics: React.Node) => (
  <svg viewBox={viewBox} width={width} height={height} className={className} xmlns="http://www.w3.org/2000/svg">
    {Graphics}
  </svg>
);

export default svg;
