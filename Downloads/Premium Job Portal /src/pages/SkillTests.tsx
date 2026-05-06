
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../lib/auth';
import { db } from '../lib/db';
import { Icons } from '../components/Icons';

export const SkillTests = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTest, setActiveTest] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Mock Tests Data
  const tests = [
    {
      id: 'react',
      name: 'React.js',
      icon: Icons.Zap,
      color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20',
      questions: [
        { q: 'What is a Hook?', options: ['A fishing tool', 'A function to use state', 'A class component'], a: 1 },
        { q: 'What is JSX?', options: ['JavaScript XML', 'Java Syntax', 'JSON X'], a: 0 },
        { q: 'How do you pass data to components?', options: ['State', 'Props', 'Render'], a: 1 },
      ]
    },
    {
      id: 'node',
      name: 'Node.js',
      icon: Icons.Server,
      color: 'text-green-600 bg-green-50 dark:bg-green-900/20',
      questions: [
        { q: 'What is Node.js?', options: ['A framework', 'A runtime environment', 'A database'], a: 1 },
        { q: 'Which module is used for file operations?', options: ['fs', 'http', 'path'], a: 0 },
        { q: 'What is the default package manager?', options: ['yarn', 'npm', 'pip'], a: 1 },
      ]
    },
    {
      id: 'js',
      name: 'JavaScript',
      icon: Icons.FileText,
      color: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20',
      questions: [
        { q: 'Which is not a primitive type?', options: ['String', 'Object', 'Boolean'], a: 1 },
        { q: 'What is NaN?', options: ['Not a Number', 'New and Null', 'No'], a: 0 },
        { q: 'How do you declare a variable?', options: ['var', 'let', 'Both'], a: 2 },
      ]
    },
    {
      id: 'figma',
      name: 'Figma',
      icon: Icons.LayoutDashboard,
      color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20',
      questions: [
        { q: 'What is a Frame?', options: ['A picture', 'A container', 'A border'], a: 1 },
        { q: 'What is the shortcut for Rectangle?', options: ['R', 'S', 'T'], a: 0 },
      ]
    }
  ];

  const handleStart = (testId: string) => {
    setActiveTest(testId);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
  };

  const handleAnswer = (optionIndex: number) => {
    const test = tests.find(t => t.id === activeTest);
    if (!test) return;

    // Check if answer is correct
    let newScore = score;
    if (optionIndex === test.questions[currentQuestion].a) {
      newScore = score + 1;
      setScore(newScore);
    }

    if (currentQuestion + 1 < test.questions.length) {
      setCurrentQuestion(q => q + 1);
    } else {
      setShowResult(true);
      // Save result if passed (simple > 50% logic)
      if (newScore >= test.questions.length / 2) {
         if (user) {
           const currentSkills = user.verifiedSkills || [];
           if (!currentSkills.includes(test.name)) {
             db.updateUser(user.id, { verifiedSkills: [...currentSkills, test.name] });
           }
         }
      }
    }
  };

  const testData = tests.find(t => t.id === activeTest);

  if (activeTest && testData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 transition-colors duration-200">
        <div className="max-w-xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
          {!showResult ? (
            <div className="p-8">
              {/* Progress Bar */}
              <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 mb-8 overflow-hidden">
                <div 
                  className="bg-emerald-600 h-full transition-all duration-300 ease-out"
                  style={{ width: `${((currentQuestion + 1) / testData.questions.length) * 100}%` }}
                ></div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                   Question {currentQuestion + 1}/{testData.questions.length}
                </span>
                <button onClick={() => setActiveTest(null)} className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
                  <Icons.X className="w-6 h-6" />
                </button>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                {testData.questions[currentQuestion].q}
              </h2>

              <div className="space-y-3">
                {testData.questions[currentQuestion].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-emerald-500 dark:hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${score >= testData.questions.length / 2 ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'}`}>
                {score >= testData.questions.length / 2 ? <Icons.CheckCircle className="w-10 h-10" /> : <Icons.X className="w-10 h-10" />}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Test Completed!</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                You scored {score} out of {testData.questions.length}
              </p>
              
              {score >= testData.questions.length / 2 ? (
                <div className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 p-4 rounded-lg mb-8 text-sm font-medium border border-green-100 dark:border-green-800">
                  🎉 Congratulations! You earned the {testData.name} Badge.
                </div>
              ) : (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 p-4 rounded-lg mb-8 text-sm font-medium border border-red-100 dark:border-red-800">
                  You need 50% to pass. Please try again.
                </div>
              )}

              <button 
                onClick={() => { setActiveTest(null); navigate('/me/dashboard'); }}
                className="w-full py-3 bg-gray-900 dark:bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Skill Assessments</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Take short multiple-choice tests to earn verified badges. Verified candidates are 5x more likely to get hired.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map(test => {
            const isTaken = user?.verifiedSkills?.includes(test.name);
            return (
              <div key={test.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all group relative overflow-hidden">
                {isTaken && (
                  <div className="absolute top-4 right-4 text-green-500">
                    <Icons.CheckCircle className="w-6 h-6" />
                  </div>
                )}
                
                <div className={`w-14 h-14 ${test.color} rounded-xl flex items-center justify-center mb-6`}>
                  <test.icon className="w-7 h-7" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{test.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{test.questions.length * 5} mins • Multiple Choice</p>
                
                <button 
                  onClick={() => handleStart(test.id)}
                  disabled={isTaken}
                  className={`w-full py-3 rounded-lg font-bold transition-colors ${
                    isTaken 
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed' 
                      : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-emerald-600 dark:hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400'
                  }`}
                >
                  {isTaken ? 'Verified' : 'Start Test'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
