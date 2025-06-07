'use client';

import { useState } from 'react';
import { FaGavel, FaChevronDown, FaChevronUp, FaInfoCircle, FaEnvelope, FaCalendarAlt, FaExclamationTriangle } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface TermsSection {
  id: string;
  title: string;
  content: string;
  isImportant?: boolean;
}

export default function TermsAndConditions() {
  const [expandedSections, setExpandedSections] = useState<string[]>(['acceptance']);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const termsSections: TermsSection[] = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      content: `By accessing and using our community platform and services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.

These terms constitute a legally binding agreement between you and our community platform. If you do not agree with any part of these terms, you must not use our services.

Your continued use of our platform after any modifications to these terms constitutes acceptance of the updated terms.`,
      isImportant: true
    },
    {
      id: 'eligibility',
      title: 'User Eligibility and Registration',
      content: `To use our platform, you must:

Age Requirement: Be at least 13 years of age. Users under 18 must have parental or guardian consent.

Accurate Information: Provide accurate, current, and complete information during registration and keep your account information updated.

Account Security: Maintain the confidentiality of your account credentials and notify us immediately of any unauthorized access.

One Account: Maintain only one account per person unless explicitly authorized by us.

Prohibited Users: Not be prohibited from using our services under applicable laws or previous violations of our terms.`
    },
    {
      id: 'acceptable-use',
      title: 'Acceptable Use Policy',
      content: `You agree to use our platform responsibly and in accordance with these guidelines:

Permitted Uses:
• Engage in respectful community discussions
• Share relevant, appropriate content
• Use features as intended
• Report violations or concerns to moderators

Prohibited Activities:
• Harassment, bullying, or threatening behavior
• Posting illegal, harmful, or offensive content
• Spam, misleading information, or unauthorized advertising
• Impersonation or misrepresentation
• Attempting to hack, disrupt, or compromise platform security
• Violating intellectual property rights
• Any activity that interferes with other users' experience`,
      isImportant: true
    },
    {
      id: 'content-policy',
      title: 'Content Guidelines and Ownership',
      content: `User-Generated Content:
You retain ownership of content you create and post on our platform. However, by posting content, you grant us a non-exclusive, worldwide, royalty-free license to use, display, and distribute your content within our platform.

Content Standards:
All content must be appropriate, respectful, and comply with community guidelines. We reserve the right to remove content that violates these standards.

Intellectual Property:
Respect others' intellectual property rights. Only post content you own or have permission to use.

Content Monitoring:
We may, but are not obligated to, monitor, review, or moderate user content. We reserve the right to remove content at our discretion.

Backup Responsibility:
You are responsible for maintaining backups of your important content.`
    },
    {
      id: 'community-guidelines',
      title: 'Community Standards and Conduct',
      content: `Our community thrives on mutual respect and positive engagement:

Expected Behavior:
• Treat all community members with respect and courtesy
• Contribute constructively to discussions
• Follow topic-specific guidelines in different sections
• Report concerns through appropriate channels
• Respect privacy and personal boundaries

Enforcement Actions:
Violations may result in warnings, temporary suspension, or permanent account termination, depending on severity and frequency.

Appeal Process:
If you believe enforcement action was taken in error, you may appeal through our designated process within 30 days.

Community Moderation:
We employ both automated systems and human moderators to maintain community standards.`
    },
    {
      id: 'privacy-data',
      title: 'Privacy and Data Protection',
      content: `Your privacy is important to us. Our data practices are governed by our Privacy Policy, which is incorporated into these Terms by reference.

Data Collection: We collect information necessary to provide and improve our services.

Data Use: We use your data to operate the platform, communicate with you, and enhance user experience.

Data Sharing: We do not sell your personal information to third parties.

Data Security: We implement appropriate security measures to protect your information.

Your Rights: You have rights regarding your personal data as outlined in our Privacy Policy.

For detailed information about our privacy practices, please review our Privacy Policy.`
    },
    {
      id: 'services-availability',
      title: 'Service Availability and Modifications',
      content: `Platform Availability:
We strive to maintain continuous service availability but cannot guarantee uninterrupted access. Services may be temporarily unavailable due to maintenance, updates, or technical issues.

Service Modifications:
We reserve the right to modify, suspend, or discontinue any aspect of our services at any time, with or without notice.

Feature Changes:
New features may be added, and existing features may be modified or removed to improve user experience.

Account Termination:
We may terminate or suspend accounts that violate these terms or for other legitimate business reasons.

No Guarantee:
While we strive to provide reliable services, we make no warranties about service availability, performance, or fitness for particular purposes.`
    },
    {
      id: 'liability-disclaimers',
      title: 'Liability and Disclaimers',
      content: `Service "As Is":
Our platform is provided "as is" without warranties of any kind, express or implied.

Limitation of Liability:
To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services.

User Content:
We are not responsible for user-generated content or interactions between users. Users are solely responsible for their content and conduct.

Third-Party Links:
Our platform may contain links to third-party websites or services. We are not responsible for their content or practices.

Maximum Liability:
Our total liability for any claims related to our services shall not exceed the amount you paid us in the 12 months preceding the claim.`,
      isImportant: true
    },
    {
      id: 'dispute-resolution',
      title: 'Dispute Resolution and Legal Terms',
      content: `Governing Law:
These Terms are governed by the laws of [Your Jurisdiction], without regard to conflict of law principles.

Dispute Resolution Process:
1. Direct Communication: First, attempt to resolve disputes through direct communication with our support team.
2. Mediation: If direct resolution fails, disputes may be resolved through mediation.
3. Arbitration: Binding arbitration may be required for certain disputes, as permitted by law.

Class Action Waiver:
You agree not to participate in class action lawsuits against us, except where prohibited by law.

Severability:
If any provision of these Terms is found invalid, the remaining provisions continue in full force.

Entire Agreement:
These Terms, along with our Privacy Policy, constitute the entire agreement between you and us.`
    },
    {
      id: 'termination',
      title: 'Account Termination and Consequences',
      content: `Your Right to Terminate:
You may terminate your account at any time by following the account deletion process in your settings.

Our Right to Terminate:
We may terminate or suspend your account for violations of these Terms, illegal activity, or other legitimate reasons.

Effect of Termination:
Upon termination:
• Your access to the platform will be revoked
• Your content may be deleted (though some may be retained for legal or operational purposes)
• These Terms continue to apply to past use of our services

Data Retention:
Some information may be retained after account termination for legal, safety, or operational purposes as outlined in our Privacy Policy.

Reactivation:
Terminated accounts may not be eligible for reactivation, depending on the reason for termination.`
    },
    {
      id: 'updates-contact',
      title: 'Terms Updates and Contact Information',
      content: `Terms Updates:
We may update these Terms periodically to reflect changes in our services, legal requirements, or business practices.

Notification of Changes:
Significant changes will be communicated through:
• Email notifications to registered users
• Platform announcements
• Updated "Last Modified" date on this page

Continued Use:
Your continued use of our platform after Terms updates constitutes acceptance of the new terms.

Contact for Questions:
If you have questions about these Terms, please contact us using the information provided below.

Effective Date:
These Terms are effective as of the date last modified and apply to all users of our platform.`
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
            <FaGavel className="text-[#fc7651]" size={32} />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1c3f3a] mb-4">
            Terms and Conditions
          </h1>
          <p className="text-[#32524D] max-w-2xl mx-auto mb-4">
            Please read these terms carefully before using our community platform. By using our services, you agree to these terms.
          </p>
          <div className="flex items-center justify-center text-[#32524D] text-sm">
            <FaCalendarAlt size={14} className="mr-2" />
            <span>Last Updated: June 7, 2025</span>
          </div>
        </div>

        {/* Important notice */}
        <div className="bg-[#fc7651] bg-opacity-10 border-l-4 border-[#fc7651] rounded-lg p-4 mb-8">
          <div className="flex items-start">
            <FaExclamationTriangle className="text-[#fc7651] mr-3 mt-1 flex-shrink-0" size={18} />
            <div>
              <h3 className="font-semibold text-[#1c3f3a] mb-2">Important Notice</h3>
              <p className="text-[#32524D] text-sm">
                These Terms and Conditions constitute a legal agreement. Please read them carefully. 
                By using our platform, you agree to be bound by these terms.
              </p>
            </div>
          </div>
        </div>


        {/* Terms sections */}
        <div className="space-y-4">
          {termsSections.map((section, index) => (
            <motion.div
              key={section.id}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className={`bg-[#eae6d7] rounded-xl shadow-md overflow-hidden ${
                section.isImportant 
                  ? 'border-l-4 border-[#fc7651]' 
                  : 'border-l-4 border-[#32524D]'
              }`}
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full p-6 text-left hover:bg-[#dad5be] transition-colors focus:outline-none focus:bg-[#dad5be]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <h2 className="text-xl font-bold text-[#1c3f3a] pr-4">
                      {section.title}
                    </h2>
                    {section.isImportant && (
                      <span className="bg-[#fc7651] text-white text-xs px-2 py-1 rounded-full font-medium">
                        Important
                      </span>
                    )}
                  </div>
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
                    <div className="text-[#32524D] leading-relaxed whitespace-pre-line">
                      {section.content}
                    </div>
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
            Questions About These Terms?
          </h3>
          <p className="text-[#eae6d7] mb-6 max-w-2xl mx-auto">
            If you have any questions about these Terms and Conditions or need clarification 
            on any provisions, please contact our legal team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="mailto:legal@community.com" 
              className="bg-[#fc7651] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#e56543] transition-colors"
            >
              Contact Legal Team
            </a>
            <span className="text-[#eae6d7] text-sm">
                info@thepathcatalyst.com
            </span>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-8 text-center">
          <p className="text-[#32524D] text-sm">
            These Terms and Conditions work together with our Privacy Policy to govern your use of our platform.
          </p>
        </div>
      </div>
    </section>
  );
}