import type { CollectionConfig } from 'payload'
import { tenantField } from '../../fields/TenantField'
import { byTenant } from '../Pages/access/byTenant'

export const Tickets: CollectionConfig = {
  slug: 'tickets',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
    create: byTenant,
    update: byTenant,
    delete: byTenant,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    tenantField,
  ],
}
