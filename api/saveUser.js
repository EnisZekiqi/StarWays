import { promises as fs } from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'public', 'db.json');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      const data = await fs.readFile(dbPath);
      const db = JSON.parse(data);

      if (db.users.some((user) => user.username === username)) {
        return res.status(400).json({ message: 'User already exists' });
      }

      db.users.push({ username, password });
      await fs.writeFile(dbPath, JSON.stringify(db, null, 2));

      return res.status(201).json({ message: 'User created' });
    } catch (error) {
      return res.status(500).json({ message: 'Error reading or writing database' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
