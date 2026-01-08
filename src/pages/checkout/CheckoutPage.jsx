import axios from "axios";
import { useState, useEffect } from "react";
import "./CheckoutHeader.css";
import "./CheckoutPage.css";
import { CheckoutHeader } from "./CheckoutHeader";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";

export function CheckoutPage({ cart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      const response = await axios.get(
        "/api/delivery-options?expand=estimatedDeliveryTime"
      );
      setDeliveryOptions(response.data);
      const paymentResponse = await axios.get("/api/payment-summary");
      setPaymentSummary(paymentResponse.data);
    };
    fetchCheckoutData();
  }, []);

  return (
    <>
      <link
        rel="icon"
        type="image/svg+xml"
        href="../../../public/checkout.png"
      />

      <title>Checkout </title>

      <CheckoutHeader />
      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} />
          <PaymentSummary paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  );
}
