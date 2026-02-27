import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const host = (req.headers.get('host') ?? '').replace(/:.*$/, '') // bỏ port: "vinwonders.local:3000" → "vinwonders.local"
  const pathname = req.nextUrl.pathname


  console.log('🫑🫑 HOST::::: ', host)
  console.log('🫑🫑 PATHNAME::::: ', pathname)

  

  // ── BƯỚC 1: Bỏ qua các route không cần xử lý ──────────────────────────
  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next')
  ) {
    return NextResponse.next()
  }

  // ── BƯỚC 2: Bỏ qua localhost (môi trường dev) ─────────────────────────
  if (host.startsWith('localhost') || host.startsWith('127.0.0.1')) {
    return NextResponse.next()
  }

  // ── BƯỚC 3: Tra cứu tenant theo domain ────────────────────────────────
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL
  const res = await fetch(
    `${serverUrl}/api/tenants?where[domain][equals]=${host}&limit=1`,
    { next: { revalidate: 60 } },
  )
  console.log('🫑🫑 RES::::: ', res)

  if (!res.ok) {
    return new NextResponse('Server error', { status: 502 })
  }

  const json = await res.json()
  const tenant = json?.docs?.[0]
  console.log('🫑🫑 JSON::::: ', json)
  console.log('🫑🫑 TENANT::::: ', tenant)

  // ── BƯỚC 4: Không tìm thấy tenant → trả về 404 ────────────────────────
  if (!tenant) {
    return new NextResponse('Tenant not found', { status: 404 })
  }

  // ── BƯỚC 5: Gắn tenant info vào header → Next.js đọc trong layout/page ──
  const requestHeaders = new Headers(req.headers)
  requestHeaders.set('x-tenant-domain', tenant.domain)
  // requestHeaders.set('x-tenant-slug', tenant.slug)

  return NextResponse.next({ request: { headers: requestHeaders } })
}

// Middleware chỉ chạy cho các route này, bỏ qua file ảnh, font, favicon...
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
