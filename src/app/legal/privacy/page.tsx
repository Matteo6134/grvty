import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="legal-content">
      <h1>privacy policy.</h1>
      <p className="meta">Last updated: April 2026 · grvty — a project by Matt · Oggetti con gravità</p>

      <p>
        grvty ("we", "us", "our") is committed to protecting your personal data. This Privacy
        Policy explains how we collect, use, and safeguard information you provide when visiting
        our website or purchasing a product. Our operations are based in Italy and we comply with
        the EU General Data Protection Regulation (GDPR — Regulation 2016/679).
      </p>

      <hr className="divider" />

      <h2>1. Who we are</h2>
      <p>
        grvty is a design project by Matt, based in Italy — producing handcrafted, 3D-printed
        lighting objects. For any enquiries, reach us on Instagram:{" "}
        <a href="https://ig.me/m/grvty.std" target="_blank" rel="noopener noreferrer">@grvty.std</a>.
      </p>

      <h2>2. Data we collect</h2>
      <p>When you place an order we collect:</p>
      <ul>
        <li>Full name and email address</li>
        <li>Billing and shipping address</li>
        <li>Phone number (optional, for delivery)</li>
        <li>Payment information — processed exclusively by Stripe (we never store card data)</li>
        <li>IP address and browser data for fraud prevention</li>
      </ul>
      <p>When you browse our website we may collect anonymised analytics data (page views, referrer).</p>

      <h2>3. Legal basis for processing</h2>
      <ul>
        <li><strong>Contract performance</strong> — to fulfil and ship your order</li>
        <li><strong>Legal obligation</strong> — tax and accounting records required by Italian law</li>
        <li><strong>Legitimate interest</strong> — fraud prevention and website security</li>
        <li><strong>Consent</strong> — marketing communications (you may opt out at any time)</li>
      </ul>

      <h2>4. How we use your data</h2>
      <ul>
        <li>Process and fulfil your order</li>
        <li>Send order confirmation and shipping notifications</li>
        <li>Handle returns, refunds, and customer service enquiries</li>
        <li>Comply with legal and fiscal obligations under Italian and EU law</li>
        <li>Improve our website and prevent fraud</li>
      </ul>

      <h2>5. Third-party processors</h2>
      <ul>
        <li><strong>Stripe Inc.</strong> — payment processing (PCI-DSS Level 1 certified)</li>
        <li><strong>Vercel / Replit</strong> — hosting infrastructure</li>
        <li><strong>Couriers</strong> (e.g. DHL, Poste Italiane) — shipping and delivery</li>
      </ul>
      <p>
        All processors are bound by GDPR-compliant data processing agreements.
      </p>

      <h2>6. Data retention</h2>
      <p>
        Order data is retained for 10 years as required by Italian fiscal law (D.P.R. 633/1972).
        Marketing data is deleted upon request. Website analytics are retained for 12 months.
      </p>

      <h2>7. Your rights under GDPR</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access your personal data</li>
        <li>Correct inaccurate data</li>
        <li>Request erasure ("right to be forgotten") where legally permitted</li>
        <li>Restrict or object to processing</li>
        <li>Data portability</li>
        <li>Lodge a complaint with the Italian Data Protection Authority (Garante Privacy — <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">garanteprivacy.it</a>)</li>
      </ul>
      <p>
        To exercise your rights, contact us on Instagram:{" "}
        <a href="https://ig.me/m/grvty.std" target="_blank" rel="noopener noreferrer">@grvty.std</a>.
      </p>

      <h2>8. Cookies</h2>
      <p>
        We use essential technical cookies required for checkout (Stripe session). We do not use
        tracking or advertising cookies. By using the website you consent to essential cookies.
      </p>

      <h2>9. Security</h2>
      <p>
        Our website enforces HTTPS/TLS encryption. Payment processing is handled by Stripe on
        their PCI-compliant infrastructure. We apply security headers including HSTS, CSP, and
        X-Frame-Options to protect against common attacks.
      </p>

      <h2>10. Changes</h2>
      <p>
        We may update this policy. Material changes will be communicated via email to existing
        customers. Continued use of the website after changes constitutes acceptance.
      </p>
    </div>
  );
}
