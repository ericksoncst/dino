import Matter from 'matter-js';
import React from 'react';
import { Image } from 'react-native';

const cactusImages = {
    1: require('../assets/images/cactus_1.png'),
    2: require('../assets/images/cactus_2.png'),
    3: require('../assets/images/cactus_3.png'),
};

const CactusComponent = props => {
  const width = props.size[0];
  const height = props.size[1];
  const x = props.body.position.x - width / 2;
  const y = props.body.position.y - height / 2;
  const cactusType = props.cactusType;

  let visualYOffset = 0; 
  switch (cactusType) {
    case 1:
      visualYOffset = 25; 
      break;
    case 2:
      visualYOffset = 35;
      break;
    case 3:
      visualYOffset = 40;
      break;
    default:
      visualYOffset = 30;
      break;
  }


  return (
    <Image
      style={{
        position: 'absolute',
        left: x,
        top: y + visualYOffset,
        width: width,
        height: height,
        resizeMode: 'contain'
      }}
      source={cactusImages[cactusType]}
    />
  );
};

export default (world, pos, size, cactusType) => {
  const initialCactus = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { 
        label: 'Obstacle',
        isStatic: false
    }
  );
  Matter.World.add(world, initialCactus);

  return {
    body: initialCactus,
    pos,
    size: [size.width, size.height],
    cactusType: cactusType,
    renderer: <CactusComponent />,
  };
};