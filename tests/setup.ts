// Vitest doesn't read .env.local (that's a Next.js dev-server convention),
// so src/lib/env.ts's validation needs these set directly for any test that
// transitively imports content/local data. Values are inert test
// placeholders, never real credentials.
process.env.RESEND_API_KEY ??= "re_test_placeholder";
process.env.INQUIRY_TO_EMAIL ??= "test@example.com";
process.env.INQUIRY_FROM_EMAIL ??= "test@example.com";
process.env.NEXT_PUBLIC_SITE_URL ??= "http://localhost:3000";
process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ??= "923000000000";
