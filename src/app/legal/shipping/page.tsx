import type { Metadata } from "next";

export const metadata: Metadata = { title: "Shipping Policy" };

export default function ShippingPage() {
  return (
    <div className="legal-content">
      <h1>shipping<br />policy.</h1>
      <p className="meta">Last updated: April 2026 · grvty — a project by Matt · Oggetti con gravità</p>

      <p>
        Every grvty lamp is made to order and hand-finished in Italy. Please read the following
        information carefully before purchasing.
      </p>

      <hr className="divider" />

      <h2>1. Production lead time</h2>
      <p>
        Each lamp is 3D-printed and assembled by hand. After successful payment, please allow
        approximately <strong>14 working days</strong> for production before your order is dispatched.
        You will receive an email notification with tracking information once your parcel has been
        collected by the courier.
      </p>

      <h2>2. Shipping destinations</h2>
      <p>We currently ship to the following regions:</p>
      <ul>
        <li><strong>Italy &amp; EU:</strong> All 27 EU member states</li>
        <li><strong>United Kingdom &amp; Switzerland</strong></li>
        <li><strong>Norway</strong></li>
        <li><strong>United States &amp; Canada</strong></li>
      </ul>
      <p>
        If your country is not listed, reach out to us on Instagram{" "}
        <a href="https://ig.me/m/grvty.std" target="_blank" rel="noopener noreferrer">@grvty.std</a>{" "}
        — we can arrange shipping on request.
      </p>

      <h2>3. Estimated delivery times</h2>
      <ul>
        <li><strong>Italy:</strong> 2 – 4 working days after dispatch</li>
        <li><strong>EU (Zone 1 — FR, DE, ES, NL, BE, AT):</strong> 3 – 6 working days</li>
        <li><strong>EU (Zone 2 — rest of EU):</strong> 5 – 8 working days</li>
        <li><strong>UK, CH, NO:</strong> 5 – 9 working days</li>
        <li><strong>USA &amp; Canada:</strong> 7 – 14 working days</li>
      </ul>
      <p>
        Total estimated time from order to delivery is <strong>14 – 21 working days</strong> in most
        cases. These are estimates; delays due to customs or carrier issues may occur.
      </p>

      <h2>4. Shipping rates</h2>
      <p>
        Shipping costs are calculated dynamically at checkout based on destination and package
        weight. The final shipping cost will be displayed before you confirm payment.
      </p>

      <h2>5. Packaging</h2>
      <p>
        All lamps are packaged in a custom rigid box designed to protect the product during
        transit. We use minimal, recyclable materials where possible.
      </p>

      <h2>6. Customs &amp; import duties (non-EU orders)</h2>
      <p>
        Orders shipped outside the EU may be subject to customs duties, taxes, or import fees
        charged by the destination country. These charges are the sole responsibility of the
        customer. grvty cannot control or predict customs delays.
      </p>

      <h2>7. Tracking</h2>
      <p>
        All orders are shipped with a trackable service. Your tracking number will be included in
        your dispatch confirmation email. If you have not received this email within 16 working
        days of your order, please contact us on Instagram{" "}
        <a href="https://ig.me/m/grvty.std" target="_blank" rel="noopener noreferrer">@grvty.std</a>.
      </p>

      <h2>8. Lost or damaged parcels</h2>
      <p>
        If your parcel arrives damaged, please photograph the packaging and product immediately
        and contact us on Instagram{" "}
        <a href="https://ig.me/m/grvty.std" target="_blank" rel="noopener noreferrer">@grvty.std</a>{" "}
        within 48 hours of delivery. We will arrange a replacement or refund as appropriate.
      </p>

      <h2>9. Incorrect address</h2>
      <p>
        Please ensure your shipping address is correct at checkout. grvty is not responsible for
        parcels lost or delayed due to an incorrect address provided by the customer. If a parcel
        is returned to us due to an incorrect address, re-shipping costs will be charged.
      </p>
    </div>
  );
}
