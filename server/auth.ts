export const ADMIN_USERNAME = 'admin';

export function isAdminPath(pathname: string): boolean {
  return pathname === '/admin' || pathname.startsWith('/admin/') || pathname.startsWith('/api/admin/');
}

async function digest(value: string): Promise<Uint8Array> {
  return new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value)));
}

async function safeEqual(a: string, b: string): Promise<boolean> {
  const [left, right] = await Promise.all([digest(a), digest(b)]);
  let diff = 0;
  for (let i = 0; i < left.length; i++) diff |= left[i] ^ right[i];
  return diff === 0;
}

function decodeBasicCredentials(header: string | null): { username: string; password: string } | null {
  if (!header?.startsWith('Basic ')) return null;
  try {
    const bytes = Uint8Array.from(atob(header.slice(6).trim()), (c) => c.charCodeAt(0));
    const decoded = new TextDecoder().decode(bytes);
    const separator = decoded.indexOf(':');
    if (separator === -1) return null;
    return { username: decoded.slice(0, separator), password: decoded.slice(separator + 1) };
  } catch {
    return null;
  }
}

export async function isAuthorized(request: Request, adminPassword: string | undefined): Promise<boolean> {
  if (!adminPassword) return false;
  const credentials = decodeBasicCredentials(request.headers.get('Authorization'));
  if (!credentials) return false;
  const [userOk, passwordOk] = await Promise.all([
    safeEqual(credentials.username, ADMIN_USERNAME),
    safeEqual(credentials.password, adminPassword),
  ]);
  return userOk && passwordOk;
}
