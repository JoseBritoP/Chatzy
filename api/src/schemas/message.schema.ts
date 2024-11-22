import z from 'zod'

const text = z.string().min(1).max(500);
const image = z.string().url().optional();

export const messageShema = z.object({
  text,
  image
})

export type MessageData = z.infer<typeof messageShema>;