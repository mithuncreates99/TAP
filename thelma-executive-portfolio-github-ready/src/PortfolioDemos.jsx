import React, { useState } from 'react';
import { Workflow, Users, BarChart3 } from 'lucide-react';

const OPS_DATA = {
  North: { orders: 428, onTime: 96.8, backlog: 18, margin: 22.4, trend: [38, 45, 48, 58, 64, 72] },
  South: { orders: 356, onTime: 94.2, backlog: 24, margin: 19.8, trend: [31, 39, 42, 49, 54, 61] },
  East: { orders: 291, onTime: 92.6, backlog: 31, margin: 18.1, trend: [27, 33, 39, 43, 48, 55] },
  West: { orders: 385, onTime: 97.1, backlog: 16, margin: 23.6, trend: [34, 43, 51, 57, 63, 70] },
};

const DEMO_ORDERS = [
  { id: 'DEMO-1042', region: 'North', account: 'Willow Market', status: 'On time', due: 'Today' },
  { id: 'DEMO-1047', region: 'North', account: 'Harbor Goods', status: 'At risk', due: 'Today' },
  { id: 'DEMO-1051', region: 'South', account: 'Cedar & Co.', status: 'Delayed', due: 'Yesterday' },
  { id: 'DEMO-1058', region: 'East', account: 'Morrow Supply', status: 'On time', due: 'Tomorrow' },
  { id: 'DEMO-1063', region: 'West', account: 'Juniper House', status: 'At risk', due: 'Today' },
  { id: 'DEMO-1069', region: 'South', account: 'Northstar Retail', status: 'On time', due: 'Tomorrow' },
  { id: 'DEMO-1074', region: 'East', account: 'Fieldnote Goods', status: 'Delayed', due: 'Yesterday' },
  { id: 'DEMO-1080', region: 'West', account: 'Harborlight Shop', status: 'On time', due: 'Today' },
];

export function CrmWorkflowDemo() {
  const [name, setName] = useState('Jordan Lee');
  const [email, setEmail] = useState('jordan@example.test');
  const [budget, setBudget] = useState('25000');
  const [source, setSource] = useState('Website');
  const [result, setResult] = useState(null);

  const run = (event) => {
    event.preventDefault();
    const score = Math.min(
      100,
      30 + Math.min(45, Math.round((Number(budget) || 0) / 2000)) +
        (source === 'Referral' ? 25 : source === 'Event' ? 15 : 10)
    );
    const route = score >= 80 ? 'Priority queue' : score >= 60 ? 'Sales follow-up' : 'Nurture sequence';
    const next = score >= 80
      ? 'Assign to a sales owner and schedule a personal follow-up within one business day.'
      : score >= 60
        ? 'Add to the qualified-lead queue and request a discovery call.'
        : 'Send an introductory sequence and review engagement before assigning an owner.';
    setResult({ name: name.trim() || 'New lead', email, score, route, next });
  };

  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white p-5 shadow-sm sm:p-7 space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600">
            <Workflow className="h-4 w-4" /> Independent CRM workflow simulator
          </span>
          <h3 className="mt-2 text-xl font-black text-slate-900">Lead qualification & routing</h3>
          <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">
            Enter a fictional lead to see how a simple scoring rule chooses a queue and recommends a next action.
          </p>
        </div>
        <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[10px] font-bold text-blue-700">PERSONAL BUILD</span>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_0.9fr]">
        <form onSubmit={run} className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
          <div>
            <label htmlFor="demo-lead-name" className="mb-1 block text-xs font-semibold text-slate-700">Lead name</label>
            <input id="demo-lead-name" value={name} onChange={(event) => setName(event.target.value)} className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
          </div>
          <div>
            <label htmlFor="demo-lead-email" className="mb-1 block text-xs font-semibold text-slate-700">Email address</label>
            <input id="demo-lead-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="demo-lead-budget" className="mb-1 block text-xs font-semibold text-slate-700">Estimated budget (€)</label>
              <input id="demo-lead-budget" type="number" min="0" step="1000" value={budget} onChange={(event) => setBudget(event.target.value)} className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
            </div>
            <div>
              <label htmlFor="demo-lead-source" className="mb-1 block text-xs font-semibold text-slate-700">Lead source</label>
              <select id="demo-lead-source" value={source} onChange={(event) => setSource(event.target.value)} className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                <option>Website</option><option>Event</option><option>Referral</option>
              </select>
            </div>
          </div>
          <button type="submit" className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700">
            <Workflow className="h-4 w-4" /> Run routing simulation
          </button>
        </form>

        <div className="flex min-h-64 flex-col rounded-2xl border border-slate-200 bg-slate-900 p-5 text-white">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Routing result</span>
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-mono text-slate-300">RULESET v1.0</span>
          </div>
          {result ? (
            <div className="mt-5 space-y-4" role="status" aria-live="polite">
              <div className="flex items-end justify-between gap-3">
                <div><p className="text-sm font-semibold">{result.name}</p><p className="text-xs text-slate-400">{result.email}</p></div>
                <div className="text-right"><p className="text-3xl font-black text-amber-300">{result.score}</p><p className="text-[10px] uppercase tracking-wider text-slate-400">Lead score / 100</p></div>
              </div>
              <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">Assigned queue</p>
                <p className="mt-1 text-lg font-bold">{result.route}</p>
              </div>
              <div><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Recommended next action</p><p className="mt-1 text-sm leading-relaxed text-slate-200">{result.next}</p></div>
            </div>
          ) : (
            <div className="my-auto py-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-amber-300"><Users className="h-6 w-6" /></div>
              <p className="mt-3 text-sm font-bold">Ready for a sample lead</p>
              <p className="mx-auto mt-1 max-w-xs text-xs leading-relaxed text-slate-400">Adjust the fictional inputs and run the simulation to see its routing decision.</p>
            </div>
          )}
        </div>
      </div>
      <p className="text-[11px] leading-relaxed text-slate-500">
        Privacy & provenance: this self-contained personal demo does not send inputs to a server and uses no employer data, systems or workflows.
      </p>
    </div>
  );
}

export function OperationsAnalyticsDemo() {
  const [region, setRegion] = useState('All');
  const [status, setStatus] = useState('All statuses');
  const regions = region === 'All' ? Object.entries(OPS_DATA) : [[region, OPS_DATA[region]]];
  const orders = regions.reduce((sum, [, value]) => sum + value.orders, 0);
  const onTime = regions.reduce((sum, [, value]) => sum + value.orders * value.onTime, 0) / orders;
  const backlog = regions.reduce((sum, [, value]) => sum + value.backlog, 0);
  const margin = regions.reduce((sum, [, value]) => sum + value.orders * value.margin, 0) / orders;
  const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
  const trend = months.map((_, index) => regions.reduce((sum, [, value]) => sum + value.trend[index], 0));
  const max = Math.max(...trend);
  const rows = DEMO_ORDERS.filter((order) =>
    (region === 'All' || order.region === region) &&
    (status === 'All statuses' || order.status === status)
  );

  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white p-5 shadow-sm sm:p-7 space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700"><BarChart3 className="h-4 w-4" /> Independent operations analytics</span>
          <h3 className="mt-2 text-xl font-black text-slate-900">Synthetic Operations Analytics Dashboard</h3>
          <p className="mt-1 max-w-2xl text-xs leading-relaxed text-slate-600 sm:text-sm">A fictional retail fulfilment dataset for exploring order volume, service levels, backlog and margin by region.</p>
        </div>
        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-bold text-emerald-800">SYNTHETIC DATA</span>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 sm:flex-row sm:items-end">
        <div className="w-full sm:max-w-xs">
          <label htmlFor="ops-region-filter" className="mb-1 block text-xs font-semibold text-slate-700">Region</label>
          <select id="ops-region-filter" value={region} onChange={(event) => setRegion(event.target.value)} className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900">
            <option value="All">All regions</option>{Object.keys(OPS_DATA).map((name) => <option key={name}>{name}</option>)}
          </select>
        </div>
        <div className="w-full sm:max-w-xs">
          <label htmlFor="ops-status-filter" className="mb-1 block text-xs font-semibold text-slate-700">Order status</label>
          <select id="ops-status-filter" value={status} onChange={(event) => setStatus(event.target.value)} className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900">
            <option>All statuses</option><option>On time</option><option>At risk</option><option>Delayed</option>
          </select>
        </div>
        <p className="text-[11px] text-slate-500">Filters update KPIs, trend and order list.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Active orders</p><p className="mt-2 text-2xl font-black tabular-nums text-slate-900">{orders.toLocaleString('en-US')}</p></div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">On-time rate</p><p className="mt-2 text-2xl font-black tabular-nums text-emerald-700">{onTime.toFixed(1)}%</p></div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Open backlog</p><p className="mt-2 text-2xl font-black tabular-nums text-amber-700">{backlog}</p></div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Gross margin</p><p className="mt-2 text-2xl font-black tabular-nums text-slate-900">{margin.toFixed(1)}%</p></div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h4 className="text-sm font-bold text-slate-900">Monthly order volume</h4><p className="text-[11px] text-slate-500">Sample index • May–October</p>
          <div className="mt-5 flex h-40 items-end gap-3 border-b border-slate-200 px-1">
            {trend.map((value, index) => <div key={index} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2">
              <span className="text-[10px] font-semibold text-slate-600">{value}</span>
              <div className="flex h-[78%] w-full items-end"><div className="w-full rounded-t-lg bg-blue-600/85" style={{ height: `${Math.max(12, value / max * 100)}%` }} /></div>
              <span className="text-[10px] text-slate-500">{months[index]}</span>
            </div>)}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 p-4">
          <h4 className="text-sm font-bold text-slate-900">Regional service pulse</h4>
          <div className="mt-4 space-y-3">{regions.map(([name, value]) => <div key={name}>
            <div className="mb-1 flex justify-between text-xs"><span className="font-semibold text-slate-700">{name}</span><span className="font-mono text-slate-600">{value.onTime.toFixed(1)}%</span></div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-emerald-500" style={{ width: `${value.onTime}%` }} /></div>
          </div>)}</div>
          <p className="mt-4 text-[11px] text-slate-500">Illustrative figures; no real business or employer is represented.</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3"><h4 className="text-sm font-bold text-slate-900">Sample order queue</h4><span className="text-[11px] text-slate-500">{rows.length} records shown</span></div>
        <div className="overflow-x-auto"><table className="w-full min-w-[560px] text-left text-xs">
          <thead className="text-[10px] uppercase tracking-wider text-slate-500"><tr><th className="px-4 py-3">Reference</th><th className="px-4 py-3">Account</th><th className="px-4 py-3">Region</th><th className="px-4 py-3">Due</th><th className="px-4 py-3">Status</th></tr></thead>
          <tbody>{rows.length ? rows.map((order) => <tr key={order.id} className="border-t border-slate-100">
            <td className="px-4 py-3 font-mono font-semibold text-slate-800">{order.id}</td><td className="px-4 py-3 text-slate-700">{order.account}</td><td className="px-4 py-3">{order.region}</td><td className="px-4 py-3">{order.due}</td>
            <td className="px-4 py-3"><span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${order.status === 'On time' ? 'bg-emerald-50 text-emerald-700' : order.status === 'At risk' ? 'bg-amber-50 text-amber-800' : 'bg-rose-50 text-rose-700'}`}>{order.status}</span></td>
          </tr>) : <tr><td colSpan="5" className="px-4 py-8 text-center text-slate-500">No sample orders match these filters.</td></tr>}</tbody>
        </table></div>
      </div>
      <p className="text-[11px] leading-relaxed text-slate-500">Dataset note: every account, order reference and figure is fictional sample data created for this independent portfolio demo.</p>
    </div>
  );
}
