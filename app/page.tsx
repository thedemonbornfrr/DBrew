"use client";
import { useState, useEffect } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { Copy, Check, Shield, Zap, Sparkles, LockKeyhole } from "lucide-react";
import { luraphVM } from "@/lib/luraph-vm";

const CODE = "7ATDBREWOBF";

export default function Home() {
  const [verified, setVerified] = useState(false);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [wrong, setWrong] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("dbrew_access") === CODE) setVerified(true);
  }, []);

  const verify = () => {
    if (codeInput === CODE) {
      localStorage.setItem("dbrew_access", CODE);
      setVerified(true);
    } else setWrong(true);
  };

  const obfuscate = () => {
    setLoading(true);
    setTimeout(() => {
      setOutput(luraphVM(input || 'print("DBrew owns 2025")'));
      setLoading(false);
    }, 1000);
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const init = async (engine: any) => await loadSlim(engine);

  if (!verified) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        <Particles id="t" init={init} options={{ fullScreen: { enable: true, zIndex: 0 }, particles: { number: { value: 50 }, color: { value: "#8b5cf6" }, links: { enable: true, color: "#8b5cf6", distance: 150 }, move: { enable: true, speed: 1 } } }} />
        
        <div className="glass rounded-3xl p-16 text-center max-w-md z-10 border-purple-500/50">
          <h1 className="text-8xl font-black gradient-text mb-8 animate-float">DBrew</h1>
          <input className="w-full bg-white/5 border border-purple-500/50 rounded-2xl px-8 py-6 text-xl text-center mb-6 backdrop-blur-xl" placeholder="Enter daily code..." value={codeInput} onChange={e => setCodeInput(e.target.value)} onKeyDown={e => e.key === "Enter" && verify()} />
          {wrong && <p className="text-red-400 mb-4 text-lg">Wrong code — join Discord</p>}
          <button onClick={verify} className="w-full py-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl text-2xl font-bold hover:scale-105 transition">UNLOCK DASHBOARD</button>
          <p className="text-gray-500 mt-10">Made by <span className="text-purple-400 font-bold">Brew</span> himself ♛</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative">
      <Particles id="t" init={init} options={{ fullScreen: { enable: true, zIndex: -1 }, particles: { color: "#8b5cf6", links: { enable: true, color: "#8b5cf6" }, move: { speed: 0.5 } } }} />

      {/* Header */}
      <div className="glass border-b border-purple-500/30">
        <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
          <h1 className="text-5xl font-black gradient-text">DBrew</h1>
          <a href="https://discord.gg/RZBYJeGvSe" target="_blank" className="px-8 py-4 bg-purple-600/80 backdrop-blur-xl rounded-2xl font-bold flex items-center gap-3 hover:bg-purple-500 transition">
            <Sparkles size={24} /> DISCORD
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Shield, label: "Protection", value: "Unbreakable" },
            { icon: Zap, label: "Speed", value: "Instant" },
            { icon: LockKeyhole, label: "VM", value: "Luraph V4+" },
            { icon: Sparkles, label: "Creator", value: "Brew ♛" }
          ].map((stat, i) => (
            <div key={i} className="glass rounded-3xl p-8 text-center hover:scale-105 transition">
              <stat.icon className="w-16 h-16 mx-auto mb-4 text-purple-400" />
              <p className="text-gray-400 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Obfuscator */}
        <div className="glass rounded-3xl p-10 border-purple-500/50">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold">Obfuscator Dashboard</h2>
            <button onClick={obfuscate} disabled={loading || !input.trim()} className="px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl text-2xl font-bold hover:scale-110 transition disabled:opacity-50">
              {loading ? "Brewing..." : "OBFUSCATE"}
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <textarea className="bg-white/5 border border-purple-500/50 rounded-2xl p-6 h-96 font-mono text-green-400 text-lg resize-none" placeholder="-- paste clean script" value={input} onChange={e => setInput(e.target.value)} />
            <div className="relative">
              <textarea className="bg-white/5 border border-purple-500/50 rounded-2xl p-6 h-96 font-mono text-red-400 text-lg w-full resize-none" readOnly value={output} placeholder="-- output appears here" />
              {output && (
                <button onClick={copy} className="absolute top-4 right-4 p-4 bg-purple-600/80 rounded-xl hover:bg-purple-500 transition">
                  {copied ? <Check size={28} className="text-green-400" /> : <Copy size={28} />}
                </button>
              )}
            </div>
          </div>
        </div>

        <p className="text-center text-gray-500 mt-16 text-lg">This site was originally made by <span className="text-purple-400 font-bold">Brew</span> himself ♛</p>
      </div>
    </div>
  );
}
