import React from 'react'
import { headers as getHeaders } from 'next/headers'
import { Login } from '../../components/Login/client.page'

export default async function Page() {
  const headersList = getHeaders()
  const tenantSlug = headersList.get('x-tenant-slug') ?? ''
  return <Login tenantSlug={tenantSlug} />
}
