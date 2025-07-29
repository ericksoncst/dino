import Matter from 'matter-js';
import React from 'react';
import { Image, View } from 'react-native';

const Dino = props => {
  const width = props.originalSize[0];
  const height = props.originalSize[1];
  const x = props.body.position.x - width / 2;
  const y = props.body.position.y - height / 2;

  const yOffset = 10;

  return (
    <Image
      style={{
        position: 'absolute',
        left: x,
        top: y + yOffset,
        width: width,
        height: height,
        // borderColor: 'red',
        // borderWidth: 1
      }}
      source={require('../assets/images/standing_still.png')}
    />
  );
};

export default (world, pos, size, originalSize) => {
  const initialDino = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {label: 'Dino'}
  );
  Matter.World.add(world, initialDino);

  return {
    body: initialDino,
    pos,
    size: [size.width, size.height],
    originalSize: [originalSize.width, originalSize.height],
    isGrounded: true,
    renderer: <Dino />,
  };
};
