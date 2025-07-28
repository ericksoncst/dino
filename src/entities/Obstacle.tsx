import React from 'react';
import { Image } from 'react-native';

export default function Obstacle({ body, image }) {
  const width = 40;
  const height = 60;
  const x = body.position.x - width / 2;
  const y = body.position.y - height / 4;

  return (
    <Image
      source={image}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        height,
        resizeMode: 'contain',
      }}
    />
  );
}
