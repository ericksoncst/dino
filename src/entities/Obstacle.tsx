import React from 'react';
import { Image } from 'react-native';

export default function Obstacle({ body }) {
  const width = 40;
  const height = 50;
  const x = body.position.x - width / 2;
  const y = body.position.y - height / 3;

  return (
    <Image
      source={require('../assets/images/cactus_1.png')}
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
