let frame = 0;
let timer = 0;
const ANIMATION_INTERVAL = 100;

const animationSystem = (entities, { time }) => {
  console.log('CALLED')
  const dino = entities.dino;

  if (!dino.running) return entities;

  timer += time.delta;

  if (timer > ANIMATION_INTERVAL) {
    frame = (frame + 1) % 2;
    dino.frame = frame;
    timer = 0;
  }

  return entities;
};

export default animationSystem;
