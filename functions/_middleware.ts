import { isAdminPath, isAuthorized } from '../server/auth';
import type { PagesContext } from '../server/types';

export async function onRequest(context: PagesContext): Promise<Response> {
  const { pathname } = new URL(context.request.url);
  if (!isAdminPath(pathname)) return context.next();

  if (!(await isAuthorized(context.request, context.env.ADMIN_PASSWORD))) {
    return new Response('Authentication required.', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="NVFR LDI Admin", charset="UTF-8"',
        'Cache-Control': 'no-store',
        'X-Robots-Tag': 'noindex',
      },
    });
  }

  const response = await context.next();
  const headers = new Headers(response.headers);
  headers.set('Cache-Control', 'no-store');
  headers.set('X-Robots-Tag', 'noindex');
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
