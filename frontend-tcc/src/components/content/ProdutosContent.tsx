import { Flex } from '@mantine/core';
import { createRef, useState } from 'react';
import { ProdutosForm } from './forms/ProdutosForm';
import { ProdutosGrid, type ProdutosGridRef } from './grids/ProdutosGrid';
import type { Produto } from '../../types/types';

export const ProdutosContent = () => {
    const gridRef = createRef<ProdutosGridRef>();
    const [produtoEmEdicao, setProdutoEmEdicao] = useState<Produto | null>(null);

    const finalizarEdicao = () => {
        setProdutoEmEdicao(null);
        gridRef.current?.reloadDataSource();
    };

    return (
        <Flex
            direction="column"
            gap="md"
            p="md"
            style={{height: '100%', boxSizing: 'border-box', overflow: 'hidden'}}
        >
            <ProdutosForm
                produtoEmEdicao={produtoEmEdicao}
                finalizarEdicao={finalizarEdicao}
            />
            <ProdutosGrid
                ref={gridRef}
                iniciarEdicao={setProdutoEmEdicao}
            />
        </Flex>
    );
}