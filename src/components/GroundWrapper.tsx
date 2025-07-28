import React from 'react';
import { View } from 'react-native';
import Ground from './Ground';

export default function GroundWrapper({ body }) {
  if (!body || !body.position || !body.bounds) return null;

  return (
    <View>
      <Ground body={body} offsetX={0} />
      <Ground body={body} offsetX={body.bounds.max.x - body.bounds.min.x} />
    </View>
  );
}