// Shared minimum bar for any password this app hashes and stores - signup,
// forgot-password, and all three "change password" endpoints previously
// called bcrypt.hash directly on whatever string was sent, with nothing
// upstream checking length or basic strength.
const MIN_LENGTH = 8;

function passwordError(password) {
  if (typeof password !== "string" || password.length < MIN_LENGTH) {
    return `Password must be at least ${MIN_LENGTH} characters long.`;
  }
  return null;
}

module.exports = { passwordError, MIN_LENGTH };
