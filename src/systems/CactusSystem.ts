// import Matter from 'matter-js';
// import { Constants } from '../utils/constants';
// import Cactus from '../entities/Cactus';

// let obstacleCount = 0;


// const randomBetween = (min, max) => {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// };

// const CactusSystem = (entities, { time, dispatch }) => {
//   const engine = entities.physics.engine;
//   const world = entities.physics.world;
//   const spawner = entities.cactusSpawner;
//   const status = entities.gameStatus;

//   //Mover e remover cactos existentes
//   Object.keys(entities).forEach(key => {
//     if (key.startsWith('obstacle_')) {
//       const cactus = entities[key];
//       // Mover para a esquerda
//       Matter.Body.translate(cactus.body, { x: -status.speed, y: 0 });

//       // Remover se saiu da tela
//       if (cactus.body.position.x < -Constants.CACTUS_WIDTH / 2) {
//         Matter.World.remove(world, cactus.body); // Remove o corpo do mundo da física
//         delete entities[key]; // Remove a entidade do jogo
//       }
//     }
//   });

//   // Gerar novos cactos
//   spawner.spawnTimer -= time.delta;
//   if (spawner.spawnTimer <= 0) {

//     const originalSize = { width: Constants.CACTUS_WIDTH, height: Constants.CACTUS_HEIGHT };

//     const hitboxSize = { 
//       width: originalSize.width * 0.7, 
//       height: originalSize.height * 0.9
//     };

//     // Resetar o timer com um valor aleatório
//     spawner.spawnTimer = randomBetween(Constants.OBSTACLE_INTERVAL_MIN, Constants.OBSTACLE_INTERVAL_MAX);

//     // Criar o novo cacto
//     const cactusType = randomBetween(1, 3); // Escolhe um dos 3 tipos de cacto
//     const newCactusKey = 'obstacle_' + obstacleCount++;
//     const newCactus = Cactus(
//       world,
//       { x: Constants.MAX_WIDTH + (originalSize.width / 2), y: Constants.MAX_HEIGHT - Constants.GROUND_HEIGHT - (originalSize.height / 2) - Constants.GROUND_Y_OFFSET },
//        hitboxSize,
//         cactusType,
//         originalSize 
//     );

//     entities[newCactusKey] = newCactus;
//   }

//   return entities;
// };

// export default CactusSystem;

// src/systems/CactusSystem.js (Lógica Dinâmica)

import Matter from 'matter-js';
import { Constants } from '../utils/constants';
import Cactus from '../entities/Cactus';

let obstacleCount = 0;

const randomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const CactusSystem = (entities, { time }) => {
  const world = entities.physics.world;
  const spawner = entities.cactusSpawner;
  const status = entities.gameStatus;

  // (mover e remover cactos)
  Object.keys(entities).forEach(key => {
    if (key.startsWith('obstacle_')) {
      const cactus = entities[key];
      Matter.Body.translate(cactus.body, { x: -status.speed, y: 0 });
      if (cactus.body.position.x < -cactus.originalSize[0]) {
        Matter.World.remove(world, cactus.body);
        delete entities[key];
      }
    }
  });

  // Gerar novos cactos
  spawner.spawnTimer -= time.delta;
  if (spawner.spawnTimer <= 0) {
    
    // Escolhe cacto aleatoriamente
    const cactusConfigIndex = randomBetween(0, Constants.CACTI_CONFIG.length - 1);
    const chosenCactusConfig = Constants.CACTI_CONFIG[cactusConfigIndex];
    
    // Calcula os tamanhos baseados na escala
    const originalSize = {
        width: chosenCactusConfig.width * Constants.SCALE_RATIO,
        height: chosenCactusConfig.height * Constants.SCALE_RATIO,
    };

    // Define um hitbox um pouco menor para ser mais justo com o jogador
    const hitboxSize = { 
      width: originalSize.width * 0.7, 
      height: originalSize.height * 0.9
    };
    
    // Calcula a posição Y correta para o cacto ficar no chão
    const groundTopY = Constants.MAX_HEIGHT - Constants.GROUND_HEIGHT - Constants.GROUND_Y_OFFSET;
    const cactusCenterY = groundTopY - (hitboxSize.height / 2);

    // Cria o novo cacto com os tamanhos e tipo corretos
    const newCactusKey = 'obstacle_' + obstacleCount++;
    const newCactus = Cactus(
      world,
      { x: Constants.MAX_WIDTH + (originalSize.width / 2), y: cactusCenterY },
      hitboxSize, // Tamanho para colisões
      chosenCactusConfig.type, // Tipo do cacto (1, 2 ou 3)
      originalSize // Tamanho para renderização da imagem
    );

    entities[newCactusKey] = newCactus;

    spawner.spawnTimer = randomBetween(Constants.OBSTACLE_INTERVAL_MIN, Constants.OBSTACLE_INTERVAL_MAX);
  }

  return entities;
};

export default CactusSystem;