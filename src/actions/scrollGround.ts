const scrollSpeed = 5;

export default function scrollGround(entities, { time }) {
  const ground = entities.ground;
  const body = ground.body;

  body.position.x -= scrollSpeed;

  if (body.position.x < -ground.body.bounds.max.x / 2) {
    body.position.x = ground.body.bounds.max.x / 2;
  }

  return entities;
}
