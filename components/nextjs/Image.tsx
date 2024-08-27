// components/Image.tsx
import React from 'react';

interface ImageProps {
  alt: string;
  srcLight: string;
  srcDark: string;
  width: number | string;
  height: number | string;
}

const Image: React.FC<ImageProps> = ({ alt, srcLight, srcDark, width, height }) => {
  return (
    <picture>
      <source srcSet={srcDark} media="(prefers-color-scheme: dark)" />
      <source srcSet={srcLight} media="(prefers-color-scheme: light)" />
      <img src={srcLight} alt={alt} width={width} height={height} />
    </picture>
  );
};

export default Image;
