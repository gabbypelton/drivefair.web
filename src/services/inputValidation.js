export const passwordValidation = (password, required) => {
  if (!password && !required) return;
  if (
    !password.match(
      /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/
    )
  ) {
    return "Password must be at least 8 characters and have a lowercase, uppercase, number, and special character.";
  }
};

export const confirmPasswordValidation = (
  password,
  confirmPassword,
  required
) => {
  if (!password && !confirmPassword && !required) return;
  if (password !== confirmPassword) {
    return "Passwords do not match.";
  }
};

export const emailValidation = (email, required) => {
  if (!email && !required) return;
  if (!email.match(/.*@.*\..*/)) {
    return "Invalid email address.";
  }
};
