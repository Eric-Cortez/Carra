/**
 * Clears the persisted authentication state from localStorage.
 *
 * This function removes the "persist:auth" key from localStorage, effectively clearing
 * any persisted authentication-related data (e.g., user session, tokens, etc.).
 *
 * Note: This action will remove any cached authentication data, so the user may need to
 * log in again after this is called.
 *
 * @returns {void} This function does not return any value.
 */
export function clearAuthState() {
  localStorage.removeItem("persist:auth");
}
