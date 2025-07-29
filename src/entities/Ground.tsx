import Matter from 'matter-js';
import React from 'react';
import { Image } from 'react-native';

const GroundComponent = props => {
  const width = props.size[0];
  const height = props.size[1];
  const x = props.body.position.x - width / 2;
  const y = props.body.position.y - height / 2;

  return (
    <Image
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: width,
        height: height,
        resizeMode: 'stretch'
      }}
      source={require('../assets/images/ground.png')}
    />
  );
};

export default (world, pos, size) => {
  const initialGround = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { 
        label: 'Ground',
        isStatic: true
    }
  );
  Matter.World.add(world, initialGround);

  return {
    body: initialGround,
    pos,
    size: [size.width, size.height],
    renderer: <GroundComponent />,
  };
};