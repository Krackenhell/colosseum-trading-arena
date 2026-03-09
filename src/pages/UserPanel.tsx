import { AppLayout } from "@/components/layout/AppLayout";
import { ArenaStatCard } from "@/components/arena/ArenaStatCard";
import { ControlPanelCard } from "@/components/arena/ControlPanelCard";
import { StatusPill } from "@/components/arena/StatusPill";
import { Button } from "@/components/ui/button";
import { mockChartData, mockTournaments } from "@/data/mock";
import { Activity, Users, Clock, TrendingUp, Plus } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const UserPanel = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold">User Panel</h1>
            <p className="text-sm text-muted-foreground">Register agents and join tournaments</p>
          </div>
          <Button variant="neon" className="gap-2">
            <Plus className="h-4 w-4" /> Register Agent
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <ArenaStatCard title="My Agents" value="2" icon={Users} accentColor="cyan" subtitle="active" />
          <ArenaStatCard title="Active Tournaments" value="1" icon={Activity} accentColor="gold" trend="up" trendValue="Season 1" />
          <ArenaStatCard title="Total PnL" value="+$4,231" icon={TrendingUp} accentColor="cyan" trend="up" trendValue="+12.4%" />
          <ArenaStatCard title="Next Tournament" value="22d" icon={Clock} accentColor="gold" subtitle="Gladiator League S2" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* BTC Chart */}
          <ControlPanelCard title="BTC/USDT — Live" className="md:col-span-2">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 18%)" />
                <XAxis dataKey="day" tick={{ fill: "hsl(220 15% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(220 15% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} domain={["auto", "auto"]} />
                <Tooltip
                  contentStyle={{ backgroundColor: "hsl(220 18% 11%)", border: "1px solid hsl(220 15% 18%)", borderRadius: 8, color: "hsl(220 30% 93%)" }}
                  labelStyle={{ color: "hsl(220 15% 55%)" }}
                />
                <Line type="monotone" dataKey="price" stroke="hsl(190 100% 58%)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ControlPanelCard>

          {/* Arena Status */}
          <ControlPanelCard title="Arena Status">
            <div className="space-y-4">
              {mockTournaments.map((t) => (
                <div key={t.id} className="flex items-start justify-between p-3 bg-secondary/50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{t.participants} participants · {t.prize}</p>
                  </div>
                  <StatusPill status={t.status as any} />
                </div>
              ))}
            </div>
          </ControlPanelCard>
        </div>

        {/* My Agents */}
        <ControlPanelCard title="My Agents">
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { name: "Gladiator Alpha", strategy: "Momentum Scalper", status: "active", pnl: "+$2,847" },
              { name: "Centurion V2", strategy: "Mean Reversion", status: "paused", pnl: "+$1,384" },
            ].map((agent, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-border">
                <div>
                  <p className="font-medium">{agent.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{agent.strategy}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-mono text-cyan">{agent.pnl}</p>
                  <StatusPill status={agent.status as any} className="mt-1" />
                </div>
              </div>
            ))}
          </div>
        </ControlPanelCard>
      </div>
    </AppLayout>
  );
};

export default UserPanel;
