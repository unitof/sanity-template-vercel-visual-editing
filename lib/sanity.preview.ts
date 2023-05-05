import { draftMode } from 'next/headers'

export const shouldPreviewDrafts = () =>
  process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production' || draftMode().isEnabled
