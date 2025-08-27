
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DEFAULT_USER = "admin";
const DEFAULT_PASS = "admin123";

export default function AdminLoginModal({ open, onClose }){
  const [user, setUser] = useState(DEFAULT_USER);
  const [pass, setPass] = useState(DEFAULT_PASS);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if(!open) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if(user===DEFAULT_USER && pass===DEFAULT_PASS){
      localStorage.setItem("isAdmin","true");
      localStorage.setItem("adminSessionStart", new Date().toISOString());
      onClose?.();
      navigate("/admin");
    }else{
      setError("Invalid credentials.");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm grid place-items-center z-50">
      <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl text-slate-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Admin Login</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">✕</button>
        </div>
        <form onSubmit={handleLogin} className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-500">Username</label>
            <input className="mt-1 w-full border rounded-xl px-3 py-2" value={user} onChange={e=>setUser(e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500">Password</label>
            <input type="password" className="mt-1 w-full border rounded-xl px-3 py-2" value={pass} onChange={e=>setPass(e.target.value)} />
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button type="submit" className="w-full bg-indigo-600 text-white rounded-xl py-2 font-semibold">Login</button>
          <p className="text-center text-xs text-slate-500">Default credentials are pre-filled. Just press Login.</p>
        </form>
      </div>
    </div>
  )
}