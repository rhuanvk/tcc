export interface Produto {
    id: number,
    descricao: string;
    valor: number;
    quantidadeEstoque: number;
}

export interface Historico {
    id: number;
    idProduto: number,
    descricaoProduto: string;
    quantidade: number;
    tipo: string;
    dataHora: Date;
}

type CodigoHistorico = "A" | "C" | "E";
type DescricaoHistorico = "Alteração" | "Cadastro" | "Exclusão";

const TipoHistorico: Record<CodigoHistorico, DescricaoHistorico> = {
    A: "Alteração",
    C: "Cadastro",
    E: "Exclusão",
};

export function getDescricaoHistorico(tipo: string): DescricaoHistorico | undefined {
    if (tipo in TipoHistorico) {
        return TipoHistorico[tipo as CodigoHistorico];
    }
    return undefined;
  }