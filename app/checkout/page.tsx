"use client";

import { db } from 'lib/firebase/config';
import { Cart, CartItem } from 'lib/firebase/types';
import { doc, setDoc } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

// Helper to clear the cart cookie
function clearCartCookie() {
  document.cookie = 'cartId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
}

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    expDate: '',
    cvv: ''
  });

  useEffect(() => {
    // Fetch the cart using Next.js route or direct client-side fetch from cookies
    const fetchCartData = async () => {
      try {
        const response = await fetch('/api/cart-data');
        if (response.ok) {
          const data = await response.json();
          setCart(data);
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCartData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const generatedOrderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);

    try {
      // Registrar el pedido en Firestore
      await setDoc(doc(db, 'orders', generatedOrderId), {
        id: generatedOrderId,
        customer: {
          email: formData.email,
          name: formData.name,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
        },
        items: cart ? cart.lines.map((line) => ({
          productId: line.merchandise.product.id,
          productTitle: line.merchandise.product.title,
          variantId: line.merchandise.id,
          variantTitle: line.merchandise.title,
          quantity: line.quantity,
          price: line.cost.totalAmount,
        })) : [],
        cost: cart ? cart.cost : null,
        createdAt: new Date().toISOString(),
        status: 'PAID'
      });

      // Vaciar el carrito en Firestore
      if (cart) {
        await setDoc(doc(db, 'carts', cart.id), {
          id: cart.id,
          checkoutUrl: '/checkout',
          cost: {
            subtotalAmount: { amount: '0.00', currencyCode: 'USD' },
            totalAmount: { amount: '0.00', currencyCode: 'USD' },
            totalTaxAmount: { amount: '0.00', currencyCode: 'USD' }
          },
          lines: [],
          totalQuantity: 0
        });
      }

      setIsProcessing(false);
      clearCartCookie();

      // Usar window.location para forzar una recarga limpia y limpiar la caché del router de Next.js
      window.location.href = `/checkout/success?orderId=${generatedOrderId}`;
    } catch (err) {
      console.error('Error al registrar el pago:', err);
      alert('Hubo un problema al registrar el pago. Por favor, intenta de nuevo.');
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  // If cart is empty, show redirect to home
  if (!cart || cart.lines.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-semibold">Tu carrito está vacío</h2>
          <Link href="/" className="rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700">
            Regresar a la tienda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-extrabold tracking-tight">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form on left */}
          <div className="lg:col-span-7 bg-neutral-900/30 border border-neutral-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-lg">
            {isProcessing ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="mb-6 h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                <h3 className="text-lg font-medium">Procesando Pago Simulado...</h3>
                <p className="text-sm text-neutral-400">Por favor, no cierres esta ventana.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-200 border-b border-neutral-800 pb-2 mb-4">
                    1. Información de Envío
                  </h3>
                  <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="tu@correo.com"
                        className="w-full rounded-lg border border-neutral-800 bg-neutral-950 p-3 text-sm text-white placeholder-neutral-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="sm:col-span-6">
                      <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                        Nombre Completo
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Luis Pérez"
                        className="w-full rounded-lg border border-neutral-800 bg-neutral-950 p-3 text-sm text-white placeholder-neutral-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="sm:col-span-6">
                      <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                        Dirección de Envío
                      </label>
                      <input
                        type="text"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Calle Principal 123"
                        className="w-full rounded-lg border border-neutral-800 bg-neutral-950 p-3 text-sm text-white placeholder-neutral-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                        Ciudad
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Lima"
                        className="w-full rounded-lg border border-neutral-800 bg-neutral-950 p-3 text-sm text-white placeholder-neutral-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                        Código Postal
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        required
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="15001"
                        className="w-full rounded-lg border border-neutral-800 bg-neutral-950 p-3 text-sm text-white placeholder-neutral-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-neutral-200 border-b border-neutral-800 pb-2 mb-4">
                    2. Información de Pago
                  </h3>
                  <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                        Número de Tarjeta
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        required
                        pattern="\d{16}"
                        maxLength={16}
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="4111222233334444 (Simulación)"
                        className="w-full rounded-lg border border-neutral-800 bg-neutral-950 p-3 text-sm text-white placeholder-neutral-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                        Vencimiento (MM/AA)
                      </label>
                      <input
                        type="text"
                        name="expDate"
                        required
                        maxLength={5}
                        placeholder="12/28"
                        value={formData.expDate}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-neutral-800 bg-neutral-950 p-3 text-sm text-white placeholder-neutral-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                        CVV
                      </label>
                      <input
                        type="password"
                        name="cvv"
                        required
                        maxLength={3}
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-neutral-800 bg-neutral-950 p-3 text-sm text-white placeholder-neutral-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-blue-600 p-4 text-center text-sm font-semibold text-white hover:bg-blue-700 transition"
                >
                  Pagar {cart.cost.totalAmount.amount} {cart.cost.totalAmount.currencyCode}
                </button>
              </form>
            )}
          </div>

          {/* Cart Sidebar on right */}
          <div className="lg:col-span-5 bg-neutral-900/10 border border-neutral-800 rounded-2xl p-6 backdrop-blur-md">
            <h3 className="text-lg font-semibold text-neutral-200 border-b border-neutral-800 pb-2 mb-4">
              Resumen del Pedido
            </h3>
            <ul className="divide-y divide-neutral-800 mb-6">
              {cart.lines.map((line: CartItem) => (
                <li key={line.id} className="flex py-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-md border border-neutral-800 bg-neutral-950 flex-shrink-0">
                    {line.merchandise.product.featuredImage?.url ? (
                      <Image
                        src={line.merchandise.product.featuredImage.url}
                        alt={line.merchandise.product.featuredImage.altText || line.merchandise.product.title}
                        width={64}
                        height={64}
                        className="h-full w-full object-cover object-center"
                      />
                    ) : (
                      <div className="h-full w-full bg-neutral-800" />
                    )}
                  </div>
                  <div className="ml-4 flex flex-1 flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-white line-clamp-1">
                        {line.merchandise.product.title}
                      </h4>
                      <p className="text-xs text-neutral-400 mt-1">
                        Cant: {line.quantity} | {line.merchandise.title}
                      </p>
                    </div>
                    <div className="text-sm font-medium text-white text-right">
                      {line.cost.totalAmount.amount} {line.cost.totalAmount.currencyCode}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="space-y-3 text-sm text-neutral-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white font-medium">
                  {cart.cost.subtotalAmount.amount} {cart.cost.subtotalAmount.currencyCode}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Impuestos</span>
                <span className="text-white font-medium">
                  {cart.cost.totalTaxAmount.amount} {cart.cost.totalTaxAmount.currencyCode}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Envío</span>
                <span className="text-emerald-400 font-medium">Gratis</span>
              </div>
              <div className="flex justify-between border-t border-neutral-800 pt-3 text-base text-white font-bold">
                <span>Total</span>
                <span>
                  {cart.cost.totalAmount.amount} {cart.cost.totalAmount.currencyCode}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
