import React from 'react';
import { Badge } from '../common/Badge';

const STATUS_VARIANT_MAP = {
  Pending: 'amber',
  Processing: 'gold',
  Shipped: 'sky',
  Delivered: 'emerald',
};

export function OrderStatusBadge({ status }) {
  const variant = STATUS_VARIANT_MAP[status] || 'subtle';
  return <Badge variant={variant}>{status}</Badge>;
}
