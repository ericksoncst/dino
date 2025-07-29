import Matter from 'matter-js';
import React from 'react';
import { Image, View } from 'react-native';

const Dino = props => {
  const width = props.size[0];
  const height = props.size[1];
  const x = props.body.position.x - width / 2;
  const y = props.body.position.y - height / 2;

  const yOffset = 15;

  return (
    <Image
      style={{
        position: 'absolute',
        left: x,
        top: y + yOffset,
        width: width,
        height: height,
      }}
      source={require('../assets/images/standing_still.png')}
    />
  );
};

export default (world, pos, size) => {
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
    isGrounded: true,
    renderer: <Dino />,
  };
};


// import React from 'react';
// import { Image } from 'react-native';

// const images = [
//   require('./../assets/images/dino_run1.png'),
//   require('./../assets/images/dino_run2.png'),
// ];

// export default function Dino({ body, frame = 0, running, isJumping }) {
//   const width = 50;
//   const height = 50;
//   const x = body.position.x - width / 2;
//   const y = body.position.y - height / 6;

//   const imageSource = running && !isJumping ? images[frame] : require('./../assets/images/standing_still.png');

//   return (
//     <Image
//       source={imageSource}
//       style={{
//         position: 'absolute',
//         left: x,
//         top: y,
//         width: width,
//         height: height,
//         resizeMode: 'contain',
//       }}
//     />
//   );
// }
