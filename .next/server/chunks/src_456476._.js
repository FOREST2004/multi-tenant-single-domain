module.exports = {

"[project]/src/cms/access/isSuperAdmin.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "isSuperAdmin": ()=>isSuperAdmin
});
const isSuperAdmin = ({ req })=>{
    if (!req?.user) return false;
    return Boolean(req.user.roles?.includes('super-admin'));
};

})()),
"[project]/src/cms/collections/Users/access/isAccessingSelf.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "isAccessingSelf": ()=>isAccessingSelf
});
const isAccessingSelf = ({ req, id })=>{
    if (!req?.user) return false;
    return req.user.id === id;
};

})()),
"[project]/src/cms/collections/Users/access/isSuperAdminOrSelf.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "isSuperAdminOrSelf": ()=>isSuperAdminOrSelf
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$access$2f$isSuperAdmin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/cms/access/isSuperAdmin.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$collections$2f$Users$2f$access$2f$isAccessingSelf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/cms/collections/Users/access/isAccessingSelf.ts [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
const isSuperAdminOrSelf = (args)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$access$2f$isSuperAdmin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSuperAdmin"])(args) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$collections$2f$Users$2f$access$2f$isAccessingSelf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isAccessingSelf"])(args);

})()),
"[project]/src/cms/utilities/getTenantAccessIDs.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "getTenantAccessIDs": ()=>getTenantAccessIDs
});
const getTenantAccessIDs = (user)=>{
    if (!user) return [];
    return user?.tenants?.reduce((acc, { tenant })=>{
        if (tenant) {
            acc.push(typeof tenant === 'string' ? tenant : tenant.id);
        }
        return acc;
    }, []) || [];
};

})()),
"[project]/src/cms/collections/Users/hooks/ensureUniqueUsername.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "ensureUniqueUsername": ()=>ensureUniqueUsername
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$errors$2f$ValidationError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/payload/dist/errors/ValidationError.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$utilities$2f$getTenantAccessIDs$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/cms/utilities/getTenantAccessIDs.ts [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
const ensureUniqueUsername = async ({ value, req, originalDoc, data })=>{
    // if value is unchanged, skip validation
    if (originalDoc.username === value) return value;
    const incomingTenantID = typeof data?.tenant === 'object' ? data.tenant.id : data?.tenant;
    const currentTenantID = typeof originalDoc?.tenant === 'object' ? originalDoc.tenant.id : originalDoc?.tenant;
    const tenantIDToMatch = incomingTenantID || currentTenantID;
    const findDuplicateUsers = await req.payload.find({
        collection: 'users',
        where: {
            and: [
                {
                    'tenants.tenant': {
                        equals: tenantIDToMatch
                    }
                },
                {
                    username: {
                        equals: value
                    }
                }
            ]
        }
    });
    if (findDuplicateUsers.docs.length > 0 && req.user) {
        const tenantIDs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$utilities$2f$getTenantAccessIDs$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getTenantAccessIDs"])(req.user);
        // if the user is an admin or has access to more than 1 tenant
        // provide a more specific error message
        if (req.user.roles?.includes('super-admin') || tenantIDs.length > 1) {
            const attemptedTenantChange = await req.payload.findByID({
                collection: 'tenants',
                id: tenantIDToMatch
            });
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$errors$2f$ValidationError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ValidationError"]({
                errors: [
                    {
                        field: 'username',
                        message: `The "${attemptedTenantChange.name}" tenant already has a user with the username "${value}". Usernames must be unique per tenant.`
                    }
                ]
            });
        }
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$errors$2f$ValidationError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ValidationError"]({
            errors: [
                {
                    field: 'username',
                    message: `A user with the username ${value} already exists. Usernames must be unique per tenant.`
                }
            ]
        });
    }
    return value;
};

})()),
"[project]/src/cms/collections/Users/endpoints/externalUsersLogin.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "externalUsersLogin": ()=>externalUsersLogin
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$exports$2f$utilities$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/exports/utilities.js [app-route] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$headersWithCors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/utilities/headersWithCors.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$errors$2f$APIError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/payload/dist/errors/APIError.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$auth$2f$cookies$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/payload/dist/auth/cookies.js [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
const externalUsersLogin = {
    path: '/external-users/login',
    method: 'post',
    handler: async (req)=>{
        let data = {};
        try {
            if (typeof req.json === 'function') {
                data = await req.json();
            }
        } catch (error) {}
        const { username, password, tenantSlug } = data;
        if (!username || !password) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$errors$2f$APIError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]('Username and Password are required for login.', 400, null, true);
        }
        const fullTenant = (await req.payload.find({
            collection: 'tenants',
            overrideAccess: true,
            where: {
                slug: {
                    equals: tenantSlug
                }
            }
        })).docs[0];
        if (!fullTenant) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$errors$2f$APIError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"](`Tenant "${tenantSlug}" not found.`, 400, null, true);
        }
        // Split into 2 queries to avoid duplicate JOIN alias bug in db-postgres beta
        let foundUser = await req.payload.find({
            collection: 'users',
            where: {
                and: [
                    {
                        username: {
                            equals: username
                        }
                    },
                    {
                        'tenants.tenant': {
                            equals: fullTenant.id
                        }
                    }
                ]
            }
        });
        if (foundUser.totalDocs === 0) {
            foundUser = await req.payload.find({
                collection: 'users',
                where: {
                    and: [
                        {
                            email: {
                                equals: username
                            }
                        },
                        {
                            'tenants.tenant': {
                                equals: fullTenant.id
                            }
                        }
                    ]
                }
            });
        }
        if (foundUser.totalDocs > 0) {
            try {
                const loginAttempt = await req.payload.login({
                    collection: 'users',
                    data: {
                        email: foundUser.docs[0].email,
                        password
                    },
                    req
                });
                if (loginAttempt?.token) {
                    const collection = req.payload.collections['users'];
                    const cookie = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$auth$2f$cookies$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generatePayloadCookie"])({
                        collectionConfig: collection.config,
                        payload: req.payload,
                        token: loginAttempt.token
                    });
                    return Response.json(loginAttempt, {
                        headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$utilities$2f$headersWithCors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["headersWithCors"])({
                            headers: new Headers({
                                'Set-Cookie': cookie
                            }),
                            req
                        }),
                        status: 200
                    });
                }
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$errors$2f$APIError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]('Unable to login with the provided username and password.', 400, null, true);
            } catch (e) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$errors$2f$APIError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]('Unable to login with the provided username and password.', 400, null, true);
            }
        }
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$errors$2f$APIError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APIError"]('Unable to login with the provided username and password.', 400, null, true);
    }
};

})()),
"[project]/src/cms/collections/Users/index.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$access$2f$isSuperAdmin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/cms/access/isSuperAdmin.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$collections$2f$Users$2f$access$2f$isSuperAdminOrSelf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/cms/collections/Users/access/isSuperAdminOrSelf.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$collections$2f$Users$2f$hooks$2f$ensureUniqueUsername$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/cms/collections/Users/hooks/ensureUniqueUsername.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$collections$2f$Users$2f$endpoints$2f$externalUsersLogin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/cms/collections/Users/endpoints/externalUsersLogin.ts [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
const Users = {
    slug: 'users',
    auth: true,
    admin: {
        useAsTitle: 'email'
    },
    access: {
        create: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$access$2f$isSuperAdmin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSuperAdmin"],
        read: (args)=>{
            const { req } = args;
            if (!req?.user) return false;
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$access$2f$isSuperAdmin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSuperAdmin"])(args)) return true;
            return {
                id: {
                    equals: req.user.id
                }
            };
        },
        update: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$collections$2f$Users$2f$access$2f$isSuperAdminOrSelf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSuperAdminOrSelf"],
        delete: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$access$2f$isSuperAdmin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSuperAdmin"]
    },
    fields: [
        {
            name: 'roles',
            type: 'select',
            hasMany: true,
            defaultValue: [
                'user'
            ],
            options: [
                'super-admin',
                'user'
            ]
        },
        {
            name: 'tenants',
            type: 'array',
            access: {
                create: ({ req })=>{
                    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$access$2f$isSuperAdmin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSuperAdmin"])({
                        req
                    })) return true;
                    return false;
                },
                update: ({ req })=>{
                    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$access$2f$isSuperAdmin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSuperAdmin"])({
                        req
                    })) return true;
                    return false;
                }
            },
            fields: [
                {
                    name: 'tenant',
                    type: 'relationship',
                    relationTo: 'tenants',
                    index: true,
                    saveToJWT: true
                },
                {
                    name: 'roles',
                    type: 'select',
                    hasMany: true,
                    defaultValue: [
                        'viewer'
                    ],
                    options: [
                        'super-admin',
                        'viewer'
                    ]
                }
            ]
        },
        {
            name: 'username',
            type: 'text',
            index: true,
            hooks: {
                beforeValidate: [
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$collections$2f$Users$2f$hooks$2f$ensureUniqueUsername$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ensureUniqueUsername"]
                ]
            }
        }
    ],
    endpoints: [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$collections$2f$Users$2f$endpoints$2f$externalUsersLogin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["externalUsersLogin"]
    ]
};
const __TURBOPACK__default__export__ = Users;

})()),
"[project]/src/cms/collections/Tenants/access/read.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "tenantRead": ()=>tenantRead
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$access$2f$isSuperAdmin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/cms/access/isSuperAdmin.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$utilities$2f$getTenantAccessIDs$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/cms/utilities/getTenantAccessIDs.ts [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
const tenantRead = (args)=>{
    const req = args.req;
    // Internal middleware secret → bypass access control (dùng để tra cứu tenant theo domain)
    const internalSecret = req.headers.get('x-internal-secret');
    if (internalSecret && internalSecret === process.env.INTERNAL_MIDDLEWARE_SECRET) return true;
    // Super admin can read all
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$access$2f$isSuperAdmin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSuperAdmin"])(args)) return true;
    const tenantIDs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$utilities$2f$getTenantAccessIDs$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getTenantAccessIDs"])(req.user);
    // Allow public tenants to be read by anyone
    const publicConstraint = {
        public: {
            equals: true
        }
    };
    // If a user has tenant ID access, 
    // return constraint to allow them to read those tenants
    if (tenantIDs.length) {
        return {
            or: [
                publicConstraint,
                {
                    id: {
                        in: tenantIDs
                    }
                }
            ]
        };
    }
    return publicConstraint;
};

})()),
"[project]/src/cms/collections/Tenants/index.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "Tenants": ()=>Tenants
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$access$2f$isSuperAdmin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/cms/access/isSuperAdmin.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$collections$2f$Tenants$2f$access$2f$read$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/cms/collections/Tenants/access/read.ts [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
const Tenants = {
    slug: 'tenants',
    admin: {
        useAsTitle: 'name'
    },
    access: {
        create: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$access$2f$isSuperAdmin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSuperAdmin"],
        read: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$collections$2f$Tenants$2f$access$2f$read$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tenantRead"],
        update: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$access$2f$isSuperAdmin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSuperAdmin"],
        delete: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$access$2f$isSuperAdmin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSuperAdmin"]
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true
        },
        {
            name: 'slug',
            admin: {
                description: 'Used for url paths, example: /tenant-slug/page-slug'
            },
            type: 'text',
            required: true,
            index: true
        },
        {
            name: 'domain',
            admin: {
                description: 'Custom domain for this tenant, example: phuongtrang.com',
                position: 'sidebar'
            },
            type: 'text',
            index: true
        },
        {
            admin: {
                position: 'sidebar',
                description: 'If checked, logging in is not required.'
            },
            name: 'public',
            type: 'checkbox',
            defaultValue: false,
            index: true
        }
    ]
};

})()),
"[project]/src/cms/components/TenantSelector/index.client.tsx (client proxy)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "TenantSelector": ()=>TenantSelector
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const TenantSelector = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call TenantSelector() from the server but TenantSelector is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/cms/components/TenantSelector/index.client.tsx", "TenantSelector");

})()),
"[project]/src/cms/components/TenantSelector/index.client.tsx [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$components$2f$TenantSelector$2f$index$2e$client$2e$tsx__$28$client__proxy$29$__ = __turbopack_import__("[project]/src/cms/components/TenantSelector/index.client.tsx (client proxy)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
__turbopack_export_namespace__(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$components$2f$TenantSelector$2f$index$2e$client$2e$tsx__$28$client__proxy$29$__);

})()),
"[project]/src/cms/components/TenantSelector/index.tsx [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "TenantSelectorRSC": ()=>TenantSelectorRSC
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$components$2f$TenantSelector$2f$index$2e$client$2e$tsx__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/cms/components/TenantSelector/index.client.tsx [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
const TenantSelectorRSC = ()=>{
    const cookies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$components$2f$TenantSelector$2f$index$2e$client$2e$tsx__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TenantSelector"], {
        initialCookie: cookies.get("payload-tenant")?.value
    }, void 0, false, {
        fileName: "[project]/src/cms/components/TenantSelector/index.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
};

})()),
"[project]/src/cms/fields/TenantField/access/update.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "tenantFieldUpdate": ()=>tenantFieldUpdate
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$access$2f$isSuperAdmin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/cms/access/isSuperAdmin.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$utilities$2f$getTenantAccessIDs$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/cms/utilities/getTenantAccessIDs.ts [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
const tenantFieldUpdate = (args)=>{
    const tenantIDs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$utilities$2f$getTenantAccessIDs$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getTenantAccessIDs"])(args.req.user);
    return Boolean((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$access$2f$isSuperAdmin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSuperAdmin"])(args) || tenantIDs.length > 0);
};

})()),
"[project]/src/cms/fields/TenantField/hooks/autofillTenant.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "autofillTenant": ()=>autofillTenant
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$utilities$2f$getTenantAccessIDs$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/cms/utilities/getTenantAccessIDs.ts [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const autofillTenant = ({ req, value })=>{
    // If there is no value,
    // and the user only has one tenant,
    // return that tenant ID as the value
    if (!value) {
        const tenantIDs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$utilities$2f$getTenantAccessIDs$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getTenantAccessIDs"])(req.user);
        if (tenantIDs.length === 1) return tenantIDs[0];
    }
    return value;
};

})()),
"[project]/src/cms/fields/TenantField/components/Field.tsx (client proxy)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "TenantFieldComponent": ()=>TenantFieldComponent
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const TenantFieldComponent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$future$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call TenantFieldComponent() from the server but TenantFieldComponent is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/cms/fields/TenantField/components/Field.tsx", "TenantFieldComponent");

})()),
"[project]/src/cms/fields/TenantField/components/Field.tsx [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$fields$2f$TenantField$2f$components$2f$Field$2e$tsx__$28$client__proxy$29$__ = __turbopack_import__("[project]/src/cms/fields/TenantField/components/Field.tsx (client proxy)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
__turbopack_export_namespace__(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$fields$2f$TenantField$2f$components$2f$Field$2e$tsx__$28$client__proxy$29$__);

})()),
"[project]/src/cms/fields/TenantField/index.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "tenantField": ()=>tenantField
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$fields$2f$TenantField$2f$access$2f$update$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/cms/fields/TenantField/access/update.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$fields$2f$TenantField$2f$hooks$2f$autofillTenant$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/cms/fields/TenantField/hooks/autofillTenant.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$fields$2f$TenantField$2f$components$2f$Field$2e$tsx__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/cms/fields/TenantField/components/Field.tsx [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$access$2f$isSuperAdmin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/cms/access/isSuperAdmin.ts [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
const tenantField = {
    name: 'tenant',
    type: 'relationship',
    index: true,
    relationTo: 'tenants',
    hasMany: false,
    required: true,
    access: {
        read: ()=>true,
        update: (args)=>{
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$access$2f$isSuperAdmin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSuperAdmin"])(args)) return true;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$fields$2f$TenantField$2f$access$2f$update$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tenantFieldUpdate"])(args);
        }
    },
    hooks: {
        beforeValidate: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$fields$2f$TenantField$2f$hooks$2f$autofillTenant$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["autofillTenant"]
        ]
    },
    admin: {
        position: 'sidebar',
        components: {
            Field: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$fields$2f$TenantField$2f$components$2f$Field$2e$tsx__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TenantFieldComponent"]
        }
    }
};

})()),
"[project]/src/cms/collections/Pages/access/byTenant.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "byTenant": ()=>byTenant
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$auth$2f$cookies$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/payload/dist/auth/cookies.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$access$2f$isSuperAdmin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/cms/access/isSuperAdmin.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$utilities$2f$getTenantAccessIDs$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/cms/utilities/getTenantAccessIDs.ts [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
const byTenant = (args)=>{
    const req = args.req;
    const cookies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$auth$2f$cookies$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseCookies"])(req.headers);
    const superAdmin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$access$2f$isSuperAdmin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSuperAdmin"])(args);
    const selectedTenant = cookies.get('payload-tenant');
    const tenantAccessIDs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$utilities$2f$getTenantAccessIDs$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getTenantAccessIDs"])(req.user);
    // First check for manually selected tenant from cookies
    if (selectedTenant) {
        // If it's a super admin,
        // give them read access to only pages for that tenant
        if (superAdmin) {
            return {
                tenant: {
                    equals: selectedTenant
                }
            };
        }
        const hasTenantAccess = tenantAccessIDs.some((id)=>id === selectedTenant);
        // If NOT super admin,
        // give them access only if they have access to tenant ID set in cookie
        if (hasTenantAccess) {
            return {
                tenant: {
                    equals: selectedTenant
                }
            };
        }
    }
    // If no manually selected tenant,
    // but it is a super admin, give access to all
    if (superAdmin) {
        return true;
    }
    // If not super admin, 
    // but has access to tenants,
    // give access to only their own tenants
    if (tenantAccessIDs.length) {
        return {
            tenant: {
                in: tenantAccessIDs
            }
        };
    }
    // Deny access to all others
    return false;
};

})()),
"[project]/src/cms/collections/Pages/hooks/ensureUniqueSlug.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "ensureUniqueSlug": ()=>ensureUniqueSlug
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$errors$2f$ValidationError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/payload/dist/errors/ValidationError.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$utilities$2f$getTenantAccessIDs$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/cms/utilities/getTenantAccessIDs.ts [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
const ensureUniqueSlug = async ({ value, req, originalDoc, data })=>{
    // if value is unchanged, skip validation
    if (originalDoc.slug === value) return value;
    const incomingTenantID = typeof data?.tenant === 'object' ? data.tenant.id : data?.tenant;
    const currentTenantID = typeof originalDoc?.tenant === 'object' ? originalDoc.tenant.id : originalDoc?.tenant;
    const tenantIDToMatch = incomingTenantID || currentTenantID;
    const findDuplicatePages = await req.payload.find({
        collection: 'pages',
        where: {
            and: [
                {
                    tenant: {
                        equals: tenantIDToMatch
                    }
                },
                {
                    slug: {
                        equals: value
                    }
                }
            ]
        }
    });
    if (findDuplicatePages.docs.length > 0 && req.user) {
        const tenantIDs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$utilities$2f$getTenantAccessIDs$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getTenantAccessIDs"])(req.user);
        // if the user is an admin or has access to more than 1 tenant
        // provide a more specific error message
        if (req.user.roles?.includes('super-admin') || tenantIDs.length > 1) {
            const attemptedTenantChange = await req.payload.findByID({
                collection: 'tenants',
                id: tenantIDToMatch
            });
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$errors$2f$ValidationError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ValidationError"]({
                errors: [
                    {
                        field: 'slug',
                        message: `The "${attemptedTenantChange.name}" tenant already has a page with the slug "${value}". Slugs must be unique per tenant.`
                    }
                ]
            });
        }
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$errors$2f$ValidationError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ValidationError"]({
            errors: [
                {
                    field: 'slug',
                    message: `A page with the slug ${value} already exists. Slug must be unique per tenant.`
                }
            ]
        });
    }
    return value;
};

})()),
"[project]/src/cms/collections/Pages/access/externalReadAccess.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "externalReadAccess": ()=>externalReadAccess
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$auth$2f$cookies$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/payload/dist/auth/cookies.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$access$2f$isSuperAdmin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/cms/access/isSuperAdmin.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$utilities$2f$getTenantAccessIDs$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/cms/utilities/getTenantAccessIDs.ts [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
const externalReadAccess = (args)=>{
    const req = args.req;
    const cookies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$auth$2f$cookies$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseCookies"])(req.headers);
    const superAdmin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$access$2f$isSuperAdmin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSuperAdmin"])(args);
    const selectedTenant = cookies.get('payload-tenant');
    const tenantAccessIDs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$utilities$2f$getTenantAccessIDs$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getTenantAccessIDs"])(req.user);
    const publicPageConstraint = {
        'tenant.public': {
            equals: true
        }
    };
    // First check for manually selected tenant from cookies
    if (selectedTenant) {
        // If it's a super admin,
        // give them read access to only pages for that tenant
        if (superAdmin) {
            return {
                or: [
                    publicPageConstraint,
                    {
                        tenant: {
                            equals: selectedTenant
                        }
                    }
                ]
            };
        }
        const hasTenantAccess = tenantAccessIDs.some((id)=>id === selectedTenant);
        // If NOT super admin,
        // give them access only if they have access to tenant ID set in cookie
        if (hasTenantAccess) {
            return {
                or: [
                    publicPageConstraint,
                    {
                        tenant: {
                            equals: selectedTenant
                        }
                    }
                ]
            };
        }
    }
    // If no manually selected tenant,
    // but it is a super admin, give access to all
    if (superAdmin) {
        return true;
    }
    // If not super admin, 
    // but has access to tenants,
    // give access to only their own tenants
    if (tenantAccessIDs.length) {
        return {
            or: [
                publicPageConstraint,
                {
                    tenant: {
                        in: tenantAccessIDs
                    }
                }
            ]
        };
    }
    // Allow access to public pages
    return publicPageConstraint;
};

})()),
"[project]/src/cms/utilities/isPayloadAdminPanel.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "isPayloadAdminPanel": ()=>isPayloadAdminPanel
});
const isPayloadAdminPanel = (req)=>{
    return req.headers.has('referer') && req.headers.get('referer')?.startsWith(`${("TURBOPACK compile-time value", "http://localhost:3000")}${req.payload.config.routes.admin}`);
};

})()),
"[project]/src/cms/collections/Pages/index.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "Pages": ()=>Pages
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$fields$2f$TenantField$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/cms/fields/TenantField/index.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$collections$2f$Pages$2f$access$2f$byTenant$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/cms/collections/Pages/access/byTenant.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$collections$2f$Pages$2f$hooks$2f$ensureUniqueSlug$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/cms/collections/Pages/hooks/ensureUniqueSlug.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$collections$2f$Pages$2f$access$2f$externalReadAccess$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/cms/collections/Pages/access/externalReadAccess.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$utilities$2f$isPayloadAdminPanel$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/cms/utilities/isPayloadAdminPanel.ts [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
const Pages = {
    slug: 'pages',
    admin: {
        useAsTitle: 'title'
    },
    access: {
        update: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$collections$2f$Pages$2f$access$2f$byTenant$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["byTenant"],
        read: async (args)=>{
            // when viewing pages inside the admin panel
            // restrict access to the ones your user has access to
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$utilities$2f$isPayloadAdminPanel$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isPayloadAdminPanel"])(args.req)) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$collections$2f$Pages$2f$access$2f$byTenant$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["byTenant"])(args);
            // when viewing pages from outside the admin panel
            // you should be able to see your tenants and public tenants
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$collections$2f$Pages$2f$access$2f$externalReadAccess$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["externalReadAccess"])(args);
        },
        delete: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$collections$2f$Pages$2f$access$2f$byTenant$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["byTenant"]
    },
    fields: [
        {
            name: 'title',
            type: 'text'
        },
        {
            name: 'slug',
            type: 'text',
            index: true,
            defaultValue: 'home',
            hooks: {
                beforeValidate: [
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$collections$2f$Pages$2f$hooks$2f$ensureUniqueSlug$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ensureUniqueSlug"]
                ]
            }
        },
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$fields$2f$TenantField$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tenantField"]
    ]
};

})()),
"[project]/src/cms/collections/Tickets/index.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "Tickets": ()=>Tickets
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$fields$2f$TenantField$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/cms/fields/TenantField/index.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$collections$2f$Pages$2f$access$2f$byTenant$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/cms/collections/Pages/access/byTenant.ts [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
const Tickets = {
    slug: 'tickets',
    admin: {
        useAsTitle: 'name'
    },
    access: {
        read: ()=>true,
        create: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$collections$2f$Pages$2f$access$2f$byTenant$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["byTenant"],
        update: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$collections$2f$Pages$2f$access$2f$byTenant$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["byTenant"],
        delete: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$collections$2f$Pages$2f$access$2f$byTenant$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["byTenant"]
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true
        },
        {
            name: 'description',
            type: 'textarea'
        },
        {
            name: 'price',
            type: 'number',
            required: true
        },
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$fields$2f$TenantField$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tenantField"]
    ]
};

})()),
"[project]/src/cms/collections/SiteSettings/index.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "SiteSettings": ()=>SiteSettings
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$fields$2f$TenantField$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/cms/fields/TenantField/index.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$collections$2f$Pages$2f$access$2f$byTenant$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/cms/collections/Pages/access/byTenant.ts [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
const SiteSettings = {
    slug: 'site-settings',
    admin: {
        useAsTitle: 'tenant',
        description: 'Cấu hình giao diện (header, footer) cho từng tenant.'
    },
    access: {
        read: ()=>true,
        create: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$collections$2f$Pages$2f$access$2f$byTenant$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["byTenant"],
        update: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$collections$2f$Pages$2f$access$2f$byTenant$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["byTenant"],
        delete: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$collections$2f$Pages$2f$access$2f$byTenant$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["byTenant"]
    },
    fields: [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$fields$2f$TenantField$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tenantField"],
        // ── Header ────────────────────────────────────────────────────────────
        {
            name: 'header',
            type: 'group',
            label: 'Header',
            fields: [
                {
                    name: 'enabled',
                    type: 'checkbox',
                    label: 'Hiển thị header',
                    defaultValue: true
                },
                {
                    name: 'topBar',
                    type: 'group',
                    label: 'Top Bar (thanh nhỏ phía trên)',
                    admin: {
                        condition: (data)=>data?.header?.enabled
                    },
                    fields: [
                        {
                            name: 'enabled',
                            type: 'checkbox',
                            label: 'Hiển thị top bar',
                            defaultValue: false
                        },
                        {
                            name: 'leftText',
                            type: 'text',
                            label: 'Text bên trái',
                            admin: {
                                condition: (data)=>data?.header?.topBar?.enabled
                            }
                        },
                        {
                            name: 'rightText',
                            type: 'text',
                            label: 'Text bên phải',
                            admin: {
                                condition: (data)=>data?.header?.topBar?.enabled
                            }
                        }
                    ]
                },
                {
                    name: 'logoText',
                    type: 'text',
                    label: 'Logo text (để trống = dùng tên tenant)',
                    admin: {
                        condition: (data)=>data?.header?.enabled
                    }
                },
                {
                    name: 'navLinks',
                    type: 'array',
                    label: 'Các link trong navigation',
                    admin: {
                        condition: (data)=>data?.header?.enabled
                    },
                    fields: [
                        {
                            name: 'label',
                            type: 'text',
                            label: 'Tên hiển thị',
                            required: true
                        },
                        {
                            name: 'url',
                            type: 'text',
                            label: 'Đường dẫn (vd: /funpark/tickets)',
                            required: true
                        }
                    ]
                }
            ]
        },
        // ── Theme ─────────────────────────────────────────────────────────────
        {
            name: 'theme',
            type: 'group',
            label: 'Theme & Màu sắc',
            fields: [
                {
                    name: 'primaryColor',
                    type: 'text',
                    label: 'Màu chính (hex, vd: #e84118)',
                    defaultValue: '#e84118',
                    admin: {
                        description: 'Dùng cho header, nút bấm, giá vé'
                    }
                },
                {
                    name: 'darkColor',
                    type: 'text',
                    label: 'Màu nền tối (hex, vd: #1a1a2e)',
                    defaultValue: '#1a1a2e',
                    admin: {
                        description: 'Dùng cho footer, header trang vé'
                    }
                },
                {
                    name: 'heroBgFrom',
                    type: 'text',
                    label: 'Hero gradient — màu bắt đầu (hex)',
                    defaultValue: '#e84118'
                },
                {
                    name: 'heroBgTo',
                    type: 'text',
                    label: 'Hero gradient — màu kết thúc (hex)',
                    defaultValue: '#ffb347'
                },
                {
                    name: 'cardRadius',
                    type: 'text',
                    label: 'Bo góc card (vd: 16px, 8px, 0px)',
                    defaultValue: '16px'
                },
                {
                    name: 'fontFamily',
                    type: 'select',
                    label: 'Font chữ',
                    defaultValue: 'segoe',
                    options: [
                        {
                            label: 'Segoe UI (mặc định)',
                            value: 'segoe'
                        },
                        {
                            label: 'Inter',
                            value: 'inter'
                        },
                        {
                            label: 'Roboto',
                            value: 'roboto'
                        },
                        {
                            label: 'Merriweather (serif)',
                            value: 'merriweather'
                        }
                    ]
                }
            ]
        },
        // ── Footer ────────────────────────────────────────────────────────────
        {
            name: 'footer',
            type: 'group',
            label: 'Footer',
            fields: [
                {
                    name: 'enabled',
                    type: 'checkbox',
                    label: 'Hiển thị footer',
                    defaultValue: true
                },
                {
                    name: 'copyrightText',
                    type: 'text',
                    label: 'Dòng bản quyền (để trống = tự động)',
                    admin: {
                        condition: (data)=>data?.footer?.enabled
                    }
                },
                {
                    name: 'columns',
                    type: 'array',
                    label: 'Cột nội dung',
                    admin: {
                        condition: (data)=>data?.footer?.enabled
                    },
                    fields: [
                        {
                            name: 'title',
                            type: 'text',
                            label: 'Tiêu đề cột'
                        },
                        {
                            name: 'content',
                            type: 'textarea',
                            label: 'Nội dung (mỗi dòng là một mục)'
                        }
                    ]
                }
            ]
        }
    ]
};

})()),
"[project]/src/payload.config.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__commonjs__external__path__ = __turbopack_external_require__("path", true);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$db$2d$postgres$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/db-postgres/dist/index.js [app-route] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$db$2d$postgres$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/db-postgres/dist/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$richtext$2d$lexical$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/richtext-lexical/dist/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$config$2f$build$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/payload/dist/config/build.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$collections$2f$Users$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/cms/collections/Users/index.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$collections$2f$Tenants$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/cms/collections/Tenants/index.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$components$2f$TenantSelector$2f$index$2e$tsx__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/cms/components/TenantSelector/index.tsx [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$collections$2f$Pages$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/cms/collections/Pages/index.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$collections$2f$Tickets$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/cms/collections/Tickets/index.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$collections$2f$SiteSettings$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/cms/collections/SiteSettings/index.ts [app-route] (ecmascript)");
var __TURBOPACK__commonjs__external__url__ = __turbopack_external_require__("url", true);
const __TURBOPACK__import$2e$meta__ = {
    get url () {
        return `file://${__turbopack_resolve_absolute_path__("src/payload.config.ts")}`;
    }
};
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
;
;
;
;
;
;
const filename = (0, __TURBOPACK__commonjs__external__url__["fileURLToPath"])(__TURBOPACK__import$2e$meta__.url);
const dirname = __TURBOPACK__commonjs__external__path__["default"].dirname(filename);
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$payload$2f$dist$2f$config$2f$build$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildConfig"])({
    admin: {
        user: 'users',
        components: {
            afterNavLinks: [
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$components$2f$TenantSelector$2f$index$2e$tsx__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TenantSelectorRSC"]
            ]
        }
    },
    secret: process.env.PAYLOAD_SECRET,
    editor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$richtext$2d$lexical$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["lexicalEditor"])({}),
    collections: [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$collections$2f$Pages$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Pages"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$collections$2f$Tickets$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Tickets"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$collections$2f$SiteSettings$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SiteSettings"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$collections$2f$Users$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$cms$2f$collections$2f$Tenants$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Tenants"]
    ],
    typescript: {
        outputFile: __TURBOPACK__commonjs__external__path__["default"].resolve(dirname, 'payload-types.ts')
    },
    graphQL: {
        schemaOutputFile: __TURBOPACK__commonjs__external__path__["default"].resolve(dirname, 'generated-schema.graphql')
    },
    db: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$db$2d$postgres$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["postgresAdapter"])({
        pool: {
            connectionString: process.env.DATABASE_URI
        }
    })
});

})()),
"[project]/src/app/(payload)/api/[...slug]/route.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */ /* DO NOT MODIFY it because it could be re-written at any time. */ __turbopack_esm__({
    "DELETE": ()=>DELETE,
    "GET": ()=>GET,
    "OPTIONS": ()=>OPTIONS,
    "PATCH": ()=>PATCH,
    "POST": ()=>POST
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$payload$2e$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/payload.config.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$exports$2f$routes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/exports/routes.js [app-route] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$routes$2f$rest$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__DELETE__as__REST_DELETE$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/routes/rest/index.js [app-route] (ecmascript) <export DELETE as REST_DELETE>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$routes$2f$rest$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__GET__as__REST_GET$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/routes/rest/index.js [app-route] (ecmascript) <export GET as REST_GET>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$routes$2f$rest$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__OPTIONS__as__REST_OPTIONS$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/routes/rest/index.js [app-route] (ecmascript) <export OPTIONS as REST_OPTIONS>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$routes$2f$rest$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__PATCH__as__REST_PATCH$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/routes/rest/index.js [app-route] (ecmascript) <export PATCH as REST_PATCH>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$routes$2f$rest$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__POST__as__REST_POST$3e$__ = __turbopack_import__("[project]/node_modules/@payloadcms/next/dist/routes/rest/index.js [app-route] (ecmascript) <export POST as REST_POST>");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
const GET = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$routes$2f$rest$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__GET__as__REST_GET$3e$__["REST_GET"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$payload$2e$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]);
const POST = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$routes$2f$rest$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__POST__as__REST_POST$3e$__["REST_POST"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$payload$2e$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]);
const DELETE = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$routes$2f$rest$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__DELETE__as__REST_DELETE$3e$__["REST_DELETE"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$payload$2e$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]);
const PATCH = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$routes$2f$rest$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__PATCH__as__REST_PATCH$3e$__["REST_PATCH"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$payload$2e$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]);
const OPTIONS = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$payloadcms$2f$next$2f$dist$2f$routes$2f$rest$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__OPTIONS__as__REST_OPTIONS$3e$__["REST_OPTIONS"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$payload$2e$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]);

})()),

};

//# sourceMappingURL=src_456476._.js.map