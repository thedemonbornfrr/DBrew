"use client";
import { useState, useEffect } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { Copy, Check, Shield, Zap, Sparkles } from "lucide-react";
import { luraphVM } from "@/lib/luraph-vm";

const CODE = "7ATDBREWOBF"; // Change daily

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
      setOutput(luraphVM(input || 'print("DBrew owns you")'));
      setLoading(false);
    }, 800);
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const init = async (engine: any) => await loadSlim(engine);

  if (!verified) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Particles id="t" init={init} options={{ background: { color: "#000" }, particles: { color: "#a78bfa", links: { enable: true, color: "#a78bfa" } } }} />
        <div className="bg-black/80 backdrop-blur-2xl border border-purple-600 rounded-3xl p-16 text-center max-w-md">
          <h1 className="text-8xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-8">DBrew</h1>
          <input className="w-full bg-gray-900 border border-purple-700 rounded-xl px-6 py-5 text-xl text-center mb-4" placeholder="Daily code..." value={codeInput} onChange={e => setCodeInput(e.target.value)} onKeyDown={e => e.key === "Enter" && verify()} />
          {wrong && <p className="text-red-500 mb-4">Wrong code. Join Discord.</p>}
          <button onClick={verify} className="w-full py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-2xl font-bold">Unlock</button>
          <p className="text-gray-500 mt-8">Made by Brew himself ♛</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Particles id="t" init={init} options={{ fullScreen: { enable: true, zIndex: -1 }, particles: { color: "#a78bfa", links: { enable: true, color: "#a78bfa" } } }} />

      <div className="border-b border-purple-800/50 backdrop-blur-xl bg-black/40">
        <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
          <h1 className="text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">DBrew</h1>
          <a href="https://discord.gg/RZBYJeGvSe" target="_blank" className="px-8 py-4 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold flex items-center gap-3 text-xl">
            <Sparkles /> DISCORD
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-4 gap-6 mb-12">
          {[{icon: Shield, value: "Uncrackable"}, {icon: Zap, value: "Luraph Level"}, {icon: Lock, value: "Custom VM"}, {icon: Sparkles, value: "Brew 2025"}].map((s, i) => (
            <div key={i} className="bg-black/60 backdrop-blur-xl border border-purple-700/50 rounded-2xl p-8 text-center">
              <s.icon className="w-16 h-16 mx-auto mb-4 text-purple-400" />
              <p className="text-3xl font-bold">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-black/60 backdrop-blur-2xl border border-purple-700/50 rounded-3xl p-10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold">Luraph-Level Obfuscator</h2>
            <button onClick={obfuscate} disabled={loading || !input} className="px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl text-2xl font-bold hover:scale-105 transition disabled:opacity-50">
              {loading ? "Brewing..." : "OBFUSCATE"}
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <textarea className="bg-gray-900/80 border border-purple-800 rounded-xl p-6 h-96 font-mono text-green-400 text-lg" placeholder="-- clean script" value={input} onChange={e => setInput(e.target.value)} />
            <div className="relative">
              <textarea className="bg-gray-900/80 border border-purple-800 rounded-xl p-6 h-96 font-mono text-red-400 text-lg w-full" readOnly value={output} placeholder="-- output" />
              {output && <button onClick={copy} className="absolute top-4 right-4 p-3 bg-purple-600 hover:bg-purple-500 rounded-lg">{copied ? <Check /> : <Copy />}</button>}
            </div>
          </div>
        </div>

        <p className="text-center text-gray-500 mt-16 text-lg">This site was originally made by <span className="text-purple-400 font-bold">Brew</span> himself ♛</p>
      </div>
    </div>
  );
}
