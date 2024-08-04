import React from 'react';

import { ReactComponent as HeartSvg } from './heartIcon.svg';

interface HeartIconProps {
  fill?: string;
  stroke?: string;
  width?: number;
  height?: number;
}

export const HeartIcon: React.FC<HeartIconProps> = ({
  fill = 'none',
  stroke = 'currentColor',
  width = 24,
  height = 24,
}) => {
  return <HeartSvg width={width} height={height} fill={fill} stroke={stroke} />;
};
