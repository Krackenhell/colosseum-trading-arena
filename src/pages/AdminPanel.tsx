import { AppLayout } from "@/components/layout/AppLayout";
import { ControlPanelCard } from "@/components/arena/ControlPanelCard";
import { ArenaStatCard } from "@/components/arena/ArenaStatCard";
import { StatusPill } from "@/components/arena/StatusPill";
import { LogConsole } from "@/components/arena/LogConsole";
import { Button } from "@/components/ui/button";
import { mockTournaments, mockAgents, mockLogs } from "@/data/mock";
import { Shield, Users, Activity, AlertTriangle, Play, Pause, RotateCcw, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const AdminPanel = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold">Admin Control Center</h1>
            <p className="text-sm text-muted-foreground">Full system management</p>
          </div>
          <Button variant="neon" className="gap-2">
            <Plus className="h-4 w-4" /> New Tournament
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <ArenaStatCard title="Active Agents" value="6" icon={Users} accentColor="cyan" />
          <ArenaStatCard title="Open Positions" value="47" icon={Activity} accentColor="gold" />
          <ArenaStatCard title="System Health" value="98.2%" icon={Shield} accentColor="cyan" trend="up" trendValue="Normal" />
          <ArenaStatCard title="Warnings" value="3" icon={AlertTriangle} accentColor="crimson" trend="down" trendValue="2 new" />
        </div>

        {/* Tournament Manager */}
        <ControlPanelCard title="Tournament Manager">
          <div className="space-y-3">
            {mockTournaments.map((t) => (
              <div key={t.id} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-border">
                <div>
                  <div className="flex items-center gap-3">
                    <p className="font-medium">{t.name}</p>
                    <StatusPill status={t.status as any} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t.startDate} → {t.endDate} · {t.participants} participants · Prize: {t.prize}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {t.status === "active" && (
                    <Button variant="outline" size="sm"><Pause className="h-3.5 w-3.5" /></Button>
                  )}
                  {t.status === "upcoming" && (
                    <Button variant="neon" size="sm"><Play className="h-3.5 w-3.5" /></Button>
                  )}
                  {t.status === "completed" && (
                    <Button variant="outline" size="sm"><RotateCcw className="h-3.5 w-3.5" /></Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ControlPanelCard>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Agent Controls */}
          <ControlPanelCard title="Agent Controls">
            <div className="space-y-2">
              {mockAgents.slice(0, 5).map((agent) => (
                <div key={agent.id} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-muted-foreground w-4">#{agent.rank}</span>
                    <span className="text-sm font-medium">{agent.name}</span>
                    <StatusPill status={agent.status as any} />
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">Restart</Button>
                    <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-crimson hover:text-crimson">Stop</Button>
                  </div>
                </div>
              ))}
            </div>
          </ControlPanelCard>

          {/* Diagnostics */}
          <ControlPanelCard title="System Diagnostics">
            <div className="space-y-3">
              {[
                { label: "Price Feed", status: "connected", latency: "12ms" },
                { label: "Order Engine", status: "running", latency: "3ms" },
                { label: "Agent Runtime", status: "healthy", latency: "45ms" },
                { label: "Database", status: "connected", latency: "8ms" },
                { label: "WebSocket", status: "connected", latency: "15ms" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                  <span className="text-sm">{item.label}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-muted-foreground">{item.latency}</span>
                    <span className="w-2 h-2 rounded-full bg-cyan" />
                  </div>
                </div>
              ))}
            </div>
          </ControlPanelCard>
        </div>

        {/* Logs */}
        <ControlPanelCard title="System Logs">
          <LogConsole logs={mockLogs} />
        </ControlPanelCard>
      </div>
    </AppLayout>
  );
};

export default AdminPanel;
