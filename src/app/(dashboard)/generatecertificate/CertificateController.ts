// Certificate Controller
// Frontend-only implementation for certificate generation

export interface CertificateData {
  name: string;
  courseName: string;
  hours: string;
  minutes: string;
  centerName: string;
}

export const CertificateController = {
  // Validate certificate data
  validateData: (data: CertificateData): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!data.name.trim()) {
      errors.push('Student name is required');
    }

    if (!data.courseName.trim()) {
      errors.push('Course name is required');
    }

    if (!data.hours || data.hours === '') {
      errors.push('Hours is required');
    } else if (!/^\d{2,3}$/.test(data.hours)) {
      errors.push('Hours must be 2-3 digits');
    }

    if (!data.minutes || data.minutes === '') {
      errors.push('Minutes is required');
    } else if (!/^\d{1,2}$/.test(data.minutes)) {
      errors.push('Minutes must be 1-2 digits');
    } else if (parseInt(data.minutes) > 60) {
      errors.push('Minutes cannot exceed 60');
    }

    if (!data.centerName.trim()) {
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
