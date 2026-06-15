"use client";

import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import type {
  DashboardMachine,
  AlertEntry,
  SensorTrendPoint,
  MachineStatus
} from "@factorymind/shared";
import { fetchDashboardSummary, type DashboardSummaryResult } from "../api";

const navigationItems = [
  "Dashboard",
  "Machines",
  "Alerts",
  "Reports",
  "Assistant",
  "Maintenance"
];

const statusLabels: Record<MachineStatus, string> = {
  NORMAL: "Normal",
  WARNING: "Warning",
  CRITICAL: "Critical",
  DOWNTIME: "Downtime",
  MAINTENANCE: "Maintenance"
};

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

export function DashboardView() {
  const [data, setData] = useState<DashboardSummaryResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    fetchDashboardSummary()
      .then((summary) => {
        if (!cancelled) {
          setData(summary);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (!data) {
    return (
      <main className="dashboard-page">
        <div className="dashboard-error">
          <p>Failed to load dashboard data: {error ?? "Unknown error"}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="dashboard-page">
      <header className="dashboard-topbar">
        <a className="dashboard-brand" href="/">
          FactoryMind AI
        </a>
        <div className="dashboard-live-status">
          <span
            className="live-dot"
            data-source={data.source}
            aria-hidden="true"
          />
          {data.source === "live" ? "Live data" : "Demo data"}
        </div>
      </header>

      <div className="dashboard-shell">
        <aside className="dashboard-sidebar" aria-label="Dashboard navigation">
          <nav>
            {navigationItems.map((item) => (
              <a
                aria-current={item === "Dashboard" ? "page" : undefined}
                className="dashboard-nav-link"
                href={item === "Dashboard" ? "/dashboard" : "#"}
                key={item}
              >
                {item}
              </a>
            ))}
          </nav>
        </aside>

        <section className="dashboard-main" aria-labelledby="dashboard-title">
          <div className="dashboard-heading">
            <div>
              <p className="dashboard-eyebrow">Manufacturing Operations</p>
              <h1 id="dashboard-title">Realtime factory overview</h1>
              <p>
                {data.source === "live"
                  ? "Live machine monitoring, alerts, production output, and AI operations insight from the backend API."
                  : "Demo dashboard data is shown because the backend API is unavailable."}
              </p>
              {data.source === "fallback" ? (
                <p className="dashboard-source-note">{data.error}</p>
              ) : null}
            </div>
            <a className="button-primary" href="#latest-alerts">
              Review alerts
            </a>
          </div>

          <section className="summary-grid" aria-label="Machine summary">
            <SummaryCard label="Total machines" value={data.totalMachines} />
            <SummaryCard label="Running" value={data.runningMachines} />
            <SummaryCard label="Warning" value={data.warningMachines} />
            <SummaryCard label="Critical" value={data.criticalMachines} />
            <SummaryCard label="Downtime" value={data.downtimeMachines} />
          </section>

          <section className="dashboard-grid">
            <div className="dashboard-panel dashboard-panel-wide">
              <PanelHeader
                title="Machine health trend"
                detail="Average sensor signal, last 90 minutes"
              />
              <MachineHealthChart data={data.sensorTrend} />
            </div>

            <ProductionSummaryCard
              totalProduction={data.totalProduction}
              machines={data.machines}
            />

            <div className="dashboard-panel dashboard-panel-wide">
              <PanelHeader
                title="Machine status"
                detail="Latest sensor snapshot from simulated machines"
              />
              <div className="machine-card-grid">
                {data.machines.map((machine) => (
                  <MachineStatusCard key={machine.id} machine={machine} />
                ))}
              </div>
            </div>

            <AiInsightCard alerts={data.alerts} />

            <div
              className="dashboard-panel dashboard-panel-full"
              id="latest-alerts"
            >
              <PanelHeader
                title="Latest alerts"
                detail="Realtime alert table from backend"
              />
              <RealtimeAlertTable alerts={data.alerts} />
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}

function DashboardSkeleton() {
  return (
    <main className="dashboard-page">
      <header className="dashboard-topbar">
        <a className="dashboard-brand" href="/">
          FactoryMind AI
        </a>
        <div className="dashboard-live-status">
          <span className="live-dot loading" aria-hidden="true" />
          Loading...
        </div>
      </header>
      <div className="dashboard-shell">
        <aside className="dashboard-sidebar" aria-label="Dashboard navigation">
          <nav>
            {navigationItems.map((item) => (
              <span className="dashboard-nav-link skeleton" key={item}>
                {item}
              </span>
            ))}
          </nav>
        </aside>
        <section className="dashboard-main">
          <section className="summary-grid" aria-label="Loading">
            {[1, 2, 3, 4, 5].map((i) => (
              <div className="summary-card skeleton" key={i} />
            ))}
          </section>
        </section>
      </div>
    </main>
  );
}

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <article className="summary-card">
      <span>{label}</span>
      <strong>{formatNumber(value)}</strong>
    </article>
  );
}

function PanelHeader({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="panel-header">
      <div>
        <h2>{title}</h2>
        <p>{detail}</p>
      </div>
    </div>
  );
}

function MachineHealthChart({ data }: { data: SensorTrendPoint[] }) {
  return (
    <div className="chart-frame" aria-label="Machine sensor trend chart">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -28 }}>
          <CartesianGrid stroke="rgba(29, 29, 31, 0.08)" vertical={false} />
          <XAxis
            axisLine={false}
            dataKey="time"
            tickLine={false}
            tick={{ fill: "#7a7a7a", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#7a7a7a", fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              border: "1px solid #e0e0e0",
              borderRadius: 18,
              boxShadow: "none",
              color: "#1d1d1f"
            }}
          />
          <Area
            dataKey="temperature"
            name="Temperature"
            stroke="#0066cc"
            strokeWidth={2}
            fill="rgba(0, 102, 204, 0.12)"
            type="monotone"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function MachineStatusCard({ machine }: { machine: DashboardMachine }) {
  return (
    <article className="machine-status-card">
      <div className="machine-card-head">
        <div>
          <span className="machine-code">{machine.code}</span>
          <h3>{machine.name}</h3>
        </div>
        <span className="status-chip" data-status={machine.status}>
          {statusLabels[machine.status]}
        </span>
      </div>
      <p>
        {machine.type} - {machine.location}
      </p>
      <div className="health-meter" aria-label={`${machine.healthScore}% health`}>
        <span style={{ width: `${machine.healthScore}%` }} />
      </div>
      <div className="metric-row">
        <SensorMetricCard label="Temp" value={`${machine.temperature.toFixed(1)} deg C`} />
        <SensorMetricCard label="Vibration" value={`${machine.vibration.toFixed(1)} mm/s`} />
        <SensorMetricCard label="Pressure" value={`${machine.pressure.toFixed(1)} kPa`} />
      </div>
      <div className="machine-card-foot">
        <span>{formatNumber(machine.productionCount)} units</span>
        <span>Updated {machine.lastUpdated}</span>
      </div>
    </article>
  );
}

function SensorMetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="sensor-metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function ProductionSummaryCard({
  totalProduction,
  machines
}: {
  totalProduction: number;
  machines: DashboardMachine[];
}) {
  return (
    <article className="dashboard-panel production-panel">
      <PanelHeader title="Production" detail="Current shift output" />
      <strong>{formatNumber(totalProduction)}</strong>
      <p>units completed across active lines</p>
      <div className="production-list">
        {machines.map((machine) => (
          <div key={machine.id}>
            <span>{machine.code}</span>
            <strong>{formatNumber(machine.productionCount)}</strong>
          </div>
        ))}
      </div>
    </article>
  );
}

function AiInsightCard({ alerts }: { alerts: AlertEntry[] }) {
  const criticalAlerts = alerts.filter((a) => a.severity === "CRITICAL");
  const warningAlerts = alerts.filter((a) => a.severity === "WARNING");

  const title =
    criticalAlerts.length > 0
      ? `${criticalAlerts.length} critical alert(s) need attention`
      : warningAlerts.length > 0
        ? `${warningAlerts.length} warning(s) detected`
        : "All systems operating normally";

  const summary =
    criticalAlerts.length > 0
      ? criticalAlerts[0].message
      : warningAlerts.length > 0
        ? warningAlerts[0].message
        : "No immediate action required. Continue monitoring sensor trends.";

  return (
    <article className="dashboard-panel ai-panel">
      <PanelHeader title="AI insight" detail="Automated analysis" />
      <h3>{title}</h3>
      <p>{summary}</p>
      <button className="button-secondary" type="button">
        Generate report
      </button>
    </article>
  );
}

function RealtimeAlertTable({ alerts }: { alerts: AlertEntry[] }) {
  if (alerts.length === 0) {
    return (
      <div className="alert-table-wrap">
        <p style={{ padding: "24px", color: "#7a7a7a" }}>
          No active alerts. All systems are operating within normal parameters.
        </p>
      </div>
    );
  }

  return (
    <div className="alert-table-wrap">
      <table className="alert-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Machine</th>
            <th>Severity</th>
            <th>Alert</th>
            <th>Recommended focus</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((alert) => (
            <tr key={alert.id}>
              <td>{alert.createdAt}</td>
              <td>
                <strong>{alert.machine?.code ?? alert.machineCode}</strong>
                <span>{alert.machine?.name ?? alert.machineName}</span>
              </td>
              <td>
                <span className="status-chip" data-status={alert.severity}>
                  {alert.severity.toLowerCase()}
                </span>
              </td>
              <td>{alert.title}</td>
              <td>{alert.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
