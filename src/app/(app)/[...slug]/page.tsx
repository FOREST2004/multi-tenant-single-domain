import React from 'react'
import { headers as getHeaders } from 'next/headers.js'
import type { Where } from 'payload'
import { notFound, redirect } from 'next/navigation'
import { RenderPage } from '../../components/RenderPage'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'

export default async function Page({ params }: { params: { slug?: string[] } }) {
  const headersList = getHeaders()
  const tenantDomain = headersList.get('x-tenant-domain')

  const payload = await getPayloadHMR({ config: configPromise })
  const { user } = await payload.auth({ headers: headersList })

  const tenantsQuery = await payload.find({
    collection: 'tenants',
    user,
    overrideAccess: false,
    where: { domain: { equals: tenantDomain } },
  })

  const slug = params?.slug

  // Không tìm thấy tenant (user chưa đăng nhập hoặc không có quyền) → redirect login
  if (tenantsQuery.docs.length === 0) {
    redirect(`/login?redirect=${encodeURIComponent(slug ? `/${slug.join('/')}` : '/')}`)
  }

  const slugConstraint: Where = { slug: { equals: slug ? slug.join('/') : 'home' } }

  console.log('🫑🫑 SLUG CONSTRAINT::::: ', slugConstraint)

  const pageQuery = await payload.find({
    collection: 'pages',
    user,
    overrideAccess: false,
    where: {
      and: [{ 'tenant.domain': { equals: tenantDomain } }, slugConstraint],
    },
  })

  const pageData = pageQuery.docs?.[0]

  if (!pageData) return notFound()

  return <RenderPage data={pageData} />
}
