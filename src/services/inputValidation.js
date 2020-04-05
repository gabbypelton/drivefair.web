export const passwordValidation = (password) => {
  if (
    !password.match(
      /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/
    )
  ) {
    return "Password must be at least 8 characters and have a lowercase, uppercase, number, and special character.";
  }
};

export const confirmPasswordValidation = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return "Passwords do not match."
  }
}

export const emailValidation = (email) => {
  if (!email.match(/.*@.*\..*/)) {
    return "Invalid email address.";
  }
};
