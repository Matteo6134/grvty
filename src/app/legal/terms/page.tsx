import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <div className="legal-content">
      <h1>terms &amp;<br />conditions.</h1>
      <p className="meta">Last updated: April 2026 · grvty — a project by Matt · Oggetti con gravità</p>

      <p>
        Please read these Terms and Conditions carefully before purchasing from grvty. By placing an
        order you agree to be bound by these terms. Our operations are based in Italy and governed
        by Italian and EU consumer law, including the EU Consumer Rights Directive (2011/83/EU) and
        the Italian Consumer Code (D.Lgs. 206/2005).
      </p>

      <hr className="divider" />

      <h2>1. Who we are</h2>
      <p>
        grvty is a design project by Matt, based in Italy. For all enquiries, reach us on Instagram:{" "}
        <a href="https://ig.me/m/grvty.std" target="_blank" rel="noopener noreferrer">@grvty.std</a>.
      </p>

      <h2>2. Products</h2>
      <p>
        grvty lamps are handcrafted, 3D-printed objects made in Italy. Each unit is finished by
        hand and may feature minor individual variations — these are a feature, not a defect. Product
        images on the website are representative; slight colour or texture differences may occur
        due to screen calibration or natural material variation.
      </p>

      <h2>3. Pricing &amp; payment</h2>
      <ul>
        <li>All prices are displayed in Euros (€) and include applicable Italian VAT (22%).</li>
        <li>Shipping costs are calculated separately at checkout.</li>
        <li>Payment is processed via Stripe (card). No funds are stored by grvty.</li>
        <li>Orders are confirmed only after successful payment authorisation.</li>
      </ul>

      <h2>4. Order confirmation</h2>
      <p>
        After placing an order you will receive an email confirmation. This does not constitute
        a contract of sale — we reserve the right to cancel orders due to stock, pricing errors,
        or suspected fraud, in which case a full refund will be issued immediately.
      </p>

      <h2>5. Production &amp; lead time</h2>
      <p>
        Each grvty lamp is made to order. Production requires approximately 14 days before
        dispatch. Estimated delivery times are provided at checkout and are indicative only.
        Delays due to couriers, customs, or force majeure are beyond our control.
      </p>

      <h2>6. Shipping</h2>
      <p>
        We ship worldwide. Shipping rates and estimated delivery times are displayed at checkout.
        For full details see our{" "}
        <a href="/legal/shipping">Shipping Policy</a>.
      </p>

      <h2>7. Right of withdrawal (EU consumers)</h2>
      <p>
        Under EU law, you have the right to withdraw from your purchase within{" "}
        <strong>14 calendar days</strong> from the date you receive your order, without giving
        a reason. To exercise this right, contact us on Instagram{" "}
        <a href="https://ig.me/m/grvty.std" target="_blank" rel="noopener noreferrer">@grvty.std</a>{" "}
        before the deadline. Return shipping costs are borne by the customer unless the item is
        faulty. For full details see our <a href="/legal/returns">Returns &amp; Refunds Policy</a>.
      </p>

      <h2>8. Warranty</h2>
      <p>
        All products are covered by the statutory 2-year legal guarantee under EU Directive
        1999/44/EC. Defective items will be repaired, replaced, or refunded at our discretion.
        The warranty does not cover damage resulting from misuse, normal wear, or modifications.
      </p>

      <h2>9. Intellectual property</h2>
      <p>
        All content on this website — including 3D designs, photographs, copy, and the grvty brand —
        is the exclusive property of grvty and protected by Italian and EU copyright law. Reproduction
        or commercial use without written permission is prohibited.
      </p>

      <h2>10. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, grvty's liability is limited to the purchase price
        of the affected order. We are not liable for indirect or consequential losses.
      </p>

      <h2>11. Governing law &amp; disputes</h2>
      <p>
        These terms are governed by Italian law. Disputes will be subject to the jurisdiction of
        Italian courts. EU consumers may also use the European Online Dispute Resolution platform
        at{" "}
        <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
          ec.europa.eu/consumers/odr
        </a>.
      </p>

      <h2>12. Changes to these terms</h2>
      <p>
        We reserve the right to update these terms at any time. Changes will be posted on this
        page with an updated date. Continued use of the website constitutes acceptance of the
        revised terms.
      </p>
    </div>
  );
}
