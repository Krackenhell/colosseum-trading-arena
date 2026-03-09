import { AppLayout } from "@/components/layout/AppLayout";
import { ArenaStatCard } from "@/components/arena/ArenaStatCard";
import { ControlPanelCard } from "@/components/arena/ControlPanelCard";
import { StatusPill } from "@/components/arena/StatusPill";
import { mockPositions, mockEquityData, mockEvents } from "@/data/mock";
import { DollarSign, TrendingUp, BarChart3, Activity, Settings } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const AgentPanel = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold">Agent Control Room</h1>
            <p className="text-sm text-muted-foreground">Gladiator Alpha — Momentum Scalper</p>
          </div>
          <div className="flex items-center gap-3">
            <StatusPill status="active" />
            <Button variant="outline" size="sm" className="gap-2">
              <Settings className="h-3.5 w-3.5" /> Configure
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <ArenaStatCard title="Equity" value="$57,420" icon={DollarSign} accentColor="cyan" trend="up" trendValue="+$1,230 today" />
          <ArenaStatCard title="Total PnL" value="+$12,847" icon={TrendingUp} accentColor="gold" trend="up" trendValue="+28.4%" />
          <ArenaStatCard title="Total Trades" value="1,284" icon={BarChart3} accentColor="cyan" />
          <ArenaStatCard title="Win Rate" value="73.2%" icon={Activity} accentColor="gold" trend="up" trendValue="+2.1% this week" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Equity Curve */}
          <ControlPanelCard title="Equity Curve" className="md:col-span-2">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={mockEquityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 18%)" />
                <XAxis dataKey="day" tick={{ fill: "hsl(220 15% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(220 15% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} domain={["auto", "auto"]} />
                <Tooltip
                  contentStyle={{ backgroundColor: "hsl(220 18% 11%)", border: "1px solid hsl(220 15% 18%)", borderRadius: 8, color: "hsl(220 30% 93%)" }}
                />
                <Line type="monotone" dataKey="equity" stroke="hsl(43 83% 71%)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ControlPanelCard>

          {/* Event Feed */}
          <ControlPanelCard title="Event Feed">
            <div className="space-y-3 max-h-72 overflow-y-auto">
              {mockEvents.map((event) => (
                <div key={event.id} className="flex gap-3 text-sm">
                  <span className={cn(
                    "w-1.5 h-1.5 rounded-full mt-1.5 shrink-0",
                    event.severity === "success" && "bg-cyan",
                    event.severity === "warning" && "bg-accent",
                    event.severity === "info" && "bg-muted-foreground",
                  )} />
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground/90 truncate">{event.message}</p>
                    <p className="text-xs text-muted-foreground">{event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </ControlPanelCard>
        </div>

        {/* Positions */}
        <ControlPanelCard title="Open Positions" headerAction={<span className="text-xs text-muted-foreground">{mockPositions.open.length} active</span>}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted-foreground text-xs uppercase tracking-wider border-b border-border">
                  <th className="text-left py-2 px-3 font-medium">Pair</th>
                  <th className="text-left py-2 px-3 font-medium">Side</th>
                  <th className="text-right py-2 px-3 font-medium">Entry</th>
                  <th className="text-right py-2 px-3 font-medium">Current</th>
                  <th className="text-right py-2 px-3 font-medium">Size</th>
                  <th className="text-right py-2 px-3 font-medium">PnL</th>
                  <th className="text-right py-2 px-3 font-medium">Time</th>
                </tr>
              </thead>
              <tbody>
                {mockPositions.open.map((p) => (
                  <tr key={p.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="py-2.5 px-3 font-medium">{p.pair}</td>
                    <td className="py-2.5 px-3">
                      <span className={cn("text-xs font-semibold px-2 py-0.5 rounded", p.side === "LONG" ? "bg-cyan/15 text-cyan" : "bg-crimson/15 text-crimson")}>
                        {p.side}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-muted-foreground">${p.entry.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-right font-mono">${p.current.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-right font-mono text-muted-foreground">{p.size}</td>
                    <td className={cn("py-2.5 px-3 text-right font-mono font-medium", p.pnl >= 0 ? "text-cyan" : "text-crimson")}>
                      {p.pnl >= 0 ? "+" : ""}${p.pnl.toFixed(2)} ({p.pnlPercent >= 0 ? "+" : ""}{p.pnlPercent}%)
                    </td>
                    <td className="py-2.5 px-3 text-right text-muted-foreground">{p.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ControlPanelCard>

        <ControlPanelCard title="Closed Positions" headerAction={<span className="text-xs text-muted-foreground">{mockPositions.closed.length} trades</span>}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted-foreground text-xs uppercase tracking-wider border-b border-border">
                  <th className="text-left py-2 px-3 font-medium">Pair</th>
                  <th className="text-left py-2 px-3 font-medium">Side</th>
                  <th className="text-right py-2 px-3 font-medium">Entry</th>
                  <th className="text-right py-2 px-3 font-medium">Exit</th>
                  <th className="text-right py-2 px-3 font-medium">PnL</th>
                  <th className="text-right py-2 px-3 font-medium">Duration</th>
                </tr>
              </thead>
              <tbody>
                {mockPositions.closed.map((p) => (
                  <tr key={p.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="py-2.5 px-3 font-medium">{p.pair}</td>
                    <td className="py-2.5 px-3">
                      <span className={cn("text-xs font-semibold px-2 py-0.5 rounded", p.side === "LONG" ? "bg-cyan/15 text-cyan" : "bg-crimson/15 text-crimson")}>
                        {p.side}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-muted-foreground">${p.entry}</td>
                    <td className="py-2.5 px-3 text-right font-mono">${p.exit}</td>
                    <td className={cn("py-2.5 px-3 text-right font-mono font-medium", p.pnl >= 0 ? "text-cyan" : "text-crimson")}>
                      {p.pnl >= 0 ? "+" : ""}${p.pnl.toFixed(2)}
                    </td>
                    <td className="py-2.5 px-3 text-right text-muted-foreground">{p.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ControlPanelCard>

        {/* Strategy Controls */}
        <ControlPanelCard title="Strategy Controls">
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { label: "Max Position Size", value: "0.2 BTC" },
              { label: "Stop Loss", value: "-2.5%" },
              { label: "Take Profit", value: "+5.0%" },
              { label: "Max Drawdown", value: "10%" },
              { label: "Trade Frequency", value: "~15/day" },
              { label: "Leverage", value: "3x" },
            ].map((param, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                <span className="text-sm text-muted-foreground">{param.label}</span>
                <span className="text-sm font-mono font-medium">{param.value}</span>
              </div>
            ))}
          </div>
        </ControlPanelCard>
      </div>
    </AppLayout>
  );
};

export default AgentPanel;
