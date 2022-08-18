import { ServerRouter } from '@/server/router';
import { createReactQueryHooks } from '@trpc/react';

const trpc: ReturnType<typeof createReactQueryHooks<ServerRouter>> =
  createReactQueryHooks<ServerRouter>();
export { trpc };
