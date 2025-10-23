
import React from 'react';
import { LANGUAGES } from '../constants';
import { Loader } from './Loader';
import { SparklesIcon } from './icons/SparklesIcon';

interface CodeInputProps {
  code: string;
  onCodeChange: (code: string) => void;
  language: string;
  onLanguageChange: (language: string) => void;
  onReview: () => void;
  isLoading: boolean;
}

const CodeInput: React.FC<CodeInputProps> = ({
  code,
  onCodeChange,
  language,
  onLanguageChange,
  onReview,
  isLoading,
}) => {
  return (
    <div className="flex flex-col bg-gray-800 rounded-lg border border-gray-700 shadow-lg h-[calc(100vh-120px)]">
      <div className="flex items-center justify-between p-3 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-gray-200">Your Code</h2>
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="bg-gray-700 text-gray-200 border border-gray-600 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-grow p-1">
        <textarea
          value={code}
          onChange={(e) => onCodeChange(e.target.value)}
          placeholder="Paste your code here..."
          className="w-full h-full p-3 bg-transparent text-gray-200 font-mono resize-none focus:outline-none text-sm leading-relaxed"
          spellCheck="false"
        />
      </div>
      <div className="p-3 border-t border-gray-700">
        <button
          onClick={onReview}
          disabled={isLoading}
          className="w-full flex items-center justify-center bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 text-white font-bold py-3 px-4 rounded-md transition-colors duration-200 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader className="w-5 h-5 mr-2" />
              Analyzing...
            </>
          ) : (
            <>
              <SparklesIcon className="w-5 h-5 mr-2" />
              Review Code
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CodeInput;
