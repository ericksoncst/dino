import React from 'react';
import { Image } from 'react-native';

const images = [
  require('./../assets/images/dino_run1.png'),
  require('./../assets/images/dino_run2.png'),
];

export default function Dino({ body, frame = 0, running }) {
  console.log(frame, running)
  const width = 40;
  const height = 50;
  const x = body.position.x - width / 2;
  const y = body.position.y - height / 6;

  const imageSource = running ? images[frame] : require('./../assets/images/standing_still.png');

  return (
    <Image
      source={imageSource}
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
