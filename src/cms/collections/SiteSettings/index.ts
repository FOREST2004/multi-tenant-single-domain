import type { CollectionConfig } from 'payload'
import { tenantField } from '../../fields/TenantField'
import { byTenant } from '../Pages/access/byTenant'

export const SiteSettings: CollectionConfig = {
  slug: 'site-settings',
  admin: {
    useAsTitle: 'tenant',
    description: 'Cấu hình giao diện (header, footer) cho từng tenant.',
  },    
  access: {
    read: () => true,
    create: byTenant,
    update: byTenant,
    delete: byTenant,
  },
  fields: [
    tenantField,

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
          defaultValue: true,
        },
        {
          name: 'topBar',
          type: 'group',
          label: 'Top Bar (thanh nhỏ phía trên)',
          admin: {
            condition: (data) => data?.header?.enabled,
          },
          fields: [
            {
              name: 'enabled',
              type: 'checkbox',
              label: 'Hiển thị top bar',
              defaultValue: false,
            },
            {
              name: 'leftText',
              type: 'text',
              label: 'Text bên trái',
              admin: { condition: (data) => data?.header?.topBar?.enabled },
            },
            {
              name: 'rightText',
              type: 'text',
              label: 'Text bên phải',
              admin: { condition: (data) => data?.header?.topBar?.enabled },
            },
          ],
        },
        {
          name: 'logoText',
          type: 'text',
          label: 'Logo text (để trống = dùng tên tenant)',
          admin: {
            condition: (data) => data?.header?.enabled,
          },
        },
        {
          name: 'navLinks',
          type: 'array',
          label: 'Các link trong navigation',
          admin: {
            condition: (data) => data?.header?.enabled,
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Tên hiển thị',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              label: 'Đường dẫn (vd: /funpark/tickets)',
              required: true,
            },
          ],
        },
      ],
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
          admin: { description: 'Dùng cho header, nút bấm, giá vé' },
        },
        {
          name: 'darkColor',
          type: 'text',
          label: 'Màu nền tối (hex, vd: #1a1a2e)',
          defaultValue: '#1a1a2e',
          admin: { description: 'Dùng cho footer, header trang vé' },
        },
        {
          name: 'heroBgFrom',
          type: 'text',
          label: 'Hero gradient — màu bắt đầu (hex)',
          defaultValue: '#e84118',
        },
        {
          name: 'heroBgTo',
          type: 'text',
          label: 'Hero gradient — màu kết thúc (hex)',
          defaultValue: '#ffb347',
        },
        {
          name: 'cardRadius',
          type: 'text',
          label: 'Bo góc card (vd: 16px, 8px, 0px)',
          defaultValue: '16px',
        },
        {
          name: 'fontFamily',
          type: 'select',
          label: 'Font chữ',
          defaultValue: 'segoe',
          options: [
            { label: 'Segoe UI (mặc định)', value: 'segoe' },
            { label: 'Inter', value: 'inter' },
            { label: 'Roboto', value: 'roboto' },
            { label: 'Merriweather (serif)', value: 'merriweather' },
          ],
        },
      ],
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
          defaultValue: true,
        },
        {
          name: 'copyrightText',
          type: 'text',
          label: 'Dòng bản quyền (để trống = tự động)',
          admin: {
            condition: (data) => data?.footer?.enabled,
          },
        },
        {
          name: 'columns',
          type: 'array',
          label: 'Cột nội dung',
          admin: {
            condition: (data) => data?.footer?.enabled,
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Tiêu đề cột',
            },
            {
              name: 'content',
              type: 'textarea',
              label: 'Nội dung (mỗi dòng là một mục)',
            },
          ],
        },
      ],
    },
  ],
}
