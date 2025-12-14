import React, { useMemo } from 'react';
import { marked } from 'marked';

interface ReviewOutputProps {
  review: string;
  isLoading: boolean;
  error: string | null;
}

const ReviewOutput: React.FC<ReviewOutputProps> = ({ review, isLoading, error }) => {
  // Configure marked options
  marked.use({
    gfm: true,
    breaks: true,
  });

  const htmlContent = useMemo(() => {
    if (!review) return '';
    return marked.parse(review) as string;
  }, [review]);

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg overflow-hidden h-[calc(100vh-120px)] flex flex-col">
        <div className="sticky top-0 bg-gray-800/80 backdrop-blur-sm z-10 p-3 border-b border-gray-700 flex-none">
            <h2 className="text-lg font-semibold text-gray-200">AI Review</h2>
        </div>
        <div className="flex-grow overflow-y-auto p-4 custom-scrollbar">
            {error ? (
                 <div className="flex items-center justify-center h-full">
                    <div className="bg-red-900/30 border border-red-500 text-red-300 p-4 rounded-lg">
                        <p className="font-bold">An Error Occurred</p>
                        <p>{error}</p>
                    </div>
                </div>
            ) : !review && isLoading ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
                    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-500"></div>
                    <p className="mt-4 text-lg font-medium">Gemini is thinking...</p>
                    <p className="text-sm">Analyzing your code for bugs, performance, and best practices.</p>
                </div>
            ) : !review ? (
                 <div className="flex items-center justify-center h-full text-center text-gray-500">
                    <div>
                        <p className="text-lg font-medium">Ready for Review</p>
                        <p className="text-sm">Your AI-generated code review will appear here.</p>
                    </div>
                 </div>
            ) : (
                <div className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-gray-100 prose-strong:text-gray-100 prose-code:text-cyan-300 prose-code:bg-gray-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none prose-pre:bg-gray-900 prose-pre:p-4 prose-pre:rounded-lg prose-table:border-collapse prose-th:border prose-th:border-gray-600 prose-th:p-2 prose-td:border prose-td:border-gray-700 prose-td:p-2">
                    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                    {isLoading && (
                        <div className="mt-2">
                            <span className="inline-block w-2 h-4 bg-gray-400 animate-pulse"></span>
                        </div>
                    )}
                </div>
            )}
        </div>
    </div>
  );
};

export default ReviewOutput;