import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Box, Card, Title, Table, Text, Button } from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";
import { type Historico, getDescricaoHistorico } from "../../../types/types";

export interface HistoricoGridRef {
    reloadDataSource: () => void;
}

export const HistoricoGrid = forwardRef<HistoricoGridRef>(({}, ref) => {
    const urlBaseApi = "http://localhost:5080/api";
    const [registros, setRegistros] = useState<Historico[]>([]);

    const getDataSource = async () => {
        try {            
            const response = await axios.get(`${urlBaseApi}/Historico`);
            setRegistros([...response.data])
        } catch (e) {
            console.error('Erro ao carregar dados do histórico', e)
        }
    }

    useImperativeHandle(ref, () => ({
        reloadDataSource: getDataSource
    }))

    useEffect(() => {
        getDataSource()
    }, [])

    return (
        <Box style={{flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column'}}>
            <Card withBorder shadow="sm" radius="md" style={{display: 'flex', flexDirection: 'column', flex: 1}}>
                <Card.Section withBorder inheritPadding py="xs">
                    <Title order={3}>Histórico</Title>
                <Box style={{width: '100%', display: 'flex', justifyContent: 'end'}}>
                    <Button                        
                        variant="outline"
                        size="xs"
                        onClick={getDataSource}
                    >
                        <IconRefresh />
                    </Button>
                </Box>
                </Card.Section>
                <Box style={{flex: 1, overflow: 'auto', maxHeight: '60vh'}}>
                    {registros.length === 0 ? (<Text mt="md" c="dimmed" style={{padding: 'md'}}>Sem dados</Text>
                    ) : (
                        <div style={{minHeight: '100%'}}>
                            <Table
                                striped
                                highlightOnHover
                                withColumnBorders
                                layout="fixed"
                            >
                                <colgroup>
                                    <col style={{width: '5%'}} />
                                    <col style={{width: '5%'}} />
                                    <col style={{width: '50%'}} />
                                    <col style={{width: '10%'}} />
                                    <col style={{width: '10%'}} />
                                    <col style={{width: '10%'}} />
                                </colgroup>

                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th>ID</Table.Th>
                                        <Table.Th>ID Produto</Table.Th>
                                        <Table.Th colSpan={2}>Descrição</Table.Th>
                                        <Table.Th>Quantidade</Table.Th>
                                        <Table.Th>Operação</Table.Th>
                                        <Table.Th>Data/hora</Table.Th>
                                </Table.Tr>
                                </Table.Thead>

                                <Table.Tbody>
                                    {registros.map((registro) => (
                                        <Table.Tr key={registro.id}>
                                            <Table.Td>{registro.id}</Table.Td>
                                            <Table.Td>{registro.idProduto}</Table.Td>
                                            <Table.Td colSpan={2}>{registro.descricaoProduto}</Table.Td>
                                            <Table.Td>{registro.quantidade}</Table.Td>
                                            <Table.Td>{getDescricaoHistorico(registro.tipo)}</Table.Td>
                                            <Table.Td>{moment(registro.dataHora).format('DD/MM/YYYY HH:mm:ss')}</Table.Td>
                                        </Table.Tr>
                                    ))}
                                </Table.Tbody>
                            </Table>
                        </div>
                    )}
                </Box>
            </Card>
        </Box>
    )
})