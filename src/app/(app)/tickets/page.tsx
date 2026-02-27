import React from 'react'
import Link from 'next/link'
import { headers as getHeaders } from 'next/headers.js'
import { redirect } from 'next/navigation'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import './tickets.scss'

export default async function TicketsPage() {
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

  if (tenantsQuery.docs.length === 0) {
    redirect('/login?redirect=/tickets')
  }

  const tenant = tenantsQuery.docs[0]

  const ticketsQuery = await payload.find({
    collection: 'tickets',
    overrideAccess: true,
    where: { tenant: { equals: tenant.id } },
  })

  return (
    <div className="tickets">
      {/* Page header */}
      <div className="tickets__header">
        <div className="tickets__header-inner">
          <Link href="/" className="tickets__back">
            ← Trang chủ
          </Link>
          <h1 className="tickets__title">Danh sách vé</h1>
          <p className="tickets__count">{ticketsQuery.totalDocs} loại vé có sẵn</p>
        </div>
      </div>

      {/* Ticket list */}
      <div className="tickets__body">
        <div className="tickets__grid">
          {ticketsQuery.docs.length === 0 ? (
            <div className="tickets__empty">
              <span>🎫</span>
              <p>Chưa có vé nào.</p>
            </div>
          ) : (
            ticketsQuery.docs.map((ticket: any) => (
              <div key={ticket.id} className="ticket-card">
                <div className="ticket-card__left">
                  <div className="ticket-card__icon">🎟️</div>
                  <div className="ticket-card__info">
                    <h3 className="ticket-card__name">{ticket.name}</h3>
                    {ticket.description && (
                      <p className="ticket-card__desc">{ticket.description}</p>
                    )}
                  </div>
                </div>
                <div className="ticket-card__right">
                  <div className="ticket-card__price">
                    {ticket.price?.toLocaleString('vi-VN')}
                    <span>đ</span>
                  </div>
                  <button type="button" className="ticket-card__btn">
                    Đặt vé
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
