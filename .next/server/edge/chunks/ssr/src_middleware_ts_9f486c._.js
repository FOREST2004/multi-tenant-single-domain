(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/ssr/src_middleware_ts_9f486c._.js", {

"[project]/src/middleware.ts [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "config": ()=>config,
    "middleware": ()=>middleware
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/api/server.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
async function middleware(req) {
    const host = (req.headers.get('host') ?? '').replace(/:.*$/, '') // bỏ port: "vinwonders.local:3000" → "vinwonders.local"
    ;
    const pathname = req.nextUrl.pathname;
    console.log('🫑🫑 HOST::::: ', host);
    console.log('🫑🫑 PATHNAME::::: ', pathname);
    // ── BƯỚC 1: Bỏ qua các route không cần xử lý ──────────────────────────
    if (pathname.startsWith('/admin') || pathname.startsWith('/api') || pathname.startsWith('/_next')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    // ── BƯỚC 2: Bỏ qua localhost (môi trường dev) ─────────────────────────
    if (host.startsWith('localhost') || host.startsWith('127.0.0.1')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    // ── BƯỚC 3: Tra cứu tenant theo domain ────────────────────────────────
    const serverUrl = ("TURBOPACK compile-time value", "http://localhost:3000");
    const res = await fetch(`${serverUrl}/api/tenants?where[domain][equals]=${host}&limit=1`, {
        next: {
            revalidate: 60
        }
    });
    console.log('🫑🫑 RES::::: ', res);
    if (!res.ok) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"]('Server error', {
            status: 502
        });
    }
    const json = await res.json();
    const tenant = json?.docs?.[0];
    console.log('🫑🫑 JSON::::: ', json);
    console.log('🫑🫑 TENANT::::: ', tenant);
    // ── BƯỚC 4: Không tìm thấy tenant → trả về 404 ────────────────────────
    if (!tenant) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"]('Tenant not found', {
            status: 404
        });
    }
    // ── BƯỚC 5: Gắn tenant info vào header → Next.js đọc trong layout/page ──
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-tenant-domain', tenant.domain);
    // requestHeaders.set('x-tenant-slug', tenant.slug)
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].next({
        request: {
            headers: requestHeaders
        }
    });
}
const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico).*)'
    ]
};

})()),
}]);

//# sourceMappingURL=src_middleware_ts_9f486c._.js.map