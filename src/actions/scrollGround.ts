const SPEED = 2;

const scrollGround = (entities, { time }) => {
  const ground = entities.ground;
  const groundWidth = ground.body.bounds.max.x - ground.body.bounds.min.x;
  
  ground.scrollX = (ground.scrollX || 0) + SPEED;
  
  if (ground.scrollX >= groundWidth) {
    ground.scrollX = 0;
  }

  return entities;
};

export default scrollGround;