import { NextApiRequest, NextApiResponse } from 'next';

interface Product {
  id: string;
  name: string;
  price: number;
}

let products: Product[] = [];

// Adicionando parâmetros para token e expiração do token
export default function handler(req: NextApiRequest, res: NextApiResponse, token?: string, tokenExpiration?: string) {
  const { method } = req;

  // Verifica se o token está presente e se não expirou
  const isAuthenticated = token && new Date(tokenExpiration) > new Date();

  if (!isAuthenticated) {
    res.status(401).json({ message: 'Não autorizado' });
    return;
  }

  switch (method) {
    case 'GET':
      res.status(200).json(products);
      break;
    case 'POST':
      try {
        const { name, price } = req.body;
        if (!name || !price) {
          res.status(400).json({ message: 'Nome e preço são obrigatórios' });
          return;
        }
        const newProduct: Product = {
          id: `${Date.now()}`,
          name,
          price,
        };
        products.push(newProduct);
        res.status(201).json(newProduct);
      } catch (error) {
        res.status(500).json({ message: 'Falha ao adicionar produto' });
      }
      break;
    case 'PUT':
      try {
        const { id, name, price } = req.body;
        const index = products.findIndex((product) => product.id === id);
        if (index === -1) {
          res.status(404).json({ message: 'Produto não encontrado' });
          return;
        }
        products[index] = { id, name, price };
        res.status(200).json(products[index]);
      } catch (error) {
        res.status(500).json({ message: 'Falha ao atualizar produto' });
      }
      break;
    case 'DELETE':
      try {
        const { id } = req.body;
        products = products.filter((product) => product.id !== id);
        res.status(200).json({ message: 'Produto excluído com sucesso' });
      } catch (error) {
        res.status(500).json({ message: 'Falha ao excluir produto' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Método ${method} Não Permitido`);
  }
}
