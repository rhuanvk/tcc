import { Flex } from '@mantine/core';
import { HistoricoGrid } from './grids/HistoricoGrid';

export const HistoricoContent = () => {

    return (
        <Flex
            direction="column"
            gap="md"
            p="md"
            style={{height: '100%', boxSizing: 'border-box', overflow: 'hidden'}}
        >
            <HistoricoGrid />
        </Flex>
    );
}