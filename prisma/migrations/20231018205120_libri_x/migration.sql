-- CreateTable
CREATE TABLE "Livros" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "tipo" TEXT,
    "autor" TEXT,
    "tipologia" TEXT,
    "num_paginas" INTEGER,
    "situacao" TEXT DEFAULT 'ativo'
);

-- CreateTable
CREATE TABLE "Exemplares" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "livro_id" INTEGER NOT NULL,
    "tombo" TEXT NOT NULL,
    "prateleira_id" INTEGER,
    "situacao" TEXT DEFAULT 'ativo',
    CONSTRAINT "Exemplares_livro_id_fkey" FOREIGN KEY ("livro_id") REFERENCES "Livros" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Prateleiras" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "identificador" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Leitores" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "foto" TEXT
);

-- CreateTable
CREATE TABLE "Discentes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "leitor_id" INTEGER NOT NULL,
    "rga" TEXT NOT NULL,
    "turma" TEXT,
    "serie" INTEGER,
    CONSTRAINT "Discentes_leitor_id_fkey" FOREIGN KEY ("leitor_id") REFERENCES "Leitores" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Docentes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "leitor_id" INTEGER NOT NULL,
    "registro" TEXT NOT NULL,
    "turno" TEXT,
    "disciplina" TEXT,
    CONSTRAINT "Docentes_leitor_id_fkey" FOREIGN KEY ("leitor_id") REFERENCES "Leitores" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Emprestimos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "leitor_id" INTEGER NOT NULL,
    "livro_id" INTEGER NOT NULL,
    "foto" TEXT,
    "data_emprestimo" DATETIME NOT NULL,
    "data_devolucao" DATETIME NOT NULL,
    "situacao" TEXT NOT NULL DEFAULT 'ativo',
    CONSTRAINT "Emprestimos_livro_id_fkey" FOREIGN KEY ("livro_id") REFERENCES "Livros" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Emprestimos_leitor_id_fkey" FOREIGN KEY ("leitor_id") REFERENCES "Leitores" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Estados" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "leitor_id" INTEGER NOT NULL,
    "situacao" BOOLEAN NOT NULL,
    "data_entrada" DATETIME NOT NULL,
    "data_saida" DATETIME,
    CONSTRAINT "Estados_leitor_id_fkey" FOREIGN KEY ("leitor_id") REFERENCES "Leitores" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Bibliotecarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Bibliotecarios_cpf_key" ON "Bibliotecarios"("cpf");
