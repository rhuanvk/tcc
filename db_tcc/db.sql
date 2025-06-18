create table public.produtos
(
    id                 serial constraint produtos_pk primary key,
    descricao          varchar(100)   not null,
    valor              numeric(10, 2) not null,
    quantidade_estoque integer        not null
);

create table public.vendas
(
    id                 serial constraint vendas_pk primary key,
    nome_cliente       varchar(100),
    valor_total        numeric(10, 2) not null,
    data_venda         timestamp      not null
);

create table public.movimentacoes
(
    id                 serial constraint movimentacoes_pk primary key,
    id_produto         integer not null constraint movimentacoes_produtos_id_fk references public.produtos,
    id_venda           integer constraint movimentacoes_vendas_id_fk references public.vendas,
    quantidade         integer not null,
    tipo               char    not null
);

comment on column public.movimentacoes.tipo is 'E = Entrada; S = Saída';
