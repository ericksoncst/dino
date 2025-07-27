import React from 'react';
import { View } from 'react-native';

export default function Dino({ body, color }) {
  if (!body || !body.position) return null;

  const width = 50;
  const height = 50;
  const x = body.position.x - width / 2;
  const y = body.position.y - height / 2;

  return (
    <View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: width,
        height: height,
        backgroundColor: color || 'green',
      }}
    />
  );
}
