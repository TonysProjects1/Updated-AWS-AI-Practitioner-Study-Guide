import { useState, useEffect } from 'react';
import { flashcardsData } from '../data/flashcardsData';
import { ChevronLeft, ChevronRight, RotateCcw, Bookmark, BookmarkCheck } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export function Flashcards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showOnlyFlagged, setShowOnlyFlagged] = useState(false);

  const [flaggedCards, setFlaggedCards] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('aws-ai-flagged-flashcards');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  useEffect(() => {
    localStorage.setItem('aws-ai-flagged-flashcards', JSON.stringify(Array.from(flaggedCards)));
  }, [flaggedCards]);

  const activeCards = showOnlyFlagged ? flashcardsData.filter(c => flaggedCards.has(c.id)) : flashcardsData;

  // Reset index if we filter and it's out of bounds
  useEffect(() => {
    if (currentIndex >= activeCards.length && activeCards.length > 0) {
      setCurrentIndex(0);
    }
  }, [activeCards.length, currentIndex]);

  const handleNext = () => {
    if (activeCards.length === 0) return;
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % activeCards.length);
    }, 150);
  };

  const handlePrev = () => {
    if (activeCards.length === 0) return;
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + activeCards.length) % activeCards.length);
    }, 150);
  };

  const toggleFlag = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFlaggedCards(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const currentCard = activeCards[currentIndex];

  return (
    <div className="max-w-4xl mx-auto px-8 py-16">
      <div className="mb-12">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] tracking-[0.2em] font-semibold text-[#FF9900] uppercase block">Knowledge Check</span>
          
          <button 
            onClick={() => {
              setShowOnlyFlagged(!showOnlyFlagged);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`text-[10px] uppercase tracking-[0.2em] font-bold px-4 py-2 border flex items-center gap-2 transition-colors
              ${showOnlyFlagged 
                ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' 
                : 'bg-white text-[#1A1A1A] border-[#1A1A1A] hover:bg-gray-50'}`}
          >
            {showOnlyFlagged ? <BookmarkCheck className="w-3 h-3" /> : <Bookmark className="w-3 h-3" />}
            {showOnlyFlagged ? 'Showing Flagged' : `Review Flagged (${flaggedCards.size})`}
          </button>
        </div>
        <h1 className="text-5xl md:text-7xl font-serif italic font-bold tracking-tight leading-[0.85] text-[#1A1A1A]">
          Flashcards.
        </h1>
        <p className="mt-6 text-sm text-[#1A1A1A]/70 max-w-2xl leading-relaxed">
          Test your knowledge against {flashcardsData.length} core concepts spanning all 5 exam domains. 
          Use these cards to validate your understanding of the Cheat Sheet material before taking the AIF-C01 exam.
        </p>
      </div>

      {activeCards.length === 0 ? (
        <div className="text-center py-24 border-2 border-dashed border-[#1A1A1A]/20">
          <Bookmark className="w-12 h-12 mx-auto mb-4 text-[#1A1A1A]/20" />
          <h2 className="text-2xl font-serif italic mb-2">No flagged cards yet</h2>
          <p className="text-sm opacity-60 max-w-sm mx-auto">
            You haven't flagged any cards for review. Turn off the filter to see all cards and click the bookmark icon to save cards you want to revisit.
          </p>
          <button
            onClick={() => setShowOnlyFlagged(false)}
            className="mt-6 px-6 py-3 bg-[#1A1A1A] text-white text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-[#FF9900] transition-colors"
          >
            Show All Cards
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          {/* Progress */}
          <div className="w-full max-w-2xl flex justify-between items-center mb-6 text-[10px] uppercase tracking-[0.2em] font-bold opacity-50">
            <span>{currentCard.domain}</span>
            <span>{currentIndex + 1} / {activeCards.length}</span>
          </div>

          {/* Card Container */}
          <div 
            className="relative w-full max-w-2xl h-[400px] perspective-1000 cursor-pointer group"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div className={`w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
              
              {/* Front of Card */}
              <div className="absolute inset-0 backface-hidden bg-white border-2 border-[#1A1A1A] p-10 flex flex-col justify-center items-center text-center shadow-[8px_8px_0_0_#FF9900] group-hover:shadow-[12px_12px_0_0_#FF9900] transition-shadow">
                <span className="text-[10px] uppercase tracking-widest text-[#FF9900] font-bold absolute top-6 left-6">Question</span>
                
                <button 
                  onClick={(e) => toggleFlag(e, currentCard.id)}
                  className="absolute top-6 right-6 p-2 text-[#1A1A1A] hover:bg-gray-100 rounded-full transition-colors z-10"
                  aria-label="Flag for review"
                >
                  {flaggedCards.has(currentCard.id) ? (
                    <BookmarkCheck className="w-5 h-5 text-[#FF9900]" />
                  ) : (
                    <Bookmark className="w-5 h-5 opacity-40 hover:opacity-100" />
                  )}
                </button>

                <div className="text-2xl md:text-3xl font-serif italic text-[#1A1A1A] leading-relaxed mt-4">
                  {currentCard.question}
                </div>
                <span className="text-[10px] uppercase tracking-widest opacity-40 absolute bottom-6">Click to reveal</span>
              </div>

              {/* Back of Card */}
              <div className="absolute inset-0 backface-hidden bg-[#1A1A1A] text-white border-2 border-[#1A1A1A] p-10 flex flex-col justify-center items-center text-center rotate-y-180 shadow-[8px_8px_0_0_#FF9900] group-hover:shadow-[12px_12px_0_0_#FF9900] transition-shadow">
                <span className="text-[10px] uppercase tracking-widest text-[#FF9900] font-bold absolute top-6 left-6">Answer</span>
                
                <button 
                  onClick={(e) => toggleFlag(e, currentCard.id)}
                  className="absolute top-6 right-6 p-2 text-white hover:bg-white/10 rounded-full transition-colors z-10"
                  aria-label="Flag for review"
                >
                  {flaggedCards.has(currentCard.id) ? (
                    <BookmarkCheck className="w-5 h-5 text-[#FF9900]" />
                  ) : (
                    <Bookmark className="w-5 h-5 opacity-40 hover:opacity-100" />
                  )}
                </button>

                <div className="text-xl md:text-2xl font-sans text-white/90 leading-relaxed max-w-lg mt-4">
                  <ReactMarkdown>{currentCard.answer}</ReactMarkdown>
                </div>
              </div>

            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-6 mt-12">
            <button 
              onClick={handlePrev}
              className="w-12 h-12 flex items-center justify-center border border-[#1A1A1A] rounded-full hover:bg-[#1A1A1A] hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <button 
              onClick={() => setIsFlipped(!isFlipped)}
              className="px-8 py-3 bg-transparent text-[#1A1A1A] text-[10px] uppercase tracking-[0.2em] font-bold border border-[#1A1A1A] flex items-center gap-2 hover:bg-[#1A1A1A]/5 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Flip Card
            </button>

            <button 
              onClick={handleNext}
              className="w-12 h-12 flex items-center justify-center border border-[#1A1A1A] rounded-full hover:bg-[#1A1A1A] hover:text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
