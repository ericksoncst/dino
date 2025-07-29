const AnimationSystem = (entities, { time }) => {
    const dino = entities.dino;

    if (dino.isGrounded) {
        // --- LÓGICA DE CORRIDA (QUANDO ESTÁ NO CHÃO) ---
        dino.animTick++;

        // A cada `animFrameDuration` ticks, muda o frame
        if (dino.animTick >= dino.animFrameDuration) {
            dino.animTick = 0;
            // Alterna entre os frames de corrida (índices 1 e 2)
            if (dino.animIndex === 1) {
                dino.animIndex = 2;
            } else {
                dino.animIndex = 1;
            }
        }
    } else {
        // --- LÓGICA DE PULO (QUANDO ESTÁ NO AR) ---
        // <-- ALTERAÇÃO IMPORTANTE AQUI
        // Força o frame para a imagem de pulo (parado)
        dino.animIndex = 0; 
        // Reseta o tick para não trocar de frame imediatamente ao pousar
        dino.animTick = 0;
    }

    return entities;
};

export default AnimationSystem;