// lib/luraph-vm.ts
import crypto from "crypto";

const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_";
const rand = (len: number) => Array(len).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join("");

export function luraphVM(code: string): string {
  const encryptedStrings: string[] = [];
  let strIndex = 0;

  code = code.replace(/"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'/g, (match) => {
    const raw = match.slice(1, -1);
    if (raw.length < 4) return match;
    const key = Math.floor(Math.random() * 255) + 1;
    const enc = Buffer.from(raw).toString("base64") + String.fromCharCode(key);
    encryptedStrings.push(enc);
    return `__STR(${strIndex++})`;
  });

  const dispatcher = rand(10);
  const state = rand(12);
  const realBlock = Math.floor(Math.random() * 9999) + 5000;

  let fakeCases = "";
  for (let i = 0; i < 12000; i++) {
    if (i === realBlock) continue;
    fakeCases += `case ${i}: ${state}=${Math.floor(Math.random() * 20000)} break\n`;
  }

  const decoder = `
local function __STR(i)
  local data = "${encryptedStrings.join("||")}".split("||")[i+1]
  local key = data:byte(-1)
  data = data:sub(1,-2)
  local dec = ""
  for j = 1,#data do
    dec = dec .. string.char(bit32.bxor(data:byte(j), key))
  end
  return dec
end`.replace(/\s+/g, " ");

  return `--[[ DBrew x Luraph V4+ | Made by Brew 2025 ]]--
local ${dispatcher} = {}
${fakeCases}
${dispatcher}[${realBlock}] = function()
${code.split("\n").map(l => "  " + l).join("\n")}
end
local ${state} = ${realBlock}

-- Anti-tamper + Anti-deobf
spawn(function()
  while wait(3) do
    if debug.getupvalue(${dispatcher}[${realBlock}], 1) then
      while true do end
    end
  end
end)

while ${state} > 0 do
  if ${dispatcher}[${state}] then
    ${dispatcher}[${state}]()
    ${state} = -1
  else
    ${state} = ${state} + math.random(-500, 500)
  end
end

${decoder}
-- DBrew owns 2025 ♛
`;
}
