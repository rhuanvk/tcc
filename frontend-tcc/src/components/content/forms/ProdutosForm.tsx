import { useEffect, useState } from "react";
import axios from 'axios';
import { Card, Title, Flex, TextInput, NumberInput, Button } from "@mantine/core";
import type { Produto } from "../../../types/types";

interface ProdutosFormProps {
    produtoEmEdicao: Produto | null;
    finalizarEdicao: () => void;
}

export const ProdutosForm = ({ produtoEmEdicao, finalizarEdicao }: ProdutosFormProps) => {
    const urlBaseApi = "http://localhost:5080/api";
    const [formData, setFormData] = useState<Omit<Produto, 'id'>>({
        descricao: '',
        valor: 0,
        quantidadeEstoque: 0,
    });


    const handleInputChange = (field: keyof Produto, value: string | number) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (produtoEmEdicao) {
                const payload = {
                    Id: produtoEmEdicao.id,
                    Descricao: formData.descricao,
                    Valor: formData.valor,
                    QuantidadeEstoque: formData.quantidadeEstoque
                };

                await axios.put(`${urlBaseApi}/Produtos`, payload, {
                    headers: {
                        'Content-type': 'application/json'
                    }
                });
            } else {
                const payload = {
                    Id: null,
                    Descricao: formData.descricao,
                    Valor: formData.valor,
                    QuantidadeEstoque: formData.quantidadeEstoque
                };
        
                await axios.post(`${urlBaseApi}/Produtos`, payload, {
                    headers: {
                        'Content-type': 'application/json'
                    }
                });
            }

            finalizarEdicao();
            setFormData({
                descricao: '',
                valor: 0,
                quantidadeEstoque: 0,
            });
        } catch (e) {
            console.error(`Ocorreu um erro ao ${produtoEmEdicao ? 'cadastrar' : 'alterar'} o produto`, e);
        }
    };

    useEffect(() => {
        if (produtoEmEdicao) {
            setFormData({
                descricao: produtoEmEdicao.descricao,
                valor: produtoEmEdicao.valor,
                quantidadeEstoque: produtoEmEdicao.quantidadeEstoque
            });
        } else {
            setFormData({
                descricao: '',
                valor: 0,
                quantidadeEstoque: 0,
            });
        }
    }, [produtoEmEdicao]);
    

    return (
        <Card withBorder shadow="sm" radius="md">
            <Title order={2} mb="md">{produtoEmEdicao ? 'Alterar produto' : 'Cadastrar produto'}</Title>
            <form onSubmit={handleSubmit}>
                <Flex gap="md" align="flex-end">
                    <TextInput
                        label="Descrição"
                        placeholder="Digite a descrição"
                        required
                        value={formData.descricao}
                        onChange={(e) => handleInputChange('descricao', e.target.value)}
                        style={{flex: 3}}
                    />

                    <NumberInput
                        label="Preço"
                        placeholder="0,00"
                        decimalSeparator=","
                        required
                        min={0}
                        step={1}
                        value={formData.valor}
                        onChange={(value) => handleInputChange('valor', Number(value))}
                        style={{flex: 1}}
                    />

                    <NumberInput
                        label="Quantidade"
                        placeholder="0"
                        required
                        min={0}
                        value={formData.quantidadeEstoque}
                        onChange={(value) => handleInputChange('quantidadeEstoque', Number(value))}
                        style={{flex: 1}}
                    />

                    <Button type="submit" style={{flex: 1}}>
                        {produtoEmEdicao ? 'Salvar' : 'Cadastrar'}
                    </Button>
                    {produtoEmEdicao && (
                        <Button
                            variant="outline"
                            color="gray"
                            onClick={finalizarEdicao}
                        >
                            Cancelar
                        </Button>
                    )}
                </Flex>
            </form>
        </Card>
    );
};