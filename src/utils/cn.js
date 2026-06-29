import { clsx } from 'clsx';

/**
 * cn – merge class names using clsx.
 * Usage: cn('base', condition && 'conditional', { active: isActive })
 */
export function cn(...inputs) {
  return clsx(...inputs);
}
