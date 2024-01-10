export const formatPrice = (price: number) => {
  const formatCurrency = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  });

  return formatCurrency.format(price);
};
