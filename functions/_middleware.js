// Cloudflare Pages Functions - BASIC認証ミドルウェア

const AUTH_USER = "admin";
const AUTH_PASS = "sharework2026";

async function handleRequest(context) {
  const authorization = context.request.headers.get("Authorization");

  if (authorization) {
    const [scheme, encoded] = authorization.split(" ");
    if (scheme === "Basic") {
      const decoded = atob(encoded);
      const [user, pass] = decoded.split(":");
      if (user === AUTH_USER && pass === AUTH_PASS) {
        return await context.next();
      }
    }
  }

  return new Response("認証が必要です", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="商談管理ダッシュボード", charset="UTF-8"',
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

export const onRequest = [handleRequest];
