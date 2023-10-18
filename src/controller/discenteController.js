const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function cadastrarDiscente(req, res) {
  try {
    const discente = req.body;
    const novoDiscente = await prisma.discentes.create({
      data: {
        leitor_id: discente.leitor_id,
        rga: discente.rga,
        turma: discente.turma,
        serie: discente.serie,
      },
    });
    res.json(novoDiscente);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar o discente' });
  }
}

module.exports = {
  cadastrarDiscente,
};
