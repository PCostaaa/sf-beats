import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
  localStorage.clear();
});

// react-scroll's <Link> calls window.scrollTo/getBoundingClientRect on targets
// that don't exist in isolated component tests. Render it as a plain anchor
// so tests can still assert on it (text, click, attributes).
vi.mock("react-scroll", () => ({
  Link: ({ children, to, smooth, duration, offset, ...rest }) => (
    <a href={`#${to}`} data-testid={`scroll-link-${to}`} {...rest}>
      {children}
    </a>
  ),
}));

// Fake credential payload — the real one is a base64url JWT, but we mock
// jwt-decode so the contents are arbitrary.
const FAKE_CREDENTIAL = "header.payload.signature";

vi.mock("@react-oauth/google", () => ({
  GoogleOAuthProvider: ({ children }) => children,
  GoogleLogin: ({ onSuccess }) => (
    <button
      type="button"
      data-testid="google-login"
      onClick={() => onSuccess({ credential: FAKE_CREDENTIAL })}
    >
      Sign in with Google
    </button>
  ),
  googleLogout: vi.fn(),
}));

vi.mock("jwt-decode", () => ({
  jwtDecode: () => ({
    name: "Test User",
    email: "test@example.com",
    picture: "https://example.com/avatar.png",
  }),
}));
