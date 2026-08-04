// Certificate Controller
// Frontend-only implementation for certificate generation

export interface CertificateData {
  name: string;
  courseName: string;
  hours: string;
  minutes: string;
  centerName: string;
}

export type TemplateId = 'template1' | 'template2';

export interface TemplateConfig {
  id: TemplateId;
  label: string;
  src: string;
  // Fields the template actually prints (and therefore requires)
  fields: (keyof CertificateData)[];
}

// Positions/sizes below are ratios of the template image height/width, so the
// text stays in place whatever the source image resolution is.
export const TEMPLATES: Record<TemplateId, TemplateConfig> = {
  template1: {
    id: 'template1',
    label: 'Template 1 (Professional)',
    src: '/certificatetemp1.png',
    fields: ['name', 'courseName', 'hours', 'minutes', 'centerName'],
  },
  template2: {
    id: 'template2',
    label: 'Template 2 (Achievement)',
    src: '/certificatetemp2.jpeg',
    fields: ['name'],
  },
};

export const CertificateController = {
  // Validate certificate data for the given template
  validateData: (
    data: CertificateData,
    templateId: TemplateId = 'template1'
  ): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];
    const fields = TEMPLATES[templateId].fields;

    if (fields.includes('name') && !data.name.trim()) {
      errors.push('Student name is required');
    }

    if (fields.includes('courseName') && !data.courseName.trim()) {
      errors.push('Course name is required');
    }

    if (fields.includes('hours')) {
      if (!data.hours || data.hours === '') {
        errors.push('Hours is required');
      } else if (!/^\d{2,3}$/.test(data.hours)) {
        errors.push('Hours must be 2-3 digits');
      }
    }

    if (fields.includes('minutes')) {
      if (!data.minutes || data.minutes === '') {
        errors.push('Minutes is required');
      } else if (!/^\d{1,2}$/.test(data.minutes)) {
        errors.push('Minutes must be 1-2 digits');
      } else if (parseInt(data.minutes) > 60) {
        errors.push('Minutes cannot exceed 60');
      }
    }

    if (fields.includes('centerName') && !data.centerName.trim()) {
      errors.push('Center name is required');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  // Format duration
  formatDuration: (hours: string, minutes: string): string => {
    return `${hours} hours ${minutes} minutes`;
  },

  // Generate filename
  generateFilename: (name: string): string => {
    return `certificate-${name.replace(/\s+/g, '_')}-${Date.now()}.png`;
  },
};
