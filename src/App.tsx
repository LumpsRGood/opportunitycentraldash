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
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const APP_VERSION = 'v1.2.0';

const DOCUMENTS = [
  {
    id: 'doc-sick-leave',
    title: 'Employee Sick Leave',
    description: 'Form to request and document sick leave policies.',
    category: 'HR',
    format: 'PDF',
    icon: FileText,
    bandClass: 'green',
    bandIcon: '▣',
    link: 'https://opportunityrestaurantgroup.sharepoint.com/:b:/s/OpportunityCentral/IQArgHfe_0kXRILc8hn8_VnuAWyBPk1IzwyiVtBXmu2fgCM?e=o8gcKq'
  },
  {
    id: 'doc-termination',
    title: 'Employee Termination Form',
    description: 'Formal checklist and notification for employee offboarding.',
    category: 'HR',
    format: 'DOCX',
    icon: UserMinus,
    bandClass: 'red',
    bandIcon: '♙',
    link: 'https://opportunityrestaurantgroup.sharepoint.com/:w:/s/OpportunityCentral/IQDsQ6E9tBFJSbNQezPQzt_HAayb_uGH2v8Q8Ks6Fob4ckg?e=grp7zf'
  },
  {
    id: 'doc-warning',
    title: 'Employee Warning Form',
    description: 'Disciplinary warning notice template for store managers.',
    category: 'Operations',
    format: 'DOCX',
    icon: AlertTriangle,
    bandClass: 'orange',
    bandIcon: '✎',
    link: 'https://opportunityrestaurantgroup.sharepoint.com/:w:/s/OpportunityCentral/IQD1uBKeWWLpSoVXSxLaUkrmAZwvLw9qu7htUDP4GceYiFo?e=f9vAf8'
  },
  {
    id: 'doc-food-critical',
    title: 'Food Critical Checklist',
    description: 'Daily shift health and safety standards verification sheet.',
    category: 'Food Safety',
    format: 'DOCX',
    icon: ShieldCheck,
    bandClass: 'forest',
    bandIcon: '☑',
    link: 'https://opportunityrestaurantgroup.sharepoint.com/:w:/s/OpportunityCentral/IQD77cKoCMXLRLw7xAwXaM1UAbhkZwp7Kr68OIBlBrG4Xa0?e=sRd0Jl'
  },
  {
    id: 'doc-incident',
    title: 'Incident Report',
    description: 'Standard reporting form for employee or guest accidents.',
    category: 'Safety',
    format: 'DOCX',
    icon: ClipboardSignature,
    bandClass: 'purple',
    bandIcon: '♢',
    link: 'https://opportunityrestaurantgroup.sharepoint.com/:w:/s/OpportunityCentral/IQDqJyZyVRBOQKepaccExzkwATAqfOGb6M0WW8nsyZ2PhEE?e=tExHai'
  },
  {
    id: 'doc-temp-log',
    title: 'Temperature Log',
    description: 'Mandatory line and cooling logs.',
    category: 'Food Safety',
    format: 'PDF',
    icon: Thermometer,
    bandClass: 'blue',
    bandIcon: '♨',
    link: 'https://opportunityrestaurantgroup.sharepoint.com/:b:/s/OpportunityCentral/IQATIKGa1RDMTq-RPW5jGZh8AdLTcig0wDunFuIYXiXk7yc?e=TA0iyN'
  },
  {
    id: 'doc-ga-haccp',
    title: 'Georgia HACCP Guide',
    description: 'Guidelines for Hazard Analysis and Critical Control Point compliance.',
    category: 'Food Safety',
    format: 'PDF',
    icon: BookOpen,
    bandClass: 'purple',
    bandIcon: '✩',
    link: 'https://opportunityrestaurantgroup.sharepoint.com/:w:/s/OpportunityCentral/IQBOUq1vGVwLT5oTMB8Xy3C_ASZXJaz_HzV6FUM7clnAlNA?e=FTfuds'
  }
];

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('home');

  // References for scrollspy and smooth scrolling
  const sectionRefs = {
    home: useRef<HTMLElement | null>(null),
    documents: useRef<HTMLElement | null>(null),
    facilities: useRef<HTMLElement | null>(null),
    contacts: useRef<HTMLElement | null>(null),
    incidents: useRef<HTMLElement | null>(null),
  };

  // Scrollspy to set active tab as user scrolls
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160; // offset for nav height

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

  const handleTabClick = (sectionId: 'home' | 'documents' | 'facilities' | 'contacts' | 'incidents') => {
    setActiveTab(sectionId);
    const targetRef = sectionRefs[sectionId];
    if (targetRef && targetRef.current) {
      window.scrollTo({
        top: targetRef.current.offsetTop - 120, // offset for fixed headers/tabs
        behavior: 'smooth'
      });
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

        .oc-tabs {
          display: flex;
          align-items: center;
          gap: 24px;
          max-width: 1400px;
          margin: 0 auto;
          min-height: 48px;
          padding: 0 40px;
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
          justify-content: flex-start;
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
        }

        .oc-contact-card:hover {
          border-color: #cbd5e1;
          box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        }

        .oc-contact-left {
          display: flex;
          align-items: center;
          gap: 16px;
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
        }

        .oc-contact-badge.employee {
          background-color: #fff7ed;
          color: #ea580c;
          border: 1px solid #ffedd5;
        }

        .oc-contact-badge.guest {
          background-color: #f0f9ff;
          color: #0284c7;
          border: 1px solid #e0f2fe;
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
          display: flex;
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

          .oc-tabs {
            gap: 16px;
            padding: 0 20px;
            overflow-x: auto;
            white-space: nowrap;
          }

          .oc-tabs button {
            font-size: 13px;
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
            <button 
              className={activeTab === 'contacts' ? 'active' : ''} 
              onClick={() => handleTabClick('contacts')}
            >
              Who to Contact
            </button>
            <button 
              className={activeTab === 'incidents' ? 'active' : ''} 
              onClick={() => handleTabClick('incidents')}
            >
              Incident Guidelines
            </button>
          </nav>
        </div>

        {/* Welcome Block */}
        <section id="home" ref={sectionRefs.home} className="oc-welcome">
          <div className="oc-info-icon" aria-hidden="true">i</div>
          <p className="text-sm m-0" style={{ color: '#3b5c38', fontWeight: 500, lineHeight: '1.5' }}>
            <strong style={{ color: 'var(--oc-green-dark)', fontWeight: 800 }}>Welcome to Opportunity Central:</strong> Your single point of access for all operational templates, checklists, and contact rules. Use the dashboard below to open forms or reference submission rules instantly.
          </p>
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
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25, delay: idx * 0.03 }}
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
                      
                      <a 
                        className="oc-open-button" 
                        href={doc.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={15} />
                        Open Form
                      </a>
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

        {/* Invoice Submissions and Incident Reports Bottom Grid */}
        <div className="oc-bottom-grid">
          {/* Financial & Invoice submissions */}
          <section id="contacts" ref={sectionRefs.contacts} className="oc-panel">
            <div className="oc-section-heading">
              <span className="oc-icon" aria-hidden="true">
                <FileCode size={20} className="text-emerald-700" />
              </span>
              <div>
                <h2>Financial &amp; Invoice Submissions</h2>
                <p>Follow these rules strictly when submitting POS records or vendor invoices.</p>
              </div>
            </div>

            <aside className="oc-warning">
              <strong>
                <AlertTriangle size={18} />
                CRITICAL FINANCIAL SEPARATION RULE
              </strong>
              <p><b>Paid Outs are NOT invoices.</b> Do NOT combine AP invoices with POS Paid Out reports. Submit each item separately to the appropriate email address listed below.</p>
            </aside>

            <div className="oc-table-container">
              <table className="oc-table">
                <thead>
                  <tr>
                    <th>Document Category</th>
                    <th>Guideline &amp; Action</th>
                    <th>Submit To Email (Click to Copy)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><span className="oc-badge paid">POS PAID OUTS</span></td>
                    <td className="oc-action-cell">Already Posted in the POS System. Send all supporting documentation.</td>
                    <td className="oc-bold-cell">
                      <button 
                        onClick={() => handleCopyEmail('OFA-FPORG@bdo.com')}
                        className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 hover:underline bg-transparent border-none font-bold cursor-pointer text-left p-0"
                      >
                        <Mail size={15} className="text-blue-500 shrink-0" />
                        OFA-FPORG@bdo.com
                        {copiedEmail === 'OFA-FPORG@bdo.com' ? <Check size={14} className="text-green-600 ml-1 shrink-0" /> : <Copy size={13} className="text-slate-400 opacity-60 ml-1 shrink-0" />}
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td><span className="oc-badge invoice">AP INVOICES</span></td>
                    <td className="oc-action-cell">Accounts Payable. Send all vendor invoices requiring payment.</td>
                    <td className="oc-bold-cell">
                      <button 
                        onClick={() => handleCopyEmail('OFA-AP-ORG@bdo.com')}
                        className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 hover:underline bg-transparent border-none font-bold cursor-pointer text-left p-0"
                      >
                        <Mail size={15} className="text-blue-500 shrink-0" />
                        OFA-AP-ORG@bdo.com
                        {copiedEmail === 'OFA-AP-ORG@bdo.com' ? <Check size={14} className="text-green-600 ml-1 shrink-0" /> : <Copy size={13} className="text-slate-400 opacity-60 ml-1 shrink-0" />}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Incident Report Guidelines */}
          <section id="incidents" ref={sectionRefs.incidents} className="oc-panel">
            <div className="oc-section-heading">
              <span className="oc-icon" aria-hidden="true">
                <AlertCircle size={20} className="text-emerald-700" />
              </span>
              <div>
                <h2>Incident Report Guidelines</h2>
                <p>Send reports immediately based on target category. Ensure mandatory team CCs.</p>
              </div>
            </div>

            {/* Modern Contact Cards Directory */}
            <div className="flex flex-col gap-4 mb-6">
              <div className="oc-contact-card">
                <div className="oc-contact-left">
                  <span className="oc-contact-badge employee">Employee</span>
                  <div className="oc-contact-info">
                    <h4>Hani</h4>
                    <p>Primary Contact | Select First Insurance</p>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => handleCopyEmail('Hani@selectfirstinsurance.com')}
                  className="oc-contact-email-btn"
                  title="Click to copy email address"
                >
                  <Mail size={14} />
                  <span>Hani@selectfirstinsurance.com</span>
                  {copiedEmail === 'Hani@selectfirstinsurance.com' ? (
                    <Check size={14} className="text-green-600" />
                  ) : (
                    <Copy size={12} className="opacity-60" />
                  )}
                </button>
              </div>

              <div className="oc-contact-card">
                <div className="oc-contact-left">
                  <span className="oc-contact-badge guest">Guest</span>
                  <div className="oc-contact-info">
                    <h4>Jim Doran</h4>
                    <p>Primary Contact | AJ Gallagher</p>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => handleCopyEmail('Jim_doran@ajg.com')}
                  className="oc-contact-email-btn"
                  title="Click to copy email address"
                >
                  <Mail size={14} />
                  <span>Jim_doran@ajg.com</span>
                  {copiedEmail === 'Jim_doran@ajg.com' ? (
                    <Check size={14} className="text-green-600" />
                  ) : (
                    <Copy size={12} className="opacity-60" />
                  )}
                </button>
              </div>
            </div>

            {/* Sleek CC Container Block */}
            <div className="oc-cc-container">
              <div className="oc-cc-title">Always CC the Following on All Incident Reports</div>
              <div className="oc-cc-list">
                <div 
                  className="oc-cc-item" 
                  onClick={() => handleCopyEmail('bclark@opportunityrestaurantgroup.com')}
                  title="Click to copy email address"
                >
                  <span>bclark@opportunityrestaurantgroup.com</span>
                  {copiedEmail === 'bclark@opportunityrestaurantgroup.com' ? (
                    <span className="text-green-600 flex items-center gap-1 text-xs font-bold"><Check size={14} /> Copied!</span>
                  ) : (
                    <span className="text-slate-400 flex items-center gap-1 text-xs"><Copy size={12} /> Copy</span>
                  )}
                </div>

                <div 
                  className="oc-cc-item" 
                  onClick={() => handleCopyEmail('TFurr@opportunityrestaurantgroup.com')}
                  title="Click to copy email address"
                >
                  <span>TFurr@opportunityrestaurantgroup.com</span>
                  {copiedEmail === 'TFurr@opportunityrestaurantgroup.com' ? (
                    <span className="text-green-600 flex items-center gap-1 text-xs font-bold"><Check size={14} /> Copied!</span>
                  ) : (
                    <span className="text-slate-400 flex items-center gap-1 text-xs"><Copy size={12} /> Copy</span>
                  )}
                </div>

                <div 
                  className="oc-cc-item" 
                  onClick={() => handleCopyEmail('Jdragoljevic@opportunityrestaurantgroup.com')}
                  title="Click to copy email address"
                >
                  <span>Jdragoljevic@opportunityrestaurantgroup.com</span>
                  {copiedEmail === 'Jdragoljevic@opportunityrestaurantgroup.com' ? (
                    <span className="text-green-600 flex items-center gap-1 text-xs font-bold"><Check size={14} /> Copied!</span>
                  ) : (
                    <span className="text-slate-400 flex items-center gap-1 text-xs"><Copy size={12} /> Copy</span>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="oc-footer">
          <div>© 2026 Lumps Are Good &bull; Version {APP_VERSION}</div>
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
              <span>Copied email to clipboard!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
