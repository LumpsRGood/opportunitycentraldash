/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { 
  FileText, 
  UserMinus, 
  AlertTriangle, 
  ShieldCheck, 
  ClipboardSignature, 
  Thermometer, 
  Search, 
  Copy, 
  Check, 
  Info, 
  Mail, 
  ArrowUpRight, 
  ExternalLink,
  ChevronRight,
  Download,
  AlertCircle,
  FileCode,
  Sparkles,
  Layers,
  PhoneCall,
  ArrowRight,
  Home,
  Users,
  Wrench,
  Monitor,
  BookOpen,
  Bell,
  Settings,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Coins,
  Wallet,
  MapPin,
  X,
  HeartHandshake,
  Bot,
  MessageSquare,
  Receipt,
  CreditCard,
  DollarSign,
  Clock,
  AlertOctagon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { OpsChatbot } from './components/OpsChatbot';
import { SyrupAvatar } from './components/SyrupAvatar';

const APP_VERSION = 'v1.3.0';

interface StateVariant {
  state: string;
  abbr: string;
  link: string;
}

const WORKERS_COMP_VARIANTS: StateVariant[] = [
  {
    state: 'Alabama',
    abbr: 'AL',
    link: 'https://opportunityrestaurantgroup-my.sharepoint.com/:b:/p/gchadrick/IQAnNy_4jsxNQ6CQcGd71UZCAc7ys0xq-hUIYEb80iO1T9s?web=1'
  },
  {
    state: 'Delaware',
    abbr: 'DE',
    link: 'https://opportunityrestaurantgroup-my.sharepoint.com/:b:/p/gchadrick/IQD-UfeUcMJiR7GQzpEX5ynbAQWBApL-brI2fmVPhM5MF1U?web=1'
  },
  {
    state: 'Georgia',
    abbr: 'GA',
    link: 'https://opportunityrestaurantgroup-my.sharepoint.com/:b:/p/gchadrick/IQDrExjGVKeJT4FepEyb3HERAVq7s3O0toCYUNoYPDH20gI?web=1'
  },
  {
    state: 'Indiana',
    abbr: 'IN',
    link: 'https://opportunityrestaurantgroup-my.sharepoint.com/:b:/p/gchadrick/IQB9o9ebuzSlQLotx0-debFFAfCZHJVGJI3PQ249TwobCi0?web=1'
  },
  {
    state: 'Kentucky',
    abbr: 'KY',
    link: 'https://opportunityrestaurantgroup-my.sharepoint.com/:b:/p/gchadrick/IQCTC80fdbHURrDoHroUASPlAdFqlUu9dCwGSBO8fR0U__M?web=1'
  },
  {
    state: 'Maryland',
    abbr: 'MD',
    link: 'https://opportunityrestaurantgroup-my.sharepoint.com/:b:/p/gchadrick/IQDsa60S0orXR7F4g_aEquQHAYj7ZOB2srhwgQg1dVtqHDw?web=1'
  },
  {
    state: 'Michigan',
    abbr: 'MI',
    link: 'https://opportunityrestaurantgroup-my.sharepoint.com/:b:/p/gchadrick/IQAO7xv6a5iKQYHNs0_p9-NQASTRdkn6KjCE3bY-mHvcN0w?web=1'
  },
  {
    state: 'New Jersey',
    abbr: 'NJ',
    link: 'https://opportunityrestaurantgroup-my.sharepoint.com/:b:/p/gchadrick/IQCL1cvRjab8T6JlGXtfKrecAS_0nuKYGQ2ztulLqNR6qEM?web=1'
  },
  {
    state: 'New York',
    abbr: 'NY',
    link: 'https://opportunityrestaurantgroup-my.sharepoint.com/:b:/p/gchadrick/IQB7uecqyvveRpuQZkRxf6VKAVFCsmkZc18ExJyMxfiVGto?web=1'
  },
  {
    state: 'North Carolina',
    abbr: 'NC',
    link: 'https://opportunityrestaurantgroup-my.sharepoint.com/:b:/p/gchadrick/IQAw1lAf_l9OSqFBV4Cq_9KHAe3H9P5Gi-v_ICqbVjCj0f4?web=1'
  },
  {
    state: 'Ohio',
    abbr: 'OH',
    link: 'https://opportunityrestaurantgroup-my.sharepoint.com/:b:/p/gchadrick/IQA9oN-1UVVNRLA58bEp9DZQAYEol23jySGtxtSUFw0e-14?web=1'
  },
  {
    state: 'Pennsylvania',
    abbr: 'PA',
    link: 'https://opportunityrestaurantgroup-my.sharepoint.com/:b:/p/gchadrick/IQDZLqcuQ1dpQaQ2QNdROjiyARfnG2D4ssdIWabezwulf5k?web=1'
  },
  {
    state: 'South Carolina',
    abbr: 'SC',
    link: 'https://opportunityrestaurantgroup-my.sharepoint.com/:b:/p/gchadrick/IQCT4mxUBrHnQKangkd8UxZjAV5U_xQAdcuWgUsJzOKO_Dw?web=1'
  },
  {
    state: 'Virginia',
    abbr: 'VA',
    link: 'https://opportunityrestaurantgroup-my.sharepoint.com/:b:/p/gchadrick/IQBUet4cX6OpS6eq5jnJ40N7ASW3ygplJJyNB3x8iPE8Zks?web=1'
  }
];

const WORKERS_COMP_CONTACTS = [
  {
    name: 'Taylor Maltese',
    email: 'tmaltese@opportunityrestaurantgroup.com',
    role: 'Opportunity Restaurant Group (HR)'
  },
  {
    name: 'Hani Ascha',
    email: 'hani@selectfirstinsurance.com',
    role: 'Select First Insurance'
  },
  {
    name: 'Daniel Salazar',
    email: 'DSalazar@selectfirstinsurance.com',
    role: 'Select First Insurance'
  }
];

const DOCUMENTS = [
  {
    id: 'doc-amcares-nurse-triage',
    title: 'AmCare Nurse Triage Form',
    description: 'Post in employee shared space in the event an employee would like to speak with a Nurse before reporting a Workers’ Comp claim.',
    category: 'Safety',
    format: 'PDF',
    icon: PhoneCall,
    bandClass: 'green',
    bandIcon: '☎',
    link: 'https://opportunityrestaurantgroup-my.sharepoint.com/:b:/p/gchadrick/IQA95dLyatBbTZ8Wl6o1cSJrAXEY-LwscRwQCqOub2VwSTw?web=1'
  },
  {
    id: 'doc-corrective-action',
    title: 'Corrective Action Form',
    description: 'Most current version. Use for all performance/behavior documentation going forward; retire older versions. Submit via SharePoint.',
    category: 'HR',
    format: 'DOCX',
    icon: AlertTriangle,
    bandClass: 'orange',
    bandIcon: '✎',
    link: 'https://opportunityrestaurantgroup-my.sharepoint.com/:w:/p/gchadrick/IQBiizq_B3PpQoBwclkQoscvAeD8uuXm04c41sFQtQ0y5Zo?web=1'
  },
  {
    id: 'doc-food-critical',
    title: 'Food Critical Checklist',
    description: 'Daily shift food health, refrigeration, sanitation, and safety standards verification sheet.',
    category: 'Food Safety',
    format: 'DOCX',
    icon: ShieldCheck,
    bandClass: 'forest',
    bandIcon: '☑',
    link: 'https://opportunityrestaurantgroup-my.sharepoint.com/:w:/p/gchadrick/IQDKUBl0V--nT48yPiu9oUrWARiCADLGVMaBrQ7t7xFXwyk?web=1'
  },
  {
    id: 'doc-ga-haccp',
    title: 'Georgia HACCP Guide',
    description: 'Guidelines and procedures for Hazard Analysis and Critical Control Point compliance.',
    category: 'Food Safety',
    format: 'DOCX',
    icon: BookOpen,
    bandClass: 'forest',
    bandIcon: '✩',
    link: 'https://opportunityrestaurantgroup-my.sharepoint.com/:w:/p/gchadrick/IQD5GFYxN8Q6SZhERDUWF93SAYJSRdSyDNNW7MgcY0DBW5g?web=1'
  },
  {
    id: 'doc-guest-incident',
    title: 'Guest Incident Report Form',
    description: 'Use for any guest/customer incident, injury, or accident on site.',
    category: 'Safety',
    format: 'DOCX',
    icon: ClipboardSignature,
    bandClass: 'red',
    bandIcon: '⚠',
    link: 'https://opportunityrestaurantgroup-my.sharepoint.com/:w:/p/gchadrick/IQAa06jhBhCxSI7Tly-GwrEfAdsi-fpAJ7U3aJ_w2Da7ntc?web=1'
  },
  {
    id: 'doc-hr-contact-sheet',
    title: 'HR Contact Sheet (IHOP)',
    description: "Post where your leadership team can see it — who to email for payroll, workers' comp, guest incidents, or general HR.",
    category: 'HR',
    format: 'PDF',
    icon: Users,
    bandClass: 'green',
    bandIcon: '📇',
    link: 'https://opportunityrestaurantgroup-my.sharepoint.com/:b:/p/gchadrick/IQB8FkTK_rtVSrXhpF3FcnHHAWXQbE2Ak21BcvdjCUujePE?web=1'
  },
  {
    id: 'doc-leave-of-absence',
    title: 'Leave of Absence Request Form',
    description: 'Starts the interactive process with HR. Not an automatic approval.',
    category: 'HR',
    format: 'DOCX',
    icon: FileText,
    bandClass: 'blue',
    bandIcon: '📋',
    link: 'https://opportunityrestaurantgroup-my.sharepoint.com/:w:/p/gchadrick/IQAV2op-OSf7T7rHpVPjHKdYAeEf_pzOuSAfKE1nyB3efGg?web=1'
  },
  {
    id: 'doc-reasonable-accommodation',
    title: 'Reasonable Accommodation Request Form',
    description: 'Starts the interactive process with HR for workplace accommodations. Not an automatic approval.',
    category: 'HR',
    format: 'DOCX',
    icon: HeartHandshake,
    bandClass: 'purple',
    bandIcon: '🤝',
    link: 'https://opportunityrestaurantgroup-my.sharepoint.com/:w:/p/gchadrick/IQA45Kjqu_5rSbVcrLHJAEvgAZtUiP_DCU5szuf4hYVNWgk?web=1'
  },
  {
    id: 'doc-temp-log',
    title: 'Temperature Log',
    description: 'Mandatory daily food line, hold, and cooling log sheets.',
    category: 'Food Safety',
    format: 'PDF',
    icon: Thermometer,
    bandClass: 'blue',
    bandIcon: '♨',
    link: 'https://opportunityrestaurantgroup-my.sharepoint.com/:b:/p/gchadrick/IQAmW7688o3oRZsrsVpvlg0tAesBnBVkHvjwOCn6w6_VFr4?web=1'
  },
  {
    id: 'doc-termination',
    title: 'Termination Form',
    description: 'Most current version for employee separations. Save via SharePoint (ask your District Manager on accessing SharePoint).',
    category: 'HR',
    format: 'DOCX',
    icon: UserMinus,
    bandClass: 'crimson',
    bandIcon: '♙',
    link: 'https://opportunityrestaurantgroup-my.sharepoint.com/:w:/p/gchadrick/IQBfCnP82SFlQ5xX8jd25ed8Ac7mpg8bt_XkXFzKKqZK0Rk?web=1'
  },
  {
    id: 'doc-workers-comp-states',
    title: "Workers' Comp Form",
    description: "State specific initial report form. Use the appropriate report for your state market when reporting a workplace injury.",
    category: 'Safety',
    format: 'Multi-State',
    icon: FileText,
    bandClass: 'forest',
    bandIcon: '⛑',
    link: '',
    hasVariants: true
  }
];

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [expandedHowTo, setExpandedHowTo] = useState<string | null>(null);
  const [workersCompModalOpen, setWorkersCompModalOpen] = useState(false);
  const [selectedStateIndex, setSelectedStateIndex] = useState(0);
  const [copiedAll, setCopiedAll] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setWorkersCompModalOpen(false);
      }
    };
    if (workersCompModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [workersCompModalOpen]);

  // If user searched for a specific state, preselect that state
  useEffect(() => {
    if (!searchTerm.trim()) return;
    const term = searchTerm.trim().toLowerCase();
    const matchIdx = WORKERS_COMP_VARIANTS.findIndex(
      v => term.includes(v.state.toLowerCase()) || (term.length === 2 && term === v.abbr.toLowerCase())
    );
    if (matchIdx !== -1) {
      setSelectedStateIndex(matchIdx);
    }
  }, [searchTerm]);

  const handleCopyText = (text: string, isAll?: boolean) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    if (isAll) {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } else {
      setCopiedEmail(text);
      setTimeout(() => setCopiedEmail(null), 2000);
    }
  };

  // References for scrollspy and smooth scrolling
  const sectionRefs = {
    home: useRef<HTMLElement | null>(null),
    documents: useRef<HTMLElement | null>(null),
    facilities: useRef<HTMLElement | null>(null),
    howDoI: useRef<HTMLElement | null>(null),
    contacts: useRef<HTMLElement | null>(null),
    links: useRef<HTMLElement | null>(null),
  };

  // Scrollspy to set active tab as user scrolls
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160; // offset for nav height

      if (window.scrollY < 80) {
        setActiveTab('home');
        return;
      }

      for (const [section, ref] of Object.entries(sectionRefs)) {
        if (ref.current) {
          const top = ref.current.offsetTop;
          const height = ref.current.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabClick = (sectionId: 'home' | 'documents' | 'facilities' | 'howDoI' | 'contacts' | 'links') => {
    setActiveTab(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      const targetRef = sectionRefs[sectionId];
      if (targetRef && targetRef.current) {
        window.scrollTo({
          top: targetRef.current.offsetTop - 110, // offset for fixed headers/tabs
          behavior: 'smooth'
        });
      }
    }
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email).then(() => {
      setCopiedEmail(email);
      setTimeout(() => {
        setCopiedEmail(null);
      }, 2000);
    });
  };

  // Filter documents based on search search-term & category
  const filteredDocs = DOCUMENTS.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'HR', 'Operations', 'Food Safety', 'Safety'];

  return (
    <>
      {/* 
        The style block requested by the user is placed here inside standard JSX <style> tag.
        This preserves their CSS variables, visual hierarchy, layout boundaries, and exact customizations,
        while elevating them with modern visual styles (smooth hover lifts, focus highlights, elegant transitions).
      */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

        .navbar,
        footer.footer {
          display: none !important;
        }

        body {
          background: #f4f6f8 !important;
          margin: 0;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
        }

        .oc-portal {
          --oc-green: #15803d;
          --oc-green-dark: #166534;
          --oc-green-light: #f0fdf4;
          --oc-green-border: #bbf7d0;
          --oc-text: #0f172a;
          --oc-muted: #64748b;
          --oc-line: #e2e8f0;
          --oc-panel: #ffffff;
          color: var(--oc-text);
          background: #f4f6f8;
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
        }

        .oc-portal * {
          box-sizing: border-box;
        }

        .oc-masthead {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #ffffff;
          border-bottom: 1px solid var(--oc-line);
          padding: 20px 40px;
          flex-wrap: wrap;
          gap: 20px;
        }

        .oc-masthead-left h1 {
          margin: 0;
          color: var(--oc-text);
          font-size: 26px;
          line-height: 1.2;
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .oc-masthead-left p {
          margin: 6px 0 0;
          color: var(--oc-muted);
          font-size: 13px;
          font-weight: 400;
        }

        .oc-search-wrapper {
          position: relative;
          flex-grow: 1;
          max-width: 380px;
          margin-right: 20px;
        }

        .oc-search-input {
          width: 100%;
          height: 40px;
          padding: 0 16px 0 42px;
          background: #ffffff;
          border: 1px solid var(--oc-line);
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          color: var(--oc-text);
          outline: none;
          transition: all 0.2s ease;
        }

        .oc-search-input:focus {
          border-color: #0f172a;
          box-shadow: 0 0 0 3px rgba(15, 23, 42, 0.08);
        }

        .oc-search-icon {
          position: absolute;
          left: 14px;
          top: 11px;
          color: var(--oc-muted);
          pointer-events: none;
        }

        .oc-tabs-container {
          position: sticky;
          top: 0;
          z-index: 50;
          background: #ffffff;
          border-bottom: 1px solid var(--oc-line);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
        }

        .oc-tabs-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1400px;
          margin: 0 auto;
          min-height: 48px;
          padding: 0 40px;
        }

        .oc-nav-logos {
          display: flex;
          align-items: center;
          gap: 16px;
          opacity: 0;
          transform: translateX(12px);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }

        .oc-nav-logos.visible {
          opacity: 1;
          transform: translateX(0);
          pointer-events: auto;
        }

        .oc-tabs {
          display: flex;
          align-items: center;
          gap: 24px;
          margin: 0;
          padding: 0;
        }

        .oc-tabs button {
          display: flex;
          align-items: center;
          height: 48px;
          padding: 0 4px;
          border: none;
          border-bottom: 2px solid transparent;
          background: transparent;
          color: #475569;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .oc-tabs button.active {
          color: #0f172a;
          border-bottom-color: #0f172a;
          font-weight: 600;
        }

        .oc-tabs button:hover {
          color: #0f172a;
        }

        .oc-welcome {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 24px auto 20px;
          width: min(1400px, calc(100% - 80px));
          padding: 14px 20px;
          background: var(--oc-green-light);
          border-left: 4px solid var(--oc-green);
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(43, 97, 41, 0.03);
        }

        .oc-info-icon {
          width: 22px;
          height: 22px;
          display: grid;
          place-items: center;
          border: 2px solid var(--oc-green);
          border-radius: 50%;
          color: var(--oc-green);
          font-weight: 800;
          font-size: 12px;
          background: #ffffff;
          flex-shrink: 0;
        }

        .oc-section-heading h2 {
          margin: 0;
          color: var(--oc-text);
          font-size: 22px;
          line-height: 1.2;
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .oc-section-heading p {
          margin: 6px 0 0;
          color: var(--oc-muted);
          font-size: 14px;
          line-height: 1.5;
          font-weight: 400;
        }

        .oc-panel {
          width: min(1400px, calc(100% - 80px));
          margin: 0 auto 32px;
          padding: 32px;
          background: var(--oc-panel);
          border: 1px solid var(--oc-line);
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
          transition: all 0.25s ease;
        }

        .oc-section-heading {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 24px;
        }

        .oc-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: #f1f5f9;
          color: var(--oc-green);
          font-size: 18px;
          flex-shrink: 0;
        }

        .oc-search-filter-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--oc-line);
        }

        .oc-category-tabs {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow-x: auto;
        }

        .oc-category-btn {
          padding: 6px 14px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 9999px;
          color: #475569;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
        }

        .oc-category-btn:hover {
          background: #f1f5f9;
          border-color: #cbd5e1;
        }

        .oc-category-btn.active {
          background: #0f172a;
          color: #ffffff;
          border-color: #0f172a;
          font-weight: 600;
        }

        .oc-card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 24px;
        }

        /* Modern Left-Border Document Cards */
        .oc-doc-card {
          display: flex;
          flex-direction: column;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          padding: 24px;
          border-left: 4px solid #cbd5e1;
          overflow: hidden;
        }

        .oc-doc-card.card-green { border-left-color: #22c55e; }
        .oc-doc-card.card-red { border-left-color: #ef4444; }
        .oc-doc-card.card-crimson { border-left-color: #dc2626; }
        .oc-doc-card.card-orange { border-left-color: #f97316; }
        .oc-doc-card.card-forest { border-left-color: #15803d; }
        .oc-doc-card.card-purple { border-left-color: #a855f7; }
        .oc-doc-card.card-blue { border-left-color: #3b82f6; }

        .oc-doc-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 20px -8px rgba(0, 0, 0, 0.08);
          border-color: #cbd5e1;
        }

        .oc-card-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 14px;
          width: 100%;
        }

        .oc-card-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 8px;
          flex-shrink: 0;
        }

        .oc-card-icon-wrapper.green { background-color: #f0fdf4; color: #22c55e; }
        .oc-card-icon-wrapper.red { background-color: #fef2f2; color: #ef4444; }
        .oc-card-icon-wrapper.crimson { background-color: #fef2f2; color: #dc2626; }
        .oc-card-icon-wrapper.orange { background-color: #fff7ed; color: #f97316; }
        .oc-card-icon-wrapper.forest { background-color: #f0fdf4; color: #15803d; }
        .oc-card-icon-wrapper.purple { background-color: #f5f3ff; color: #a855f7; }
        .oc-card-icon-wrapper.blue { background-color: #f0f9ff; color: #3b82f6; }

        .oc-card-title-container {
          flex: 1;
          min-width: 0;
        }

        .oc-card-title-container h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 700;
          color: var(--oc-text);
          line-height: 1.3;
        }

        .oc-card-format-badge {
          font-size: 10px;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 4px;
          background-color: #f1f5f9;
          color: #475569;
          text-transform: uppercase;
          border: 1px solid #e2e8f0;
          letter-spacing: 0.05em;
        }

        .oc-doc-card p.oc-card-description {
          margin: 0 0 20px 0;
          font-size: 14px;
          line-height: 1.5;
          color: #64748b;
          flex-grow: 1;
        }

        .oc-open-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          height: 40px;
          border-radius: 8px;
          background-color: #15803d;
          color: #ffffff !important;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
          border: none;
          cursor: pointer;
        }

        .oc-open-button:hover {
          background-color: #166534;
          box-shadow: 0 4px 10px rgba(22, 101, 52, 0.15);
        }

        .oc-open-button.coming-soon {
          background-color: #64748b;
          color: #f1f5f9 !important;
          cursor: not-allowed;
          pointer-events: none;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* Bottom Grid and Guidelines */
        .oc-bottom-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          width: min(1400px, calc(100% - 80px));
          margin: 0 auto;
        }

        .oc-bottom-grid .oc-panel {
          width: 100%;
          min-width: 0;
          margin: 0 0 32px;
        }

        .oc-warning {
          margin: 0 0 24px;
          padding: 16px 20px;
          border-left: 4px solid #f97316;
          border-radius: 8px;
          background: #fff7ed;
          border: 1px solid #ffedd5;
          border-left-width: 4px;
        }

        .oc-warning strong {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
          color: #ea580c;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.02em;
        }

        .oc-warning p {
          margin: 0;
          font-size: 13px;
          line-height: 1.5;
          color: #7c2d12;
        }

        .oc-table-container {
          overflow-x: auto;
          border-radius: 8px;
          border: 1px solid var(--oc-line);
          background: #ffffff;
        }

        .oc-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          font-size: 13px;
        }

        .oc-table th,
        .oc-table td {
          padding: 14px 16px;
          border-bottom: 1px solid var(--oc-line);
          text-align: left;
          vertical-align: middle;
        }

        .oc-table th {
          background: #f8fafc;
          color: #475569;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.03em;
          text-transform: uppercase;
        }

        .oc-table tr:last-child td {
          border-bottom: 0;
        }

        .oc-table td.oc-bold-cell {
          font-weight: 600;
          color: var(--oc-text);
        }

        .oc-table td.oc-action-cell {
          color: #475569;
          font-weight: 400;
          line-height: 1.4;
        }

        .oc-table a {
          color: #2563eb;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: all 0.2s ease;
        }

        .oc-table a:hover {
          color: #1d4ed8;
          text-decoration: underline;
        }

        .oc-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: 0.02em;
        }

        .oc-badge.paid { background: #dcfce7; color: #166534; border: 1px solid #bbf7d0; }
        .oc-badge.invoice { background: #dbeafe; color: #1e40af; border: 1px solid #bfdbfe; }
        .oc-badge.payroll { background: #fef08a; color: #854d0e; border: 1px solid #fde047; }

        /* Contact Cards Directory */
        .oc-contact-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          background-color: #ffffff;
          transition: all 0.2s ease;
          overflow: hidden;
          width: 100%;
          box-sizing: border-box;
        }

        .oc-contact-card:hover {
          border-color: #cbd5e1;
          box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        }

        .oc-contact-left {
          display: flex;
          align-items: center;
          gap: 16px;
          min-width: 0;
        }

        .oc-contact-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
          min-width: 0;
          max-width: 100%;
        }

        @media (max-width: 900px) {
          .oc-contact-card {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 12px !important;
          }

          .oc-contact-right {
            align-items: flex-start !important;
            width: 100% !important;
          }
        }

        .oc-contact-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: 5px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          min-width: 84px;
          text-align: center;
          flex-shrink: 0;
        }

        .oc-contact-badge.employee {
          background-color: #fff7ed;
          color: #ea580c;
          border: 1px solid #ffedd5;
        }

        .oc-contact-badge.payroll {
          background-color: #fef9c3;
          color: #854d0e;
          border: 1px solid #fef08a;
        }

        .oc-contact-badge.wc {
          background-color: #f0fdf4;
          color: #166534;
          border: 1px solid #bbf7d0;
        }

        .oc-contact-badge.hr {
          background-color: #eff6ff;
          color: #1d4ed8;
          border: 1px solid #dbeafe;
        }

        .oc-contact-badge.guest {
          background-color: #fef2f2;
          color: #dc2626;
          border: 1px solid #fee2e2;
        }

        .oc-contact-info h4 {
          margin: 0;
          font-size: 14px;
          font-weight: 700;
          color: #0f172a;
        }

        .oc-contact-info p {
          margin: 2px 0 0;
          font-size: 12px;
          color: #64748b;
        }

        .oc-contact-email-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          color: #2563eb;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          max-width: 100%;
          box-sizing: border-box;
        }

        .oc-contact-email-btn span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .oc-contact-email-btn:hover {
          background-color: #f0f9ff;
          border-color: #bfdbfe;
          color: #1d4ed8;
        }

        /* Sleek CC Container */
        .oc-cc-container {
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 16px;
        }

        .oc-cc-title {
          font-size: 11px;
          font-weight: 700;
          color: #475569;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .oc-cc-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .oc-cc-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          border-radius: 6px;
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: #334155;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .oc-cc-item:hover {
          background-color: #f1f5f9;
          border-color: #cbd5e1;
        }

        .oc-footer {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 100px;
          margin-top: 48px;
          background: #ffffff;
          border-top: 1px solid var(--oc-line);
          color: var(--oc-muted);
          font-size: 14px;
          font-weight: 500;
          text-align: center;
          padding: 24px;
        }

        /* Empty state styling */
        .oc-empty-state {
          grid-column: 1 / -1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 48px 24px;
          background: #f8fafc;
          border: 2px dashed var(--oc-line);
          border-radius: 12px;
          text-align: center;
        }

        .oc-empty-state h4 {
          margin: 0;
          font-size: 15px;
          font-weight: 700;
          color: var(--oc-text);
        }

        .oc-empty-state p {
          margin: 4px 0 0;
          font-size: 13px;
          color: var(--oc-muted);
        }

        /* Floating copy toast */
        .oc-toast {
          position: fixed;
          bottom: 24px;
          right: 24px;
          background: #0f172a;
          color: #ffffff;
          padding: 10px 18px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.2);
          z-index: 100;
          display: flex;
          align-items: center;
          gap: 8px;
          border: 1px solid #1e293b;
        }

        @media (max-width: 1200px) {
          .oc-bottom-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .oc-masthead {
            padding: 20px;
          }

          .oc-masthead-left h1 {
            font-size: 22px;
          }

          .oc-tabs-inner {
            padding: 0;
          }

          .oc-tabs {
            gap: 16px;
            padding: 0 20px;
            overflow-x: auto;
            white-space: nowrap;
            width: 100%;
          }

          .oc-tabs button {
            font-size: 13px;
          }

          .oc-nav-logos {
            display: none !important;
          }

          .oc-welcome,
          .oc-panel,
          .oc-bottom-grid {
            width: calc(100% - 40px);
          }

          .oc-panel {
            padding: 20px;
          }

          .oc-card-grid {
            grid-template-columns: 1fr;
          }

          .oc-search-filter-bar {
            flex-direction: column;
            align-items: stretch;
          }

          .oc-search-wrapper {
            max-width: 100%;
            margin-right: 0;
            margin-bottom: 12px;
          }
        }
      `}</style>

      <main id="mainContent" className="oc-portal">
        {/* Header Section */}
        <header className="oc-masthead">
          <div className="oc-masthead-left">
            <h1 className="flex items-center gap-3">
              Opportunity Central
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200 uppercase tracking-wider scale-90 origin-left select-none">
                {APP_VERSION}
              </span>
            </h1>
            <p>One Stop Portal &amp; Directory | Opportunity Pancakes (IHOP Franchisee)</p>
          </div>
          <div className="flex items-center gap-6 flex-wrap md:flex-nowrap">
            {/* Opportunity Pancakes Logo (Official high-fidelity vector) */}
            <svg viewBox="0 0 201.27 51.58" className="h-11 w-auto opacity-95 hidden sm:block shrink-0" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1">
              <path d="M26.13,25.45h.99c.68,0,1.43.04,2.03.46.42.31.82.86.82,1.67,0,.64-.26,1.3-.79,1.72-.62.46-1.32.46-1.87.46h-1.17v-4.32ZM23.26,22.98v14.7h2.86v-5.44h1.85c1.7,0,2.91-.48,3.72-1.3,1.12-1.12,1.21-2.71,1.21-3.28,0-1.06-.31-2.49-1.5-3.55-1.08-.95-2.23-1.12-3.88-1.12h-4.28Z" fill="#507148" strokeWidth={0} />
              <path d="M43.84,25.45h.99c.68,0,1.43.04,2.03.46.42.31.82.86.82,1.67,0,.64-.26,1.3-.79,1.72-.62.46-1.32.46-1.87.46h-1.17v-4.32ZM40.98,22.98v14.7h2.86v-5.44h1.85c1.7,0,2.91-.48,3.72-1.3,1.12-1.12,1.21-2.71,1.21-3.28,0-1.06-.31-2.49-1.5-3.55-1.08-.95-2.23-1.12-3.88-1.12h-4.28Z" fill="#507148" strokeWidth={0} />
              <path d="M139.79,37.68v-9.83l8.95,9.83h1.98v-14.7h-2.86v9.81l-8.95-9.81h-1.98v14.7h2.86ZM115.16,22.98v8.99c0,1.39.22,2.8,1.1,3.92,1.06,1.39,2.91,2.12,4.8,2.12s3.75-.73,4.8-2.12c.88-1.12,1.1-2.53,1.1-3.92v-8.99h-2.86v9.23c0,1.12-.37,1.81-.71,2.18-.42.51-1.19,1.01-2.34,1.01s-1.92-.51-2.34-1.01c-.33-.37-.71-1.06-.71-2.18v-9.23h-2.86ZM106.74,25.45v-2.47h-9.48v2.47h3.31v12.23h2.86v-12.23h3.31ZM82.41,25.32h.86c.53,0,2.78.02,2.78,2.2s-2.27,2.23-2.82,2.23h-.82v-4.43ZM79.54,22.98v14.7h2.86v-5.91h.35l3.92,5.91h3.57l-4.58-6.19c.71-.13,1.23-.37,1.61-.64,1.15-.77,1.72-2.03,1.72-3.46,0-1.1-.33-2.36-1.45-3.31-.68-.57-1.72-1.1-3.75-1.1h-4.25Z" fill="#507148" strokeWidth={0} />
              <path d="M192.55,37.68h2.87v-6.72l5.18-7.98h-3.39l-3.15,5.11-3.15-5.11h-3.39l5.05,7.98v6.72ZM180.78,25.45v-2.47h-9.48v2.47h3.31v12.23h2.86v-12.23h3.31ZM160.69,22.98v14.7h2.86v-14.7h-2.86Z" fill="#507148" strokeWidth={0} />
              <path d="M14.17,34.63c-3.23,4.34-9.87,3.99-12.49-.81-2.56-4.62.51-10.48,5.76-10.97,6.31-.64,10.52,6.66,6.73,11.78ZM12.72,33.49c2.63-3.14,1.18-7.99-2.85-9.02-3.84-1.02-7.58,2.35-6.93,6.24.69,4.65,6.76,6.41,9.78,2.78Z" fill="#eeba7d" strokeWidth={0} />
              <path d="M195.88,44.8c-.59-.61-1.28-.68-1.64-.68-1.29,0-1.86.85-1.86,1.7,0,.59.27.91.46,1.08.3.26.66.4.96.5.33.11.68.23.89.43.16.15.23.31.23.52,0,.49-.38.8-.89.8-.41,0-.94-.21-1.22-.77l-.74.7c.3.44.93,1.09,2,1.09,1.2,0,2.02-.77,2.02-1.9,0-.59-.23-.98-.5-1.22-.3-.27-.72-.43-1.17-.58-.36-.13-.56-.2-.7-.33-.14-.12-.18-.25-.18-.39,0-.3.19-.68.8-.68.21,0,.61.04.95.5l.59-.77ZM183.6,44.26h-3.21v5.79h3.21v-.97h-2.09v-1.58h2v-.97h-2v-1.29h2.09v-.97ZM168.24,44.26h-1.13v5.79h1.13v-2.47l.13-.13,2.06,2.6h1.49l-2.58-3.12,2.45-2.68h-1.42l-2.13,2.45v-2.45ZM154.97,47.91l.83-2.09.83,2.09h-1.65ZM157.46,50.05h1.22l-2.42-5.79h-.89l-2.49,5.79h1.23l.51-1.22h2.34l.51,1.22ZM144.73,48.52c-.34.4-.82.63-1.36.63-.97,0-1.96-.69-1.96-1.98,0-1.07.76-2.02,1.92-2.02.21,0,.87.04,1.4.65v-1.32c-.53-.29-1.02-.36-1.42-.36-.83,0-1.55.22-2.13.76-.5.46-.93,1.22-.93,2.27,0,.85.26,1.57.93,2.22.49.46,1.1.81,2.12.81.63,0,1.09-.16,1.43-.34v-1.32ZM127.14,50.05v-3.87l3.53,3.87h.78v-5.79h-1.13v3.87l-3.53-3.87h-.78v5.79h1.13ZM113.88,47.91l.83-2.09.83,2.09h-1.65ZM116.37,50.05h1.22l-2.42-5.79h-.89l-2.49,5.79h1.23l.51-1.22h2.34l.51,1.22ZM101.69,45.23h.39c.27,0,.56.02.8.18.17.12.32.34.32.66,0,.25-.1.51-.31.68-.24.18-.52.18-.74.18h-.46v-1.7ZM100.56,44.26v5.79h1.13v-2.15h.73c.67,0,1.15-.19,1.47-.51.44-.44.48-1.07.48-1.29,0-.42-.12-.98-.59-1.4-.43-.37-.88-.44-1.53-.44h-1.69Z" fill="#57475f" strokeWidth={0} />
              <path d="M26.11,9.17c1.7,2.69,2.58,7.19-.35,9.39-3.14,1.97-6.95-.64-8.83-3.2-1.99-2.66-3.15-7.13-.29-9.63.69-.59,1.6-.93,2.5-.98,3-.17,5.49,2.13,6.97,4.43ZM24.67,10.14c-1.21-1.61-2.97-2.97-4.94-3.09-1.15-.05-2.01.49-2.4,1.59-.99,3.15,1.24,7.13,4,8.74,1.81,1.07,4.21.94,4.89-1.32.59-2.05-.37-4.24-1.55-5.92Z" fill="#eeba7d" strokeWidth={0} />
              <path d="M59.36,17.3c-3.12,1.61-8.24,2.38-10.18-1.37-.88-1.91-.08-4.17,1.18-5.64,2.28-2.65,5.85-4.16,9.33-4,2.99.12,5.57,2.09,4.76,5.32-.7,2.56-2.81,4.51-5.1,5.7ZM58.62,15.72c1.97-.88,4.03-2.29,4.71-4.43.7-2.45-1.48-3.72-3.68-3.67-3.34.05-7.53,2.43-8.48,5.72-.53,2.06,1.39,3.01,3.17,3.12,1.4.12,2.9-.18,4.28-.76Z" fill="#eeba7d" strokeWidth={0} />
              <path d="M65.42,22.3c2.36,0,4.77.2,6.84,1.5,1.4.88,2.12,2.63,1.01,4.07-.82,1.06-2.1,1.56-3.28,1.89-1.5.39-3.03.49-4.57.48-1.53-.02-3.04-.2-4.52-.64-1.72-.47-4.23-1.88-3.48-4.05,1.1-2.61,5.51-3.21,8-3.25ZM65.42,23.71c-1.4-.01-2.82.14-4.13.55-3.53,1.15-3.52,2.95-.02,4.16,2.63.83,5.67.8,8.24-.16.87-.34,1.74-.76,2.27-1.47.44-.6-.07-1.11-.58-1.5-1.63-1.13-3.77-1.53-5.78-1.59Z" fill="#eeba7d" strokeWidth={0} />
              <path d="M42.59,9.16c-.52,1.96-1.1,3.96-2.36,5.65-.86,1.2-2.57,2.07-3.74.66-1.91-2.64.44-9.04,1.92-11.61.63-1.05,1.32-2.28,2.55-2.77.81-.3,1.59.26,1.84,1.02.38,1.02.37,2.08.35,3.12-.04,1.34-.24,2.65-.56,3.94ZM40.89,8.67c.38-1.16.71-2.36.88-3.56.11-.85.18-1.77-.1-2.56-.05-.14-.13-.28-.23-.33-.37.07-.64.43-.9.74-1.67,2.39-2.38,5.73-2.56,8.6-.01.83-.05,1.75.29,2.43,0,0-.07-.08-.19-.12-.12-.04-.22-.01-.23,0,.63-.42,1.09-1.2,1.53-1.9.6-1.02,1.11-2.14,1.49-3.3Z" fill="#eeba7d" strokeWidth={0} />
              <path d="M70.06,28.91c1.02,1.02.3,2.16-2.2,2.97-1.31.41-2.73.57-4.13.55-2.01-.06-4.15-.45-5.78-1.59-.51-.39-1.02-.9-.58-1.5.42-.56,1.06-.95,1.74-1.25-.57-.39-.95-.85-1.1-1.33-.81.32-1.57.78-2.13,1.51-1.11,1.44-.39,3.19,1.01,4.07,2.07,1.3,4.48,1.5,6.84,1.5,2.49-.04,6.9-.64,8-3.25.31-.88.07-1.63-.42-2.25-.37.21-.79.4-1.25.56Z" fill="#eeba7d" strokeWidth={0} />
              <path d="M72.97,29.39c-.82-.52-1.7-.86-2.61-1.08.54.46.84.98.84,1.53,0,.19-.04.38-.11.57.29.15.56.31.82.49.51.39,1.02.9.58,1.5-.53.71-1.39,1.13-2.27,1.47-2.57.96-5.61,1-8.24.16-1.22-.42-2.01-.91-2.39-1.43-.6-.18-1.14-.39-1.6-.64.03,1.71,2.12,2.84,3.62,3.24,1.47.44,2.99.62,4.52.64,1.53.02,3.06-.09,4.57-.48,1.18-.33,2.46-.83,3.28-1.89,1.11-1.44.39-3.19-1.01-4.07Z" fill="#eeba7d" strokeWidth={0} />
              <path d="M71.79,34.06c.44.9-.39,1.83-2.53,2.53-1.31.41-2.73.57-4.13.55-2.01-.06-4.15-.45-5.78-1.59-.51-.39-1.02-.9-.58-1.5.19-.26.43-.47.69-.66-.51-.45-.8-.95-.8-1.49,0-.03,0-.05,0-.08-.52.29-1,.66-1.38,1.15-1.11,1.44-.39,3.19,1.01,4.07,2.07,1.3,4.48,1.5,6.84,1.5,2.49-.04,6.9-.64,8-3.25.26-.76.13-1.43-.24-2-.29.27-.66.53-1.1.75Z" fill="#eeba7d" strokeWidth={0} />
            </svg>

            {/* IHOP Logo (Official vector logo) */}
            <div className="border-l border-slate-200 pl-6 h-12 flex items-center hidden sm:flex shrink-0">
              <svg viewBox="1.388 0.5745872512184533 250.31540369784324 132.97841274878155" className="h-9 w-auto opacity-95 shrink-0 select-none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.874 1.619A10.656 10.656 0 0 0 1.388 12.412v48.652a10.656 10.656 0 1 0 21.31 0V12.412A10.656 10.656 0 0 0 11.875 1.618zm30.88.266a10.784 10.784 0 0 0-7.473 3.229 10.786 10.786 0 0 0-3.013 7.564v48.2a10.786 10.786 0 0 0 3.067 7.632c1.976 2.005 4.773 3.175 7.588 3.175s5.612-1.17 7.589-3.175a10.787 10.787 0 0 0 3.067-7.632V45.152h21.453v15.726A10.786 10.786 0 0 0 78.1 68.51c1.977 2.005 4.774 3.175 7.589 3.175s5.611-1.17 7.588-3.175a10.788 10.788 0 0 0 3.067-7.632v-48.2c.04-2.84-1.117-5.677-3.127-7.683a10.792 10.792 0 0 0-7.693-3.11 10.784 10.784 0 0 0-7.474 3.23 10.786 10.786 0 0 0-3.013 7.564V26.8H53.584V12.679a10.795 10.795 0 0 0-3.132-7.684 10.788 10.788 0 0 0-7.693-3.11zm172.443.024c-18.27 0-34.48 14.355-35.165 33.39a10.779 10.779 0 0 0-.061 1.24v51.073a10.779 10.779 0 1 0 21.555 0V69.103a33.896 33.896 0 0 0 13.181 2.664c19.132 0 35.563-15.609 35.563-35.58 0-7.92-2.948-15.825-8.788-22.504-5.842-6.679-15.19-11.773-26.287-11.773zm-76.073.031c-21.324 0-35.364 17.33-35.364 34.218 0 18.893 15.07 35.38 34.522 35.38 22.041 0 35.792-17.676 35.792-34.003 0-20.122-16.272-35.595-34.95-35.595zm76.073 21.525c4.954 0 7.761 1.783 10.058 4.41 2.297 2.626 3.46 6.451 3.46 8.312 0 9.074-5.585 14.023-14.008 14.023-7.928 0-13.181-6.374-13.181-13.67 0-7.978 5.897-13.075 13.671-13.075zm-76.073.031c7.939 0 13.396 4.407 13.396 14.039 0 4.811-3.175 12.446-14.237 12.446-7.359 0-12.967-6.086-12.967-13.824 0-4.756 4.215-12.661 13.809-12.661z" fill="#0e79bf"/>
                <path d="M108.507 75.515a5.144 5.144 0 0 0-5.022 6.95c3.621 10.07 10.739 22.708 22.78 33.008 12.042 10.299 29.1 18.08 51.638 18.08 22.136 0 39.275-8.671 51.255-19.336 11.981-10.664 18.974-23.076 21.708-31.935a5.144 5.144 0 1 0-9.828-3.031c-2.035 6.59-8.265 18-18.708 27.298-10.444 9.296-24.944 16.717-44.428 16.717-20.209 0-34.582-6.721-44.962-15.6-10.381-8.878-16.677-20.087-19.765-28.675a5.144 5.144 0 0 0-4.669-3.475z" fill="#e6252b"/>
              </svg>
            </div>
          </div>
        </header>

        {/* Dynamic Sticky Navigation Menu */}
        <div className="oc-tabs-container">
          <div className="oc-tabs-inner">
            <nav className="oc-tabs" aria-label="Opportunity Central sections">
              <button 
                className={activeTab === 'home' ? 'active' : ''} 
                onClick={() => handleTabClick('home')}
              >
                Home
              </button>
              <button 
                className={activeTab === 'documents' ? 'active' : ''} 
                onClick={() => handleTabClick('documents')}
              >
                Documents
              </button>
              <button 
                className={activeTab === 'facilities' ? 'active' : ''} 
                onClick={() => handleTabClick('facilities')}
              >
                Facilities
              </button>
              {/* Commented out as requested
              <button 
                className={activeTab === 'howDoI' ? 'active' : ''} 
                onClick={() => handleTabClick('howDoI')}
              >
                How Do I?
              </button>
              */}
              <button 
                className={activeTab === 'contacts' ? 'active' : ''} 
                onClick={() => handleTabClick('contacts')}
              >
                Who to Contact
              </button>
              <button 
                className={activeTab === 'links' ? 'active' : ''} 
                onClick={() => handleTabClick('links')}
              >
                Useful Links
              </button>
            </nav>
            <div className={`oc-nav-logos ${activeTab !== 'home' ? 'visible' : ''}`}>
              {/* Opportunity Pancakes Logo (Official high-fidelity vector) */}
              <svg viewBox="0 0 201.27 51.58" className="h-8 w-auto opacity-95 shrink-0" xmlns="http://www.w3.org/2000/svg">
                <path d="M26.13,25.45h.99c.68,0,1.43.04,2.03.46.42.31.82.86.82,1.67,0,.64-.26,1.3-.79,1.72-.62.46-1.32.46-1.87.46h-1.17v-4.32ZM23.26,22.98v14.7h2.86v-5.44h1.85c1.7,0,2.91-.48,3.72-1.3,1.12-1.12,1.21-2.71,1.21-3.28,0-1.06-.31-2.49-1.5-3.55-1.08-.95-2.23-1.12-3.88-1.12h-4.28Z" fill="#507148" strokeWidth={0} />
                <path d="M43.84,25.45h.99c.68,0,1.43.04,2.03.46.42.31.82.86.82,1.67,0,.64-.26,1.3-.79,1.72-.62.46-1.32.46-1.87.46h-1.17v-4.32ZM40.98,22.98v14.7h2.86v-5.44h1.85c1.7,0,2.91-.48,3.72-1.3,1.12-1.12,1.21-2.71,1.21-3.28,0-1.06-.31-2.49-1.5-3.55-1.08-.95-2.23-1.12-3.88-1.12h-4.28Z" fill="#507148" strokeWidth={0} />
                <path d="M139.79,37.68v-9.83l8.95,9.83h1.98v-14.7h-2.86v9.81l-8.95-9.81h-1.98v14.7h2.86ZM115.16,22.98v8.99c0,1.39.22,2.8,1.1,3.92,1.06,1.39,2.91,2.12,4.8,2.12s3.75-.73,4.8-2.12c.88-1.12,1.1-2.53,1.1-3.92v-8.99h-2.86v9.23c0,1.12-.37,1.81-.71,2.18-.42.51-1.19,1.01-2.34,1.01s-1.92-.51-2.34-1.01c-.33-.37-.71-1.06-.71-2.18v-9.23h-2.86ZM106.74,25.45v-2.47h-9.48v2.47h3.31v12.23h2.86v-12.23h3.31ZM82.41,25.32h.86c.53,0,2.78.02,2.78,2.2s-2.27,2.23-2.82,2.23h-.82v-4.43ZM79.54,22.98v14.7h2.86v-5.91h.35l3.92,5.91h3.57l-4.58-6.19c.71-.13,1.23-.37,1.61-.64,1.15-.77,1.72-2.03,1.72-3.46,0-1.1-.33-2.36-1.45-3.31-.68-.57-1.72-1.1-3.75-1.1h-4.25Z" fill="#507148" strokeWidth={0} />
                <path d="M192.55,37.68h2.87v-6.72l5.18-7.98h-3.39l-3.15,5.11-3.15-5.11h-3.39l5.05,7.98v6.72ZM180.78,25.45v-2.47h-9.48v2.47h3.31v12.23h2.86v-12.23h3.31ZM160.69,22.98v14.7h2.86v-14.7h-2.86Z" fill="#507148" strokeWidth={0} />
                <path d="M14.17,34.63c-3.23,4.34-9.87,3.99-12.49-.81-2.56-4.62.51-10.48,5.76-10.97,6.31-.64,10.52,6.66,6.73,11.78ZM12.72,33.49c2.63-3.14,1.18-7.99-2.85-9.02-3.84-1.02-7.58,2.35-6.93,6.24.69,4.65,6.76,6.41,9.78,2.78Z" fill="#eeba7d" strokeWidth={0} />
                <path d="M195.88,44.8c-.59-.61-1.28-.68-1.64-.68-1.29,0-1.86.85-1.86,1.7,0,.59.27.91.46,1.08.3.26.66.4.96.5.33.11.68.23.89.43.16.15.23.31.23.52,0,.49-.38.8-.89.8-.41,0-.94-.21-1.22-.77l-.74.7c.3.44.93,1.09,2,1.09,1.2,0,2.02-.77,2.02-1.9,0-.59-.23-.98-.5-1.22-.3-.27-.72-.43-1.17-.58-.36-.13-.56-.2-.7-.33-.14-.12-.18-.25-.18-.39,0-.3.19-.68.8-.68.21,0,.61.04.95.5l.59-.77ZM183.6,44.26h-3.21v5.79h3.21v-.97h-2.09v-1.58h2v-.97h-2v-1.29h2.09v-.97ZM168.24,44.26h-1.13v5.79h1.13v-2.47l.13-.13,2.06,2.6h1.49l-2.58-3.12,2.45-2.68h-1.42l-2.13,2.45v-2.45ZM154.97,47.91l.83-2.09.83,2.09h-1.65ZM157.46,50.05h1.22l-2.42-5.79h-.89l-2.49,5.79h1.23l.51-1.22h2.34l.51,1.22ZM144.73,48.52c-.34.4-.82.63-1.36.63-.97,0-1.96-.69-1.96-1.98,0-1.07.76-2.02,1.92-2.02.21,0,.87.04,1.4.65v-1.32c-.53-.29-1.02-.36-1.42-.36-.83,0-1.55.22-2.13.76-.5.46-.93,1.22-.93,2.27,0,.85.26,1.57.93,2.22.49.46,1.1.81,2.12.81.63,0,1.09-.16,1.43-.34v-1.32ZM127.14,50.05v-3.87l3.53,3.87h.78v-5.79h-1.13v3.87l-3.53-3.87h-.78v5.79h1.13ZM113.88,47.91l.83-2.09.83,2.09h-1.65ZM116.37,50.05h1.22l-2.42-5.79h-.89l-2.49,5.79h1.23l.51-1.22h2.34l.51,1.22ZM101.69,45.23h.39c.27,0,.56.02.8.18.17.12.32.34.32.66,0,.25-.1.51-.31.68-.24.18-.52.18-.74.18h-.46v-1.7ZM100.56,44.26v5.79h1.13v-2.15h.73c.67,0,1.15-.19,1.47-.51.44-.44.48-1.07.48-1.29,0-.42-.12-.98-.59-1.4-.43-.37-.88-.44-1.53-.44h-1.69Z" fill="#57475f" strokeWidth={0} />
                <path d="M26.11,9.17c1.7,2.69,2.58,7.19-.35,9.39-3.14,1.97-6.95-.64-8.83-3.2-1.99-2.66-3.15-7.13-.29-9.63.69-.59,1.6-.93,2.5-.98,3-.17,5.49,2.13,6.97,4.43ZM24.67,10.14c-1.21-1.61-2.97-2.97-4.94-3.09-1.15-.05-2.01.49-2.4,1.59-.99,3.15,1.24,7.13,4,8.74,1.81,1.07,4.21.94,4.89-1.32.59-2.05-.37-4.24-1.55-5.92Z" fill="#eeba7d" strokeWidth={0} />
                <path d="M59.36,17.3c-3.12,1.61-8.24,2.38-10.18-1.37-.88-1.91-.08-4.17,1.18-5.64,2.28-2.65,5.85-4.16,9.33-4,2.99.12,5.57,2.09,4.76,5.32-.7,2.56-2.81,4.51-5.1,5.7ZM58.62,15.72c1.97-.88,4.03-2.29,4.71-4.43.7-2.45-1.48-3.72-3.68-3.67-3.34.05-7.53,2.43-8.48,5.72-.53,2.06,1.39,3.01,3.17,3.12,1.4.12,2.9-.18,4.28-.76Z" fill="#eeba7d" strokeWidth={0} />
                <path d="M65.42,22.3c2.36,0,4.77.2,6.84,1.5,1.4.88,2.12,2.63,1.01,4.07-.82,1.06-2.1,1.56-3.28,1.89-1.5.39-3.03.49-4.57.48-1.53-.02-3.04-.2-4.52-.64-1.72-.47-4.23-1.88-3.48-4.05,1.1-2.61,5.51-3.21,8-3.25ZM65.42,23.71c-1.4-.01-2.82.14-4.13.55-3.53,1.15-3.52,2.95-.02,4.16,2.63.83,5.67.8,8.24-.16.87-.34,1.74-.76,2.27-1.47.44-.6-.07-1.11-.58-1.5-1.63-1.13-3.77-1.53-5.78-1.59Z" fill="#eeba7d" strokeWidth={0} />
                <path d="M42.59,9.16c-.52,1.96-1.1,3.96-2.36,5.65-.86,1.2-2.57,2.07-3.74.66-1.91-2.64.44-9.04,1.92-11.61.63-1.05,1.32-2.28,2.55-2.77.81-.3,1.59.26,1.84,1.02.38,1.02.37,2.08.35,3.12-.04,1.34-.24,2.65-.56,3.94ZM40.89,8.67c.38-1.16.71-2.36.88-3.56.11-.85.18-1.77-.1-2.56-.05-.14-.13-.28-.23-.33-.37.07-.64.43-.9.74-1.67,2.39-2.38,5.73-2.56,8.6-.01.83-.05,1.75.29,2.43,0,0-.07-.08-.19-.12-.12-.04-.22-.01-.23,0,.63-.42,1.09-1.2,1.53-1.9.6-1.02,1.11-2.14,1.49-3.3Z" fill="#eeba7d" strokeWidth={0} />
                <path d="M70.06,28.91c1.02,1.02.3,2.16-2.2,2.97-1.31.41-2.73.57-4.13.55-2.01-.06-4.15-.45-5.78-1.59-.51-.39-1.02-.9-.58-1.5.42-.56,1.06-.95,1.74-1.25-.57-.39-.95-.85-1.1-1.33-.81.32-1.57.78-2.13,1.51-1.11,1.44-.39,3.19,1.01,4.07,2.07,1.3,4.48,1.5,6.84,1.5,2.49-.04,6.9-.64,8-3.25.31-.88.07-1.63-.42-2.25-.37.21-.79.4-1.25.56Z" fill="#eeba7d" strokeWidth={0} />
                <path d="M72.97,29.39c-.82-.52-1.7-.86-2.61-1.08.54.46.84.98.84,1.53,0,.19-.04.38-.11.57.29.15.56.31.82.49.51.39,1.02.9.58,1.5-.53.71-1.39,1.13-2.27,1.47-2.57.96-5.61,1-8.24.16-1.22-.42-2.01-.91-2.39-1.43-.6-.18-1.14-.39-1.6-.64.03,1.71,2.12,2.84,3.62,3.24,1.47.44,2.99.62,4.52.64,1.53.02,3.06-.09,4.57-.48,1.18-.33,2.46-.83,3.28-1.89,1.11-1.44.39-3.19-1.01-4.07Z" fill="#eeba7d" strokeWidth={0} />
                <path d="M71.79,34.06c.44.9-.39,1.83-2.53,2.53-1.31.41-2.73.57-4.13.55-2.01-.06-4.15-.45-5.78-1.59-.51-.39-1.02-.9-.58-1.5.19-.26.43-.47.69-.66-.51-.45-.8-.95-.8-1.49,0-.03,0-.05,0-.08-.52.29-1,.66-1.38,1.15-1.11,1.44-.39,3.19,1.01,4.07,2.07,1.3,4.48,1.5,6.84,1.5,2.49-.04,6.9-.64,8-3.25.26-.76.13-1.43-.24-2-.29.27-.66.53-1.1.75Z" fill="#eeba7d" strokeWidth={0} />
              </svg>
              {/* IHOP Logo (Official vector logo) */}
              <div className="border-l border-slate-200 pl-4 h-8 flex items-center shrink-0">
                <svg viewBox="1.388 0.5745872512184533 250.31540369784324 132.97841274878155" className="h-6 w-auto opacity-95 shrink-0 select-none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.874 1.619A10.656 10.656 0 0 0 1.388 12.412v48.652a10.656 10.656 0 1 0 21.31 0V12.412A10.656 10.656 0 0 0 11.875 1.618zm30.88.266a10.784 10.784 0 0 0-7.473 3.229 10.786 10.786 0 0 0-3.013 7.564v48.2a10.786 10.786 0 0 0 3.067 7.632c1.976 2.005 4.773 3.175 7.588 3.175s5.612-1.17 7.589-3.175a10.787 10.787 0 0 0 3.067-7.632V45.152h21.453v15.726A10.786 10.786 0 0 0 78.1 68.51c1.977 2.005 4.774 3.175 7.589 3.175s5.611-1.17 7.588-3.175a10.788 10.788 0 0 0 3.067-7.632v-48.2c.04-2.84-1.117-5.677-3.127-7.683a10.792 10.792 0 0 0-7.693-3.11 10.784 10.784 0 0 0-7.474 3.23 10.786 10.786 0 0 0-3.013 7.564V26.8H53.584V12.679a10.795 10.795 0 0 0-3.132-7.684 10.788 10.788 0 0 0-7.693-3.11zm172.443.024c-18.27 0-34.48 14.355-35.165 33.39a10.779 10.779 0 0 0-.061 1.24v51.073a10.779 10.779 0 1 0 21.555 0V69.103a33.896 33.896 0 0 0 13.181 2.664c19.132 0 35.563-15.609 35.563-35.58 0-7.92-2.948-15.825-8.788-22.504-5.842-6.679-15.19-11.773-26.287-11.773zm-76.073.031c-21.324 0-35.364 17.33-35.364 34.218 0 18.893 15.07 35.38 34.522 35.38 22.041 0 35.792-17.676 35.792-34.003 0-20.122-16.272-35.595-34.95-35.595zm76.073 21.525c4.954 0 7.761 1.783 10.058 4.41 2.297 2.626 3.46 6.451 3.46 8.312 0 9.074-5.585 14.023-14.008 14.023-7.928 0-13.181-6.374-13.181-13.67 0-7.978 5.897-13.075 13.671-13.075zm-76.073.031c7.939 0 13.396 4.407 13.396 14.039 0 4.811-3.175 12.446-14.237 12.446-7.359 0-12.967-6.086-12.967-13.824 0-4.756 4.215-12.661 13.809-12.661z" fill="#0e79bf"/>
                  <path d="M108.507 75.515a5.144 5.144 0 0 0-5.022 6.95c3.621 10.07 10.739 22.708 22.78 33.008 12.042 10.299 29.1 18.08 51.638 18.08 22.136 0 39.275-8.671 51.255-19.336 11.981-10.664 18.974-23.076 21.708-31.935a5.144 5.144 0 1 0-9.828-3.031c-2.035 6.59-8.265 18-18.708 27.298-10.444 9.296-24.944 16.717-44.428 16.717-20.209 0-34.582-6.721-44.962-15.6-10.381-8.878-16.677-20.087-19.765-28.675a5.144 5.144 0 0 0-4.669-3.475z" fill="#e6252b"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Block */}
        <section id="home" ref={sectionRefs.home} className="oc-welcome">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 w-full">
            <div className="flex items-start gap-3">
              <div className="oc-info-icon shrink-0" aria-hidden="true">i</div>
              <p className="text-sm m-0" style={{ color: '#3b5c38', fontWeight: 500, lineHeight: '1.5' }}>
                <strong style={{ color: 'var(--oc-green-dark)', fontWeight: 800 }}>Welcome to Opportunity Central:</strong> Your single point of access for all operational templates, checklists, and contact rules. Use the search below to open forms or navigate directly to required documents.
              </p>
            </div>
            {/* Syrup Assistant temporarily commented out for launch:
            <button
              type="button"
              onClick={() => setChatbotOpen(true)}
              className="shrink-0 px-3.5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold text-xs inline-flex items-center gap-2 shadow-xs transition-all cursor-pointer border border-emerald-700/80 hover:scale-[1.02]"
              title="Ask Syrup questions about store procedures"
            >
              <SyrupAvatar size={20} />
              <span>Ask Syrup</span>
            </button>
            */}
          </div>
        </section>

        {/* Documents Panel */}
        <section id="documents" ref={sectionRefs.documents} className="oc-panel oc-documents">
          <div className="oc-section-heading">
            <span className="oc-icon" aria-hidden="true">
              <Layers size={20} className="text-emerald-700" />
            </span>
            <div>
              <h2>Operational Documents &amp; Forms</h2>
              <p>Click any document to view options, edit, or download the template.</p>
            </div>
          </div>

          {/* Interactive Search & Filter Controls */}
          <div className="oc-search-filter-bar">
            <div className="oc-search-wrapper">
              <Search size={18} className="oc-search-icon" />
              <input 
                type="text" 
                placeholder="Search documents by title or keyword..." 
                className="oc-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="oc-category-tabs">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`oc-category-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Cards with beautiful enter animations */}
          <div className="oc-card-grid">
            <AnimatePresence>
              {filteredDocs.length > 0 ? (
                filteredDocs.map((doc, idx) => {
                  const IconComponent = doc.icon;
                  return (
                    <motion.article 
                      key={doc.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { duration: 0.25, delay: idx * 0.03 } }}
                      exit={{ opacity: 0 }}
                      className={`oc-doc-card card-${doc.bandClass}`}
                    >
                      <div className="oc-card-header-row">
                        <div className={`oc-card-icon-wrapper ${doc.bandClass}`}>
                          <IconComponent size={20} className="stroke-[2.5]" />
                        </div>
                        <span className="oc-card-format-badge">{doc.format}</span>
                      </div>
                      <div className="oc-card-title-container mb-2">
                        <h3>{doc.title}</h3>
                      </div>
                      <p className="oc-card-description">{doc.description}</p>
                      
                      {doc.hasVariants ? (
                        <button
                          type="button"
                          onClick={() => {
                            setWorkersCompModalOpen(true);
                            setSelectedStateIndex(0);
                          }}
                          className="oc-open-button w-full inline-flex items-center justify-center gap-2 font-medium cursor-pointer shadow-xs"
                        >
                          <Layers size={15} />
                          <span>Select State &amp; View Forms</span>
                        </button>
                      ) : (
                        <a 
                          className="oc-open-button" 
                          href={doc.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <ExternalLink size={15} />
                          Open Form
                        </a>
                      )}
                    </motion.article>
                  );
                })
              ) : (
                <div className="oc-empty-state">
                  <AlertCircle size={36} className="text-slate-400 mb-2" />
                  <h4>No documents found</h4>
                  <p>Try refining your search term or selection.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Facilities Section */}
        <section id="facilities" ref={sectionRefs.facilities} className="oc-panel">
          <div className="oc-section-heading">
            <span className="oc-icon" aria-hidden="true">
              <Wrench size={20} className="text-emerald-700" />
            </span>
            <div>
              <h2>Facilities Requests</h2>
              <p>Submit IT assistance or maintenance requests directly to support teams.</p>
            </div>
          </div>

          <div className="oc-card-grid">
            {/* IT Request Card */}
            <article className="oc-doc-card card-purple">
              <div className="oc-card-header-row">
                <div className="oc-card-icon-wrapper purple">
                  <Monitor size={20} className="stroke-[2.5]" />
                </div>
                <span className="oc-card-format-badge">SYSTEM</span>
              </div>
              <div className="oc-card-title-container mb-2">
                <h3>IT Request</h3>
              </div>
              <p className="oc-card-description">
                Submit a ticket for POS terminals, printers, network, back office PCs, and connectivity issues.
              </p>
              <div className="oc-open-button coming-soon">
                <Sparkles size={14} className="text-amber-400 animate-pulse" />
                Coming Soon
              </div>
            </article>

            {/* Maintenance Request Card */}
            <article className="oc-doc-card card-orange">
              <div className="oc-card-header-row">
                <div className="oc-card-icon-wrapper orange">
                  <Wrench size={20} className="stroke-[2.5]" />
                </div>
                <span className="oc-card-format-badge">SYSTEM</span>
              </div>
              <div className="oc-card-title-container mb-2">
                <h3>Maintenance Request</h3>
              </div>
              <p className="oc-card-description">
                Report issues with HVAC, plumbing, lighting, refrigeration, kitchen equipment, and structural repairs.
              </p>
              <div className="oc-open-button coming-soon">
                <Sparkles size={14} className="text-amber-400 animate-pulse" />
                Coming Soon
              </div>
            </article>
          </div>
        </section>

        {/* How Do I? Section - Commented out as requested
        <section id="howDoI" ref={sectionRefs.howDoI} className="oc-panel">
          <div className="oc-section-heading">
            <span className="oc-icon" aria-hidden="true">
              <HelpCircle size={20} className="text-emerald-700" />
            </span>
            <div>
              <h2>How Do I?</h2>
              <p>Quick reference procedures and interactive guides for daily operational tasks.</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-6">
            // Accordion Item 1: Cash Reallocation
            <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
              <button
                type="button"
                onClick={() => setExpandedHowTo(expandedHowTo === 'cash-reallocation' ? null : 'cash-reallocation')}
                className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer text-left border-none"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                    <Coins size={16} />
                  </div>
                  <div>
                    <h3 className="m-0 text-sm font-bold text-slate-800">Cash Reallocation</h3>
                    <p className="m-0 text-xs text-slate-500 font-normal">Step-by-step flow for transferring cash surplus between stores.</p>
                  </div>
                </div>
                <div className="text-slate-400">
                  {expandedHowTo === 'cash-reallocation' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {expandedHowTo === 'cash-reallocation' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 border-t border-slate-200 bg-white">
                      <div className="flex flex-col gap-5">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0 w-7 h-7 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center justify-center border border-emerald-200">1</div>
                          <div>
                            <h4 className="m-0 text-xs font-bold uppercase tracking-wider text-slate-700">Identify Stores for Reallocation</h4>
                            <p className="m-0 mt-1 text-xs text-slate-600 leading-relaxed">
                              Determine which store has a cash surplus (e.g., store #1234) and which store has a cash deficit (e.g., store #7890). Ensure that the surplus store has enough excess cash to cover the deficit of the other store.
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <div className="flex-shrink-0 w-7 h-7 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center justify-center border border-emerald-200">2</div>
                          <div>
                            <h4 className="m-0 text-xs font-bold uppercase tracking-wider text-slate-700">Pull Cash from Surplus Store</h4>
                            <p className="m-0 mt-1 text-xs text-slate-600 leading-relaxed">
                              Only an <b>Above Restaurant Leader (ARL)</b> should physically remove the required amount of cash from the surplus store, ensuring all cash handling procedures are followed to maintain security and accuracy.
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <div className="flex-shrink-0 w-7 h-7 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center justify-center border border-emerald-200">3</div>
                          <div>
                            <h4 className="m-0 text-xs font-bold uppercase tracking-wider text-slate-700">Record Transaction in Surplus Store's Tray</h4>
                            <p className="m-0 mt-1 text-xs text-slate-600 leading-relaxed">
                              In the Tray POS of the surplus store, enter the transaction as a <b>paid out</b>. Use the exact description: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-rose-600 font-mono text-[11px]">“Reallocation of cash to [cash short store #]”</code>. This documents where the cash went and creates a clean, clear audit trail.
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <div className="flex-shrink-0 w-7 h-7 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center justify-center border border-emerald-200">4</div>
                          <div>
                            <h4 className="m-0 text-xs font-bold uppercase tracking-wider text-slate-700">Transfer Cash to Deficit Store</h4>
                            <p className="m-0 mt-1 text-xs text-slate-600 leading-relaxed">
                              Transport the cash securely to the store experiencing a shortfall. Follow all safety and transport security protocols during this transfer.
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <div className="flex-shrink-0 w-7 h-7 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center justify-center border border-emerald-200">5</div>
                          <div>
                            <h4 className="m-0 text-xs font-bold uppercase tracking-wider text-slate-700">Record Transaction in Cash Short Store's Tray</h4>
                            <p className="m-0 mt-1 text-xs text-slate-600 leading-relaxed">
                              Immediately upon arrival to the deficit store, in the Tray POS of the cash deficit store, enter the transaction as a <b>paid in</b>. Use the exact description: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-emerald-700 font-mono text-[11px]">“Reallocation of cash from [cash surplus store]”</code>. This entry documents the receipt of the cash and immediately updates the store's cash balance.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            // Accordion Item 2: Deposits
            <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
              <button
                type="button"
                onClick={() => setExpandedHowTo(expandedHowTo === 'deposits' ? null : 'deposits')}
                className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer text-left border-none"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                    <Wallet size={16} />
                  </div>
                  <div>
                    <h3 className="m-0 text-sm font-bold text-slate-800">Daily Safe Drops &amp; Bank Deposits</h3>
                    <p className="m-0 text-xs text-slate-500 font-normal">Preparation and secure validation procedures for cash assets.</p>
                  </div>
                </div>
                <div className="text-slate-400">
                  {expandedHowTo === 'deposits' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {expandedHowTo === 'deposits' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 border-t border-slate-200 bg-white">
                      <div className="flex flex-col gap-4 text-xs text-slate-600 leading-relaxed">
                        <p className="m-0">Follow this protocol strictly for daily deposits to ensure transparency and prevent discrepancies:</p>
                        <ul className="m-0 pl-5 flex flex-col gap-2 list-disc">
                          <li><b>Prepare the Deposit Slip:</b> Count the cash drawer or smart safe total and match it with the POS End-of-Day report. Fill out the bank deposit slip with the exact breakdown of bills and coins.</li>
                          <li><b>Safe Drop Entry:</b> Log the safe drop in the Tray POS system under "Safe Management". Always include the uniquely numbered deposit bag ID in the memo line for validation.</li>
                          <li><b>Armored Car / Safe Transport:</b> Store the prepared deposit bag in the smart safe or schedule secure transport to the bank. Ensure dual-custody verification is completed before handover.</li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            // Accordion Item 3: Paid Outs
            <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
              <button
                type="button"
                onClick={() => setExpandedHowTo(expandedHowTo === 'paid-outs' ? null : 'paid-outs')}
                className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer text-left border-none"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                    <FileText size={16} />
                  </div>
                  <div>
                    <h3 className="m-0 text-sm font-bold text-slate-800">Petty Cash &amp; Local Paid Outs</h3>
                    <p className="m-0 text-xs text-slate-500 font-normal">Approval rules and logging requirements for local store purchases.</p>
                  </div>
                </div>
                <div className="text-slate-400">
                  {expandedHowTo === 'paid-outs' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {expandedHowTo === 'paid-outs' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 border-t border-slate-200 bg-white">
                      <div className="flex flex-col gap-4 text-xs text-slate-600 leading-relaxed">
                        <p className="m-0">All local petty cash disbursements must adhere to the following audit criteria:</p>
                        <ul className="m-0 pl-5 flex flex-col gap-2 list-disc">
                          <li><b>Pre-Approval Requirement:</b> Verify the purchase is pre-approved by the Store Manager or Above Restaurant Leader (ARL). Retain physical, itemized receipts for all transactions.</li>
                          <li><b>POS Log Entry:</b> Under the cashier terminal, select "Paid Out". Choose the appropriate account category (e.g., Maintenance, Supplies, Guest Recovery).</li>
                          <li><b>Description &amp; Validation:</b> In the memo/description field, type a concise reason (e.g., "Emergency hardware - sink seal repair"). Submit the receipt image or file the receipt in the daily envelope.</li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
        */}

        {/* Invoice Submissions and Incident Reports Bottom Grid */}
        {/* Who to Contact & Submissions Section */}
        <section id="contacts" ref={sectionRefs.contacts} className="oc-panel">
          <div className="oc-section-heading">
            <span className="oc-icon" aria-hidden="true">
              <Users size={20} className="text-emerald-700" />
            </span>
            <div>
              <h2>Who to Contact &amp; Submissions</h2>
              <p>Rules and contact directory for financial filings, guest incident reports, and general store inquiries.</p>
            </div>
          </div>

          {/* Financial & Invoice Submissions Sub-heading */}
          <div className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2 border-b border-slate-200 pb-2">
              <FileCode size={18} className="text-emerald-700" />
              Financial &amp; Invoice Submissions
            </h3>
            
            <aside className="oc-warning">
              <strong>
                <AlertTriangle size={18} />
                CRITICAL FINANCIAL SEPARATION RULE
              </strong>
              <p><b>Paid Outs are NOT invoices.</b> Do NOT combine AP invoices with POS Paid Out reports. Submit each item separately to the appropriate email address listed below.</p>
            </aside>
          </div>

          {/* Financial Cards Grid */}
          <div className="oc-card-grid mb-10">
            {/* POS Paid Outs Card */}
            <article className="oc-doc-card card-orange">
              <div className="oc-card-header-row">
                <div className="oc-card-icon-wrapper orange">
                  <Receipt size={20} className="stroke-[2.5]" />
                </div>
                <span className="oc-card-format-badge">SUBMISSION</span>
              </div>
              <div className="oc-card-title-container mb-2">
                <h3>POS Paid Outs</h3>
              </div>
              <p className="oc-card-description">
                Already posted in the POS. Send all receipts and supporting documentation for posted store paid outs.
              </p>
              <div className="mt-auto pt-3 border-t border-slate-100 flex flex-col gap-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Submit To Email:</div>
                <button
                  type="button"
                  onClick={() => handleCopyEmail('OFA-FPORG@bdo.com')}
                  className="oc-contact-email-btn"
                  title="Click to copy email address"
                >
                  <Mail size={15} className="shrink-0 text-blue-500" />
                  <span>OFA-FPORG@bdo.com</span>
                  {copiedEmail === 'OFA-FPORG@bdo.com' ? (
                    <Check size={14} className="text-green-600 shrink-0 ml-auto" />
                  ) : (
                    <Copy size={13} className="text-slate-400 opacity-60 shrink-0 ml-auto" />
                  )}
                </button>
              </div>
            </article>

            {/* AP Invoices Card */}
            <article className="oc-doc-card card-purple">
              <div className="oc-card-header-row">
                <div className="oc-card-icon-wrapper purple">
                  <CreditCard size={20} className="stroke-[2.5]" />
                </div>
                <span className="oc-card-format-badge">SUBMISSION</span>
              </div>
              <div className="oc-card-title-container mb-2">
                <h3>AP Invoices</h3>
              </div>
              <p className="oc-card-description">
                Accounts Payable. Send all vendor invoices, food &amp; supply statements requiring company payment.
              </p>
              <div className="mt-auto pt-3 border-t border-slate-100 flex flex-col gap-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Submit To Email:</div>
                <button
                  type="button"
                  onClick={() => handleCopyEmail('OFA-AP-ORG@bdo.com')}
                  className="oc-contact-email-btn"
                  title="Click to copy email address"
                >
                  <Mail size={15} className="shrink-0 text-blue-500" />
                  <span>OFA-AP-ORG@bdo.com</span>
                  {copiedEmail === 'OFA-AP-ORG@bdo.com' ? (
                    <Check size={14} className="text-green-600 shrink-0 ml-auto" />
                  ) : (
                    <Copy size={13} className="text-slate-400 opacity-60 shrink-0 ml-auto" />
                  )}
                </button>
              </div>
            </article>

            {/* Payroll Documentation Card */}
            <article className="oc-doc-card card-blue">
              <div className="oc-card-header-row">
                <div className="oc-card-icon-wrapper blue">
                  <DollarSign size={20} className="stroke-[2.5]" />
                </div>
                <span className="oc-card-format-badge">SUBMISSION</span>
              </div>
              <div className="oc-card-title-container mb-2">
                <h3>Payroll Submissions</h3>
              </div>
              <p className="oc-card-description">
                Payroll inquiries, tip/hours adjustments, payroll documentation, and timesheet corrections.
              </p>
              <div className="mt-auto pt-3 border-t border-slate-100 flex flex-col gap-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Submit To Email:</div>
                <button
                  type="button"
                  onClick={() => handleCopyEmail('OFA-PR-ORG@bdo.com')}
                  className="oc-contact-email-btn"
                  title="Click to copy email address"
                >
                  <Mail size={15} className="shrink-0 text-blue-500" />
                  <span>OFA-PR-ORG@bdo.com</span>
                  {copiedEmail === 'OFA-PR-ORG@bdo.com' ? (
                    <Check size={14} className="text-green-600 shrink-0 ml-auto" />
                  ) : (
                    <Copy size={13} className="text-slate-400 opacity-60 shrink-0 ml-auto" />
                  )}
                </button>
              </div>
            </article>
          </div>

          {/* Operational & Support Contacts Sub-heading */}
          <div className="mb-6 pt-6 border-t border-slate-200">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-2">
              <Users size={18} className="text-emerald-700" />
              Operational &amp; Support Contact Directory
            </h3>
            <p className="text-xs text-slate-500 m-0">
              Reach out directly to designated department leads and insurance administrators for store matters.
            </p>
          </div>

          {/* Directory Cards Grid */}
          <div className="oc-card-grid mb-6">
            {/* 1. Payroll Inquiries Card */}
            <article className="oc-doc-card card-blue">
              <div className="oc-card-header-row">
                <div className="oc-card-icon-wrapper blue">
                  <Clock size={20} className="stroke-[2.5]" />
                </div>
                <span className="oc-card-format-badge">PAYROLL</span>
              </div>
              <div className="oc-card-title-container mb-2">
                <h3>Payroll Questions</h3>
              </div>
              <p className="oc-card-description">
                Paycheck discrepancies, direct deposit setup, tax withholding, garnishments, password resets, and ProLiant access.
              </p>
              <div className="mt-auto pt-3 border-t border-slate-100 flex flex-col gap-2.5">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Primary Contact:</div>
                  <button
                    type="button"
                    onClick={() => handleCopyEmail('OFA-PR-ORG@bdo.com')}
                    className="oc-contact-email-btn w-full"
                    title="Click to copy email address"
                  >
                    <Mail size={14} className="shrink-0 text-blue-500" />
                    <span>OFA-PR-ORG@bdo.com</span>
                    {copiedEmail === 'OFA-PR-ORG@bdo.com' ? (
                      <Check size={14} className="text-green-600 shrink-0 ml-auto" />
                    ) : (
                      <Copy size={12} className="text-slate-400 opacity-60 shrink-0 ml-auto" />
                    )}
                  </button>
                </div>
                <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded border border-slate-200/70 flex items-center justify-between">
                  <span className="font-semibold text-slate-500">Cc HR:</span>
                  <button
                    type="button"
                    onClick={() => handleCopyEmail('tmaltese@opportunityrestaurantgroup.com')}
                    className="text-blue-600 hover:underline inline-flex items-center gap-1 font-medium bg-transparent border-none p-0 cursor-pointer text-[11px]"
                    title="Click to copy HR email"
                  >
                    <span>tmaltese@opportunityrestaurantgroup.com</span>
                    {copiedEmail === 'tmaltese@opportunityrestaurantgroup.com' ? (
                      <Check size={11} className="text-green-600 shrink-0" />
                    ) : (
                      <Copy size={10} className="text-slate-400 opacity-60 shrink-0" />
                    )}
                  </button>
                </div>
              </div>
            </article>

            {/* 2. Workers' Compensation Card */}
            <article className="oc-doc-card card-green">
              <div className="oc-card-header-row">
                <div className="oc-card-icon-wrapper green">
                  <ShieldCheck size={20} className="stroke-[2.5]" />
                </div>
                <span className="oc-card-format-badge">WORKERS' COMP</span>
              </div>
              <div className="oc-card-title-container mb-2">
                <h3>Select First Insurance</h3>
              </div>
              <p className="oc-card-description">
                Work-related injury or illness, incident reporting, claim status, clinic authorizations, or WC documentation.
              </p>
              <div className="mt-auto pt-3 border-t border-slate-100 flex flex-col gap-2.5">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Primary Contacts:</div>
                  <div className="flex flex-col gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleCopyEmail('hani@selectfirstinsurance.com')}
                      className="oc-contact-email-btn w-full"
                      title="Click to copy email address"
                    >
                      <Mail size={14} className="shrink-0 text-blue-500" />
                      <span>Hani: hani@selectfirstinsurance.com</span>
                      {copiedEmail === 'hani@selectfirstinsurance.com' ? (
                        <Check size={14} className="text-green-600 shrink-0 ml-auto" />
                      ) : (
                        <Copy size={12} className="text-slate-400 opacity-60 shrink-0 ml-auto" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCopyEmail('DSalazar@selectfirstinsurance.com')}
                      className="oc-contact-email-btn w-full"
                      title="Click to copy email address"
                    >
                      <Mail size={14} className="shrink-0 text-blue-500" />
                      <span>Daniel Salazar: DSalazar@selectfirstinsurance.com</span>
                      {copiedEmail === 'DSalazar@selectfirstinsurance.com' ? (
                        <Check size={14} className="text-green-600 shrink-0 ml-auto" />
                      ) : (
                        <Copy size={12} className="text-slate-400 opacity-60 shrink-0 ml-auto" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded border border-slate-200/70 flex items-center justify-between">
                  <span className="font-semibold text-slate-500">Cc HR:</span>
                  <button
                    type="button"
                    onClick={() => handleCopyEmail('tmaltese@opportunityrestaurantgroup.com')}
                    className="text-blue-600 hover:underline inline-flex items-center gap-1 font-medium bg-transparent border-none p-0 cursor-pointer text-[11px]"
                    title="Click to copy HR email"
                  >
                    <span>tmaltese@opportunityrestaurantgroup.com</span>
                    {copiedEmail === 'tmaltese@opportunityrestaurantgroup.com' ? (
                      <Check size={11} className="text-green-600 shrink-0" />
                    ) : (
                      <Copy size={10} className="text-slate-400 opacity-60 shrink-0" />
                    )}
                  </button>
                </div>
              </div>
            </article>

            {/* 3. HR Inquiries Card */}
            <article className="oc-doc-card card-purple">
              <div className="oc-card-header-row">
                <div className="oc-card-icon-wrapper purple">
                  <Users size={20} className="stroke-[2.5]" />
                </div>
                <span className="oc-card-format-badge">HR SUPPORT</span>
              </div>
              <div className="oc-card-title-container mb-2">
                <h3>HR Requests &amp; Inquiries</h3>
              </div>
              <p className="oc-card-description">
                Employee relations concerns, policy questions, handbook guidance, leaves of absence, and general HR inquiries.
              </p>
              <div className="mt-auto pt-3 border-t border-slate-100 flex flex-col gap-2.5">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Primary HR Lead:</div>
                  <button
                    type="button"
                    onClick={() => handleCopyEmail('tmaltese@opportunityrestaurantgroup.com')}
                    className="oc-contact-email-btn w-full"
                    title="Click to copy email address"
                  >
                    <Mail size={14} className="shrink-0 text-blue-500" />
                    <span>Taylor Maltese: tmaltese@opportunityrestaurantgroup.com</span>
                    {copiedEmail === 'tmaltese@opportunityrestaurantgroup.com' ? (
                      <Check size={14} className="text-green-600 shrink-0 ml-auto" />
                    ) : (
                      <Copy size={12} className="text-slate-400 opacity-60 shrink-0 ml-auto" />
                    )}
                  </button>
                </div>
                <div className="text-[11px] text-slate-400 italic py-1">
                  Direct submission &bull; No CC required
                </div>
              </div>
            </article>

            {/* 4. Guest Reports Card */}
            <article className="oc-doc-card card-crimson">
              <div className="oc-card-header-row">
                <div className="oc-card-icon-wrapper crimson">
                  <AlertOctagon size={20} className="stroke-[2.5]" />
                </div>
                <span className="oc-card-format-badge">INCIDENTS</span>
              </div>
              <div className="oc-card-title-container mb-2">
                <h3>Guest Incident Reports</h3>
              </div>
              <p className="oc-card-description">
                Guest/customer incidents, slip-and-falls, property damage, or accidents on premises — submit completed form.
              </p>
              <div className="mt-auto pt-3 border-t border-slate-100 flex flex-col gap-2.5">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Primary Adjuster:</div>
                  <button
                    type="button"
                    onClick={() => handleCopyEmail('Jim_doran@ajg.com')}
                    className="oc-contact-email-btn w-full"
                    title="Click to copy email address"
                  >
                    <Mail size={14} className="shrink-0 text-blue-500" />
                    <span>Jim Doran (EPL): Jim_doran@ajg.com</span>
                    {copiedEmail === 'Jim_doran@ajg.com' ? (
                      <Check size={14} className="text-green-600 shrink-0 ml-auto" />
                    ) : (
                      <Copy size={12} className="text-slate-400 opacity-60 shrink-0 ml-auto" />
                    )}
                  </button>
                </div>
                <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded border border-slate-200/70 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-500">Cc HR:</span>
                    <button
                      type="button"
                      onClick={() => handleCopyEmail('tmaltese@opportunityrestaurantgroup.com')}
                      className="text-blue-600 hover:underline inline-flex items-center gap-1 font-medium bg-transparent border-none p-0 cursor-pointer text-[11px]"
                      title="Click to copy HR email"
                    >
                      <span>tmaltese</span>
                      {copiedEmail === 'tmaltese@opportunityrestaurantgroup.com' ? (
                        <Check size={11} className="text-green-600 shrink-0" />
                      ) : (
                        <Copy size={10} className="text-slate-400 opacity-60 shrink-0" />
                      )}
                    </button>
                  </div>
                  <div className="text-[10px] text-slate-500">
                    + Always Cc your District Manager
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Section guidance note */}
          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-2.5 text-xs text-slate-600 italic">
            <Info size={16} className="text-emerald-700 shrink-0 mt-0.5 not-italic" />
            <span>
              <strong>Note:</strong> Use the primary contact above for the topic of your email. If your inquiry spans multiple topics (e.g. employee injury and leave of absence), include all relevant departmental contacts on the thread.
            </span>
          </div>
        </section>

        {/* Useful Links & Tools Section */}
        <section id="links" ref={sectionRefs.links} className="oc-panel">
          <div className="oc-section-heading">
            <span className="oc-icon" aria-hidden="true">
              <ExternalLink size={20} className="text-emerald-700" />
            </span>
            <div>
              <h2>Useful Links &amp; Tools</h2>
              <p>Quick access to internal helper apps, calculators, and operational resource platforms.</p>
            </div>
          </div>

          <div className="oc-card-grid">
            <article className="oc-doc-card card-forest">
              <div className="oc-card-header-row">
                <div className="oc-card-icon-wrapper forest">
                  <Sparkles size={20} className="stroke-[2.5]" />
                </div>
                <span className="oc-card-format-badge">TOOL</span>
              </div>
              <div className="oc-card-title-container mb-2">
                <h3 className="flex items-center gap-2">
                  Catering Calculator
                  <ArrowUpRight size={16} className="text-emerald-600 shrink-0" />
                </h3>
              </div>
              <p className="oc-card-description">
                Our official calculator for streamlining catering quotes, portion sizes, and customized pricing setup for store catering orders.
              </p>
              <a 
                href="https://cateringcalculator.streamlit.app" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="oc-open-button"
              >
                Launch Calculator
                <ExternalLink size={14} className="ml-1" />
              </a>
            </article>
          </div>
        </section>

        {/* Footer */}
        <footer className="oc-footer">
          <div>© 2026 Lumps Are Good</div>
          <div className="text-xs text-slate-400 font-normal">We ❤️ You &bull; But You've Reached The End</div>
        </footer>

        {/* Floating Interactive Toast Feedback */}
        <AnimatePresence>
          {copiedEmail && (
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="oc-toast"
            >
              <Check size={16} className="text-emerald-400" />
              <span>Copied to clipboard!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Multi-State Workers' Compensation Modal Dialog */}
        <AnimatePresence>
          {workersCompModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setWorkersCompModalOpen(false)}
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
              />

              {/* Modal Dialog Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 flex flex-col max-h-[90vh]"
              >
                {/* Modal Header */}
                <div className="flex items-start justify-between p-5 border-b border-slate-100 bg-slate-50/70">
                  <div className="pr-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded">
                        Multi-State Form
                      </span>
                      <span className="text-[11px] font-medium text-slate-500">
                        {WORKERS_COMP_VARIANTS.length} State Markets
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 m-0">Worker&apos;s Compensation Documents</h3>
                    <p className="text-xs text-slate-600 mt-1 m-0">
                      Please use the appropriate state-specific form for your market when reporting a workplace injury.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setWorkersCompModalOpen(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer border-none bg-transparent"
                    title="Close popup"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-5 space-y-4 overflow-y-auto">
                  {/* State Market Selector */}
                  <div className="p-3.5 bg-slate-50 border border-slate-200/90 rounded-xl">
                    <div className="flex items-center justify-between gap-1 mb-2.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                        <MapPin size={14} className="text-emerald-700" />
                        Select Your State Market:
                      </span>
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-100/80 border border-emerald-300 px-2.5 py-0.5 rounded-md">
                        {WORKERS_COMP_VARIANTS[selectedStateIndex]?.state} ({WORKERS_COMP_VARIANTS[selectedStateIndex]?.abbr})
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {WORKERS_COMP_VARIANTS.map((variant, vIdx) => {
                        const isSelected = vIdx === selectedStateIndex;
                        return (
                          <button
                            key={variant.abbr}
                            type="button"
                            onClick={() => setSelectedStateIndex(vIdx)}
                            className={`py-2 px-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-emerald-700 text-white shadow-sm font-bold border border-emerald-800'
                                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <span className={`text-[10.5px] uppercase font-mono font-bold ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>
                              {variant.abbr}
                            </span>
                            <span className="truncate">{variant.state}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Direct SharePoint Button for active state */}
                  {WORKERS_COMP_VARIANTS[selectedStateIndex]?.link && (
                    <div>
                      <a
                        href={WORKERS_COMP_VARIANTS[selectedStateIndex].link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-semibold text-xs inline-flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer text-decoration-none"
                      >
                        <span>Open {WORKERS_COMP_VARIANTS[selectedStateIndex].state} Form in SharePoint</span>
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  )}

                  {/* Mandatory 24-Hour Submission Notice & Contacts */}
                  <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs space-y-2.5">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-950">
                      <AlertTriangle size={15} className="text-emerald-700 shrink-0" />
                      <span>Mandatory 24-Hour Submission</span>
                    </div>
                    <p className="text-[11.5px] text-slate-600 leading-relaxed m-0">
                      Submit completed report within 24 hours of incident to all 3 designated recipients:
                    </p>
                    <div className="space-y-1.5">
                      {WORKERS_COMP_CONTACTS.map((contact) => (
                        <div
                          key={contact.email}
                          className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-white border border-emerald-100 text-[11px]"
                        >
                          <span className="font-semibold text-slate-800">{contact.name}</span>
                          <button
                            type="button"
                            onClick={() => handleCopyText(contact.email)}
                            className="text-emerald-800 hover:text-emerald-950 font-mono text-[10.5px] flex items-center gap-1 hover:underline cursor-pointer bg-transparent border-none p-0"
                            title="Click to copy email address"
                          >
                            <span>{contact.email}</span>
                            {copiedEmail === contact.email ? (
                              <Check size={11} className="text-emerald-600" />
                            ) : (
                              <Copy size={11} className="opacity-60" />
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 pt-1 border-t border-emerald-200/70">
                      <a
                        href={`mailto:${WORKERS_COMP_CONTACTS.map(c => c.email).join(',')}?subject=Workers%20Compensation%20Injury%20Report%20-%20[Store%20Number]&body=Hello,%0D%0A%0D%0APlease%20find%20attached%20the%20state-specific%20workers%20compensation%20report%20for%20our%20store.%0D%0A%0D%0AStore%20Number:%20%0D%0AState%20Market:%20${encodeURIComponent(WORKERS_COMP_VARIANTS[selectedStateIndex]?.state || '')}%0D%0AEmployee%20Name:%20%0D%0ADate%20of%20Injury:%20%0D%0A%0D%0AThank%20you.`}
                        className="flex-1 py-2 px-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-decoration-none"
                      >
                        <Mail size={13} />
                        <span>Email All 3 Contacts</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => handleCopyText(WORKERS_COMP_CONTACTS.map(c => c.email).join(', '), true)}
                        className="py-2 px-3 bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-300 rounded-lg text-xs font-semibold inline-flex items-center justify-center gap-1 transition-colors cursor-pointer"
                      >
                        {copiedAll ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} className="text-emerald-700" />}
                        <span>{copiedAll ? 'Copied!' : 'Copy All'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-3 px-5 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => setWorkersCompModalOpen(false)}
                    className="py-1.5 px-4 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-semibold transition-colors cursor-pointer border-none"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Floating Syrup Launcher Button & Assistant Modal temporarily commented out for launch:
        {!chatbotOpen && (
          <button
            type="button"
            onClick={() => setChatbotOpen(true)}
            className="fixed bottom-6 right-6 z-40 bg-emerald-800 hover:bg-emerald-900 text-white py-2.5 px-4 rounded-full shadow-lg flex items-center gap-2.5 font-bold text-xs border border-emerald-600/80 cursor-pointer transition-all hover:scale-105 active:scale-95"
            title="Ask Syrup"
          >
            <div className="relative flex items-center justify-center">
              <SyrupAvatar size={26} />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-amber-400 rounded-full animate-ping" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-amber-400 rounded-full" />
            </div>
            <span className="text-sm font-bold text-emerald-50">Ask Syrup</span>
          </button>
        )}

        <OpsChatbot
          isOpen={chatbotOpen}
          onClose={() => setChatbotOpen(false)}
          onOpenStateModal={() => {
            setChatbotOpen(false);
            setWorkersCompModalOpen(true);
          }}
        />
        */}
      </main>
    </>
  );
}
