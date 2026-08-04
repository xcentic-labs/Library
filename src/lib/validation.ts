// Shared client-side validation rules for auth forms

// Letters, spaces and the usual name punctuation ( . ' - ), 3-50 chars
export const NAME_REGEX = /^[A-Za-z][A-Za-z.'\-\s]{2,49}$/;

// Indian mobile number: 10 digits starting with 6-9
export const PHONE_REGEX = /^[6-9]\d{9}$/;

// Returns an error message, or null when the value is valid
export const validateName = (name: string): string | null => {
    const value = name.trim();

    if (!value) return "Name is required";
    if (value.length < 3) return "Name must be at least 3 characters";
    if (value.length > 50) return "Name cannot exceed 50 characters";
    if (!NAME_REGEX.test(value)) return "Name can only contain letters and spaces";

    return null;
};

export const validatePhoneNumber = (phoneNumber: string): string | null => {
    const value = phoneNumber.trim();

    if (!value) return "Phone number is required";
    if (!/^\d+$/.test(value)) return "Phone number can only contain digits";
    if (value.length !== 10) return "Phone number must be exactly 10 digits";
    if (!PHONE_REGEX.test(value)) return "Phone number must start with 6, 7, 8 or 9";

    return null;
};

// Input filters - keep the field from ever holding invalid characters
export const sanitizeName = (value: string): string =>
    value.replace(/[^A-Za-z.'\-\s]/g, "").slice(0, 50);

export const sanitizePhoneNumber = (value: string): string =>
    value.replace(/\D/g, "").slice(0, 10);
