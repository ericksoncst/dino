const AnimationSystem = (entities, { time }) => {
    const dino = entities.dino;

    if (dino.isGrounded) {
        // Dino está no chão: animação de corrida
        dino.animTick++;

        if (dino.animTick >= dino.animFrameDuration) {
            dino.animTick = 0;
            // Alterna entre os frames de corrida (1 e 2)
            if (dino.animIndex === 1) {
                dino.animIndex = 2;
            } else {
                dino.animIndex = 1;
            }
        }
    } else {
        // Dino está no ar: frame de pulo (parado)
        dino.animIndex = 0;
    }

    return entities;
};

export default AnimationSystem;