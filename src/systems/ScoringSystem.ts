const ScoringSystem = (entities, { time, dispatch }) => {
    const status = entities.gameStatus;
    
    status.scoreTimer += time.delta;

    // Aumenta o score
    if (status.scoreTimer >= status.scoreInterval) {
        status.scoreTimer -= status.scoreInterval;
        status.score++;
        
        // Despacha o evento para atualizar a UI
        dispatch({ type: 'score-updated', score: status.score });

        // Aumenta a velocidade a cada 100 pontos
        if (status.score > 0 && status.score % 100 === 0) {
            status.speed += 0.2;
            // dispatch({ type: 'speed-updated', speed: status.speed });
        }
    }

    return entities;
};

export default ScoringSystem;