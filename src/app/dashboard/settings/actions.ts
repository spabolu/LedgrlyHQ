'use server'

import { revalidatePath } from 'next/cache'

export async function syncEtsyData() {
  // Invalidate the cache for the main pages
  revalidatePath('/dashboard')
  revalidatePath('/dashboard/transactions')
  revalidatePath('/dashboard/products')
  console.log('Etsy data sync triggered and cache revalidated.')
} 