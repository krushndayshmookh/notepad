import { sql } from '@vercel/postgres'

export default async function handler(request, response) {
  if (request.method === 'POST') {
    const { body } = request.body
    await sql`UPDATE notes SET body = ${body} WHERE id = 1 RETURNING *`
    return response.status(200).send({ success: true })
  }

  if (request.method === 'GET') {
    const { rows } = await sql`SELECT * FROM notes WHERE id = 1`
    return response.status(200).json({ body: rows[0].body })
  }

  return response.status(405).end()
}
