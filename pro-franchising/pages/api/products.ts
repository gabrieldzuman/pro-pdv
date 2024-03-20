import { NextApiRequest, NextApiResponse } from 'next';

interface Product {
  id: string;
  name: string;
  price: number;
}

let products: Product[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      res.status(200).json(products);
      break;
    case 'POST':
      try {
        const { name, price } = req.body;
        if (!name || !price) {
          res.status(400).json({ message: 'Name and price are required' });
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
        res.status(500).json({ message: 'Failed to add product' });
      }
      break;
    case 'PUT':
      try {
        const { id, name, price } = req.body;
        const index = products.findIndex((product) => product.id === id);
        if (index === -1) {
          res.status(404).json({ message: 'Product not found' });
          return;
        }
        products[index] = { id, name, price };
        res.status(200).json(products[index]);
      } catch (error) {
        res.status(500).json({ message: 'Failed to update product' });
      }
      break;
    case 'DELETE':
      try {
        const { id } = req.body;
        products = products.filter((product) => product.id !== id);
        res.status(200).json({ message: 'Product deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Failed to delete product' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
