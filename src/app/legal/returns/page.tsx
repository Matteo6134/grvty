import type { Metadata } from "next";

export const metadata: Metadata = { title: "Returns & Refunds" };

export default function ReturnsPage() {
  return (
    <div className="legal-content">
      <h1>returns &amp;<br />refunds.</h1>
      <p className="meta">Last updated: April 2026 · grvty — a project by Matt · Oggetti con gravità</p>

      <p>
        We want you to love your grvty lamp. If for any reason you are not satisfied, the
        following policy applies. Our policy complies with EU Directive 2011/83/EU on consumer
        rights and the Italian Consumer Code (D.Lgs. 206/2005).
      </p>

      <hr className="divider" />

      <h2>1. Right of withdrawal (EU consumers)</h2>
      <p>
        As an EU consumer, you have the right to withdraw from this contract within{" "}
        <strong>14 calendar days</strong> from the day you — or a third party you designate —
        receive the goods, without giving any reason.
      </p>
      <p>
        To exercise this right, contact us on Instagram{" "}
        <a href="https://ig.me/m/grvty.std" target="_blank" rel="noopener noreferrer">@grvty.std</a>{" "}
        with your order number before the deadline expires.
      </p>

      <h2>2. Return conditions</h2>
      <p>To be eligible for a return, your item must be:</p>
      <ul>
        <li>Returned within 14 days of notifying us of your withdrawal</li>
        <li>In its original, unused condition</li>
        <li>In the original packaging (or equivalent protective packaging)</li>
        <li>Free from damage caused after delivery</li>
      </ul>
      <p>
        Items that show signs of use, modification, or damage caused by the customer are not
        eligible for a full refund.
      </p>

      <h2>3. Return shipping costs</h2>
      <p>
        Return shipping costs are the responsibility of the customer, unless the item is
        defective or the wrong product was sent. We recommend using a trackable shipping service,
        as we cannot be responsible for items lost in transit.
      </p>

      <h2>4. Refund process</h2>
      <p>
        Once we receive and inspect your return, we will notify you. If approved, your
        refund will be processed to your original payment method within{" "}
        <strong>14 days</strong> of receiving the returned item. The refund includes the original
        product price. Original shipping costs are refunded only if the full order is returned.
      </p>

      <h2>5. Defective or incorrect items</h2>
      <p>
        If you receive a defective, damaged, or incorrect item, contact us immediately on Instagram{" "}
        <a href="https://ig.me/m/grvty.std" target="_blank" rel="noopener noreferrer">@grvty.std</a>{" "}
        with photos of the issue. We will arrange a free return, replacement, or full refund —
        including shipping costs — at no expense to you.
      </p>

      <h2>6. Non-returnable items</h2>
      <ul>
        <li>Items that have been modified or personalised at the customer's request</li>
        <li>Items damaged after delivery due to improper use</li>
      </ul>

      <h2>7. Late or missing refunds</h2>
      <p>
        If you haven't received your refund after 14 days, please first check your bank account,
        then contact your payment provider (Stripe refunds may take a few days to appear). If the
        issue persists, reach us on Instagram{" "}
        <a href="https://ig.me/m/grvty.std" target="_blank" rel="noopener noreferrer">@grvty.std</a>.
      </p>

      <h2>8. EU Online Dispute Resolution</h2>
      <p>
        If you are not satisfied with how we handle a dispute, you may use the European
        Commission's Online Dispute Resolution platform at{" "}
        <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
          ec.europa.eu/consumers/odr
        </a>.
      </p>
    </div>
  );
}
