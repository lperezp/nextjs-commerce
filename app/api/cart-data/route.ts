import { getCart } from 'lib/firebase';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const cart = await getCart();
    return NextResponse.json(
      cart || {
        lines: [],
        totalQuantity: 0,
        cost: {
          subtotalAmount: { amount: '0.00', currencyCode: 'USD' },
          totalAmount: { amount: '0.00', currencyCode: 'USD' },
          totalTaxAmount: { amount: '0.00', currencyCode: 'USD' }
        }
      }
    );
  } catch (error) {
    console.error('Error in /api/cart-data route:', error);
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
