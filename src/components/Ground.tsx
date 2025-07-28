import React from 'react';
import { View, Image } from 'react-native';

export default function Ground({ body, color }) {
  if (!body || !body.position || !body.bounds) return null;

  const width = body.bounds.max.x - body.bounds.min.x;
  const height = body.bounds.max.y - body.bounds.min.y;
  const x = body.position.x - width / 2;
  const y = body.position.y - height;

  return (
    <Image
          source={require('../assets/images/ground.png')}
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
