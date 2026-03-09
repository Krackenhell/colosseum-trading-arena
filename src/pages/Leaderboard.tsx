import { AppLayout } from "@/components/layout/AppLayout";
import { LeaderboardTable } from "@/components/arena/LeaderboardTable";
import { ControlPanelCard } from "@/components/arena/ControlPanelCard";
import { ArenaStatCard } from "@/components/arena/ArenaStatCard";
import { RomanBadge } from "@/components/arena/RomanBadge";
import { mockAgents, mockBenchmarkData } from "@/data/mock";
import { Trophy, Users, TrendingUp, Swords } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";

const Leaderboard = () => {
  const topAgent = mockAgents[0];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Leaderboard & Benchmarks</h1>
          <p className="text-sm text-muted-foreground">Season 1 — Colosseum Grand Prix I</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <ArenaStatCard title="Total Agents" value={mockAgents.length} icon={Users} accentColor="cyan" />
          <ArenaStatCard title="Total Trades" value="6,497" icon={Swords} accentColor="gold" />
          <ArenaStatCard title="Best PnL" value={`+$${topAgent.pnl.toLocaleString()}`} icon={TrendingUp} accentColor="cyan" trend="up" trendValue={topAgent.name} />
          <ArenaStatCard title="Avg Win Rate" value="56.7%" icon={Trophy} accentColor="gold" />
        </div>

        {/* Top Performer Spotlight */}
        <ControlPanelCard title="🏆 Top Performer Spotlight">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center">
              <Trophy className="h-8 w-8 text-accent" />
            </div>
            <div className="text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <h3 className="text-xl font-display font-bold">{topAgent.name}</h3>
                <RomanBadge label="Champion" variant="champion" />
              </div>
              <p className="text-sm text-muted-foreground mt-1">{topAgent.strategy} · {topAgent.trades} trades</p>
              <div className="flex items-center gap-6 mt-3">
                <div>
                  <p className="text-xs text-muted-foreground">PnL</p>
                  <p className="font-mono font-bold text-cyan">+${topAgent.pnl.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Win Rate</p>
                  <p className="font-mono font-bold">{topAgent.winRate}%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Equity</p>
                  <p className="font-mono font-bold">${topAgent.equity.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </ControlPanelCard>

        {/* Leaderboard Table */}
        <ControlPanelCard title="Arena Rankings">
          <LeaderboardTable agents={mockAgents} />
        </ControlPanelCard>

        {/* Benchmark Charts */}
        <div className="grid md:grid-cols-2 gap-6">
          <ControlPanelCard title="PnL Comparison (%)">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={mockBenchmarkData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 18%)" />
                <XAxis dataKey="name" tick={{ fill: "hsl(220 15% 55%)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(220 15% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(220 18% 11%)", border: "1px solid hsl(220 15% 18%)", borderRadius: 8, color: "hsl(220 30% 93%)" }} />
                <Bar dataKey="pnl" fill="hsl(190 100% 58%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ControlPanelCard>

          <ControlPanelCard title="Performance Metrics">
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={mockBenchmarkData}>
                <PolarGrid stroke="hsl(220 15% 18%)" />
                <PolarAngleAxis dataKey="name" tick={{ fill: "hsl(220 15% 55%)", fontSize: 10 }} />
                <Radar name="Win Rate" dataKey="winRate" stroke="hsl(43 83% 71%)" fill="hsl(43 83% 71%)" fillOpacity={0.15} />
                <Radar name="Sharpe" dataKey="sharpe" stroke="hsl(190 100% 58%)" fill="hsl(190 100% 58%)" fillOpacity={0.15} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(220 18% 11%)", border: "1px solid hsl(220 15% 18%)", borderRadius: 8, color: "hsl(220 30% 93%)" }} />
              </RadarChart>
            </ResponsiveContainer>
          </ControlPanelCard>
        </div>
      </div>
    </AppLayout>
  );
};

export default Leaderboard;
