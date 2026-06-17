const nextConfig = require('../next.config.js');

describe('security headers', () => {
  it('configures baseline browser security headers', async () => {
    const [headerConfig] = await nextConfig.headers();
    const headers = Object.fromEntries(
      headerConfig.headers.map(({ key, value }: { key: string; value: string }) => [key, value])
    );

    expect(headers).toMatchObject({
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      'X-DNS-Prefetch-Control': 'on',
    });
    expect(headers['Content-Security-Policy']).toContain("object-src 'none'");
    expect(headers['Content-Security-Policy']).toContain("frame-ancestors 'none'");
  });
});
