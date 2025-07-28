import React from 'react';
import { Image } from 'react-native';

export default function Obstacle({ body }) {
  const width = 40;
  const height = 50;
  const x = body.position.x - width / 2;
  const y = body.position.y - height / 2;

  return (
    <Image
      source={require('../assets/Cactus.jpg')}
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
