import { twMerge } from 'tailwind-merge'
import { cx } from 'classix'

/**
 cn utilizes classix and tailwind-merge libraries to consolidate and deduplicate multiple CSS class names or values. 
 It accepts multiple arguments, combines them using classix's cx function into one class name string, and then 
 deduplicates overlapping classes with tailwind-merge's twMerge, resulting in a single, optimized class name string.
 * @param {...string} args - CSS class names or values to process.
 * @returns {string} - The optimized and merged class name string.
 */

export function cn(...args) {
  return twMerge(cx(...args))
}
