import type { Metadata } from "next";
import { DashboardView } from "@/features/dashboard/components/dashboard-view";

export const metadata: Metadata = {
  title: "Dashboard | FactoryMind AI",
  description: "Static manufacturing operations dashboard preview."
};

export default function DashboardPage() {
  return <DashboardView />;
}
