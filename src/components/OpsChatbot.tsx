import { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  X, 
  Maximize2, 
  Minimize2, 
  RefreshCw, 
  Clock
} from 'lucide-react';
import { SyrupAvatar } from './SyrupAvatar';
import { FormattedMessage } from './FormattedMessage';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenStateModal?: () => void;
}

export function OpsChatbot({ isOpen, onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hi there! I'm Syrup, your store procedures assistant for Opportunity Restaurant Group.\n\nAsk me anytime about state-specific Workers' Comp injury reports, AmCare nurse triage, guest accident forms, leave of absence or accommodation policies, corrective action guidelines, food holding temperatures, or payroll and accounting contacts.\n\nWhat can I help you find today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen, messages]);

  const handleSendMessage = async () => {
    const text = inputMessage.trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id: 'user-' + Date.now(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map(m => ({ role: m.role, content: m.content })),
          userMessage: text
        })
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to get response from Syrup.');
      }

      const assistantMsg: Message = {
        id: 'assistant-' + Date.now(),
        role: 'assistant',
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      
      // Fallback message cleanly formatted with contextual intent resolution
      const lower = text.toLowerCase();
      let contextAnswer = "";

      if (lower.includes('write') || lower.includes('discipline') || lower.includes('late') || lower.includes('warning') || lower.includes('coach') || lower.includes('conduct') || lower.includes('insubordinat')) {
        contextAnswer = "When writing someone up or addressing disciplinary issues at Opportunity Restaurant Group:\n\n" +
          "• Form to Use: Open the current Corrective Action Form on this portal. Retire and discard any older paper copies on file.\n" +
          "• Discussion: Meet privately with the team member. Clearly describe the specific behavior, date, time, and policy standard violated.\n" +
          "• Documentation: Have the employee sign acknowledging receipt. If they refuse, write \"Refused to Sign\" with manager/witness initials.\n" +
          "• Filing: Submit and save the completed form to SharePoint (contact your District Manager if you need folder permissions).\n" +
          "• HR Escalation: For severe or repeated issues, contact Taylor Maltese at tmaltese@opportunityrestaurantgroup.com.";
      } else if (lower.includes('fire') || lower.includes('terminate') || lower.includes('let go') || lower.includes('quit') || lower.includes('walked')) {
        contextAnswer = "When terminating or processing an employee separation:\n\n" +
          "• Form to Use: Use the official Termination Form on Opportunity Central.\n" +
          "• Submission: Upload and process the termination via SharePoint.\n" +
          "• Consultation: Always consult with your District Manager and Taylor Maltese (HR) at tmaltese@opportunityrestaurantgroup.com prior to final separation.";
      } else if (lower.includes('hurt') || lower.includes('injury') || lower.includes('injured') || lower.includes('burn') || lower.includes('cut') || lower.includes('slip') || lower.includes('fall')) {
        contextAnswer = "If an employee or guest is injured on shift:\n\n" +
          "• Life-Threatening Emergency: Call 911 immediately.\n" +
          "• Employee Work Injury: Offer the AmCare Nurse Triage line (available 24/7) so the team member can speak with an occupational nurse before filing.\n" +
          "• Workers' Comp Report: Complete the state-specific Workers' Comp report from the 14-state selector and email within 24 hours to:\n" +
          "  - Taylor Maltese: tmaltese@opportunityrestaurantgroup.com\n" +
          "  - Hani Ascha: hani@selectfirstinsurance.com\n" +
          "  - Daniel Salazar: DSalazar@selectfirstinsurance.com\n" +
          "• Guest Incident: Complete the Guest Incident Report, preserve evidence, and email Jim Doran at Jim_doran@ajg.com (CC HR and District Manager).";
      } else {
        contextAnswer = "Here are our core store operational protocols:\n\n" +
          "• Disciplinary Issues: Use the current Corrective Action Form and submit via SharePoint.\n" +
          "• Workplace Injuries: 24-hour mandatory submission to tmaltese@opportunityrestaurantgroup.com, hani@selectfirstinsurance.com, and DSalazar@selectfirstinsurance.com using the employee's state-specific form.\n" +
          "• Nurse Triage: AmCare 24/7 telephonic nurse line is available prior to filing a claim.\n" +
          "• Customer Accidents: Submit completed Guest Incident Report to Jim Doran at Jim_doran@ajg.com (CC HR & District Manager).\n" +
          "• Accommodations & LOA: Submitting starts the interactive review process with HR; it is not an automatic approval.\n" +
          "• Food Safety: Cold holding at 41°F or below, hot holding at 135°F or above.";
      }

      const fallbackMsg: Message = {
        id: 'assistant-fallback-' + Date.now(),
        role: 'assistant',
        content: contextAnswer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-' + Date.now(),
        role: 'assistant',
        content: "Chat cleared! How can I help you with store procedures today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed z-50 transition-all duration-300 shadow-2xl flex flex-col bg-white border border-slate-200 overflow-hidden ${
        isExpanded
          ? 'inset-4 md:inset-10 rounded-2xl'
          : 'bottom-5 right-5 w-[92vw] sm:w-[460px] h-[600px] max-h-[86vh] rounded-2xl'
      }`}
    >
      {/* Header - Clean, Friendly, No Subtitle */}
      <div className="flex items-center justify-between px-4 py-3 bg-emerald-800 text-white select-none">
        <div className="flex items-center gap-2.5">
          <SyrupAvatar size={34} />
          <h3 className="m-0 text-base font-bold tracking-tight text-white leading-none">
            Syrup
          </h3>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleResetChat}
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-700 transition-colors cursor-pointer border-none bg-transparent"
            title="Clear chat"
          >
            <RefreshCw size={15} />
          </button>
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="hidden sm:inline-flex p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-700 transition-colors cursor-pointer border-none bg-transparent"
            title={isExpanded ? "Restore size" : "Expand window"}
          >
            {isExpanded ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-700 transition-colors cursor-pointer border-none bg-transparent"
            title="Close"
          >
            <X size={17} />
          </button>
        </div>
      </div>

      {/* Message Thread */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/60">
        {messages.map(msg => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="shrink-0 mt-0.5">
                  <SyrupAvatar size={28} />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs shadow-xs ${
                  isUser
                    ? 'bg-emerald-700 text-white font-medium rounded-tr-none'
                    : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-none'
                }`}
              >
                {isUser ? (
                  <div className="whitespace-pre-wrap leading-relaxed">{msg.content}</div>
                ) : (
                  <FormattedMessage content={msg.content} />
                )}
                <div className={`text-[9.5px] mt-2 flex items-center justify-end gap-1 ${isUser ? 'text-emerald-200' : 'text-slate-400'}`}>
                  <Clock size={10} />
                  <span>{msg.timestamp}</span>
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-2.5 items-center text-xs text-slate-600 bg-white p-3 rounded-2xl border border-slate-200 w-fit shadow-xs">
            <SyrupAvatar size={22} className="animate-bounce" />
            <span className="font-medium text-slate-500">Syrup is writing...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - Clean with "Ask Syrup" button */}
      <div className="p-3 border-t border-slate-200 bg-white">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Ask Syrup a question about store procedures..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            disabled={isLoading}
            className="flex-1 px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer border-none shadow-xs shrink-0"
          >
            <span>Ask Syrup</span>
            <Send size={13} />
          </button>
        </form>
      </div>
    </div>
  );
}
