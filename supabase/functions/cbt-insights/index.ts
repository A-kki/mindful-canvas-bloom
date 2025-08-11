import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

const systemPrompt = `You are a compassionate CBT coach. 
- Keep responses brief, practical, and supportive.
- Use CBT techniques: identify distortions, challenge thoughts, generate balanced thoughts, and suggest 1-2 actionable steps.
- Avoid clinical jargon unless helpful.
- Keep a calm, encouraging tone.`;

async function coachResponse(payload: any) {
  const apiKey = Deno.env.get("OPENAI_API_KEY");
  if (!apiKey) throw new Error("Missing OPENAI_API_KEY secret");

  const { situation, automaticThought, emotion, distortion } = payload || {};
  const userMsg = `Situation: ${situation || "(not provided)"}\nThought: ${automaticThought}\nEmotion: ${emotion || "(not provided)"}\nPossible Distortion: ${distortion || "(unknown)"}\n\nProvide: \n1) A balanced thought\n2) A brief reframe explanation\n3) 1-2 small next steps.`;

  const res = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMsg },
      ],
      temperature: 0.7,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenAI error: ${text}`);
  }
  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content ?? "";

  // Lightly structure the content
  return {
    suggestion: content,
  };
}

async function patternInsights(payload: any) {
  const apiKey = Deno.env.get("OPENAI_API_KEY");
  if (!apiKey) throw new Error("Missing OPENAI_API_KEY secret");

  const { entries } = payload || {};
  const trimmedEntries = Array.isArray(entries) ? entries.slice(0, 50) : [];

  const userMsg = `You are given recent CBT entries. Summarize patterns compassionately. 
Return 4 short sections: \n- Top patterns/distortions\n- Triggers\n- Helpful reframes that worked\n- Suggested next steps.\n\nEntries JSON:\n${JSON.stringify(trimmedEntries).slice(0, 12000)}`;

  const res = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMsg },
      ],
      temperature: 0.4,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenAI error: ${text}`);
  }
  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content ?? "";
  return { summary: content };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { mode, ...payload } = await req.json();

    if (mode === "coach") {
      const out = await coachResponse(payload);
      return new Response(JSON.stringify(out), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (mode === "patterns") {
      const out = await patternInsights(payload);
      return new Response(JSON.stringify(out), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ error: "Invalid mode. Use 'coach' or 'patterns'." }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("cbt-insights error:", error);
    return new Response(
      JSON.stringify({ error: "Unexpected error", details: (error as Error).message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
