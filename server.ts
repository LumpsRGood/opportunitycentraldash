import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { ORG_KNOWLEDGE_BASE } from "./src/knowledgeBase";

// Initialize express app
const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: key });
  }
  return aiClient;
}

// API Health Check
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok", 
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY) 
  });
});

// Chat API with Opportunity Central assistant persona
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, userMessage } = req.body;
    
    const client = getGeminiClient();
    if (!client) {
      return res.status(400).json({ 
        error: "GEMINI_API_KEY is not configured. Please add your GEMINI_API_KEY in Settings." 
      });
    }

    const systemInstruction = `You are "Syrup", the friendly and official operational & HR AI assistant for Opportunity Restaurant Group (IHOP Franchisee).
Your job is to assist restaurant general managers, shift leaders, and corporate staff with exact operational protocols, store forms, HR rules, food safety, and escalation directories.

INTENT UNDERSTANDING & ABSTRACT REASONING:
Restaurant managers often speak in casual slang, fragments, or describe real-world scenarios rather than official legal form names. You MUST understand their underlying intent and provide actionable, step-by-step guidance immediately:
- If a manager says "I need to write someone up", "an employee didn't show up", "employee was rude", "they were late again", "coaching team member", or "insubordination":
  -> Recognize immediately that they need the **Corrective Action Form**.
  -> Explain step-by-step:
     1. Open the **Corrective Action Form** on Opportunity Central.
     2. Discard/retire any older paper versions on file.
     3. Conduct a factual, private meeting explaining the policy and standard violated.
     4. Have them sign (or note "Refused to Sign" with manager initials).
     5. Upload and submit the completed form to **SharePoint** (contact District Manager for folder permissions).
     6. For repeated or severe performance issues, contact Taylor Maltese (HR) at tmaltese@opportunityrestaurantgroup.com.
- If they say "I need to fire someone", "letting someone go", "employee walked out", or "quitting":
  -> Guide them to the **Termination Form**, remind them to submit via SharePoint, and consult Taylor Maltese (HR) and their District Manager before final action.
- If they say "someone got hurt", "cut hand", "burned on grill", "fell in kitchen", or "ambulance":
  -> Prioritize first aid/911 for emergencies.
  -> For non-emergencies, offer the **AmCare Nurse Triage Line** (24/7 telephonic occupational nurse).
  -> Open the **Workers' Comp Form** on this portal, select their state from the 14 active markets.
  -> Strict 24-hour submission deadline to Taylor Maltese (tmaltese@opportunityrestaurantgroup.com), Hani Ascha (hani@selectfirstinsurance.com), and Daniel Salazar (DSalazar@selectfirstinsurance.com).
- If they say "customer slipped", "guest found something in food", "guest complained about sickness", or "incident in parking lot":
  -> Direct to **Guest Incident Report Form**, preserve evidence, do not admit liability, and email to Jim Doran (Jim_doran@ajg.com) with CC to HR and District Manager.
- If they say "needs time off", "having a baby", "surgery", or "sick for weeks":
  -> Direct to **Leave of Absence (LOA) Request Form**; emphasize submitting starts the interactive review and is NOT an automatic approval.
- If they say "doctor says can't lift heavy", "needs a chair", "light duty", or "pregnancy restriction":
  -> Direct to **Reasonable Accommodation Request Form**; emphasize submitting starts the interactive process with HR and is NOT an automatic approval.
- If they say "health inspector is here", "freezer feels warm", "check food temps", or "sanitizer test":
  -> Direct to the **Food Critical Check Up List** and **Expanded Temperature Log** (cold <= 41°F, hot >= 135°F, walk-in 35°-38°F, freezer <= 0°F).

GROUND TRUTH STORE PROCEDURES & KNOWLEDGE:
${ORG_KNOWLEDGE_BASE}

FORMATTING & STYLE RULES:
1. Do NOT use markdown hashtags (#, ##, ###, ####). Write clean, natural, elegant section headings without hashtags.
2. Avoid excessive raw asterisk clutter. Use clear bullet points (•) and clean formatting.
3. Keep answers well-spaced, direct, professional, friendly, and easily scannable for busy managers on shift.
4. When mentioning email addresses, write them clearly so managers can tap or copy them.`;

    // Format conversation history for Gemini API
    const contents: any[] = [];

    if (Array.isArray(messages)) {
      for (const msg of messages) {
        if (msg.role === 'user') {
          contents.push({ role: 'user', parts: [{ text: msg.content }] });
        } else if (msg.role === 'assistant' || msg.role === 'model') {
          contents.push({ role: 'model', parts: [{ text: msg.content }] });
        }
      }
    }

    if (userMessage) {
      contents.push({ role: 'user', parts: [{ text: userMessage }] });
    }

    // Try modern valid models with fallback to ensure high availability during demand spikes
    const candidateModels = ['gemini-3.8-flash', 'gemini-3.6-flash', 'gemini-3.1-flash-lite'];
    let reply = "";
    let lastErr: any = null;

    for (const modelName of candidateModels) {
      try {
        const response = await client.models.generateContent({
          model: modelName,
          contents: contents,
          config: {
            systemInstruction: systemInstruction,
            temperature: 0.3,
          }
        });
        if (response.text) {
          reply = response.text;
          break;
        }
      } catch (err: any) {
        console.warn(`Model ${modelName} failed, trying next candidate:`, err?.message || err);
        lastErr = err;
      }
    }

    // If upstream Gemini models are experiencing a 503 spike, synthesize a high-quality response directly from the knowledge base
    if (!reply) {
      const query = (userMessage || '').toLowerCase();
      if (query.includes('write') || query.includes('discipline') || query.includes('late') || query.includes('warning') || query.includes('coach') || query.includes('insubordinat') || query.includes('attitude') || query.includes('attendance')) {
        reply = "When writing someone up or addressing disciplinary issues at Opportunity Restaurant Group:\n\n" +
          "• Form to Use\n" +
          "Open the current Corrective Action Form on this portal. Store leadership must retire and discard any older paper versions on file.\n\n" +
          "• Conduct the Meeting\n" +
          "Meet with the team member in private. Clearly explain the specific behavior, date, time, and the policy or standard that was violated.\n\n" +
          "• Acknowledge & Sign\n" +
          "Have the employee sign acknowledging receipt. If they decline, write \"Refused to Sign\" along with the date and have a manager or witness initial it.\n\n" +
          "• Upload to SharePoint\n" +
          "Submit and save the completed corrective action directly to SharePoint (reach out to your District Manager if you need access).\n\n" +
          "• Contact HR for Escalations\n" +
          "For repeated or severe performance concerns, contact Taylor Maltese (HR) at tmaltese@opportunityrestaurantgroup.com.";
      } else if (query.includes('fire') || query.includes('terminate') || query.includes('let go') || query.includes('quit') || query.includes('walked out') || query.includes('separation')) {
        reply = "When handling an employee termination or separation:\n\n" +
          "• Form to Use\n" +
          "Use the official Termination Form on Opportunity Central.\n\n" +
          "• Leadership Consultation\n" +
          "Always speak with your District Manager and Taylor Maltese (HR) at tmaltese@opportunityrestaurantgroup.com before carrying out an involuntary termination.\n\n" +
          "• SharePoint Submission\n" +
          "Completed termination documentation must be saved and processed via SharePoint.";
      } else if (query.includes('hurt') || query.includes('burn') || query.includes('cut') || query.includes('slip') || query.includes('fall') || query.includes('injury') || query.includes('injured') || query.includes('ambulance') || query.includes('hospital') || query.includes('doctor') || query.includes('flat top')) {
        reply = "Here are the immediate steps for an injury on shift:\n\n" +
          "• Immediate First Aid & Emergency\n" +
          "For severe emergencies or major burns/cuts, call 911 immediately.\n\n" +
          "• AmCare Nurse Triage (Available 24/7)\n" +
          "For non-emergency workplace injuries, have the employee call the AmCare Nurse Triage line to speak directly with an occupational Registered Nurse before filing a claim or leaving for an urgent care clinic.\n\n" +
          "• State-Specific Workers' Comp Form\n" +
          "Open the Workers' Comp document selector on this portal and select the form for your store's state (14 active states: AL, DE, GA, IN, KY, MD, MI, NJ, NY, NC, OH, PA, SC, VA).\n\n" +
          "• Strict 24-Hour Submission\n" +
          "Email the completed First Report of Injury within 24 hours to all three contacts:\n" +
          "  - Taylor Maltese (HR): tmaltese@opportunityrestaurantgroup.com\n" +
          "  - Hani Ascha (Insurance): hani@selectfirstinsurance.com\n" +
          "  - Daniel Salazar (Insurance): DSalazar@selectfirstinsurance.com";
      } else if (query.includes('guest') || query.includes('customer') || query.includes('food poisoning') || query.includes('foreign object') || query.includes('hair') || query.includes('glass') || query.includes('parking lot')) {
        reply = "When a customer or guest experiences an incident, illness complaint, or injury:\n\n" +
          "• Assist the Guest\n" +
          "Attend to guest safety immediately. Never admit liability, assign blame, or make financial promises.\n\n" +
          "• Preserve Evidence & Document\n" +
          "Take clear photos of the area, retain any foreign objects or complained-of food items, and collect witness statements.\n\n" +
          "• Guest Incident Report Form\n" +
          "Complete the Guest Incident Report Form on Opportunity Central immediately.\n\n" +
          "• Email Escalation\n" +
          "Email the completed report to Jim Doran (EPL / Gallagher) at Jim_doran@ajg.com, and CC HR (tmaltese@opportunityrestaurantgroup.com) and your District Manager.";
      } else if (query.includes('leave') || query.includes('loa') || query.includes('baby') || query.includes('pregnant') || query.includes('maternity') || query.includes('surgery') || query.includes('accommodat') || query.includes('restriction') || query.includes('lift') || query.includes('chair')) {
        reply = "For Leave of Absence or Accommodation requests:\n\n" +
          "• Request Forms\n" +
          "Use the Leave of Absence (LOA) Request Form or the Reasonable Accommodation Request Form on Opportunity Central.\n\n" +
          "• Interactive HR Process (Not Automatic)\n" +
          "Please note: Submitting either form starts the interactive review process with HR; it does NOT constitute an automatic approval. HR will review medical documentation and operational feasibility.\n\n" +
          "• HR Contact\n" +
          "Reach out to Taylor Maltese (HR) at tmaltese@opportunityrestaurantgroup.com for guidance on next steps.";
      } else {
        reply = "Here are the operational procedures for that store topic:\n\n" +
          "• For disciplinary issues: Use the current Corrective Action Form and submit via SharePoint.\n" +
          "• For workplace injuries: Submit the state-specific report within 24 hours to tmaltese@opportunityrestaurantgroup.com, hani@selectfirstinsurance.com, and DSalazar@selectfirstinsurance.com (AmCare Nurse Triage available 24/7 for non-emergencies).\n" +
          "• For guest incidents: Complete the Guest Incident Report and email to Jim Doran at Jim_doran@ajg.com, CC HR and your District Manager.\n" +
          "• For accommodations or leave: Submitting starts the interactive evaluation process with HR; it is not an automatic approval.\n" +
          "• For food safety: Cold foods at 41°F or below, hot foods at 135°F or above.";
      }
    }
    
    return res.json({ reply });
  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    return res.status(500).json({ 
      error: error?.message || "Internal server error processing AI chat" 
    });
  }
});

// Vite middleware in development vs Static serving in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Opportunity Central Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
