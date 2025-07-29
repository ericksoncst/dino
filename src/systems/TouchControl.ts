import Matter from 'matter-js';

const TouchControl = (entities, { touches, time }) => {

    let jumpPress = touches.find(x => x.type === 'press');

  if (jumpPress) {
    const dino = entities.dino;

    if (dino.isGrounded) {
      Matter.Body.applyForce(dino.body, dino.body.position, { x: 0.0, y: -0.10 });
      dino.isGrounded = false;
    }
  }

  return entities;
};

export default TouchControl;