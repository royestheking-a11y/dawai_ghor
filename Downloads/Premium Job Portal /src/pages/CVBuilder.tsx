
import { useState, useRef } from 'react';
import { useAuth } from '../lib/auth';
import { Icons } from '../components/Icons';
import { CVData, TemplateModern, TemplateMinimal, TemplateBold } from '../components/cv/CVTemplates';
import { CVForm } from '../components/cv/CVForm';
import { useReactToPrint } from 'react-to-print';

export const CVBuilder = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'content' | 'design'>('content');
  const [selectedTemplate, setSelectedTemplate] = useState<'modern' | 'minimal' | 'bold'>('modern');
  const [themeColor, setThemeColor] = useState('#059669'); // emerald-600 default

  const [cvData, setCvData] = useState<CVData>({
    fullName: user?.name || 'Donna Stroupe',
    title: 'Sales Representative',
    email: user?.email || 'hello@reallygreatsite.com',
    phone: '+123-456-7890',
    location: '123 Anywhere St., Any City',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    summary: 'I am a Sales Representative who initializes and manages relationships with customers. They serve as their point of contact and lead from initial outreach through the making of the final purchase.',
    socials: [
      { platform: 'LinkedIn', url: 'linkedin.com/in/donna' }
    ],
    skills: ['Fast-moving Consumer Goods', 'Packaged Consumer Goods', 'Sales', 'Corporate sales', 'Retail'],
    languages: [
      { language: 'English', level: 'Native' },
      { language: 'French', level: 'Fluent' }
    ],
    experience: [
      {
        company: 'Timmerman Industries',
        role: 'Consumer Goods Seller',
        duration: 'Aug 2018 - Present',
        description: 'Offer consumer goods packages to corporate clients.\nMeet with clients every quarter to update or renew services.\nTrain junior sales agents.'
      },
      {
        company: 'Timmerman Industries',
        role: 'FMCG Sales Agent',
        duration: 'Jul 2015 - Aug 2018',
        description: 'Visited corporate client offices to offer latest products.\nBuilt relationships with clients to maintain sales goals and create new opportunities.'
      }
    ],
    education: [
      { institution: 'Wardiere University', degree: 'BA Sales and Commerce', year: '2011 - 2015' }
    ]
  });

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `${cvData.fullName}_CV`,
  });

  const colors = [
    '#10b981', // Emerald
    '#2563eb', // Blue
    '#059669', // Green
    '#7c3aed', // Violet
    '#dc2626', // Red
    '#d97706', // Amber
    '#4b5563', // Gray
    '#000000', // Black
  ];

  // Responsive state for mobile preview
  const [showPreviewMobile, setShowPreviewMobile] = useState(false);

  return (
    <div className="h-[calc(100vh-64px)] bg-gray-100 dark:bg-gray-900 flex flex-col transition-colors duration-200 overflow-hidden">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex justify-between items-center z-30 shadow-sm flex-shrink-0">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mr-2">
          <Icons.FileText className="text-emerald-600 flex-shrink-0" />
          <span className="hidden lg:inline">Premium CV Builder</span>
        </h1>
        <div className="flex gap-2 sm:gap-3 items-center overflow-x-auto">
          {/* View Toggle (Mobile Only < md) */}
          <div className="flex md:hidden bg-gray-100 dark:bg-gray-700 rounded-lg p-1 flex-shrink-0">
            <button
              onClick={() => setShowPreviewMobile(false)}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${!showPreviewMobile ? 'bg-white dark:bg-gray-600 text-emerald-600 shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}
            >
              Edit
            </button>
            <button
              onClick={() => setShowPreviewMobile(true)}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${showPreviewMobile ? 'bg-white dark:bg-gray-600 text-emerald-600 shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}
            >
              View
            </button>
          </div>

          {/* Mode Tabs (Always Visible) */}
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1 flex-shrink-0">
            <button
              onClick={() => setActiveTab('content')}
              className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-bold rounded-md transition-all ${activeTab === 'content' ? 'bg-white dark:bg-gray-600 text-emerald-600 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'}`}
            >
              Content
            </button>
            <button
              onClick={() => setActiveTab('design')}
              className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-bold rounded-md transition-all ${activeTab === 'design' ? 'bg-white dark:bg-gray-600 text-emerald-600 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'}`}
            >
              Design
            </button>
          </div>

          <div className="w-px h-8 bg-gray-200 dark:bg-gray-700 mx-1 hidden sm:block"></div>

          <button
            onClick={handlePrint}
            className="bg-emerald-600 text-white px-3 sm:px-5 py-2 rounded-lg font-bold hover:bg-emerald-700 flex items-center gap-2 transition-colors shadow-sm hover:shadow-emerald-500/30 flex-shrink-0"
          >
            <Icons.Download className="w-4 h-4" /> <span className="hidden sm:inline">Download</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden relative lg:grid lg:grid-cols-[450px_1fr]">
        {/* Editor Sidebar */}
        <div className={`
            bg-white dark:bg-gray-800 flex flex-col shadow-xl z-20 overflow-hidden h-full
            ${showPreviewMobile ? 'hidden lg:flex' : 'flex w-full absolute inset-0 lg:static lg:w-auto'} 
            lg:border-r lg:border-gray-200 lg:dark:border-gray-700
        `}>
          {activeTab === 'content' ? (
            <CVForm data={cvData} onChange={setCvData} />
          ) : (
            <div className="p-6 overflow-y-auto h-full">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Choose Template</h3>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <button
                  onClick={() => setSelectedTemplate('modern')}
                  className={`border-2 rounded-xl p-2 transition-all hover:scale-105 ${selectedTemplate === 'modern' ? 'border-emerald-600 ring-2 ring-emerald-100 dark:ring-emerald-900' : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300'}`}
                >
                  <div className="aspect-[210/297] bg-gray-100 rounded mb-2 overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-20 bg-emerald-100/50"></div>
                    <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></div>
                  </div>
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300 block text-center">Modern</span>
                </button>

                <button
                  onClick={() => setSelectedTemplate('minimal')}
                  className={`border-2 rounded-xl p-2 transition-all hover:scale-105 ${selectedTemplate === 'minimal' ? 'border-emerald-600 ring-2 ring-emerald-100 dark:ring-emerald-900' : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300'}`}
                >
                  <div className="aspect-[210/297] bg-white border border-gray-100 rounded mb-2 overflow-hidden relative flex flex-col items-center pt-4">
                    <div className="w-8 h-8 rounded-full bg-gray-200 mb-2"></div>
                    <div className="w-16 h-1 bg-gray-200 rounded"></div>
                  </div>
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300 block text-center">Minimal</span>
                </button>

                <button
                  onClick={() => setSelectedTemplate('bold')}
                  className={`border-2 rounded-xl p-2 transition-all hover:scale-105 ${selectedTemplate === 'bold' ? 'border-emerald-600 ring-2 ring-emerald-100 dark:ring-emerald-900' : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300'}`}
                >
                  <div className="aspect-[210/297] bg-white rounded mb-2 overflow-hidden relative flex">
                    <div className="w-1/3 h-full bg-gray-200"></div>
                  </div>
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300 block text-center">Bold</span>
                </button>
              </div>

              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Accent Color</h3>
              <div className="flex flex-wrap gap-3">
                {colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setThemeColor(color)}
                    className={`w-10 h-10 rounded-full transition-transform hover:scale-110 flex items-center justify-center ${themeColor === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
                    style={{ backgroundColor: color }}
                  >
                    {themeColor === color && <Icons.Check className="w-5 h-5 text-white" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Preview Area */}
        <div className={`
             bg-gray-100 dark:bg-gray-900 justify-center p-8 md:p-12 transition-colors overflow-y-auto scrollbar-thin h-full
             lg:flex lg:relative lg:inset-auto lg:z-auto
             ${showPreviewMobile ? 'flex absolute inset-0 z-30' : 'max-lg:hidden'}
        `}>
          <div className="origin-top scale-[0.5] sm:scale-[0.6] md:scale-[0.8] lg:scale-[0.85] xl:scale-100 transition-transform duration-300">
            <div className="shadow-2xl print:shadow-none" ref={componentRef}>
              {selectedTemplate === 'modern' && <TemplateModern data={cvData} themeColor={themeColor} />}
              {selectedTemplate === 'minimal' && <TemplateMinimal data={cvData} themeColor={themeColor} />}
              {selectedTemplate === 'bold' && <TemplateBold data={cvData} themeColor={themeColor} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
