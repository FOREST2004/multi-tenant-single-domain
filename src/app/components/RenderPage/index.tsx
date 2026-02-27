import React from 'react'
import Link from 'next/link'
import type { Page } from '@payload-types'
import './index.scss'

export const RenderPage = ({ data }: { data: Page }) => {
  const tenant = typeof data.tenant === 'object' ? data.tenant : null
  const tenantSlug = tenant?.slug ?? ''
  const tenantName = tenant?.name ?? ''

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero__overlay" />
        <div className="hero__content">
          <p className="hero__eyebrow">Chào mừng đến với</p>
          <h1 className="hero__title">{tenantName}</h1>
          <p className="hero__subtitle">{data.title}</p>
          <div className="hero__actions">
            <Link href={`/${tenantSlug}/tickets`} className="hero__btn hero__btn--primary">
              Mua vé ngay
            </Link>
            <Link href={`/${tenantSlug}/tickets`} className="hero__btn hero__btn--secondary">
              Xem lịch trình
            </Link>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="features">
        <div className="features__inner">
          <div className="features__card">
            <div className="features__icon">🎫</div>
            <h3>Đặt vé dễ dàng</h3>
            <p>Chọn vé, thanh toán nhanh chóng và tiện lợi chỉ trong vài bước.</p>
          </div>
          <div className="features__card">
            <div className="features__icon">🛡️</div>
            <h3>An toàn & tin cậy</h3>
            <p>Dịch vụ được kiểm duyệt kỹ lưỡng, đảm bảo chất lượng tốt nhất.</p>
          </div>
          <div className="features__card">
            <div className="features__icon">💬</div>
            <h3>Hỗ trợ 24/7</h3>
            <p>Đội ngũ tư vấn luôn sẵn sàng hỗ trợ bạn mọi lúc mọi nơi.</p>
          </div>
          <div className="features__card">
            <div className="features__icon">⚡</div>
            <h3>Nhanh & tiện lợi</h3>
            <p>Xác nhận vé tức thì, không cần chờ đợi hay xếp hàng.</p>
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="cta">
        <div className="cta__inner">
          <h2>Sẵn sàng trải nghiệm?</h2>
          <p>Xem ngay danh sách vé và chọn cho mình lịch trình phù hợp.</p>
          <Link href={`/${tenantSlug}/tickets`} className="cta__btn">
            Xem danh sách vé →
          </Link>
        </div>
      </section>
    </>
  )
}
