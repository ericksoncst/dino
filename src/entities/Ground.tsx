import React from 'react';
import { Image } from 'react-native';

export default function Ground({ body, scrollX }) {
  if (!body || !body.position || !body.bounds) return null;

  const width = body.bounds.max.x - body.bounds.min.x;
  const height = body.bounds.max.y - body.bounds.min.y;
  const y = body.position.y - height;
  const imageWidth = width;

  const offset = scrollX % imageWidth;

  return (
    <>
      <Image
        source={require('../assets/images/ground.png')}
        style={{
          position: 'absolute',
          left: -offset,
          top: y,
          width: imageWidth,
          height,
          resizeMode: 'contain',
        }}
      />
      <Image
        source={require('../assets/images/ground.png')}
        style={{
          position: 'absolute',
          left: imageWidth - offset,
          top: y,
          width: imageWidth,
          height,
          resizeMode: 'contain',
        }}
      />
    </>
  );
}