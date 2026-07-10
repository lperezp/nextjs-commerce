"use client";

import { doc, getDoc } from 'firebase/firestore';
import { db } from 'lib/firebase/config';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

interface Order {
  id: string;
  customer: {
    email: string;
    name: string;
    address: string;
    city: string;
    postalCode: string;
  };
  items: Array<{
    productId: string;
    productTitle: string;
    variantId: string;
    variantTitle: string;
    quantity: number;
    price: {
      amount: string;
      currencyCode: string;
    };
  }>;
  cost: {
    subtotalAmount: { amount: string; currencyCode: string };
    totalAmount: { amount: string; currencyCode: string };
    totalTaxAmount: { amount: string; currencyCode: string };
  };
  createdAt: string;
  status: string;
}

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        const docRef = doc(db, 'orders', orderId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setOrder(docSnap.data() as Order);
        }
      } catch (err) {
        console.error('Error fetching order details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-semibold">Orden no encontrada</h2>
          <p className="mb-6 text-neutral-400">No pudimos encontrar la orden solicitada en nuestros registros.</p>
          <Link href="/" className="rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700">
            Regresar a la tienda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="w-full rounded-2xl border border-neutral-800 bg-neutral-900/30 p-8 md:p-12 text-center backdrop-blur-md shadow-2xl mb-8">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">¡Pago Confirmado!</h1>
          <p className="mb-4 text-neutral-400">
            Gracias, <span className="text-white font-semibold">{order.customer.name}</span>. Tu pedido ha sido registrado con éxito.
          </p>

          <div className="mt-8 rounded-xl bg-neutral-950/60 p-6 text-left border border-neutral-800/80">
            <h3 className="text-md font-bold text-neutral-200 border-b border-neutral-800 pb-2 mb-4">
              Detalles del Pedido
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-500">ID de Orden:</span>
                <span className="font-semibold text-white">{order.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Fecha:</span>
                <span className="text-white">{new Date(order.createdAt).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Estado de Pago:</span>
                <span className="font-semibold text-emerald-400">Completado</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Correo Electrónico:</span>
                <span className="text-white">{order.customer.email}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-neutral-800/50">
                <span className="text-neutral-500">Dirección de Envío:</span>
                <span className="text-white text-right max-w-xs truncate">
                  {order.customer.address}, {order.customer.city} ({order.customer.postalCode})
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-xl bg-neutral-950/60 p-6 text-left border border-neutral-800/80">
            <h3 className="text-md font-bold text-neutral-200 border-b border-neutral-800 pb-2 mb-4">
              Productos Comprados
            </h3>
            <ul className="divide-y divide-neutral-800">
              {order.items.map((item, index) => (
                <li key={index} className="flex py-3 justify-between text-sm">
                  <div>
                    <span className="font-medium text-white">{item.productTitle}</span>
                    <span className="text-xs text-neutral-500 block">Variante: {item.variantTitle}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-neutral-400 block">Cant: {item.quantity}</span>
                    <span className="font-semibold text-white">
                      {item.price.amount} {item.price.currencyCode}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-neutral-800 mt-4 pt-4 flex justify-between font-bold text-white text-md">
              <span>Total Pagado</span>
              <span>
                {order.cost.totalAmount.amount} {order.cost.totalAmount.currencyCode}
              </span>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/"
              className="inline-block rounded-full bg-blue-600 px-8 py-3.5 text-center text-sm font-semibold text-white hover:bg-blue-700 transition shadow-lg hover:shadow-blue-500/20"
            >
              Volver a la Tienda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    }>
      <SuccessPageContent />
    </Suspense>
  );
}
