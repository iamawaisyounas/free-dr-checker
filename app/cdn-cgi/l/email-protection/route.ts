export function GET() {
  return new Response(null, {
    status: 410,
    headers: {
      "X-Robots-Tag": "noindex, nofollow, noarchive"
    }
  });
}
