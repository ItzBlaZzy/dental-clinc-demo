import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Resolve directories safely for both ESM and CJS bundling
let projectRoot = process.cwd();
let distPath = path.join(projectRoot, 'dist');

// Setup Google Gen AI SDK
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
} else {
  console.warn("GEMINI_API_KEY is not defined or is placeholder. AI chat services will operate in demo simulated mode.");
}

// Robust wrapper for Gemini API calls to handle transient errors and high-demand 503s with backoff and a fallback model
async function generateContentWithRobustness(
  aiClient: GoogleGenAI,
  params: {
    contents: any;
    config?: any;
  }
) {
  const primaryModel = "gemini-3.5-flash";
  const fallbackModel = "gemini-3.1-flash-lite";
  
  const modelsToTry = [primaryModel, fallbackModel];
  const maxRetriesPerModel = 2; // Retry on transient issues (503 / 429)
  
  let lastError: any = null;
  
  for (const model of modelsToTry) {
    for (let attempt = 1; attempt <= maxRetriesPerModel; attempt++) {
      try {
        console.log(`[Gemini Request] Model: ${model}, Attempt: ${attempt}`);
        const response = await aiClient.models.generateContent({
          model: model,
          contents: params.contents,
          config: params.config,
        });
        return response;
      } catch (err: any) {
        lastError = err;
        const errMessage = err?.message || String(err);
        console.warn(`[Gemini Warning] Model ${model} failed on attempt ${attempt}:`, errMessage);
        
        // Detect transient errors
        const status = err?.status || err?.code || (err?.error && err?.error?.code);
        const isTransient = !status || status === 429 || status === 500 || status === 503 || 
                            errMessage.includes("demand") || errMessage.includes("UNAVAILABLE") || errMessage.includes("overloaded");
        
        if (!isTransient) {
          throw err; // Rethrow authorization, invalid parameters, etc., immediately
        }
        
        if (attempt < maxRetriesPerModel) {
          const delay = attempt * 500;
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
  }
  
  throw lastError || new Error("Failed after trying fallback models and retries");
}

// 1. Live Chat API Proxy for Aeterna Dental AI Concierge
app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  const systemInstruction = 
    `You are the "Aeterna Dental Concierge" AI, a highly sophisticated, warm, and elite clinical concierge representing Aeterna Premium Dental Clinic. \n` +
    `Your tone must be exceptionally comforting, professional, patient-centric, and luxurious. Speak with great empathy, medical reassurance, and high-end elegance. \n` +
    `Ensure you: \n` +
    `- Alleviate dental anxiety (emphasize pain-free sedation options, soothing luxury suites, and calming techniques).\n` +
    `- Describe our services with high aesthetic appreciation (Teeth Whitening, porcelain veneers, high-end implants, Invisalign, endodontics, pediatric dental suites).\n` +
    `- Highlight modern dental equipment (e.g., 3D Intraoral scanners, Cone Beam CT, water lasers that eliminate drilling discomfort).\n` +
    `- Prompt patients to choose membership plans or book a priority luxurious consult.\n` +
    `- Advise emergency help if they describe intense pain, swelling, or trauma (e.g. broken crown, acute toothache). Include a note that Aeterna offers immediate emergency triaging.\n` +
    `- Never write technical recipes, self-diagnose definitively, or prescribe drugs. Offer comforting medical-concierge guidance in highly clean Markdown, keeping spacing airy and beautiful. Avoid cluttered lists. Keep replies relatively concise, premium, and welcoming.`;

  try {
    if (ai) {
      const response = await generateContentWithRobustness(ai, {
        contents: [
          { role: "user", parts: [{ text: systemInstruction }] },
          ...(history || []).map((h: any) => ({
            role: h.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: h.content }]
          })),
          { role: "user", parts: [{ text: message }] }
        ],
        config: {
          temperature: 0.7,
        }
      });

      return res.json({ reply: response.text || "I am here to welcome you. How may I restore your confidence today?" });
    } else {
      // High-end mock reply if Gemini is not configured in environment
      return res.json({
        reply: `*[Demo Mode]* Thank you for contacting Aeterna Premium Dental. I would be absolute honored to assist you with your dental goals. At Aeterna, we offer bespoke care across **Porcelain Veneers**, **Invisalign Systems**, and advanced **Pain-Free Dental Implants**. \n\nHow can I help you coordinate your upcoming elite smile restoration or a relaxing clinic tour?`
      });
    }
  } catch (err: any) {
    console.error("Gemini API Error in /api/chat:", err);
    return res.status(500).json({ 
      reply: "The Aeterna Concierge service is currently undergoing routine maintenance. Please make use of our instant booking scheduler, or dial our priority operations desk directly." 
    });
  }
});

// 2. Virtual Smile Diagnosis & Interactive Transformation Advice
app.post('/api/smile-analysis', async (req, res) => {
  const { concern, desiredOutcome, treatmentPreference } = req.body;

  if (!concern || !desiredOutcome) {
    return res.status(400).json({ error: "concern and desiredOutcome are required." });
  }

  const prompt = `Conduct a luxury virtual dental smile assessment for a prospective patient with the following profiles:
- Clinical Focus / Smile Concern: "${concern}"
- Desired Aesthetic Target: "${desiredOutcome}"
- Preferred Treatment Path: "${treatmentPreference || 'Cosmetic Consultation'}"

Based on this, write a highly elegant, reassuring, and persuasive "Smile Transformation Strategy Report".
Format it strictly in clean, beautiful Markdown with three short sections:
1. CUSTOM RADIANCE ASSESSMENT: Reflect on their concern with extreme validation. Highlight how our advanced technology (3D Intraoral Scanner) can map this immediately for exactness.
2. RECOMMENDATION TIMELINE: Suggest a personalized cosmetic treatment pathway (such as porcelain veneers, Invisalign, enamel contouring, deep whitening). State the typical durations (e.g., 2 visits over 10 days for veneers, or 6 months for Invisalign) and comfort metrics (sedation options available).
3. THE AETERNA DIFFERENCE: Close with an invitation to consult and experience why Aeterna provides the finest cosmetic dental journey globally in a stress-free setting.

Make the language sound like a highly accomplished, friendly Beverly Hills cosmetic dentist Dr. Alexander Mercer speaking directly to the patient. Do not use generic medical jargon; make it luxurious, aspirational, and highly encouraging.`;

  try {
    if (ai) {
      const response = await generateContentWithRobustness(ai, {
        contents: prompt,
        config: {
          temperature: 0.8,
        }
      });
      return res.json({ analysis: response.text });
    } else {
      // High-end simulated customized advice
      return res.json({
        analysis: `### CUSTOM RADIANCE ASSESSMENT\nBased on your desire to address **"${concern}"** and achieve a **"${desiredOutcome}"**, you are an ideal candidate for a bespoke Aeterna Smile Restyling. Our 3D iTero Element scanning allows us to capture a microscopic blueprint of your dental structure, completely avoiding unpleasant impression clays.\n\n### RECOMMENDATION TIMELINE\nTo achieve the perfect alignment, we recommend exploring our **Signature Porcelain Veneers** or **Custom Invisalign treatment** paths. Veneers deliver immediate radiance in just **2 curated visits (approx. 7–10 days)**, while Invisalign maps a gradual, invisible orthodontic shift over **6 to 12 months** with minimal changes to your active lifestyle. Both choices include our **Comfort first spa amenities** and pain-free local anesthesia suites.\n\n### THE AETERNA DIFFERENCE\nWe would love to welcome you for a champagne consult. Dr. Alexander Mercer will craft a real-time digital blueprint of your teeth, showing your beautiful future smile before any procedure begins.`
      });
    }
  } catch (err: any) {
    console.error("Gemini API Error in /api/smile-analysis:", err);
    return res.json({
      analysis: `### Your Bespoke Smile Assessment\nThank you for sharing your aspirations for a custom smile transformation! To address **"${concern}"** towards achieving a **"${desiredOutcome}"**, we recommend booking a private cosmetic dental consultation.\n\nAt Aeterna, we employ precision 3D CAD/CAM cosmetic imaging to map your facial harmony with your oral structure. We will design exactly what fits your features with complete comfort as our highest priority.\n\n**Next Step:** Connect with Dr. Alexander Mercer at your earliest convenience for a personalized consult.`
    });
  }
});

// 3. Mount Vite Dev Server in Development, serve Static in Production (Express v4 format)
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server middleware mounted.");
  } else {
    console.log(`Serving static production files from: ${distPath}`);
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Aeterna server running online at http://0.0.0.0:${PORT}`);
  });
}

startServer();
