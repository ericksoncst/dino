import Matter from 'matter-js';

const TouchControl = (entities, { touches, time }) => {
  let jumpPress = touches.find(x => x.type === 'press');

  if (jumpPress) {
    const dino = entities.dino;
    if (dino.isGrounded) {
      Matter.Body.setVelocity(dino.body, { x: dino.body.velocity.x, y: -12 });
      dino.isGrounded = false;
    }
  }

  return entities;
};

export default TouchControl;