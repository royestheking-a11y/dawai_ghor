
import { Icons } from '../Icons';

export interface CVData {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    photoUrl?: string; // Optional photo
    summary: string;
    socials: { platform: string; url: string }[];
    skills: string[];
    languages: { language: string; level: string }[];
    experience: {
        company: string;
        role: string;
        duration: string;
        description: string;
    }[];
    education: {
        institution: string;
        degree: string;
        year: string;
    }[];
}

interface TemplateProps {
    data: CVData;
    themeColor: string;
}

// --- Template 1: Modern (Donna Stroupe style) ---
export const TemplateModern = ({ data, themeColor }: TemplateProps) => {
    return (
        <div className="bg-white w-full h-full min-h-[297mm] flex flex-col text-gray-800 font-sans">
            {/* Header with Photo */}
            <div className="flex items-center p-12 pb-8 bg-opacity-10" style={{ backgroundColor: `${themeColor}20` }}>
                {data.photoUrl && (
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mr-8 flex-shrink-0">
                        <img src={data.photoUrl} alt={data.fullName} className="w-full h-full object-cover" />
                    </div>
                )}
                <div>
                    <h1 className="text-4xl font-bold uppercase tracking-wider mb-2" style={{ color: '#333' }}>{data.fullName}</h1>
                    <p className="text-xl font-medium uppercase tracking-wide opacity-80" style={{ color: themeColor }}>{data.title}</p>
                </div>
            </div>

            <div className="flex flex-1">
                {/* Sidebar */}
                <div className="w-1/3 p-8 pt-8 space-y-8 bg-opacity-20" style={{ backgroundColor: `${themeColor}10` }}>
                    {/* Contact */}
                    <div className="space-y-3 text-sm">
                        {data.phone && <div className="flex items-center gap-3"><Icons.Phone className="w-4 h-4" /> {data.phone}</div>}
                        {data.email && <div className="flex items-center gap-3"><Icons.Mail className="w-4 h-4" /> {data.email}</div>}
                        {data.location && <div className="flex items-center gap-3"><Icons.MapPin className="w-4 h-4" /> {data.location}</div>}
                        {data.socials.map((social, i) => (
                            <div key={i} className="flex items-center gap-3"><Icons.Link className="w-4 h-4" /> {social.url}</div>
                        ))}
                    </div>

                    {/* Education */}
                    <section>
                        <h3 className="font-bold uppercase tracking-widest text-sm mb-4 border-b pb-1" style={{ borderColor: themeColor }}>Education</h3>
                        <div className="space-y-4">
                            {data.education.map((edu, i) => (
                                <div key={i}>
                                    <h4 className="font-bold text-gray-800">{edu.degree}</h4>
                                    <p className="text-sm font-medium">{edu.institution}</p>
                                    <p className="text-xs text-gray-500">{edu.year}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Skills */}
                    <section>
                        <h3 className="font-bold uppercase tracking-widest text-sm mb-4 border-b pb-1" style={{ borderColor: themeColor }}>Skills</h3>
                        <ul className="space-y-2 text-sm">
                            {data.skills.map(skill => (
                                <li key={skill} className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span> {skill}
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                {/* Main Content */}
                <div className="w-2/3 p-12 pt-8 space-y-8">
                    {/* Summary */}
                    <section>
                        <h3 className="font-bold text-xl mb-4 text-gray-800">About Me</h3>
                        <div className="text-sm text-gray-600 leading-relaxed border-t pt-4" style={{ borderColor: themeColor }} dangerouslySetInnerHTML={{ __html: data.summary }} />
                    </section>

                    {/* Experience */}
                    <section>
                        <h3 className="font-bold text-xl mb-4 text-gray-800">Work Experience</h3>
                        <div className="space-y-6 border-t pt-4" style={{ borderColor: themeColor }}>
                            {data.experience.map((exp, i) => (
                                <div key={i} className="relative pl-4 border-l-2" style={{ borderColor: `${themeColor}40` }}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <span className="text-xs font-bold uppercase text-gray-500">{exp.duration}</span>
                                    </div>
                                    <h4 className="font-bold text-lg text-gray-800">{exp.company}</h4>
                                    <p className="text-sm font-medium mb-2" style={{ color: themeColor }}>{exp.role}</p>
                                    <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

// --- Template 2: Minimal (Olivia Wilson style) ---
export const TemplateMinimal = ({ data, themeColor }: TemplateProps) => {
    return (
        <div className="bg-white w-full h-full min-h-[297mm] p-12 text-gray-800 font-sans">

            {/* Header Centered with circle photo */}
            <div className="flex flex-col items-center justify-center mb-12 border-b pb-8" style={{ borderColor: '#eee' }}>
                {data.photoUrl && (
                    <div className="w-40 h-40 rounded-full overflow-hidden mb-6 border-4 border-white shadow-xl">
                        <img src={data.photoUrl} alt={data.fullName} className="w-full h-full object-cover" />
                    </div>
                )}
                <h1 className="text-5xl font-bold uppercase tracking-wide text-gray-900 mb-2">{data.fullName}</h1>
                <p className="text-xl font-medium tracking-widest uppercase mb-6" style={{ color: themeColor }}>{data.title}</p>

                <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
                    {data.phone && <span className="flex items-center gap-2"><Icons.Phone className="w-4 h-4" /> {data.phone}</span>}
                    {data.email && <span className="flex items-center gap-2"><Icons.Mail className="w-4 h-4" /> {data.email}</span>}
                    {data.location && <span className="flex items-center gap-2"><Icons.MapPin className="w-4 h-4" /> {data.location}</span>}
                </div>
            </div>

            <div className="grid grid-cols-12 gap-12">
                {/* Left Col */}
                <div className="col-span-4 space-y-10">
                    <section>
                        <h3 className="font-bold text-lg uppercase mb-4 tracking-widest">Education</h3>
                        <div className="space-y-6">
                            {data.education.map((edu, i) => (
                                <div key={i}>
                                    <h4 className="font-bold text-gray-900 text-base">{edu.degree}</h4>
                                    <p className="text-sm text-gray-600">{edu.institution}</p>
                                    <p className="text-xs text-gray-400 mt-1">{edu.year}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h3 className="font-bold text-lg uppercase mb-4 tracking-widest">Expertise</h3>
                        <ul className="space-y-3">
                            {data.skills.map(skill => (
                                <li key={skill} className="flex items-center gap-3 text-sm font-medium text-gray-600">
                                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }}></span> {skill}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h3 className="font-bold text-lg uppercase mb-4 tracking-widest">Languages</h3>
                        <ul className="space-y-2">
                            {data.languages.map((lang, i) => (
                                <li key={i} className="text-sm">
                                    <span className="font-bold block text-gray-800">{lang.language}</span>
                                    <span className="text-xs text-gray-500">{lang.level}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                {/* Right Col */}
                <div className="col-span-8 space-y-10 border-l border-gray-100 pl-12 -ml-6">
                    <section>
                        <h3 className="font-bold text-lg uppercase mb-4 tracking-widest">Profile</h3>
                        <div className="text-sm text-gray-600 leading-7 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: data.summary }} />
                    </section>

                    <section>
                        <h3 className="font-bold text-lg uppercase mb-6 tracking-widest">Work Experience</h3>
                        <div className="space-y-8">
                            {data.experience.map((exp, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="font-bold text-xl text-gray-900">{exp.company}</h4>
                                        <span className="font-bold text-sm" style={{ color: themeColor }}>{exp.duration}</span>
                                    </div>
                                    <p className="text-sm font-medium text-gray-500 mb-3">{exp.role}</p>
                                    <p className="text-sm text-gray-600 leading-relaxed">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};


// --- Template 3: Bold (Dani Martinez style) ---
export const TemplateBold = ({ data, themeColor }: TemplateProps) => {
    return (
        <div className="bg-white w-full h-full min-h-[297mm] flex font-sans overflow-hidden">

            {/* Left Gray Sidebar */}
            <div className="w-[35%] bg-gray-100 h-full min-h-[297mm] p-8 flex flex-col items-center text-center">
                {data.photoUrl ? (
                    <div className="w-48 h-48 rounded-full overflow-hidden mb-8 border-8 border-white shadow-lg">
                        <img src={data.photoUrl} alt={data.fullName} className="w-full h-full object-cover" />
                    </div>
                ) : (
                    <div className="w-48 h-48 rounded-full bg-gray-300 mb-8 flex items-center justify-center text-gray-500 font-bold border-8 border-white">
                        Photo
                    </div>
                )}

                <div className="w-full mb-8">
                    <h3 className="bg-gray-700 text-white font-bold uppercase py-2 px-6 rounded-full mb-6 inline-block tracking-wider text-sm w-full">Contact Me</h3>
                    <div className="space-y-4 text-sm text-gray-600 text-left pl-2">
                        {data.phone && <div className="flex items-center gap-3"><Icons.Phone className="w-4 h-4" /> {data.phone}</div>}
                        {data.email && <div className="flex items-center gap-3"><Icons.Mail className="w-4 h-4" /> {data.email}</div>}
                        {data.location && <div className="flex items-center gap-3"><Icons.MapPin className="w-4 h-4" /> {data.location}</div>}
                        {data.socials.map((social, i) => (
                            <div key={i} className="flex items-center gap-3"><Icons.Link className="w-4 h-4" /> {social.url}</div>
                        ))}
                    </div>
                </div>

                <div className="w-full mb-8">
                    <h3 className="bg-gray-700 text-white font-bold uppercase py-2 px-6 rounded-full mb-6 inline-block tracking-wider text-sm w-full">Education</h3>
                    <div className="space-y-6 text-left">
                        {data.education.map((edu, i) => (
                            <div key={i}>
                                <h4 className="font-bold text-gray-800 text-sm">{edu.degree}</h4>
                                <p className="text-xs font-medium text-gray-600">{edu.institution}</p>
                                <p className="text-xs text-gray-500">{edu.year}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full">
                    <h3 className="bg-gray-700 text-white font-bold uppercase py-2 px-6 rounded-full mb-6 inline-block tracking-wider text-sm w-full">Skills</h3>
                    <div className="space-y-3 text-left pl-2">
                        {data.skills.map(skill => (
                            <div key={skill} className="flex items-center gap-3 text-sm font-medium text-gray-600">
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-800"></span> {skill}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Content */}
            <div className="w-[65%] p-12">
                <div className="mb-12">
                    <h1 className="text-6xl font-bold text-gray-900 leading-none mb-2">{data.fullName.split(' ')[0]}</h1>
                    <h1 className="text-6xl font-light text-gray-800 leading-none mb-4">{data.fullName.split(' ').slice(1).join(' ')}</h1>
                    <p className="text-xl uppercase tracking-[0.2em] text-gray-500">{data.title}</p>
                </div>

                <section className="mb-10">
                    <h3 className="text-xl font-bold uppercase mb-4 border-b-2 pb-2 mr-12" style={{ borderColor: themeColor }}>Work Experience</h3>
                    <div className="space-y-8">
                        {data.experience.map((exp, i) => (
                            <div key={i}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h4 className="font-bold text-lg text-gray-800">{exp.role}</h4>
                                    <span className="text-sm font-bold text-gray-500">{exp.duration}</span>
                                </div>
                                <h5 className="font-bold text-sm mb-2" style={{ color: themeColor }}>{exp.company}</h5>
                                <p className="text-sm text-gray-600 leading-relaxed">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h3 className="text-xl font-bold uppercase mb-4 border-b-2 pb-2 mr-12" style={{ borderColor: themeColor }}>References</h3>
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-bold text-gray-800">Generic Reference</h4>
                            <p className="text-xs text-gray-500">Available upon request</p>
                        </div>
                    </div>
                </section>
            </div>

        </div>
    );
};
