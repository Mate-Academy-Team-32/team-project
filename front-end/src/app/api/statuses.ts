import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json({ message: 'Hello from Next.js!' })
  res.status(403).json({ message: 'Forbidden' })
  res.status(404).json({ message: 'Page Not Found' })
  res.status(500).json({ message: 'Internal Server Error' })
  res.status(501).json({ message: 'Not Implemented' })
}
