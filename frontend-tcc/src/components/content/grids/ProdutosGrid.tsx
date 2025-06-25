import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import axios from 'axios';
import { Box, Card, Title, Table, Text, Button } from "@mantine/core";
import { IconEdit, IconTrash } from '@tabler/icons-react';
import type { Produto } from "../../../types/types";

interface ProdutosGridProps {
    iniciarEdicao: (produtoEmEdicao: Produto) => void;
}

export interface ProdutosGridRef {
    reloadDataSource: () => void;
}

export const ProdutosGrid = forwardRef<ProdutosGridRef, ProdutosGridProps>(({ iniciarEdicao }, ref) => {
    const urlBaseApi = "http://localhost:5080/api";
    const [produtos, setProdutos] = useState<Produto[]>([]);

    const getDataSource = async () => {
        try {
            const response = await axios.get(`${urlBaseApi}/Produtos`);
            setProdutos([...response.data])
        } catch (e) {
            console.error('Erro ao carregar dados dos produtos', e)
        }
    }

    const handleUpdate = async (produto: Produto) => {
        try {
            await iniciarEdicao(produto);
        } catch (e) {
            console.error(`Erro ao atualizar dados do produto cód. ${produto.id}`, e);
        }
    }

    const handleDelete = async (id: number) => {
        try {            
            await axios.delete(`${urlBaseApi}/Produtos/${id}`, {
                headers: {
                    'Content-type': 'application/json'
                }
            })
            await getDataSource();
        } catch (e) {
            console.error(`Erro ao deletar o produto cód. ${id}`, e);
        }
    };

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
                    <Title order={3}>Produtos</Title>
                </Card.Section>

                <Box style={{flex: 1, overflow: 'auto', maxHeight: '60vh'}}>
                    {produtos.length === 0 ? (<Text mt="md" c="dimmed" style={{padding: 'md'}}>Sem dados</Text>
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
                                    <col style={{width: '50%'}} />
                                    <col style={{width: '10%'}} />
                                    <col style={{width: '10%'}} />
                                    <col style={{width: '10%'}} />
                                </colgroup>

                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th>ID</Table.Th>
                                        <Table.Th colSpan={2}>Descrição</Table.Th>
                                        <Table.Th>Preço</Table.Th>
                                        <Table.Th>Quantidade</Table.Th>
                                        <Table.Th>Alterar</Table.Th>
                                        <Table.Th>Excluir</Table.Th>
                                </Table.Tr>
                                </Table.Thead>

                                <Table.Tbody>
                                    {produtos.map((produto) => (
                                        <Table.Tr key={produto.id}>
                                            <Table.Td>{produto.id}</Table.Td>
                                            <Table.Td colSpan={2}>{produto.descricao}</Table.Td>
                                            <Table.Td>
                                                {produto.valor.toLocaleString('pt-BR', {
                                                    style: 'currency',
                                                    currency: 'BRL',
                                                })}
                                            </Table.Td>
                                            <Table.Td>{produto.quantidadeEstoque}</Table.Td>
                                            <Table.Td>
                                                <Button
                                                    variant="outline"
                                                    size="xs"
                                                    w='100%'
                                                    onClick={() => handleUpdate(produto)}
                                                >
                                                    <IconEdit />
                                                </Button>
                                            </Table.Td>
                                            <Table.Td>
                                                <Button
                                                    variant="outline"
                                                    color="red"
                                                    size="xs"
                                                    w='100%'
                                                    onClick={() => handleDelete(produto.id)}
                                                >
                                                    <IconTrash />
                                                </Button>

                                            </Table.Td>
                                        </Table.Tr>
                                    ))}
                                </Table.Tbody>
                            </Table>
                        </div>
                    )}
                </Box>
            </Card>
        </Box>
    );
});