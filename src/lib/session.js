// This file contains the configuration for iron-session

export const ironOptions = {
  cookieName: "cci_admin_session",
  password: "complex_password_at_least_32_characters_long_for_iron_session_encryption",
  // secure: true should be used in production (HTTPS) but can be false in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8, // 8 hours
  },
};
