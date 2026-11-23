import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  Award, 
  Sparkles, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/presentationData';
import { sfx } from '../utils/audio';

export const KnowledgeQuiz: React.FC = () => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  const question = QUIZ_QUESTIONS[currentQuestionIdx];
  const totalQuestions = QUIZ_QUESTIONS.length;

  const handleSelectOption = (optionIdx: number) => {
    if (isSubmitted) return;
    sfx.playClick(900);
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIdx]: optionIdx
    }));
    setShowExplanation(true);

    if (optionIdx === question.correctIndex) {
      sfx.playSuccess();
    } else {
      sfx.playClick(400);
    }
  };

  const handleNext = () => {
    sfx.playClick(850);
    if (currentQuestionIdx < totalQuestions - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setShowExplanation(selectedAnswers[currentQuestionIdx + 1] !== undefined);
    } else {
      setIsSubmitted(true);
      // Calculate score and fire confetti if score >= 80%
      const correctCount = Object.entries(selectedAnswers).filter(
        ([qIdx, ansIdx]) => QUIZ_QUESTIONS[Number(qIdx)].correctIndex === ansIdx
      ).length;

      if (correctCount >= 4) {
        sfx.playSuccess();
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const handlePrev = () => {
    sfx.playClick(800);
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(prev => prev - 1);
      setShowExplanation(selectedAnswers[currentQuestionIdx - 1] !== undefined);
    }
  };

  const handleReset = () => {
    sfx.playClick(700);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentQuestionIdx(0);
    setShowExplanation(false);
  };

  // Calculate score
  const correctCount = Object.entries(selectedAnswers).filter(
    ([qIdx, ansIdx]) => QUIZ_QUESTIONS[Number(qIdx)].correctIndex === ansIdx
  ).length;

  const scorePercentage = Math.round((correctCount / totalQuestions) * 100);

  return (
    <section id="quiz" className="py-20 border-b border-cyan-500/20 light:border-slate-300 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 light:text-cyan-700">
            [INTERACTIVE ASSESSMENT // ARCHITECTURAL MASTERY]
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-100 light:text-slate-900 mt-1">
            Knowledge Verification Lab
          </h2>
          <p className="mt-2 text-sm text-slate-300 light:text-slate-600">
            Validate your comprehension of decoder-only transformers, causal attention, training pipelines, and safety bounds.
          </p>
        </div>

        {/* Quiz Container */}
        <div className="p-6 sm:p-8 rounded-xl border-2 border-cyan-500/40 bg-slate-900/80 light:bg-white shadow-2xl blueprint-corner">
          {!isSubmitted ? (
            <div>
              {/* Progress and Question Counter */}
              <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20 mb-6 text-xs font-mono">
                <span className="text-cyan-400 light:text-cyan-700 font-bold">
                  QUESTION 0{currentQuestionIdx + 1} OF 0{totalQuestions}
                </span>
                <span className="text-slate-400">
                  Answered: {Object.keys(selectedAnswers).length}/{totalQuestions}
                </span>
              </div>

              {/* Question Text */}
              <h3 className="text-lg sm:text-xl font-display font-bold text-slate-100 light:text-slate-900 mb-6 leading-relaxed">
                {question.question}
              </h3>

              {/* Options List */}
              <div className="space-y-3 mb-6">
                {question.options.map((option, idx) => {
                  const isSelected = selectedAnswers[currentQuestionIdx] === idx;
                  const hasAnswered = selectedAnswers[currentQuestionIdx] !== undefined;
                  const isCorrect = idx === question.correctIndex;

                  let borderClass = 'border-slate-800 light:border-slate-200 hover:border-cyan-500/40 bg-slate-950/60 light:bg-slate-50';
                  if (hasAnswered) {
                    if (isCorrect) {
                      borderClass = 'border-emerald-500 bg-emerald-950/40 text-emerald-200 light:bg-emerald-50 light:text-emerald-900';
                    } else if (isSelected) {
                      borderClass = 'border-rose-500 bg-rose-950/40 text-rose-200 light:bg-rose-50 light:text-rose-900';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={hasAnswered}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-3.5 text-xs sm:text-sm font-sans ${borderClass}`}
                    >
                      <div className="w-6 h-6 rounded-full border border-current flex items-center justify-center font-mono text-xs shrink-0 mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className="flex-1 leading-relaxed">{option}</span>
                      {hasAnswered && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      )}
                      {hasAnswered && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Drawer */}
              {showExplanation && (
                <div className="p-4 rounded-lg bg-slate-950 light:bg-slate-100 border border-cyan-500/30 text-xs font-mono space-y-1.5 mb-6 animate-fadeIn">
                  <div className="text-cyan-400 light:text-cyan-800 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    <span>Architectural Explanation:</span>
                  </div>
                  <p className="text-slate-300 light:text-slate-700 leading-relaxed font-sans text-xs sm:text-sm">
                    {question.explanation}
                  </p>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-cyan-500/20">
                <button
                  onClick={handlePrev}
                  disabled={currentQuestionIdx === 0}
                  className="px-4 py-2 rounded-lg border border-slate-700 text-xs font-mono text-slate-300 disabled:opacity-40"
                >
                  Previous
                </button>

                <button
                  onClick={handleNext}
                  disabled={selectedAnswers[currentQuestionIdx] === undefined}
                  className="px-5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-mono font-bold text-xs flex items-center gap-1.5 disabled:opacity-40"
                >
                  <span>{currentQuestionIdx === totalQuestions - 1 ? 'Complete Verification' : 'Next Question'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            /* Results & Score Card */
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 rounded-full border-2 border-cyan-400 bg-cyan-950/60 light:bg-cyan-100 flex items-center justify-center text-cyan-400 mx-auto">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl font-display font-extrabold text-slate-100 light:text-slate-900">
                  Verification Evaluation Complete
                </h3>
                <div className="mt-2 text-4xl font-display font-black text-cyan-400 light:text-cyan-800">
                  {scorePercentage}%
                </div>
                <p className="text-sm text-slate-300 light:text-slate-600 mt-1">
                  You answered {correctCount} of {totalQuestions} questions correctly.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-slate-950 light:bg-slate-100 border border-cyan-500/20 max-w-md mx-auto text-xs font-mono text-slate-400 light:text-slate-600">
                {scorePercentage >= 80 ? (
                  <span className="text-emerald-400 light:text-emerald-700 font-bold">
                    ✓ Certification Status: MASTERY ACHIEVED. You demonstrate rigorous understanding of decoder-only transformer fundamentals.
                  </span>
                ) : (
                  <span>
                    Review the architecture sections above and retake the evaluation to sharpen your conceptual mastery.
                  </span>
                )}
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-mono font-bold text-xs flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retake Assessment</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
