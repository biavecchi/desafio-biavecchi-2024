class RecintosZoo {

    analisaRecintos(animal, quantidade) {
        // Dados dos recintos e animais
        const recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: [{ especie: 'macaco', quantidade: 3 }] },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: [{ especie: 'gazela', quantidade: 1 }] },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: [{ especie: 'leão', quantidade: 1 }] }
        ];

        const animais = {
            LEAO: { tamanho: 3, bioma: 'savana' },
            LEOPARDO: { tamanho: 2, bioma: 'savana' },
            CROCODILO: { tamanho: 3, bioma: 'rio' },
            MACACO: { tamanho: 1, bioma: 'savana ou floresta' },
            GAZELA: { tamanho: 2, bioma: 'savana' },
            HIPOPOTAMO: { tamanho: 4, bioma: 'savana ou rio' }
        };

        // Verificar se o animal e quantidade são válidos
        if (!animais[animal.toUpperCase()]) {
            return { erro: 'Animal inválido' };
        }

        if (!Number.isInteger(quantidade) || quantidade <= 0) {
            return { erro: 'Quantidade inválida' };
        }

        // Filtrar recintos viáveis
        const recintosViaveis = recintos.filter(recinto => {
            const animalInfo = animais[animal.toUpperCase()];
            const jaTemAnimais = recinto.animais.length > 0;
            const biomas = recinto.bioma.split(' e ');
            const espacoOcupado = recinto.animais.reduce((total, item) => total + (animais[item.especie.toUpperCase()].tamanho * item.quantidade), 0);
            const espacoNecessario = quantidade * animalInfo.tamanho;

            if (biomas.includes('savana') || biomas.includes('floresta') || biomas.includes('rio')) {
                // Checar bioma
                const biomaAdequado = animalInfo.bioma === 'savana ou floresta' ? biomas.includes('savana') || biomas.includes('floresta') :
                                      animalInfo.bioma === 'savana ou rio' ? biomas.includes('savana') || biomas.includes('rio') :
                                      biomas.includes(animalInfo.bioma);

                if (!biomaAdequado) return false;

                // Checar espaço
                let espacoLivre = recinto.tamanhoTotal - espacoOcupado;
                if (jaTemAnimais && (recinto.animais.length > 1 || (animalInfo.tamanho > 1))) {
                    espacoLivre -= 1; // Espaço extra para múltiplas espécies
                }

                return espacoLivre >= espacoNecessario;
            }

            return false;
        }).map(recinto => {
            const animalInfo = animais[animal.toUpperCase()];
            const espacoOcupado = recinto.animais.reduce((total, item) => total + (animais[item.especie.toUpperCase()].tamanho * item.quantidade), 0);
            const espacoNecessario = quantidade * animalInfo.tamanho;
            const jaTemAnimais = recinto.animais.length > 0;
            let espacoLivre = recinto.tamanhoTotal - espacoOcupado;
            if (jaTemAnimais && (recinto.animais.length > 1 || (animalInfo.tamanho > 1))) {
                espacoLivre -= 1; // Espaço extra para múltiplas espécies
            }
            return `Recinto ${recinto.numero} (espaço livre: ${espacoLivre - espacoNecessario} total: ${recinto.tamanhoTotal})`;
        });

        // Verificar se há recintos viáveis
        if (recintosViaveis.length === 0) {
            return { erro: 'Não há recinto viável' };
        }

        return { recintosViaveis };
    }

}

export { RecintosZoo as RecintosZoo };
