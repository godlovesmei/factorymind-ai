import { apiUrl } from "@/lib/env";

const setupItems = [
  "Next.js app shell",
  "Node.js API + REST routes",
  "MySQL Prisma schema",
  "Shared types & validators",
  "Machine CRUD API",
  "Sensor log ingestion",
  "Alert detection",
  "Dashboard data fetching"
];

export default function HomePage() {
  return (
    <main>
      <nav className="global-nav" aria-label="Global">
        <span className="brand-mark">FactoryMind AI</span>
        <span className="nav-status">Milestone 3</span>
      </nav>

      <div className="sub-nav">
        <span>Backend & Database</span>
        <a href={apiUrl} className="sub-nav-link">
          API
        </a>
      </div>

      <section className="product-tile-light">
        <div className="hero-copy">
          <p className="eyebrow">Smart Manufacturing Operations</p>
          <h1>FactoryMind AI</h1>
          <p className="lead">
            A realtime manufacturing dashboard with REST APIs, MySQL database,
            sensor log ingestion, anomaly alerts, and AI report foundations.
          </p>
          <div className="actions" aria-label="Project status actions">
            <a className="button-primary" href="/dashboard">
              Open dashboard
            </a>
            <a className="button-secondary" href="#foundation-title">
              Project scope
            </a>
          </div>
        </div>
      </section>

      <section className="product-tile-dark" aria-labelledby="foundation-title">
        <div className="foundation">
          <div>
            <p className="eyebrow on-dark">Foundation</p>
            <h2 id="foundation-title">Built milestone by milestone.</h2>
          </div>
          <ul className="setup-grid">
            {setupItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
