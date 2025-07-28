import React from 'react';
import { Image } from 'react-native';

export default function Dino({ body }) {
  const width = 40;
  const height = 50;
  const x = body.position.x - width / 2;
  const y = body.position.y - height / 4;

  return (
    <Image
      source={require('../assets/images/standing_still.png')}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: width,
        height: height,
        resizeMode: 'contain',
      }}
    />
  );
}
