create table produtos
(
    id                 serial
        constraint produtos_pk
            primary key,
    descricao          varchar(100)   not null,
    valor              numeric(10, 2) not null,
    quantidade_estoque integer        not null
);

create table historico
(
    id                integer default nextval('movimentacoes_id_seq'::regclass) not null
        constraint movimentacoes_pk
            primary key,
    id_produto        integer                                                   not null,
    descricao_produto varchar(100)                                              not null,
    quantidade        integer                                                   not null,
    tipo              char                                                      not null,
    data_hora         timestamp                                                 not null
);

comment on column historico.tipo is 'C = Cadastro; A = Alteração; E = Exclusão';