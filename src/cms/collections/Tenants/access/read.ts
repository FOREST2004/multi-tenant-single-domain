import type { Access } from "payload";
import { isSuperAdmin } from "../../../access/isSuperAdmin";
import { getTenantAccessIDs } from "../../../utilities/getTenantAccessIDs";

export const tenantRead: Access = (args) => {
  const req = args.req

  // Internal middleware secret → bypass access control (dùng để tra cứu tenant theo domain)
  const internalSecret = req.headers.get('x-internal-secret')
  if (internalSecret && internalSecret === process.env.INTERNAL_MIDDLEWARE_SECRET) return true

  // Super admin can read all
  if (isSuperAdmin(args)) return true

  const tenantIDs = getTenantAccessIDs(req.user)

  // Allow public tenants to be read by anyone
  const publicConstraint = {
    public: {
      equals: true
    }
  }

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
    }
  }

  return publicConstraint
}