'use client';

import { useState } from 'react';
import { FaShieldAlt, FaChevronDown, FaChevronUp, FaInfoCircle, FaEnvelope, FaCalendarAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface PolicySection {
  id: string;
  title: string;
  content: string;
  isExpanded?: boolean;
}

export default function PrivacyPolicy() {
  const [expandedSections, setExpandedSections] = useState<string[]>(['overview']);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const policySections: PolicySection[] = [
    {
      id: 'overview',
      title: 'Privacy Overview',
      content: `We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our community platform and services.

Your trust is important to us, and we strive to be transparent about our data practices. We only collect information that is necessary to provide you with our services and enhance your experience within our community.`
    },
    {
      id: 'information-collection',
      title: 'Information We Collect',
      content: `We collect several types of information to provide and improve our services:

Personal Information: Name, email address, phone number, and other contact details you provide when registering or contacting us.

Usage Data: Information about how you interact with our platform, including pages visited, time spent, and features used.

Device Information: Technical data about your device, browser type, IP address, and operating system.

Communication Data: Messages, feedback, and other communications you send to us or share within our community platform.`
    },
    {
      id: 'information-use',
      title: 'How We Use Your Information',
      content: `We use the collected information for the following purposes:

Service Provision: To create and manage your account, provide customer support, and deliver our community services.

Communication: To send you important announcements, updates, newsletters, and respond to your inquiries.

Platform Improvement: To analyze usage patterns, fix bugs, develop new features, and enhance user experience.

Security: To protect against fraud, unauthorized access, and ensure the safety of our platform and users.

Legal Compliance: To comply with applicable laws, regulations, and legal processes.`
    },
    {
      id: 'information-sharing',
      title: 'Information Sharing and Disclosure',
      content: `We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:

Service Providers: With trusted third-party service providers who assist us in operating our platform, subject to confidentiality agreements.

Legal Requirements: When required by law, court order, or government request, or to protect our rights and safety.

Business Transfers: In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.

Consent: With your explicit consent for specific purposes not covered in this policy.`
    },
    {
      id: 'data-security',
      title: 'Data Security and Protection',
      content: `We implement robust security measures to protect your personal information:

Encryption: All sensitive data is encrypted both in transit and at rest using industry-standard protocols.

Access Controls: Strict access controls ensure only authorized personnel can access your information on a need-to-know basis.

Regular Audits: We conduct regular security audits and assessments to identify and address potential vulnerabilities.

Secure Infrastructure: Our systems are hosted on secure, monitored servers with multiple layers of protection.

However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.`
    },
    {
      id: 'user-rights',
      title: 'Your Rights and Choices',
      content: `You have several rights regarding your personal information:

Access: You can request a copy of the personal information we hold about you.

Correction: You can request corrections to inaccurate or incomplete information.

Deletion: You can request deletion of your personal information, subject to legal and operational requirements.

Portability: You can request your data in a portable format to transfer to another service.

Opt-out: You can unsubscribe from marketing communications and adjust your privacy preferences.

To exercise these rights, please contact us using the information provided at the end of this policy.`
    },
    {
      id: 'cookies',
      title: 'Cookies and Tracking Technologies',
      content: `We use cookies and similar technologies to enhance your experience:

Essential Cookies: Required for basic platform functionality, such as maintaining your login session.

Analytics Cookies: Help us understand how you use our platform to improve performance and user experience.

Preference Cookies: Remember your settings and preferences for a personalized experience.

You can control cookie preferences through your browser settings, though disabling certain cookies may affect platform functionality.`
    },
    {
      id: 'children-privacy',
      title: 'Children\'s Privacy',
      content: `Our platform is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.

If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information promptly.

Parents and guardians who believe their child has provided personal information to us should contact us immediately.`
    },
    {
      id: 'policy-updates',
      title: 'Policy Updates and Changes',
      content: `We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements.

We will notify you of significant changes by posting the updated policy on our platform and, where appropriate, sending you an email notification.

The "Last Updated" date at the top of this policy indicates when the most recent changes were made.

We encourage you to review this policy periodically to stay informed about how we protect your information.`
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const contentVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <section className="mt-10 w-full px-4 sm:px-6 md:px-8 lg:px-16 py-12 bg-gradient-to-b from-white to-[#eae6d7] min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header section */}
        <div className="mb-8 md:mb-12 text-center">
          <div className="inline-block bg-[#dad5be] p-3 rounded-lg mb-4">
            <FaShieldAlt className="text-[#fc7651]" size={32} />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1c3f3a] mb-4">
            Privacy Policy
          </h1>
          <p className="text-[#32524D] max-w-2xl mx-auto mb-4">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
          </p>
          <div className="flex items-center justify-center text-[#32524D] text-sm">
            <FaCalendarAlt size={14} className="mr-2" />
            <span>Last Updated: June 7, 2025</span>
          </div>
        </div>

        {/* Policy sections */}
        <div className="space-y-4">
          {policySections.map((section, index) => (
            <motion.div
              key={section.id}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="bg-[#eae6d7] border-l-4 border-[#32524D] rounded-xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full p-6 text-left hover:bg-[#dad5be] transition-colors focus:outline-none focus:bg-[#dad5be]"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-[#1c3f3a] pr-4">
                    {section.title}
                  </h2>
                  {expandedSections.includes(section.id) ? (
                    <FaChevronUp className="text-[#32524D] flex-shrink-0" size={16} />
                  ) : (
                    <FaChevronDown className="text-[#32524D] flex-shrink-0" size={16} />
                  )}
                </div>
              </button>
              
              <motion.div
                initial="hidden"
                animate={expandedSections.includes(section.id) ? "visible" : "hidden"}
                variants={contentVariants}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6">
                  <div className="prose prose-sm max-w-none">
                    <p className="text-[#32524D] leading-relaxed whitespace-pre-line">
                      {section.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Contact section */}
        <div className="mt-12 bg-[#1c3f3a] rounded-xl p-8 text-center">
          <div className="inline-block bg-[#32524D] p-3 rounded-lg mb-4">
            <FaEnvelope className="text-[#fc7651]" size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">
            Questions About Your Privacy?
          </h3>
          <p className="text-[#eae6d7] mb-6 max-w-2xl mx-auto">
            If you have any questions about this Privacy Policy or how we handle your personal information, 
            please don't hesitate to contact us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="mailto:privacy@community.com" 
              className="bg-[#fc7651] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#e56543] transition-colors"
            >
              Email Us
            </a>
            <span className="text-[#eae6d7] text-sm">
                info@thepathcatalyst.com
            </span>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-8 text-center">
          <p className="text-[#32524D] text-sm">
            This Privacy Policy is part of our Terms of Service and governs your use of our platform.
          </p>
        </div>
      </div>
    </section>
  );
}