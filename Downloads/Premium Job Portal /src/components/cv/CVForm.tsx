
import { useState } from 'react';
import { CVData } from './CVTemplates';
import { Icons } from '../Icons';
import { RichTextEditor } from '../RichTextEditor';

interface CVFormProps {
    data: CVData;
    onChange: (data: CVData) => void;
}

export const CVForm = ({ data, onChange }: CVFormProps) => {
    const [activeTab, setActiveTab] = useState<'personal' | 'summary' | 'experience' | 'education' | 'skills' | 'languages'>('personal');

    const updateField = (field: keyof CVData, value: any) => {
        onChange({ ...data, [field]: value });
    };

    const handleSocialChange = (index: number, field: 'platform' | 'url', value: string) => {
        const newSocials = [...data.socials];
        newSocials[index] = { ...newSocials[index], [field]: value };
        updateField('socials', newSocials);
    };

    const addSocial = () => {
        updateField('socials', [...data.socials, { platform: 'LinkedIn', url: '' }]);
    };

    const removeSocial = (index: number) => {
        const newSocials = data.socials.filter((_, i) => i !== index);
        updateField('socials', newSocials);
    };

    // --- Experience Handlers ---
    const handleExpChange = (index: number, field: string, value: string) => {
        const newExp = [...data.experience];
        newExp[index] = { ...newExp[index], [field]: value };
        updateField('experience', newExp);
    };

    const addExp = () => {
        updateField('experience', [...data.experience, { company: '', role: '', duration: '', description: '' }]);
    };

    const removeExp = (index: number) => {
        updateField('experience', data.experience.filter((_, i) => i !== index));
    };


    // --- Education Handlers ---
    const handleEduChange = (index: number, field: string, value: string) => {
        const newEdu = [...data.education];
        newEdu[index] = { ...newEdu[index], [field]: value };
        updateField('education', newEdu);
    };

    const addEdu = () => {
        updateField('education', [...data.education, { institution: '', degree: '', year: '' }]);
    };

    const removeEdu = (index: number) => {
        updateField('education', data.education.filter((_, i) => i !== index));
    };

    // --- Skills Handlers ---
    const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        updateField('skills', val.split(',').map(s => s.trim()));
    };

    // --- Language Handlers ---
    const handleLangChange = (index: number, field: 'language' | 'level', value: string) => {
        const newLangs = [...data.languages];
        newLangs[index] = { ...newLangs[index], [field]: value };
        updateField('languages', newLangs);
    };

    const addLang = () => {
        updateField('languages', [...data.languages, { language: '', level: 'Fluent' }]);
    };

    const removeLang = (index: number) => {
        updateField('languages', data.languages.filter((_, i) => i !== index));
    };

    const tabs = [
        { id: 'personal', label: 'Personal', icon: Icons.User },
        { id: 'summary', label: 'Summary', icon: Icons.FileText },
        { id: 'experience', label: 'Experience', icon: Icons.Briefcase },
        { id: 'education', label: 'Education', icon: Icons.Star }, // Using Star as placeholder for Education/Graduation cap
        { id: 'skills', label: 'Skills', icon: Icons.Zap },
        { id: 'languages', label: 'Languages', icon: Icons.Globe },
    ];

    return (
        <div className="flex flex-col h-full">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center gap-2 px-6 py-4 border-b-2 whitespace-nowrap transition-colors font-medium text-sm ${activeTab === tab.id ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">

                {/* Personal Details */}
                {activeTab === 'personal' && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Full Name</label>
                                <input value={data.fullName} onChange={e => updateField('fullName', e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Job Title</label>
                                <input value={data.title} onChange={e => updateField('title', e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input value={data.email} onChange={e => updateField('email', e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Phone</label>
                                <input value={data.phone} onChange={e => updateField('phone', e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium mb-1">Location (City, Country)</label>
                                <input value={data.location} onChange={e => updateField('location', e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium mb-1">Photo (Optional)</label>
                                <div className="flex items-center gap-4">
                                    {data.photoUrl && (
                                        <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200 dark:border-gray-600">
                                            <img src={data.photoUrl} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => {
                                                        updateField('photoUrl', reader.result as string);
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 dark:file:bg-emerald-900/30 dark:file:text-emerald-300"
                                        />
                                    </div>
                                    {data.photoUrl && (
                                        <button
                                            onClick={() => updateField('photoUrl', '')}
                                            className="text-red-500 hover:text-red-700 text-sm"
                                        >
                                            <Icons.Trash className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="font-bold text-sm mb-2">Social Links</h3>
                            {data.socials.map((social, i) => (
                                <div key={i} className="flex gap-2 mb-2">
                                    <input value={social.platform} onChange={e => handleSocialChange(i, 'platform', e.target.value)} className="w-1/3 p-2 border rounded dark:bg-gray-700 dark:border-gray-600" placeholder="Platform" />
                                    <input value={social.url} onChange={e => handleSocialChange(i, 'url', e.target.value)} className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600" placeholder="URL" />
                                    <button onClick={() => removeSocial(i)} className="text-red-500"><Icons.Trash className="w-4 h-4" /></button>
                                </div>
                            ))}
                            <button onClick={addSocial} className="text-sm text-emerald-600 font-bold hover:underline">+ Add Social Link</button>
                        </div>
                    </div>
                )}

                {/* Summary */}
                {activeTab === 'summary' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <label className="block text-sm font-medium mb-2">Professional Summary</label>
                        <RichTextEditor value={data.summary} onChange={val => updateField('summary', val)} className="h-64" />
                    </div>
                )}

                {/* Experience */}
                {activeTab === 'experience' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                        {data.experience.map((exp, i) => (
                            <div key={i} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                                <div className="flex justify-between mb-2">
                                    <h4 className="font-bold text-sm">Position {i + 1}</h4>
                                    <button onClick={() => removeExp(i)} className="text-red-500 text-xs hover:underline">Remove</button>
                                </div>
                                <div className="grid grid-cols-2 gap-3 mb-3">
                                    <input value={exp.role} onChange={e => handleExpChange(i, 'role', e.target.value)} className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" placeholder="Job Title" />
                                    <input value={exp.company} onChange={e => handleExpChange(i, 'company', e.target.value)} className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" placeholder="Company" />
                                    <input value={exp.duration} onChange={e => handleExpChange(i, 'duration', e.target.value)} className="col-span-2 p-2 border rounded dark:bg-gray-700 dark:border-gray-600" placeholder="Duration (e.g. 2020 - Present)" />
                                </div>
                                <textarea value={exp.description} onChange={e => handleExpChange(i, 'description', e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 h-24 text-sm" placeholder="Description of responsibilities..." />
                            </div>
                        ))}
                        <button onClick={addExp} className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 hover:border-emerald-500 hover:text-emerald-500 transition-colors font-bold">
                            + Add Position
                        </button>
                    </div>
                )}

                {/* Education */}
                {activeTab === 'education' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                        {data.education.map((edu, i) => (
                            <div key={i} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                                <div className="flex justify-between mb-2">
                                    <h4 className="font-bold text-sm">Education {i + 1}</h4>
                                    <button onClick={() => removeEdu(i)} className="text-red-500 text-xs hover:underline">Remove</button>
                                </div>
                                <div className="grid grid-cols-1 gap-3">
                                    <input value={edu.degree} onChange={e => handleEduChange(i, 'degree', e.target.value)} className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" placeholder="Degree / Course" />
                                    <input value={edu.institution} onChange={e => handleEduChange(i, 'institution', e.target.value)} className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" placeholder="Institution / University" />
                                    <input value={edu.year} onChange={e => handleEduChange(i, 'year', e.target.value)} className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600" placeholder="Year (e.g. 2016 - 2020)" />
                                </div>
                            </div>
                        ))}
                        <button onClick={addEdu} className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 hover:border-emerald-500 hover:text-emerald-500 transition-colors font-bold">
                            + Add Education
                        </button>
                    </div>
                )}

                {/* Skills */}
                {activeTab === 'skills' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <label className="block text-sm font-medium mb-2">Skills (Comma separated)</label>
                        <input
                            value={data.skills.join(', ')}
                            onChange={handleSkillChange}
                            className="w-full p-3 border rounded dark:bg-gray-700 dark:border-gray-600"
                            placeholder="React, TypeScript, Tailwind CSS, Node.js..."
                        />
                        <div className="mt-4 flex flex-wrap gap-2">
                            {data.skills.map(skill => (
                                <span key={skill} className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-medium">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Languages */}
                {activeTab === 'languages' && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                        {data.languages.map((lang, i) => (
                            <div key={i} className="flex gap-3">
                                <input value={lang.language} onChange={e => handleLangChange(i, 'language', e.target.value)} className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600" placeholder="Language (e.g. English)" />
                                <select value={lang.level} onChange={e => handleLangChange(i, 'level', e.target.value)} className="w-1/3 p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
                                    <option>Native</option>
                                    <option>Fluent</option>
                                    <option>Intermediate</option>
                                    <option>Basic</option>
                                </select>
                                <button onClick={() => removeLang(i)} className="text-red-500"><Icons.Trash className="w-4 h-4" /></button>
                            </div>
                        ))}
                        <button onClick={addLang} className="text-sm text-emerald-600 font-bold hover:underline">+ Add Language</button>
                    </div>
                )}

            </div>
        </div>
    );
};
