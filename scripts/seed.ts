/**
 * This is an example of a standalone script that loads in the Payload config
 * and uses the Payload Local API to query the database.
 */

import { getPayload } from 'payload'
import { importConfig } from 'payload/node'

async function findOrCreateTenant({ payload, data }) {
  const tenantsQuery = await payload.find({
    collection: 'tenants',
    where: { slug: { equals: data.slug } },
  })
  if (tenantsQuery.docs?.[0]) return tenantsQuery.docs[0]
  return payload.create({ collection: 'tenants', data })
}

async function findOrCreateUser({ payload, data }) {
  const usersQuery = await payload.find({
    collection: 'users',
    where: { email: { equals: data.email } },
  })
  if (usersQuery.docs?.[0]) return usersQuery.docs[0]
  return payload.create({ collection: 'users', data })
}

async function findOrCreatePage({ payload, data }) {
  const pagesQuery = await payload.find({
    collection: 'pages',
    where: {
      and: [
        { slug: { equals: data.slug } },
        { tenant: { equals: data.tenant } },
      ],
    },
  })
  if (pagesQuery.docs?.[0]) return pagesQuery.docs[0]
  return payload.create({ collection: 'pages', data })
}

async function findOrCreateSiteSettings({ payload, data }: { payload: any; data: any }) {
  const query = await payload.find({
    collection: 'site-settings',
    where: { tenant: { equals: data.tenant } },
  })
  if (query.docs?.[0]) return query.docs[0]
  return payload.create({ collection: 'site-settings', data })
}

async function findOrCreateTicket({ payload, data }) {
  const ticketsQuery = await payload.find({
    collection: 'tickets',
    where: {
      and: [
        { name: { equals: data.name } },
        { tenant: { equals: data.tenant } },
      ],
    },
  })
  if (ticketsQuery.docs?.[0]) return ticketsQuery.docs[0]
  return payload.create({ collection: 'tickets', data })
}

async function run() {
  const awaitedConfig = await importConfig('../src/payload.config.ts')
  const payload = await getPayload({ config: awaitedConfig })

  // ─── TENANTS ────────────────────────────────────────────────────────────────

  const funpark = await findOrCreateTenant({
    payload,
    data: { name: 'VinWonders', slug: 'funpark', public: true, domain: 'vinwonders.com' },
  })

  const busline = await findOrCreateTenant({
    payload,
    data: { name: 'Phương Trang', slug: 'busline', public: true, domain: 'phuongtrang.com' },
  })

  const tenant1 = await findOrCreateTenant({
    payload,
    data: { name: 'Tenant 1', slug: 'tenant-1' },
  })

  const tenant2 = await findOrCreateTenant({
    payload,
    data: { name: 'Tenant 2', slug: 'tenant-2', public: true },
  })

  const tenant3 = await findOrCreateTenant({
    payload,
    data: { name: 'Tenant 3', slug: 'tenant-3' },
  })

  // ─── USERS ──────────────────────────────────────────────────────────────────

  await findOrCreateUser({
    payload,
    data: { email: 'demo@payloadcms.com', password: 'demo', roles: ['super-admin'] },
  })

  await findOrCreateUser({
    payload,
    data: {
      email: 'funpark@example.com',
      password: 'test',
      tenants: [{ tenant: funpark.id, roles: ['super-admin'] }],
      username: 'funpark-admin',
    },
  })

  await findOrCreateUser({
    payload,
    data: {
      email: 'busline@example.com',
      password: 'test',
      tenants: [{ tenant: busline.id, roles: ['super-admin'] }],
      username: 'busline-admin',
    },
  })

  await findOrCreateUser({
    payload,
    data: {
      email: 'tenant1@payloadcms.com',
      password: 'test',
      tenants: [{ tenant: tenant1.id, roles: ['super-admin'] }],
      username: 'tenant1',
    },
  })

  await findOrCreateUser({
    payload,
    data: {
      email: 'tenant2@payloadcms.com',
      password: 'test',
      tenants: [{ tenant: tenant2.id, roles: ['super-admin'] }],
      username: 'tenant2',
    },
  })

  // ─── PAGES ──────────────────────────────────────────────────────────────────

  await findOrCreatePage({
    payload,
    data: { title: 'Trang chủ VinWonders', tenant: funpark.id, slug: 'home' },
  })

  await findOrCreatePage({
    payload,
    data: { title: 'Trang chủ Phương Trang', tenant: busline.id, slug: 'home' },
  })

  await findOrCreatePage({
    payload,
    data: { title: 'Page for Tenant 1', tenant: tenant1.id, slug: 'home' },
  })

  await findOrCreatePage({
    payload,
    data: { title: 'Page for Tenant 2', tenant: tenant2.id, slug: 'home' },
  })

  await findOrCreatePage({
    payload,
    data: { title: 'Page for Tenant 3', tenant: tenant3.id, slug: 'home' },
  })

  // ─── TICKETS ────────────────────────────────────────────────────────────────

  // VinWonders
  await findOrCreateTicket({
    payload,
    data: {
      name: 'Vé người lớn',
      description: 'Vào cửa toàn khu, áp dụng cho người từ 18 tuổi trở lên',
      price: 200000,
      tenant: funpark.id,
    },
  })

  await findOrCreateTicket({
    payload,
    data: {
      name: 'Vé trẻ em',
      description: 'Áp dụng cho trẻ từ 3–17 tuổi',
      price: 150000,
      tenant: funpark.id,
    },
  })

  await findOrCreateTicket({
    payload,
    data: {
      name: 'Vé gia đình (2 người lớn + 2 trẻ em)',
      description: 'Combo tiết kiệm cho cả gia đình',
      price: 500000,
      tenant: funpark.id,
    },
  })

  // Phương Trang
  await findOrCreateTicket({
    payload,
    data: {
      name: 'Hà Nội → TP. Hồ Chí Minh',
      description: 'Xe limousine giường nằm, khởi hành 19:00 hàng ngày',
      price: 350000,
      tenant: busline.id,
    },
  })

  await findOrCreateTicket({
    payload,
    data: {
      name: 'TP. Hồ Chí Minh → Đà Lạt',
      description: 'Xe ghế ngồi cao cấp, khởi hành 7:00 và 13:00',
      price: 200000,
      tenant: busline.id,
    },
  })

  await findOrCreateTicket({
    payload,
    data: {
      name: 'TP. Hồ Chí Minh → Vũng Tàu',
      description: 'Xe đi nhanh, khởi hành mỗi 30 phút',
      price: 120000,
      tenant: busline.id,
    },
  })

  // ─── SITE SETTINGS ──────────────────────────────────────────────────────────

  // VinWonders: có top bar + header + footer đầy đủ
  await findOrCreateSiteSettings({
    payload,
    data: {
      tenant: funpark.id,
      header: {
        enabled: true,
        topBar: {
          enabled: true,
          leftText: 'Email: vinwonders@example.com',
          rightText: 'Hotline: 1900 1234',
        },
        logoText: 'VinWonders',
        navLinks: [
          { label: 'Trang chủ', url: '/funpark' },
          { label: 'Mua vé', url: '/funpark/tickets' },
        ],
      },
      theme: {
        primaryColor: '#e84118',
        darkColor: '#1a1a2e',
        heroBgFrom: '#e84118',
        heroBgTo: '#ffb347',
        cardRadius: '16px',
        fontFamily: 'segoe',
      },
      footer: {
        enabled: true,
        copyrightText: `© ${new Date().getFullYear()} VinWonders. All rights reserved.`,
        columns: [
          { title: 'VinWonders', content: 'Khu vui chơi giải trí hàng đầu Việt Nam.' },
          { title: 'Liên kết', content: 'Trang chủ\nDanh sách vé' },
          { title: 'Liên hệ', content: 'Email: vinwonders@example.com\nHotline: 1900 1234' },
        ],
      },
    },
  })

  // Phương Trang: không có top bar, không có footer
  await findOrCreateSiteSettings({
    payload,
    data: {
      tenant: busline.id,
      header: {
        enabled: true,
        topBar: { enabled: false },
        logoText: 'Phương Trang',
        navLinks: [
          { label: 'Trang chủ', url: '/busline' },
          { label: 'Lịch trình', url: '/busline/tickets' },
        ],
      },
      theme: {
        primaryColor: '#16a34a',
        darkColor: '#0f3460',
        heroBgFrom: '#16a34a',
        heroBgTo: '#4ade80',
        cardRadius: '8px',
        fontFamily: 'roboto',
      },
      footer: {
        enabled: false,
      },
    },
  })

  console.log('✅ Seed hoàn tất!')
  process.exit(0)
}

run().catch(console.error)
