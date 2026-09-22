/**
 * Knowledge base extracted directly from Opportunity Restaurant Group (IHOP Franchisee)
 * official operational documents, policies, HR forms, and state claims manuals.
 * Includes semantic mappings and colloquial intent resolution so Syrup understands
 * abstract, casual, or slang manager prompts.
 */

export interface FAQItem {
  id: string;
  category: 'Workers Comp & Injury' | 'HR & Accommodations' | 'Guest Incidents' | 'Food Safety' | 'Contacts & Payroll';
  question: string;
  answer: string;
  keyDetails: string[];
}

export const ORG_KNOWLEDGE_BASE = `
# OPPORTUNITY RESTAURANT GROUP (IHOP TEAM) - KNOWLEDGE BASE & STORE PROCEDURES

## 1. ABSTRACT INTENT & COLLOQUIAL STORE SCENARIO MAPPING
When managers ask casual, conversational, slang, or abstract questions without naming exact document titles, map their intent immediately:
- **"Write someone up" / "discipline an employee" / "coach a team member" / "late again" / "insubordination" / "conduct issue" / "verbal warning" / "corrective feedback" / "performance issue"**:
  -> Maps to: **Corrective Action Form**.
  -> Protocol:
     1. Open and use the updated **Corrective Action Form** on Opportunity Central.
     2. Discard and retire any older paper versions on file.
     3. Conduct an objective, private conversation with the employee specifying dates, times, facts, and policy standards.
     4. Have the team member sign (or note "Refused to Sign" with manager/witness initials if declined).
     5. Upload and submit the completed form to **SharePoint** (contact District Manager if access is needed).
     6. For severe or repeated issues, contact Taylor Maltese (HR) at tmaltese@opportunityrestaurantgroup.com.

- **"Fire someone" / "let someone go" / "someone quit" / "walked off shift" / "separation" / "termination"**:
  -> Maps to: **Termination Form**.
  -> Protocol:
     1. Use the current **Termination Form** on Opportunity Central.
     2. Process and submit via SharePoint.
     3. Contact your District Manager and HR (Taylor Maltese at tmaltese@opportunityrestaurantgroup.com) before final discharge.

- **"Someone got hurt" / "cut finger" / "burn on grill" / "slipped in kitchen" / "twisted ankle" / "hurt on the job"**:
  -> Maps to: **Workers' Compensation Reporting & AmCare Nurse Triage**.
  -> Protocol:
     1. Emergency? Call 911 immediately.
     2. Non-emergency? Offer the **AmCare Nurse Triage Line** (24/7) so the employee can speak with a registered nurse before seeking clinic care or filing a claim.
     3. Select the employee's **State-Specific Workers' Comp Form** on this portal (14 active states: AL, DE, GA, IN, KY, MD, MI, NJ, NY, NC, OH, PA, SC, VA).
     4. Complete and email within **24 hours** to all three:
        • Taylor Maltese: tmaltese@opportunityrestaurantgroup.com
        • Hani Ascha: hani@selectfirstinsurance.com
        • Daniel Salazar: DSalazar@selectfirstinsurance.com

- **"Customer fell" / "guest slipped" / "guest claimed food poisoning" / "foreign object in food" / "car bumped in parking lot" / "guest altercation"**:
  -> Maps to: **Guest Incident Report Form**.
  -> Protocol:
     1. Check on the guest, offer immediate aid/call 911 if required.
     2. Never admit fault or promise financial settlement.
     3. Fill out the **Guest Incident Report Form** with photos, witness statements, and preserve evidence (do not throw away foreign objects or complained food).
     4. Submit immediately to **Jim Doran** (EPL / Gallagher) at Jim_doran@ajg.com.
     5. Always CC HR (tmaltese@opportunityrestaurantgroup.com) and your District Manager.

- **"Needs time off" / "maternity leave" / "medical leave" / "surgery" / "FMLA" / "mental health break"**:
  -> Maps to: **Leave of Absence (LOA) Request Form**.
  -> Emphasize: Submitting the form starts the interactive review with HR; it is NOT an automatic approval.

- **"Can't lift over 10 lbs" / "light duty" / "stool needed" / "wheelchair accommodation" / "pregnancy accommodation"**:
  -> Maps to: **Reasonable Accommodation Request Form**.
  -> Emphasize: Submitting starts the ADA interactive dialogue with HR; not an automatic approval.

- **"Food too cold" / "cooler warm" / "freezer thawing" / "temp log" / "sanitizer weak" / "health inspection"**:
  -> Maps to: **Food Critical Check Up List** and **Expanded Temperature Log**.
  -> Thresholds: Cold holding 41°F or below; Hot holding 135°F or above; Walk-ins 35°F-38°F; Freezers 0°F or below.

## 2. WORKERS' COMPENSATION & WORKPLACE INJURY REPORTING
- **State Specific Form Requirement**: Every workplace injury MUST use the employee's specific state initial report form.
  - Active State Markets: Alabama (AL), Delaware (DE), Georgia (GA), Indiana (IN), Kentucky (KY), Maryland (MD), Michigan (MI), New Jersey (NJ), New York (NY), North Carolina (NC), Ohio (OH), Pennsylvania (PA), South Carolina (SC), Virginia (VA).
  - All state forms are accessible via the portal modal directly linking to company SharePoint files.
- **Mandatory 24-Hour Submission Window**:
  - The completed First Report of Injury / Workers' Comp form MUST be submitted within 24 hours of the incident.
  - MUST be emailed to ALL THREE designated recipients simultaneously:
    1. Taylor Maltese (HR): tmaltese@opportunityrestaurantgroup.com
    2. Hani Ascha (Select First Insurance): hani@selectfirstinsurance.com
    3. Daniel Salazar (Select First Insurance): DSalazar@selectfirstinsurance.com
- **AmCare Nurse Triage (Pre-Claim Assessment)**:
  - Posted in employee shared spaces.
  - Purpose: In the event an employee experiences a non-emergency work injury and wishes to speak directly with an occupational Registered Nurse before filing a Workers' Comp claim or seeking off-site medical care.
  - Telephonic triage is available 24/7.
  - For life-threatening emergencies, call 911 immediately.

## 3. HUMAN RESOURCES & EMPLOYEE DOCUMENTATION
- **HR Contact Sheet (IHOP)**:
  - Must be posted visibly where store leadership and management can see it.
  - Details who to contact for Payroll, Workers' Comp, Guest Incidents, and General HR.
  - General HR Inquiries, employee relations, policy questions: Taylor Maltese (tmaltese@opportunityrestaurantgroup.com).
- **Corrective Action Form**:
  - Most current version must be used for ALL performance and behavioral documentation going forward.
  - Store leadership MUST retire and discard all older paper versions on file.
  - Completed corrective actions must be submitted and saved via SharePoint. Consult your District Manager for SharePoint access.
- **Leave of Absence (LOA) Request Form**:
  - Purpose: Starts the interactive evaluation process with HR.
  - IMPORTANT: Submitting this request is NOT an automatic approval. HR will review eligibility, medical certification/documentation, and operational feasibility.
  - Managed through HR (Taylor Maltese).
- **Reasonable Accommodation Request Form**:
  - Purpose: Initiates the formal ADA interactive accommodation process with HR.
  - IMPORTANT: Submitting this form is NOT an automatic approval. HR conducts an interactive dialogue to identify reasonable accommodations that do not impose undue hardship.
- **Termination Form**:
  - Most current version for all employee separations (voluntary resignations and involuntary terminations).
  - Must be saved and processed via SharePoint. Contact your District Manager for permissions.

## 4. GUEST & CUSTOMER INCIDENTS
- **Guest Incident Report Form**:
  - Mandatory for ANY guest/customer incident, slip/trip/fall, injury, property damage, foreign object, illness allegation, or altercation occurring on restaurant premises.
  - Immediate actions: Attend to guest safety, offer medical assistance (call 911 if needed), preserve evidence (do not discard disputed food or items), inspect and photograph area.
  - Submissions & Escalations:
    - Primary Claims Contact: Jim Doran (EPL Team at Gallagher / Select First) at Jim_doran@ajg.com.
    - Always CC HR: Taylor Maltese (tmaltese@opportunityrestaurantgroup.com).
    - Always CC the District Manager.

## 5. FOOD SAFETY, TEMPERATURE CONTROL & HACCP
- **Food Critical Check Up List**:
  - Daily shift food health, cold-holding, sanitation, cross-contamination prevention, and safety verification standard.
  - Verification items include: sanitizing bucket ppm, handwashing sinks stocked with soap and warm water, proper date labeling, thawing procedures.
- **Expanded Temperature Log**:
  - Mandatory food line, hot-hold, walk-in coolers, reach-ins, and cooling logs.
  - Temperature thresholds:
    - Cold holding: 41°F or below.
    - Hot holding: 135°F (or 140°F per local jurisdiction) or higher.
    - Walk-in / reach-in refrigeration units: 35°F – 38°F.
    - Freezers: 0°F or below.
    - Critical corrective action: Any perishable item found in the temperature danger zone (41°F - 135°F) for over 2 hours must be discarded or rapidly corrected per ServSafe/HACCP guidelines.
- **Georgia HACCP Guide**:
  - Comprehensive Hazard Analysis and Critical Control Point compliance handbook for Georgia and Southeast region stores.

## 6. FINANCIAL & INVOICE SUBMISSION RULES
- **POS Paid Outs** (already posted in POS): Send supporting receipts and backup documentation to OFA-FPORG@bdo.com.
- **AP Invoices** (Accounts Payable): Send all vendor invoices requiring payment to OFA-AP-ORG@bdo.com.
- **Payroll Adjustments & Inquiries**: Send to OFA-PR-ORG@bdo.com, CC Taylor Maltese (tmaltese@opportunityrestaurantgroup.com).
`;

export const FREQUENT_QUESTIONS: FAQItem[] = [
  {
    id: 'write-up',
    category: 'HR & Accommodations',
    question: "How do I write someone up or document a disciplinary issue?",
    answer: "Use the current Corrective Action Form available on the portal. Older versions must be discarded. Have an objective conversation detailing specific dates, times, and policy violations. Have the team member sign, then submit and save the form via SharePoint (ask your District Manager if you need SharePoint access). For serious issues, contact Taylor Maltese at tmaltese@opportunityrestaurantgroup.com.",
    keyDetails: ["Use Corrective Action Form", "Retire older paper versions", "Submit via SharePoint", "Contact DM or Taylor Maltese for questions"]
  },
  {
    id: 'wc-steps',
    category: 'Workers Comp & Injury',
    question: "What are the exact steps if an employee is injured on shift?",
    answer: "1. Provide immediate first aid or call 911 for emergencies.\n2. If non-emergency, offer the AmCare Nurse Triage phone line so the employee can speak with an occupational nurse.\n3. Open the Workers' Comp Documents selector on this portal and download the employee's specific state form.\n4. Complete the First Report of Injury and email within 24 hours to tmaltese@opportunityrestaurantgroup.com, hani@selectfirstinsurance.com, and DSalazar@selectfirstinsurance.com.",
    keyDetails: ["State-specific form required", "Strict 24-hour deadline", "Must email all 3 contacts: Taylor, Hani, and Daniel"]
  },
  {
    id: 'guest-incident',
    category: 'Guest Incidents',
    question: "How do I report a customer or guest accident/slip?",
    answer: "Fill out the official Guest Incident Report Form immediately. Document facts objectively without admitting liability or making promises. Email the completed form to Jim Doran (Jim_doran@ajg.com), and CC HR (tmaltese@opportunityrestaurantgroup.com) and your District Manager.",
    keyDetails: ["Send to Jim Doran at Jim_doran@ajg.com", "Always CC Taylor Maltese (HR) and District Manager", "Take photos of area and save any relevant items"]
  },
  {
    id: 'hr-requests',
    category: 'HR & Accommodations',
    question: "Are Leave of Absence and Reasonable Accommodation requests automatically approved?",
    answer: "No. The email guidance explicitly states that submitting either the Leave of Absence Request Form or the Reasonable Accommodation Request Form starts the interactive evaluation process with HR. Neither constitutes an automatic approval.",
    keyDetails: ["Starts an interactive process with HR", "Not an automatic approval", "HR will communicate next steps and required documentation"]
  },
  {
    id: 'corrective-action',
    category: 'HR & Accommodations',
    question: "Which disciplinary and corrective action form should I use?",
    answer: "You must use the updated Corrective Action Form available on the portal. HR has directed that all older versions on file must be retired and discarded. Completed forms must be submitted and stored via SharePoint (ask your District Manager if you need SharePoint access).",
    keyDetails: ["Retire and discard all old versions", "Submit via SharePoint", "Contact your DM for SharePoint access"]
  },
  {
    id: 'temp-rules',
    category: 'Food Safety',
    question: "What are our required food holding temperatures?",
    answer: "Cold foods and refrigeration must be kept at 41°F or lower. Hot-holding equipment must keep hot food at 135°F or higher. Walk-ins should operate between 35°F-38°F, and freezers must be at 0°F or below. Log all items on the Expanded Temperature Log every shift.",
    keyDetails: ["Cold food: 41°F or below", "Hot food: 135°F or above", "Log on the Expanded Temperature Log daily"]
  }
];
