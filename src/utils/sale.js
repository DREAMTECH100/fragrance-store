export const SALE_ACTIVE = true;
export const SALE_ENDS_AT = new Date("2027-01-01T00:00:00+01:00");
export const SALE_TIER_THRESHOLD = 1000000;
export const SALE_PERCENT_BELOW = 5;
export const SALE_PERCENT_ABOVE = 7.5;

export function isSaleOn() {
  return SALE_ACTIVE && (!SALE_ENDS_AT || Date.now() < SALE_ENDS_AT.getTime());
}

export function getCartPricing(items = []) {
  const originalSubtotal = items.reduce(
    (s, i) => s + (Number(i.price) || 0) * (Number(i.quantity) || 1), 0
  );

  if (!isSaleOn() || originalSubtotal <= 0) {
    return {
      items: items.map((i) => ({
        ...i,
        originalPrice: Number(i.price) || 0,
        price: Number(i.price) || 0,
        discountPercent: 0,
      })),
      originalSubtotal,
      saleSubtotal: originalSubtotal,
      discountAmount: 0,
      percent: 0,
    };
  }

  const percent =
    originalSubtotal >= SALE_TIER_THRESHOLD ? SALE_PERCENT_ABOVE : SALE_PERCENT_BELOW;

  const saleItems = items.map((i) => {
    const original = Number(i.price) || 0;
    return {
      ...i,
      originalPrice: original,
      price: Math.round((original * (100 - percent)) / 100),
      discountPercent: percent,
    };
  });

  const saleSubtotal = saleItems.reduce(
    (s, i) => s + i.price * (Number(i.quantity) || 1), 0
  );

  return {
    items: saleItems,
    originalSubtotal,
    saleSubtotal,
    discountAmount: originalSubtotal - saleSubtotal,
    percent,
  };
}