
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
    <div className="min-h-screen w-full bg-[#f5f7fb] text-slate-900 overflow-y-auto no-scrollbar scroll-smooth">\n      <style>{`.no-scrollbar{ -ms-overflow-style: none; scrollbar-width: none; } html{ scroll-behavior:smooth; } .no-scrollbar::-webkit-scrollbar{ width: 0; height: 0; }`}</style>
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

      <div className="px-6 grid grid-cols-[240px,1fr] gap-6 pb-10">
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
        <main className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 auto-rows-auto [grid-auto-flow:row_dense]">
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

          <PriceSpark title="Bitcoin Price"   price="₹9,626"  color="text-indigo-300" mode="up"       className={randSpan()} />
          <PriceBars  title="Ethereum Price"  price="₹7,831"  color="text-pink-300"   variant="down"  className={randSpan()} />
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

function ChatIcon(){return (<svg className="w-5 h-5 md:w-6 md:h-6 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" d="M21 15a4 4 0 0 1-4 4H8l-5 3 1.5-4A4 4 0 0 1 1 14V7a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v8z"/></svg>);}
function BellIcon(){return (<svg className="w-5 h-5 md:w-6 md:h-6 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14v-3a6 6 0 1 0-12 0v3a2 2 0 0 1-.6 1.4L4 17h5m6 0a3 3 0 1 1-6 0"/></svg>);}
function ClockIcon(){return (<svg className="w-5 h-5 md:w-6 md:h-6 animate-spin" style={{animationDuration:'6s'}} viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="9" strokeWidth="2"/><path strokeWidth="2" d="M12 7v5l3 3"/></svg>);}
function UsersIcon(){return (<svg className="w-5 h-5 md:w-6 md:h-6 motion-safe:animate-[float_3s_ease-in-out_infinite]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4" strokeWidth="2"/><path strokeWidth="2" d="M23 21v-2a4 4 0 0 0-3-3.87"/><path strokeWidth="2" d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>);}



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
    <Card className={className}>
      <div className="font-semibold mb-2">Subscriptions Overview</div>
      <svg viewBox="0 0 100 100" className="w-full max-w-[220px] mx-auto">
        <path d={arc(-Math.PI/2, a)} fill="#10b981" opacity="0.85"/>
        <path d={arc(-Math.PI/2 + a*2*Math.PI, e)} fill="#60a5fa" opacity="0.85"/>
        <path d={arc(-Math.PI/2 + (a+e)*2*Math.PI, t)} fill="#a78bfa" opacity="0.85"/>
        <circle cx="50" cy="50" r="28" fill="#f5f7fb"/>
        <text x="50" y="54" textAnchor="middle" style={{fill:"white",fontWeight:800,fontSize:"18px"}}>{Math.round(a*100)}%</text>
      </svg>
      <div className="mt-2 text-sm grid grid-cols-3 gap-2">
        <div>Active</div><div className="col-span-2 font-semibold">{Math.round(a*100)}%</div>
        <div>Expired</div><div className="col-span-2 font-semibold">{Math.round(e*100)}%</div>
        <div>Trial</div><div className="col-span-2 font-semibold">{Math.round(t*100)}%</div>
      </div>
    </Card>
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
const FIRST = ["Ravi","Ananya","Karan","Priya","Arjun","Neha","Ishaan","Diya","Kabir","Aarav","Aadhya","Vihaan","Myra","Advait","Ira","Aisha","Rohit","Riya","Ankit","Sana"];
const LAST  = ["Sharma","Patel","Mehta","Nair","Singh","Gupta","Verma","Iyer","Das","Kulkarni","Bansal","Kapoor","Khanna","Joshi","Chopra","Kaur"];

const randName = (i)=> FIRST[i % FIRST.length] + " " + LAST[(i * 7) % LAST.length];

const avatar = (name, idx)=>{
  const colors = ['#60a5fa','#a78bfa','#34d399','#f59e0b','#f472b6','#22d3ee'];
  const bg = colors[idx % colors.length];
  const initial = name[0].toUpperCase();
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><circle cx='32' cy='32' r='32' fill='${bg}'/><text x='32' y='40' text-anchor='middle' font-size='28' font-family='Arial' fill='white'>${initial}</text></svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
};

const buildSeed = (n=100)=> Array.from({length:n}, (_,i)=>{
  const name = randName(i);
  return {
    id: i,
    name,
    amount: 99 + Math.floor(Math.random() * 1200),
    avatar: avatar(name, i),
    time: new Date(Date.now() - i * 60000).toLocaleTimeString()
  };
});

// ✅ renamed to avoid "Identifier 'INR' has already been declared"
const formatINR = (amt)=> "₹" + Number(amt).toLocaleString("en-IN");

/* ---------- Component ---------- */
function TransactionsTicker({ className = "" }) {
  const seed = React.useMemo(() => buildSeed(100), []);
  const [live, setLive] = React.useState(() => {
    // seed first 5 and tag with uid so keys are unique
    return seed.slice(0, 5).map((t, idx) => ({ ...t, uid: `init-${idx}-${Date.now()}` }));
  });

  React.useEffect(() => {
    const id = setInterval(() => {
      setLive((list) => {
        const randomSeedIdx = Math.floor(Math.random() * seed.length);
        const randomLiveIdx = Math.floor(Math.random() * list.length);

        const replacement = {
          ...seed[randomSeedIdx],
          uid: `${Date.now()}-${randomSeedIdx}` // force a fresh key
        };

        const newList = [...list];
        newList[randomLiveIdx] = replacement;
        return newList;
      });

      // optional event hook for analytics
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

// export if needed
// export default Transactions




/* ---------- feedback / events / clock ---------- */

function FeedbackSection({className=""}){
  try{
    const key='feedbacks'; const existing=JSON.parse(localStorage.getItem(key)||'[]');
    if(!existing.length){
      localStorage.setItem(key, JSON.stringify([
        {name:'Ravi Sharma', text:'VaultGuard is super secure and easy to use!'},
        {name:'Ananya Patel', text:'Loved the smooth login animation.'},
        {name:'Karan Mehta', text:'Great dashboard, very user friendly.'},
        {name:'Priya Nair', text:'Please add more recovery options.'},
        {name:'Arjun Singh', text:'Dark mode looks amazing on mobile.'},
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
        {/* Top row: icon + label (no absolute -> no overlap) */}
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-slate-100 text-slate-900 p-2">
            <ClockIcon />
          </div>
          <div className="text-sm text-slate-500">System Time</div>
        </div>

        {/* Centered main content */}
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
  // Special style for Users small square
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


/* ---------- Sessions by Countries (horizontal bars) ---------- */
function CountriesChart({ className = "" }) {
  const base = [
    { name: "India", v: 1010, c: "#7c3aed", cc: "IN" },
    { name: "United States", v: 1640, c: "#5b21b6", cc: "US" },
    { name: "China", v: 490, c: "#22d3ee", cc: "CN" },
    { name: "Indonesia", v: 1255, c: "#06b6d4", cc: "ID" },
    { name: "Russia", v: 1050, c: "#fb7185", cc: "RU" },
    { name: "Bangladesh", v: 689, c: "#6366f1", cc: "BD" },
    { name: "Canada", v: 800, c: "#4f46e5", cc: "CA" },
    { name: "Brazil", v: 420, c: "#f59e0b", cc: "BR" },
    { name: "Vietnam", v: 1085, c: "#7c3aed", cc: "VN" },
    { name: "UK", v: 589, c: "#6366f1", cc: "GB" },
  ];

  // country-code (cc) -> emoji flag
  const flag = (cc) =>
    cc
      ? String.fromCodePoint(...[...cc.toUpperCase()].map(ch => 127397 + ch.charCodeAt()))
      : "🏳️";

  const [vals, setVals] = React.useState(base);

  // animate values periodically
  React.useEffect(() => {
    const id = setInterval(() => {
      setVals((v) =>
        v.map(it => ({
          ...it,
          v: Math.max(200, Math.round(it.v + (Math.random() - 0.5) * 80)),
        }))
      );
    }, 1800);
    return () => clearInterval(id);
  }, []);

  // keep India on top; sort others by value desc
  const ordered = React.useMemo(() => {
    const india = vals.find(x => x.name === "India");
    const rest = vals.filter(x => x.name !== "India").sort((a, b) => b.v - a.v);
    return india ? [india, ...rest] : rest;
  }, [vals]);

  const max = Math.max(...ordered.map(x => x.v));

  return (
    <Card className={"col-span-4 " + className}> {/* wider in grid; use col-span-full for full width */}
      <div className="font-semibold mb-3">Sessions by Countries</div>
      <div className="space-y-2 overflow-x-auto">
        <div className="min-w-[720px]">
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
                    transition: "width .8s ease",
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

/* ---------- Users by Device (donut, wide) ---------- */
function DeviceDonut({ className = "col-span-4" }) {
  const [vals, setVals] = React.useState({ desktop: 78560, mobile: 105020, tablet: 42890 });

  React.useEffect(() => {
    const id = setInterval(() => {
      setVals(v => {
        const d = Math.max(50000, v.desktop + Math.round((Math.random() - 0.5) * 1200));
        const m = Math.max(70000, v.mobile + Math.round((Math.random() - 0.5) * 1600));
        const t = Math.max(20000, v.tablet + Math.round((Math.random() - 0.5) * 900));
        return { desktop: d, mobile: m, tablet: t };
      });
    }, 2200);
    return () => clearInterval(id);
  }, []);

  const total = vals.desktop + vals.mobile + vals.tablet;
  const pct = (x) => x / total;

  const arc = (start, frac, color) => {
    const r = 46, cx = 60, cy = 60; // slightly larger donut
    const end = start + frac * 2 * Math.PI;
    const sx = cx + r * Math.cos(start), sy = cy + r * Math.sin(start);
    const ex = cx + r * Math.cos(end),   ey = cy + r * Math.sin(end);
    const large = frac > 0.5 ? 1 : 0;
    return <path d={`M${cx},${cy} L${sx},${sy} A${r},${r} 0 ${large} 1 ${ex},${ey} Z`} fill={color} opacity="0.9" />;
  };

  const a = pct(vals.desktop), b = pct(vals.mobile), c = pct(vals.tablet);

  return (
    <Card className={className}>
      <div className="font-semibold mb-3">Users by Device</div>

      {/* wider content area; set a min width so labels never feel cramped */}
      <div className="grid grid-cols-[300px,1fr] gap-8 items-center overflow-x-auto">
        <svg viewBox="0 0 120 120" className="w-[260px] min-w-[260px]">
          {arc(-Math.PI/2, a, "#4f46e5")}
          {arc(-Math.PI/2 + a*2*Math.PI, b, "#f59e0b")}
          {arc(-Math.PI/2 + (a+b)*2*Math.PI, c, "#06b6d4")}
          <circle cx="60" cy="60" r="30" fill="#f5f7fb" />
        </svg>

        <div className="space-y-4 min-w-[360px]">
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
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-sm" style={{ background: color }} />
        <span className="text-sm text-black">{label}</span>
      </div>
      <div className="text-sm font-semibold tabular-nums">
        {value.toLocaleString()} <span className="text-slate-500 font-normal">({percent}%)</span>
      </div>
    </div>
  );
}

/* ---------- Recent Orders (table) ---------- */
function RecentOrders({className=""}){
  const seed = React.useMemo(()=>[
    ["#VZ2112","Yash Patil","Clothes",109.00,"Zoetic Fashion","Paid",5.0],
    ["#VZ2111","Jansh Brown","Kitchen Storage",149.00,"Micro Design","Pending",4.5],
    ["#VZ2109","Ayaan Bowen","Bike Accessories",215.00,"Nesta Technologies","Paid",4.9],
    ["#VZ2108","Prezy Mark","Furniture",199.00,"Syntyce Solutions","Unpaid",4.3],
    ["#VZ2107","Vihan Hudda","Bags and Wallets",330.00,"iTest Factory","Paid",4.7],
  ],[]);
  
  return (
    <Card className={"col-span-4 "+className}> {/* span more columns */}
      <div className="flex items-center justify-between mb-3">
        <div className="font-semibold text-lg">Recent Orders</div>
        <button className="px-3 py-1 rounded bg-slate-100 hover:bg-white/20 text-sm">
          Generate Report
        </button>
      </div>

      <div className="overflow-x-auto max-h-[360px]">
        <table className="w-full min-w-[900px] text-sm"> {/* min width for spacing */}
          <thead className="text-white/80">
            <tr className="text-left">
              <th className="py-2 pr-4">Order ID</th>
              <th className="pr-4">Customer</th>
              <th className="pr-4">Product</th>
              <th className="pr-4">Amount</th>
              <th className="pr-4">Vendor</th>
              <th className="pr-4">Status</th>
              <th className="pr-4">Rating</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {seed.map((r,i)=>(
              <tr key={i} className="hover:bg-slate-50">
                <td className="py-2">{r[0]}</td>
                <td>{r[1]}</td>
                <td>{r[2]}</td>
                <td className="font-semibold text-emerald-600">
                  ₹{Math.round(r[3]*83).toLocaleString('en-IN')}
                </td>
                <td>{r[4]}</td>
                <td>
                  <span className={
                    "px-2 py-0.5 rounded text-xs "+
                    (r[5]==='Paid'
                      ?'bg-emerald-100 text-emerald-700'
                      :r[5]==='Pending'
                        ?'bg-amber-100 text-amber-700'
                        :'bg-rose-100 text-rose-700')
                  }>
                    {r[5]}
                  </span>
                </td>
                <td>{r[6]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
