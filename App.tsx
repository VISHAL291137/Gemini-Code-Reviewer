
import React, { useState, useCallback } from 'react';
import { streamCodeReview } from './services/geminiService';
import { LANGUAGES } from './constants';
import Header from './components/Header';
import CodeInput from './components/CodeInput';
import ReviewOutput from './components/ReviewOutput';

const App: React.FC = () => {
  const [code, setCode] = useState<string>('function helloWorld() {\n  console.log("Hello, World!");\n}');
  const [language, setLanguage] = useState<string>(LANGUAGES[0].value);
  const [review, setReview] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleReview = useCallback(async () => {
    if (!code.trim()) {
      setError('Please enter some code to review.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setReview('');

    try {
      const stream = await streamCodeReview(language, code);
      for await (const chunk of stream) {
        setReview((prev) => prev + chunk.text);
      }
    } catch (err) {
      console.error('Error during code review:', err);
      setError('An error occurred while reviewing the code. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [code, language]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 lg:p-6">
        <CodeInput
          code={code}
          onCodeChange={setCode}
          language={language}
          onLanguageChange={setLanguage}
          onReview={handleReview}
          isLoading={isLoading}
        />
        <ReviewOutput review={review} isLoading={isLoading} error={error} />
      </main>
    </div>
  );
};

export default App;
