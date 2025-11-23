import { useState } from 'react';

export interface Props {
  referralCode: string;
  buttonText?: string;
}

export default function ClipboardCopyButton({ referralCode, buttonText = 'Copy Koho Referral Code' }: Props) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode).then(
      () => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      },
      (err) => {
        console.error('Failed to copy text: ', err);
      }
    );
  };

  // Get current date formatted as "Month Day, Year"
  const getCurrentDate = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return now.toLocaleDateString('en-US', options);
  };

  const baseButtonClasses =
    'w-full flex items-center justify-center gap-3 rounded-xl border transition-colors duration-200 font-semibold py-3 px-8 text-base';
  const defaultButtonClasses = 'bg-slate-100 border-slate-300 text-slate-900 hover:bg-slate-200 hover:border-slate-400';
  const copiedButtonClasses = 'bg-emerald-500 border-emerald-500 text-white';

  return (
    <div className="max-w-xl mx-auto rounded-2xl bg-transparent p-8">
      <div className="text-center space-y-6">
        <div className="border-2 border-dashed border-teal-500 rounded-xl px-6 py-8">
          <div className="text-4xl font-bold tracking-[0.35em] text-teal-500">{referralCode}</div>
        </div>
        <button
          type="button"
          onClick={copyToClipboard}
          className={`${baseButtonClasses} ${copied ? copiedButtonClasses : defaultButtonClasses}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 ${copied ? 'text-white' : 'text-teal-600'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          {copied ? 'Copied!' : buttonText}
        </button>
        <p className="text-sm text-slate-500 leading-relaxed">
          Click to copy • Valid for new KOHO users only
          <br />
          Code verified as of {getCurrentDate()}
        </p>
      </div>
    </div>
  );
}
