import React from "react";
import { useNavigate } from "react-router-dom";

/* ---------- helpers ---------- */
const INR = (n)=> `₹${Number(n||0).toLocaleString('en-IN')}`;
const randSpan = (p=0.28)=> (Math.random()<p ? "col-span-2" : "");

/* ---------- main ---------- */
export default function AdminDashboard(){
  const navigate = useNavigate();

  React.useEffect(()=>{
    document.documentElement.style.setProperty('--vg-cyan','#22d3ee');
    document.documentElement.style.setProperty('--vg-indigo','#6366f1');
    document.documentElement.style.setProperty('--vg-emerald','#10b981');
    if(!localStorage.getItem('adminSessionStart')){
      localStorage.setItem('adminSessionStart', new Date().toISOString());
    }
  },[]);

  return (
    <div className="min-h-screen w-full bg-[#f5f7fb] text-slate-900 overflow-y-auto no-scrollbar scroll-smooth">
      <style>{`.no-scrollbar{ -ms-overflow-style: none; scrollbar-width: none; } html{ scroll-behavior:smooth; } .no-scrollbar::-webkit-scrollbar{ width: 0; height: 0; }`}</style>

      {/* Top Bar */}
      <div className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm">
        <div className="flex items-center gap-2 font-extrabold tracking-wide">
          <span>Vault Guard</span>
          <ShieldIcon/>
        </div>
        <button
          onClick={()=>{ localStorage.removeItem('isAdmin'); localStorage.removeItem('adminSessionStart'); navigate('/',{replace:true}) }}
          className="rounded-lg px-3 py-1 bg-slate-100 hover:bg-white/20"
        >Logout</button>
      </div>

      <div className="px-6 py-5 text-2xl font-extrabold">Welcome Aditya</div>

      {/* ====== IMPORTANT: full-bleed grid wrapper ======
          grid-cols uses minmax(0,1fr) so the second column can shrink/grow,
          w-full + max-w-none prevents any ancestor max-width from centering */}
      <div className="px-6">
        <div className="grid grid-cols-[240px,minmax(0,1fr)] gap-6 pb-10 w-full max-w-none">
          {/* Sidebar */}
          <aside className="rounded-xl border border-slate-800 p-3 bg-[#0f172a] text-white h-fit">
            <div className="text-xs font-semibold mb-2">MAIN</div>
            <ul className="space-y-1">
              <li className="px-3 py-2 rounded-lg bg-slate-800/60">Dashboard</li>
              <li className="px-3 py-2 rounded-lg hover:bg-slate-800/60">Subscriptions</li>
              <li className="px-3 py-2 rounded-lg hover:bg-slate-800/60">Security Logs</li>
              <li className="px-3 py-2 rounded-lg hover:bg-slate-800/60">Feedback</li>
              <li className="px-3 py-2 rounded-lg hover:bg-slate-800/60">Settings</li>
            </ul>
          </aside>

          {/* Content grid */}
          <main className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 auto-rows-auto [grid-auto-flow:row_dense] min-w-0">
            <Card className={randSpan(0.18)}>
              <div className="flex items-center justify-between h-full">
                <div>
                  <div className="font-semibold">Total Earnings This Month</div>
                  <div className="text-xs">Auto-updates on purchase</div>
                </div>
                <div className="text-3xl font-black text-emerald-600"><EarningsWidget/></div>
              </div>
            </Card>

            <TransactionList className={"col-span-2 "+randSpan(0.12)} />
            <TransactionsTicker className={randSpan()} />
            <TargetProgress target={50000} className={randSpan()} />
            <SecurityHealth className={randSpan()} />

            <PriceSpark title="Daily Earning"   price="₹9,626"  color="text-indigo-300" mode="up"       className={randSpan()} />
            <PriceBars  title="Market"  price="₹7,831"  color="text-pink-300"   variant="down"  className={randSpan()} />
            <PriceBars  title="Ripple Price"    price="₹1,239"  color="text-violet-300" variant="range" className={randSpan()} />
            <PriceBars  title="Litecoin Price"  price="₹849"    color="text-amber-300"  variant="volatile" className={randSpan()} />

            <SubscriptionsOverview className={randSpan()} />
            <GrowthTrend className={randSpan()} />
            <SatisfactionCard className={randSpan()} />
            <RevenueTrend className={"col-span-2 "+randSpan(0.2)} />
            <FeedbackSection className={randSpan()} />
            <EventsFeed className={randSpan()} />
            <LiveClock className={randSpan(0.14)} />

            {/* ---- New Analytics Row ---- */}
            <KPI label="Users" value="28.05k" trend={16.24} />
            <KPI label="Sessions" value="97.66k" trend={-3.96} />
            <KPI label="Avg. Visit Duration" value="3m 40sec" trend={-0.24} />
            <KPI label="Bounce Rate" value="33.48%" trend={7.05} />
            <CountriesChart className={randSpan(0.15)+" mb-2"} />
            <DeviceDonut />
            <RecentOrders />
          </main>
        </div>
      </div>
    </div>
  );
}

/* ---------- primitives ---------- */
function Card({children, className=""}){
  return (
    <div className={"rounded-xl p-5 bg-white border border-slate-200 text-slate-900 shadow-sm h-full flex flex-col "+className}>
      {children}
    </div>
  );
}
function ShieldIcon(){
  return (
    <svg viewBox="0 0 64 64" width="20" height="20" className="animate-pulse">
      <path d="M32 6 L54 14 V28c0 14-9 26-22 30C19 54 10 42 10 28V14z" fill="#6366f1"/>
      <path d="M22 30 l8 8 12-14" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  );
}

function ChatIcon(){return (<svg className="w-5 h-5 md:w-6 md:h-6 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" d="M21 15a4 4 0 0 1-4 4H8l-5 3 1.5-4A4 4 0 0 1 1 14V7a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v8z"/></svg>); }
function BellIcon(){return (<svg className="w-5 h-5 md:w-6 md:h-6 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14v-3a6 6 0 1 0-12 0v3a2 2 0 0 1-.6 1.4L4 17h5m6 0a3 3 0 1 1-6 0"/></svg>); }
function ClockIcon(){return (<svg className="w-5 h-5 md:w-6 md:h-6 animate-spin" style={{animationDuration:'6s'}} viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="9" strokeWidth="2"/><path strokeWidth="2" d="M12 7v5l3 3"/></svg>); }
function UsersIcon(){return (<svg className="w-5 h-5 md:w-6 md:h-6 motion-safe:animate-[float_3s_ease-in-out_infinite]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4" strokeWidth="2"/><path strokeWidth="2" d="M23 21v-2a4 4 0 0 0-3-3.87"/><path strokeWidth="2" d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>); }



/* ---------- price cards ---------- */
function PriceSpark({title, price, color, mode='up', className=""}){
  return (
    <Card className={className}>
      <div className="text-sm">{title}</div>
      <div className="text-2xl font-bold mt-1">{price}</div>
      <div className={color}><Sparkline mode={mode}/></div>
    </Card>
  );
}
function Sparkline({mode='up'}){
  const [data, setData] = React.useState(()=>Array.from({length:24},(_,i)=>0.5 + 0.02*Math.sin(i)));
  React.useEffect(()=>{
    const id = setInterval(()=>{
      setData(d=>{
        const last = d[d.length-1];
        let drift=0; if(mode==='up')drift=.004; if(mode==='down')drift=-.004; if(mode==='volatile')drift+=(Math.random()-.5)*.01;
        let noise=(Math.random()-.5)*.03; if(mode==='range') noise += (.5-last)*.04;
        const next = Math.max(.05, Math.min(.95, last+drift+noise));
        return d.slice(1).concat(next);
      });
    }, 260);
    return ()=> clearInterval(id);
  },[mode]);
  const pts = data.map((y,i)=>`${(i/(data.length-1))*100},${(1-y)*28+2}`).join(' ');
  return (<svg viewBox="0 0 100 32" className="w-full h-14 mt-1"><polyline fill="none" stroke="currentColor" strokeWidth="2" points={pts}/></svg>);
}

function PriceBars({title, price, color, variant='up', className=""}){
  return (
    <Card className={className}>
      <div className="text-sm">{title}</div>
      <div className="text-2xl font-bold mt-1">{price}</div>
      <div className={color}><BarTicker variant={variant}/></div>
    </Card>
  );
}
function BarTicker({variant='up'}){
  const [bars, setBars] = React.useState(()=> Array.from({length:24}, ()=> .3 + Math.random()*.4));
  React.useEffect(()=>{
    const id = setInterval(()=>{
      setBars(b=>{
        let prev=b[b.length-1];
        let drift = variant==='up' ? .02 : variant==='down' ? -.02 : 0;
        if(variant==='volatile') drift = (Math.random()-.5)*.05;
        let noise = (Math.random()-.5)*.12;
        if(variant==='range') noise += (.5 - prev)*.08;
        const next = Math.max(.05, Math.min(.95, prev + drift + noise));
        return b.slice(1).concat(next);
      });
    }, 320);
    return ()=> clearInterval(id);
  },[variant]);
  return (
    <div className="flex items-end gap-1 h-16 mt-1">
      {bars.map((h,i)=>(<div key={i} className="w-1.5 rounded-sm bg-current opacity-90" style={{height:`${h*100}%`}}/>))}
    </div>
  );
}

/* ---------- earnings widgets ---------- */
function computeMonthlyTotal(){
  try{
    const purchases = JSON.parse(localStorage.getItem('purchases')||'[]');
    const startIso = localStorage.getItem('adminSessionStart');
    if(!startIso) return 0;
    const start = new Date(startIso).getTime();
    const now = new Date();
    const monthKey = `${now.getFullYear()}-${now.getMonth()+1}`;
    return purchases
      .filter(x => new Date(x.date).getTime() >= start)
      .filter(x => `${new Date(x.date).getFullYear()}-${new Date(x.date).getMonth()+1}` === monthKey)
      .reduce((s,x)=> s + (Number(x.amount)||0), 0);
  }catch{ return 0 }
}
function EarningsWidget(){
  const [total, setTotal] = React.useState(computeMonthlyTotal());
  React.useEffect(()=>{
    const refresh = ()=> setTotal(computeMonthlyTotal());
    window.addEventListener('payment:recorded', refresh);
    const id = setInterval(refresh, 1500);
    return ()=>{ window.removeEventListener('payment:recorded', refresh); clearInterval(id); };
  },[]);
  return <span>{INR(total)}</span>;
}
function TargetProgress({target=50000, className=""}){
  const [val, setVal] = React.useState(computeMonthlyTotal());
  React.useEffect(()=>{
    const refresh = ()=> setVal(computeMonthlyTotal());
    window.addEventListener('payment:recorded', refresh);
    const id = setInterval(refresh, 2000);
    return ()=>{ window.removeEventListener('payment:recorded', refresh); clearInterval(id); };
  },[]);
  const pct = Math.min(100, Math.round((val/target)*100));
  return (
    <Card className={className}>
      <div className="flex items-center justify-between mb-2">
        <div className="font-semibold">Revenue Target</div>
        <div className="text-sm">Goal: {INR(target)}</div>
      </div>
      <div className="h-3 rounded-full bg-slate-800 overflow-hidden">
        <div className="h-full bg-emerald-500 rounded-full transition-all duration-700" style={{width:`${pct}%`}} />
      </div>
      <div className="mt-2 text-sm font-semibold text-emerald-600">{pct}% achieved</div>
    </Card>
  );
}

/* ---------- security / subs ---------- */
function SecurityHealth({className=""}){
  const [failed, setFailed] = React.useState(0);
  React.useEffect(()=>{
    const id = setInterval(()=> setFailed(f=> Math.max(0, f + (Math.random()<0.2?1:0) - (Math.random()<0.3?1:0))), 2400);
    return ()=> clearInterval(id);
  },[]);
  return (
    <Card className={className}>
      <div className="font-semibold mb-2 flex items-center gap-2"><ShieldIcon/> <span>Security Health</span></div>
      <div className="text-emerald-600 font-semibold">All systems secure</div>
      <div className="mt-2 text-sm">Failed login attempts: <span className="font-semibold">{failed}</span></div>
      <div className="text-xs">Last scan: {new Date().toLocaleString()}</div>
    </Card>
  );
}

function SubscriptionsOverview({className=""}){
  const [vals, setVals] = React.useState({active:75, expired:18, trial:7});
  React.useEffect(()=>{
    const id=setInterval(()=>{
      setVals(v=>{
        const active = Math.min(90, Math.max(60, v.active + (Math.random()-0.5)*2));
        const expired = 18;
        const trial = Math.max(0, 100 - expired - active);
        return {active, expired, trial};
      });
    }, 2600);
    return ()=> clearInterval(id);
  },[]);
  const total = vals.active + vals.expired + vals.trial;
  const a = vals.active/total, e = vals.expired/total, t = vals.trial/total;
  const arc = (start, frac)=>{
    const end = start + frac*2*Math.PI;
    const L = frac>0.5 ? 1 : 0;
    const sx = 50 + 42*Math.cos(start), sy = 50 + 42*Math.sin(start);
    const ex = 50 + 42*Math.cos(end),   ey = 50 + 42*Math.sin(end);
    return `M50,50 L${sx},${sy} A42,42 0 ${L} 1 ${ex},${ey} Z`;
  };
  return (
    /* ---------- Subscriptions Overview (animated donut) ---------- */
function SubscriptionsOverview({ className = "" }) {
  // simulate live changing values (replace with real data source if available)
  const [vals, setVals] = React.useState({ active: 75, expired: 18, trial: 7 });

  React.useEffect(() => {
    const id = setInterval(() => {
      setVals(v => {
        // gently vary active between 60 and 90; keep expired ~ constant; recompute trial
        const active = Math.max(60, Math.min(90, Math.round(v.active + (Math.random() - 0.5) * 2.5)));
        const expired = 18; // keep stable for demo
        const trial = Math.max(0, 100 - active - expired);
        return { active, expired, trial };
      });
    }, 2600);
    return () => clearInterval(id);
  }, []);

  // convert to fractions
  const total = vals.active + vals.expired + vals.trial || 1;
  const a = vals.active / total;
  const e = vals.expired / total;
  const t = vals.trial / total;

  // circle geometry (donut)
  const r = 42;
  const stroke = 18;
  const cx = 50;
  const cy = 50;
  const circumference = 2 * Math.PI * r;

  // compute stroke dash for a segment starting at startFrac with length frac
  const seg = (startFrac, frac) => {
    const length = Math.max(0, Math.min(1, frac)) * circumference;
    const dashArray = `${length} ${circumference}`;
    const offset = Math.round(circumference * (1 - startFrac));
    return { dashArray, offset };
  };

  const segA = seg(0, a);
  const segE = seg(a, e);
  const segT = seg(a + e, t);

  // animated central number (active %)
  const [displayPct, setDisplayPct] = React.useState(Math.round(a * 100));
  const prevRef = React.useRef(Math.round(a * 100));
  React.useEffect(() => {
    const target = Math.round(a * 100);
    const start = prevRef.current;
    const dur = 700;
    let raf = null;
    const t0 = performance.now();
    const tick = (tnow) => {
      const p = Math.min(1, (tnow - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      const cur = Math.round(start + (target - start) * eased);
      setDisplayPct(cur);
      if (p < 1) raf = requestAnimationFrame(tick);
      else prevRef.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => { if (raf) cancelAnimationFrame(raf); };
  }, [a]);

  // small styles for smooth arc transitions and subtle glow
  const svgStyle = {
    width: "100%",
    maxWidth: "220px",
    margin: "0 auto",
    display: "block",
  };

  return (
    <Card className={className}>
      <style>{`
        .sg-arc { transition: stroke-dasharray 850ms cubic-bezier(.2,.9,.3,1), stroke-dashoffset 850ms cubic-bezier(.2,.9,.3,1); transform-origin: 50% 50%; }
        .sg-arc.delay-1 { transition-delay: 80ms; }
        .sg-arc.delay-2 { transition-delay: 220ms; }
        .sg-glow { filter: drop-shadow(0 6px 10px rgba(99,102,241,0.08)); }
      `}</style>

      <div className="font-semibold mb-2">Subscriptions Overview</div>

      <svg viewBox="0 0 100 100" style={svgStyle} aria-hidden>
        <defs>
          <linearGradient id="gActive" x1="0" x2="1">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
          <linearGradient id="gExpired" x1="0" x2="1">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
          <linearGradient id="gTrial" x1="0" x2="1">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>
        </defs>

        {/* rotate so 12 o'clock is start */}
        <g transform="rotate(-90 50 50)">
          {/* background ring */}
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f1f5f9" strokeWidth={stroke} />

          {/* Active arc */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="url(#gActive)"
            strokeWidth={stroke}
            strokeLinecap="round"
            className="sg-arc sg-glow delay-0"
            strokeDasharray={segA.dashArray}
            strokeDashoffset={segA.offset}
          />

          {/* Expired arc */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="url(#gExpired)"
            strokeWidth={stroke}
            strokeLinecap="round"
            className="sg-arc delay-1"
            strokeDasharray={segE.dashArray}
            strokeDashoffset={segE.offset}
          />

          {/* Trial arc */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="url(#gTrial)"
            strokeWidth={stroke}
            strokeLinecap="round"
            className="sg-arc delay-2"
            strokeDasharray={segT.dashArray}
            strokeDashoffset={segT.offset}
          />
        </g>

        {/* inner circle and center text */}
        <circle cx="50" cy="50" r="28" fill="#f5f7fb" />
        <text x="50" y="54" textAnchor="middle" style={{ fill: "#0f172a", fontWeight: 800, fontSize: "16px" }}>
          {displayPct}%
        </text>
        <text x="50" y="72" textAnchor="middle" style={{ fill: "#6b7280", fontSize: "10px" }}>
          Active
        </text>
      </svg>

      <div className="mt-2 text-sm grid grid-cols-3 gap-2">
        <div className="text-slate-600">Active</div>
        <div className="col-span-2 font-semibold">{Math.round(a * 100)}%</div>

        <div className="text-slate-600">Expired</div>
        <div className="col-span-2 font-semibold">{Math.round(e * 100)}%</div>

        <div className="text-slate-600">Trial</div>
        <div className="col-span-2 font-semibold">{Math.round(t * 100)}%</div>
      </div>
    </Card>
  );
}

  );
}

/* ---------- growth / satisfaction / revenue ---------- */
const GrowthTrend = ({className=""}) => (
  <Card className={className}>
    <div className="font-semibold mb-2">Subscription Growth Trend</div>
    <div className="text-indigo-500"><BarTicker variant="up" /></div>
    <div className="text-xs">Live demo trend (signups)</div>
  </Card>
);

function SatisfactionCard({className=""}){
  const [score, setScore] = React.useState(4.6);
  React.useEffect(()=>{
    const id = setInterval(()=> setScore(s=> Math.max(3.8, Math.min(5, s + (Math.random()-0.5)*0.05))), 3000);
    return ()=> clearInterval(id);
  },[]);
  const stars = Math.round(score);
  return (
    <Card className={className}>
      <div className="font-semibold mb-1">Customer Satisfaction</div>
      <div className="text-3xl font-black">{score.toFixed(1)}<span className="text-xl">/5</span></div>
      <div className="mt-1 flex gap-1">
        {Array.from({length:5}).map((_,i)=>(<span key={i} className={i<stars ? "text-amber-400" : "text-slate-600"}>★</span>))}
      </div>
      <div className="text-xs mt-1">Based on recent feedback</div>
    </Card>
  );
}

function RevenueTrend({className=""}){
  const [bars, setBars] = React.useState(()=> Array.from({length:12}, ()=> Math.random()*0.8+0.2));
  React.useEffect(()=>{
    const id = setInterval(()=> setBars(b=> b.slice(1).concat(Math.random()*0.8+0.2)), 1200);
    return ()=> clearInterval(id);
  },[]);
  return (
    <Card className={className}>
      <div className="font-semibold mb-2">Revenue Trend</div>
      <div className="flex items-end gap-1 h-28">
        {bars.map((h,i)=>(<div key={i} className="w-3 bg-indigo-400/80 rounded-md transition-all duration-700" style={{height:`${h*100}%`}}/>))}
      </div>
      <div className="text-xs">Session demo</div>
    </Card>
  );
}

/* ---------- transactions ---------- */
function usePurchasesForSession(){
  const [list, setList] = React.useState([]);
  const compute = ()=>{
    try{
      const arr = JSON.parse(localStorage.getItem('purchases')||'[]');
      const startIso = localStorage.getItem('adminSessionStart');
      if(!startIso){ setList([]); return }
      const start = new Date(startIso).getTime();
      const now = new Date();
      const monthKey = `${now.getFullYear()}-${now.getMonth()+1}`;
      const filtered = arr
        .filter(x => new Date(x.date).getTime() >= start)
        .filter(x => `${new Date(x.date).getFullYear()}-${new Date(x.date).getMonth()+1}` === monthKey)
        .sort((a,b)=> new Date(b.date) - new Date(a.date));
      setList(filtered);
    }catch{ setList([]) }
  };
  React.useEffect(()=>{
    compute();
    const onRecorded = ()=> compute();
    const onStorage = (e)=>{ if(e.key==='purchases') compute() };
    window.addEventListener('payment:recorded', onRecorded);
    window.addEventListener('storage', onStorage);
    const id = setInterval(compute, 2000);
    return ()=>{ window.removeEventListener('payment:recorded', onRecorded); window.removeEventListener('storage', onStorage); clearInterval(id); }
  },[]);
  return list;
}
function TransactionList({className=""}){
  const list = usePurchasesForSession();
  const last5 = list.slice(0,5);
  return (
    <Card className={className}>
      <div className="font-semibold mb-2">Recent Transactions</div>
      {last5.length===0 ? (
        <div className="text-sm">No payments yet for this session.</div>
      ) : (
        <ul className="divide-y divide-slate-200">
          {last5.map((t,i)=>(
            <li key={i} className="py-2 flex items-center justify-between">
              <div className="text-sm">{new Date(t.date).toLocaleString()}</div>
              <div className="font-semibold">{INR(t.amount)}</div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

/* ---------- live payments ticker (5 at a time from 100) ---------- */
// Names + helpers
const FIRST = ["Aditya","Yash","Nitesh","Aman","Nimish","Anurag","Soham","Pundlik","Pratibha","Pratik","Niranjan Da"];

const randName = (i) => FIRST[i % FIRST.length];

const avatar = (name, idx) => {
  const colors = ['#60a5fa','#a78bfa','#34d399','#f59e0b','#f472b6','#22d3ee'];
  const bg = colors[idx % colors.length];
  const initial = name[0].toUpperCase();
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><circle cx='32' cy='32' r='32' fill='${bg}'/><text x='32' y='40' text-anchor='middle' font-size='28' font-family='Arial' fill='white'>${initial}</text></svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
};

const buildSeed = (n=100) => Array.from({length:n}, (_,i) => {
  const name = randName(i);
  return {
    id: i,
    name,
    amount: 99 + Math.floor(Math.random() * 1200),
    avatar: avatar(name, i),
    time: new Date(Date.now() - i * 60000).toLocaleTimeString()
  };
});

// renamed to avoid "Identifier 'INR' has already been declared"
const formatINR = (amt)=> "₹" + Number(amt).toLocaleString("en-IN");

/* ---------- Component ---------- */
function TransactionsTicker({ className = "" }) {
  const seed = React.useMemo(() => buildSeed(100), []);
  const [live, setLive] = React.useState(() => {
    return seed.slice(0, 5).map((t, idx) => ({ ...t, uid: `init-${idx}-${Date.now()}` }));
  });

  React.useEffect(() => {
    const id = setInterval(() => {
      setLive((list) => {
        const randomSeedIdx = Math.floor(Math.random() * seed.length);
        const randomLiveIdx = Math.floor(Math.random() * list.length);

        const replacement = {
          ...seed[randomSeedIdx],
          uid: `${Date.now()}-${randomSeedIdx}`
        };

        const newList = [...list];
        newList[randomLiveIdx] = replacement;
        return newList;
      });

      try { window.dispatchEvent(new Event("payment:recorded")); } catch {}
    }, 2000);

    return () => clearInterval(id);
  }, [seed]);

  return (
    <Card className={"col-span-2 " + className}>
      <div className="font-semibold mb-2">Live Payments</div>
      <ul className="divide-y">
        {live.map((t) => (
          <li key={t.uid ?? (t.id + "-" + t.time)} className="py-1.5 flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <img src={t.avatar} alt="" className="w-6 h-6 rounded-full" />
              <div className="text-sm truncate">{t.name}</div>
            </div>
            <div className="font-semibold tabular-nums">{formatINR(t.amount)}</div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/* ---------- feedback / events / clock ---------- */

function FeedbackSection({className=""}){
  try{
    const key='feedbacks'; const existing=JSON.parse(localStorage.getItem(key)||'[]');
    if(!existing.length){
      localStorage.setItem(key, JSON.stringify([
        {name:'Aditya Belsare', text:'VaultGuard is super secure and easy to use!'},
        {name:'Yash Patil', text:'Loved the smooth login animation.'},
        {name:'Nimish Lanjewar', text:'Great dashboard, very user friendly.'},
        {name:'Nitesh', text:'Please add more recovery options.'},
        {name:'Saksham Shinde', text:'Dark mode looks amazing on mobile.'},
      ]));
    }
  }catch{}
  const list = (JSON.parse(localStorage.getItem('feedbacks')||'[]')||[]).slice(0,5);
  return (
    <Card className={`aspect-square col-span-2 row-span-2 overflow-hidden ${className}`}>
      <div className="flex items-center gap-2 font-semibold mb-3">
        <div className="rounded-full bg-slate-100 text-slate-900 p-2"><ChatIcon/></div>
        <span>Customer Feedback</span>
      </div>
      <ul className="divide-y overflow-auto pr-1">
        {list.map((f,i)=>(
          <li key={i} className="py-3 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-700/60 flex items-center justify-center font-bold">{f.name[0]}</div>
            <div>
              <div className="font-medium">{f.name}</div>
              <div className="text-sm text-slate-600">{f.text}</div>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function EventsFeed({className=""}){
  const [events,setEvents]=React.useState([
    {t:Date.now()-600000,text:'Payment recorded'},
    {t:Date.now()-540000,text:'Payment recorded'},
    {t:Date.now()-420000,text:'Failed login attempt blocked (Mumbai)'},
    {t:Date.now()-300000,text:'Payment recorded'},
    {t:Date.now()-180000,text:'New signup: enterprise trial'}
  ]);
  React.useEffect(()=>{
    const onRecorded=()=>setEvents(e=>[{t:Date.now(), text:'Payment recorded'}, ...e].slice(0,8));
    window.addEventListener('payment:recorded', onRecorded);
    return ()=> window.removeEventListener('payment:recorded', onRecorded);
  },[]);
  return (
    <Card className={`aspect-square overflow-hidden ${className}`}>
      <div className="flex items-center gap-2 font-semibold mb-3">
        <div className="rounded-full bg-slate-100 text-slate-900 p-2"><BellIcon/></div>
        <span>Recent Events</span>
      </div>
      <ul className="space-y-2 overflow-auto pr-1">
        {events.slice(0,6).map((e,i)=>(
          <li key={i} className="text-sm flex items-center justify-between border-b last:border-b-0 pb-2">
            <span className="text-slate-700">{e.text}</span>
            <span className="text-xs text-slate-500">{new Date(e.t).toLocaleTimeString()}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function LiveClock({ className = "" }) {
  const [now, setNow] = React.useState(new Date());
  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <Card className={`relative aspect-square p-5 ${className}`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-slate-100 text-slate-900 p-2">
            <ClockIcon />
          </div>
          <div className="text-sm text-slate-500">System Time</div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="mt-1 text-3xl md:text-4xl font-extrabold leading-none">
            {now.toLocaleTimeString()}
          </div>
          <div className="text-xs mt-2">{now.toDateString()}</div>
        </div>
      </div>
    </Card>
  );
}

/* ---------- Analytics KPI Cards ---------- */

function KPI({label, value, trend, className=""}){
  const up = Number(trend||0) >= 0;
  const color = up ? "text-emerald-600" : "text-rose-600";
  const isUsers = String(label).toLowerCase() === 'users';
  if(isUsers){
    return (
      <Card className={`aspect-square flex items-center justify-center text-center ${className}`}>
        <div className="absolute top-4 left-4 rounded-full bg-slate-100 text-slate-900 p-2"><UsersIcon/></div>
        <div>
          <div className="text-sm text-slate-500">{label}</div>
          <div className="mt-1 text-3xl font-extrabold">{value}</div>
          <div className={"mt-1 text-xs "+color}>{up?'+':''}{Math.abs(trend)}%</div>
        </div>
      </Card>
    );
  }
  return (
    <Card className={className}>
      <div className="text-sm text-slate-500">{label}</div>
      <div className="mt-2 text-3xl font-bold">{value}</div>
      <div className={"mt-1 text-xs "+color}>{up?'+':''}{Math.abs(trend)}% <span className="text-slate-500">vs. previous month</span></div>
    </Card>
  );
}

/* ---------- Sessions by Countries (horizontal bars with India dominant) ---------- */
function CountriesChart({ className = "" }) {
  const base = [
    { name: "India", v: 5000, c: "#7c3aed", cc: "IN" },
    { name: "United States", v: 1600, c: "#5b21b6", cc: "US" },
    { name: "China", v: 500, c: "#22d3ee", cc: "CN" },
    { name: "Indonesia", v: 1200, c: "#06b6d4", cc: "ID" },
    { name: "Russia", v: 1000, c: "#fb7185", cc: "RU" },
    { name: "Bangladesh", v: 700, c: "#6366f1", cc: "BD" },
    { name: "Canada", v: 800, c: "#4f46e5", cc: "CA" },
    { name: "Brazil", v: 450, c: "#f59e0b", cc: "BR" },
    { name: "Vietnam", v: 1100, c: "#7c3aed", cc: "VN" },
    { name: "UK", v: 600, c: "#6366f1", cc: "GB" },
  ];

  const flag = (cc) =>
    cc
      ? String.fromCodePoint(...[...cc.toUpperCase()].map(ch => 127397 + ch.charCodeAt()))
      : "🏳️";

  const [vals, setVals] = React.useState(base);

  React.useEffect(() => {
    const id = setInterval(() => {
      setVals((v) =>
        v.map(it => {
          if (it.name === "India") {
            // keep India high & stable with slight variation
            const base = 4000;
            return { ...it, v: Math.max(4000, Math.round(base + (Math.random() - 0.5) * 200)) };
          } else {
            // other countries fluctuate more, but smaller
            return { ...it, v: Math.max(200, Math.round(it.v + (Math.random() - 0.5) * 150)) };
          }
        })
      );
    }, 2000);
    return () => clearInterval(id);
  }, []);

  const ordered = React.useMemo(() => {
    const india = vals.find(x => x.name === "India");
    const rest = vals.filter(x => x.name !== "India").sort((a, b) => b.v - a.v);
    return india ? [india, ...rest] : rest;
  }, [vals]);

  const max = Math.max(...ordered.map(x => x.v));

  return (
    <Card className={"col-span-4 " + className}>
      <div className="font-semibold mb-3">Sessions by Countries</div>
      <div className="space-y-2 overflow-x-auto">
        <div className="min-w-0">
          {ordered.map((r, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-36 flex items-center gap-2 text-sm text-black">
                <span className="text-base leading-none">{flag(r.cc)}</span>
                <span className="truncate">{r.name}</span>
              </div>

              <div className="flex-1 bg-slate-100 rounded h-3 overflow-hidden">
                <div
                  className="h-full"
                  style={{
                    width: `${(r.v / max) * 100}%`,
                    background: r.c,
                    transition: "width 1s ease",
                  }}
                  aria-label={`${r.name} sessions`}
                />
              </div>

              <div className="w-16 text-right text-sm tabular-nums">{r.v}</div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}


/* ---------- Users by Device (animated donut) ---------- */
function DeviceDonut({ className = "col-span-4" }) {
  // example initial numbers (you can set these from props or state)
  const [vals, setVals] = React.useState({ desktop: 78520, mobile: 99210, tablet: 42890 });

  // simulate live updates (remove this in real data scenario)
  React.useEffect(() => {
    const id = setInterval(() => {
      setVals(v => {
        const d = Math.max(20000, v.desktop + Math.round((Math.random() - 0.5) * 4000));
        const m = Math.max(20000, v.mobile  + Math.round((Math.random() - 0.5) * 6000));
        const t = Math.max(5000,  v.tablet  + Math.round((Math.random() - 0.5) * 3000));
        return { desktop: d, mobile: m, tablet: t };
      });
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const total = vals.desktop + vals.mobile + vals.tablet;
  const pd = total ? vals.desktop / total : 0;
  const pm = total ? vals.mobile  / total : 0;
  const pt = total ? vals.tablet  / total : 0;

  // circle geometry
  const r = 46; // radius
  const stroke = 18; // width of donut stroke
  const cx = 60, cy = 60;
  const circumference = 2 * Math.PI * r;

  // helper to produce stroke-dasharray and dashoffset to position segments in order
  // we draw segments in order: desktop, mobile, tablet
  const seg = (startFrac, frac) => {
    const length = Math.max(0, Math.min(1, frac)) * circumference;
    const dashArray = `${length} ${circumference}`; // visible length then gap
    // offset moves the start of this segment; SVG coord rotated -90deg below
    const offset = circumference * (1 - startFrac);
    return { dashArray, offset };
  };

  // cumulative starts
  const startDesktop = 0;
  const startMobile = pd;
  const startTablet = pd + pm;

  const segD = seg(startDesktop, pd);
  const segM = seg(startMobile, pm);
  const segT = seg(startTablet, pt);

  // nice formatted numbers
  const fmt = n => n.toLocaleString();
  const pctStr = n => (n * 100).toFixed(1) + "%";

  return (
    <Card className={className}>
      <div className="font-semibold mb-3">Users by Device</div>

      <div className="grid grid-cols-[220px,1fr] gap-6 items-center">
        <svg viewBox="0 0 120 120" className="w-[220px] min-w-[220px]">
          {/* background ring */}
          <g transform="rotate(-90 60 60)">
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f1f5f9" strokeWidth={stroke} />
            {/* Desktop segment (bottom-most) */}
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke="#4f46e5"
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={segD.dashArray}
              strokeDashoffset={segD.offset}
              style={{ transition: "stroke-dasharray 700ms ease, stroke-dashoffset 700ms ease" }}
            />
            {/* Mobile (middle) */}
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke="#f59e0b"
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={segM.dashArray}
              strokeDashoffset={segM.offset}
              style={{ transition: "stroke-dasharray 700ms ease, stroke-dashoffset 700ms ease" }}
            />
            {/* Tablet (top) */}
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke="#06b6d4"
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={segT.dashArray}
              strokeDashoffset={segT.offset}
              style={{ transition: "stroke-dasharray 700ms ease, stroke-dashoffset 700ms ease" }}
            />
          </g>

          {/* inner circle / label */}
          <circle cx={60} cy={60} r={28} fill="#f5f7fb" />
          <text x="60" y="54" textAnchor="middle" style={{fill:"#0f172a", fontWeight:800, fontSize:"14px"}}>{fmt(total)}</text>
          <text x="60" y="72" textAnchor="middle" style={{fill:"#6b7280", fontSize:"11px"}}>total users</text>
        </svg>

        <div className="space-y-3">
          <LegendDot color="#4f46e5" label="Desktop Users" value={vals.desktop} total={total} />
          <LegendDot color="#f59e0b" label="Mobile Users"  value={vals.mobile}  total={total} />
          <LegendDot color="#06b6d4" label="Tablet Users"  value={vals.tablet}  total={total} />
        </div>
      </div>
    </Card>
  );
}

function LegendDot({ color, label, value, total }) {
  const percent = total ? ((value / total) * 100).toFixed(1) : 0;
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="w-3 h-3 rounded-sm" style={{ background: color }} />
        <div className="text-sm">
          <div className="font-medium">{label}</div>
          <div className="text-xs text-slate-500">{percent}%</div>
        </div>
      </div>
      <div className="text-sm font-semibold tabular-nums">
        {value.toLocaleString()}
      </div>
    </div>
  );
}
/* ---------- Recent Orders (table with random 2025 dates + headings) ---------- */
function RecentOrders({className=""}) {
  // helper → random date in 2025
  const randomDate2025 = () => {
    const start = new Date("2025-01-01").getTime();
    const end = new Date("2025-12-31").getTime();
    const ts = start + Math.random() * (end - start);
    return new Date(ts).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  // seed rows
  const seed = React.useMemo(() => [
    ["#SP001","Yash Patil","Purchased",109.00,"Paid",5.0],
    ["#PP001","Aditya Belsare","Purchased",149.00,"Pending",4.5],
    ["#FP001","Nimish Lanjewar","Purchased",215.00,"Paid",4.9],
    ["#LP001","Prathamesh M","Purchased",199.00,"Unpaid",4.3],
    ["#LF001","Nitesh","Purchased",330.00,"Paid",4.7],
  ].map(r => [...r, randomDate2025()]), []); // add date as last element

  return (
    <Card className={"col-span-4 "+className}>
      <div className="flex items-center justify-between mb-3">
        <div className="font-semibold text-lg">Recent Orders</div>
        <button className="px-3 py-1 rounded bg-slate-100 hover:bg-white/20 text-sm">
          Generate Report
        </button>
      </div>

      <div className="overflow-x-auto max-h-[360px]">
        <table className="w-full min-w-0 text-sm">
          <thead className="bg-slate-800 text-white">
            <tr className="text-left">
              <th className="py-2 px-3">Order ID</th>
              <th className="px-3">Customer</th>
              <th className="px-3">Product</th>
              <th className="px-3">Amount</th>
              <th className="px-3">Date</th> {/* ✅ new column heading */}
              <th className="px-3">Status</th>
              <th className="px-3">Rating</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {seed.map((r,i)=>(
              <tr key={i} className="hover:bg-slate-50">
                <td className="py-2 px-3 font-medium">{r[0]}</td>
                <td className="px-3">{r[1]}</td>
                <td className="px-3">{r[2]}</td>
                <td className="px-3 font-semibold text-emerald-600">
                  ₹{Math.round(r[3]*83).toLocaleString('en-IN')}
                </td>
                <td className="px-3">{r[6]}</td> {/* date */}
                <td className="px-3">
                  <span className={
                    "px-2 py-0.5 rounded text-xs "+
                    (r[4]==='Paid'
                      ?'bg-emerald-100 text-emerald-700'
                      :r[4]==='Pending'
                        ?'bg-amber-100 text-amber-700'
                        :'bg-rose-100 text-rose-700')
                  }>
                    {r[4]}
                  </span>
                </td>
                <td className="px-3">{r[5]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

