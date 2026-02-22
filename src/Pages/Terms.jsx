import { Shield, FileText, Lock, Scale, AlertCircle } from 'lucide-react';

const Terms = () => {
    const sections = [
        {
            icon: Shield,
            title: "1. Acceptance of Terms",
            content: "By accessing and using Core Archive, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. We reserve the right to modify these terms at any time, and your continued use of the platform constitutes acceptance of those changes."
        },
        {
            icon: FileText,
            title: "2. User Obligations",
            content: "Users must provide accurate information when creating an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree not to use the service for any unlawful purposes or to violate any academic integrity policies."
        },
        {
            icon: Lock,
            title: "3. Privacy & Data Security",
            content: "Your privacy is paramount. We collect and process data in accordance with our Privacy Policy. We implement industry-standard security measures to protect your digital essential data, but we cannot guarantee absolute security of information transmitted over the internet."
        },
        {
            icon: Scale,
            title: "4. Intellectual Property",
            content: "The content available on Core Archive, including text, graphics, logos, and software, is the property of Core Archive or its content suppliers and is protected by international copyright laws. Users are granted a limited, non-exclusive license to access content for personal, non-commercial use."
        },
        {
            icon: AlertCircle,
            title: "5. Limitation of Liability",
            content: "Core Archive provides services on an 'as is' and 'as available' basis. We do not warrant that the service will be uninterrupted or error-free. In no event shall Core Archive be liable for any direct, indirect, incidental, or consequential damages arising out of the use of our service."
        }
    ];

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Header Section */}
            <div className="relative pt-24 pb-16 bg-indigo-950 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[100%] bg-teal-500/20 rounded-full blur-[120px]"></div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
                        Terms of <span className="text-teal-400">Service</span>
                    </h1>
                    <p className="text-xl text-indigo-100 max-w-2xl mx-auto font-light leading-relaxed">
                        The Foundation of Our Relationship. Preserving the integrity of the digital archive.
                    </p>
                    <div className="mt-8 text-sm font-bold uppercase tracking-widest text-teal-500">
                        Last Updated: February 22, 2026
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 -mt-10 relative z-20">
                <div className="max-w-4xl mx-auto space-y-8">
                    {sections.map((section, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-gray-100 hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                <div className="w-16 h-16 bg-indigo-50 text-indigo-700 rounded-2xl flex items-center justify-center shrink-0">
                                    <section.icon size={32} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-indigo-950 mb-4">{section.title}</h2>
                                    <p className="text-gray-600 leading-relaxed text-lg">
                                        {section.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Contact Support Note */}
                    <div className="bg-teal-50 rounded-[2rem] p-10 text-center border border-teal-100">
                        <h3 className="text-xl font-bold text-teal-900 mb-4 italic">Have questions about our terms?</h3>
                        <p className="text-teal-700 mb-6 font-medium">Our legal and support teams are here to clarify any points regarding your data and usage.</p>
                        <a
                            href="/Contact"
                            className="inline-block px-10 py-4 bg-teal-600 text-white rounded-2xl font-black shadow-lg hover:bg-teal-700 transition-all hover:scale-105 active:scale-95"
                        >
                            Contact Support
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terms;
