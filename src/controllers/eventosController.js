// Controller: as regras de cada operação do recurso "eventos".
import { eventos } from '../data/eventos.js';

// GET /api/eventos
export function listar(req, res) {
  res.json(eventos);
}

// GET /api/eventos/:id
export function buscarPorId(req, res) {
  const id = Number(req.params.id);
  const evento = eventos.find((e) => e.id === id);
  if (!evento) {
    return res.status(404).json({ erro: 'Evento não encontrado' });
  }
  res.json(evento);
}

// POST /api/eventos
export function criar(req, res) {
  // req.body vem vazio (undefined) se o cliente não enviar JSON; ?? {} evita o erro
  const { titulo, prioridade, status } = req.body ?? {};
  if (!titulo) {
    return res.status(400).json({ erro: 'O campo titulo é obrigatório' });
  }
  const novoId = eventos.length > 0 ? eventos[eventos.length - 1].id + 1 : 1;
  const novo = {
    id: novoId,
    titulo,
    prioridade: prioridade ?? 'media',
    status: status ?? 'aberto',
  };
  eventos.push(novo);
  res.status(201).json(novo);
}

// PUT /api/eventos/:id
export function atualizar(req, res) {
  const id = Number(req.params.id);
  const posicao = eventos.findIndex((c) => c.id === id);
  if (posicao === -1) {
    return res.status(404).json({ erro: 'Evento não encontrado' });
  }
  const dados = req.body ?? {};
  if (dados.titulo === '') {
    return res.status(400).json({ erro: 'O campo titulo não pode ficar vazio' });
  }
  // junta o que já existia com o que chegou; o id nunca muda
  const atualizado = { ...eventos[posicao], ...dados, id };
  eventos[posicao] = atualizado;
  res.json(atualizado);
}

// DELETE /api/eventos/:id
export function excluir(req, res) {
  const id = Number(req.params.id);
  const posicao = eventos.findIndex((c) => c.id === id);
  if (posicao === -1) {
    return res.status(404).json({ erro: 'Evento não encontrado' });
  }
  eventos.splice(posicao, 1);
  res.status(204).send();
}