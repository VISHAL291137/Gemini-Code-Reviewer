
import React from 'react';

interface ReviewOutputProps {
  review: string;
  isLoading: boolean;
  error: string | null;
}

const ReviewOutput: React.FC<ReviewOutputProps> = ({ review, isLoading, error }) => {
  const renderContent = () => {
    if (isLoading && !review) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-500"></div>
          <p className="mt-4 text-lg font-medium">Gemini is thinking...</p>
          <p className="text-sm">Your code review will appear here shortly.</p>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="flex items-center justify-center h-full">
            <div className="bg-red-900/30 border border-red-500 text-red-300 p-4 rounded-lg">
                <p className="font-bold">An Error Occurred</p>
                <p>{error}</p>
            </div>
        </div>
      );
    }

    if (!review && !isLoading) {
      return (
        <div className="flex items-center justify-center h-full text-center text-gray-500">
          <p>Your code review will appear here.</p>
        </div>
      );
    }

    return (
      <div
        className="prose prose-invert prose-sm sm:prose-base max-w-none p-4 break-words"
        dangerouslySetInnerHTML={{ __html: review.replace(/```(\w*)\n/g, '<pre><code class="language-$1">').replace(/```/g, '</code></pre>') }}
      />
    );
  };
  
  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg overflow-y-auto h-[calc(100vh-120px)]">
        <div className="sticky top-0 bg-gray-800/80 backdrop-blur-sm z-10 p-3 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-gray-200">AI Review</h2>
        </div>
        <div className="p-4">
          <div className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-gray-100 prose-strong:text-gray-100 prose-code:text-cyan-300 prose-code:bg-gray-900 prose-code:p-1 prose-code:rounded-sm prose-pre:bg-gray-900 prose-pre:p-4 prose-pre:rounded-lg">
            {review ? review : (
                 <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 p-8">
                    {isLoading ? (
                        <>
                        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-500"></div>
                        <p className="mt-4 text-lg font-medium">Gemini is thinking...</p>
                        <p className="text-sm">Analyzing your code for bugs, performance, and best practices.</p>
                        </>
                    ) : error ? (
                        <div className="bg-red-900/30 border border-red-500 text-red-300 p-4 rounded-lg">
                            <p className="font-bold">An Error Occurred</p>
                            <p>{error}</p>
                        </div>
                    ) : (
                        <div>
                            <p className="text-lg font-medium">Ready for Review</p>
                            <p className="text-sm">Your AI-generated code review will appear here.</p>
                        </div>
                    )}
                 </div>
            )}
            {isLoading && review && <span className="inline-block w-2 h-4 bg-gray-300 animate-pulse ml-1"></span>}
          </div>
        </div>
    </div>
  );
};

export default ReviewOutput;
