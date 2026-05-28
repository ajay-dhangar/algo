import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

/**
 * Default fallback used only when running locally without an explicit
 * `ALGO_API_URL` environment variable. In production builds this should be
 * overridden via Docusaurus `customFields.apiBaseUrl` (set from `ALGO_API_URL`
 * in CI) so the deployed site does not attempt to reach a developer's
 * localhost.
 */
const DEFAULT_API_BASE_URL = "http://localhost:5000";

/**
 * React hook that returns the API base URL configured via Docusaurus
 * `customFields.apiBaseUrl`. Falls back to the local dev URL when not
 * configured.
 *
 * Use this inside React components/hooks that call the backend so that the
 * URL is environment-driven instead of hardcoded.
 */
export function useApiBase(): string {
  const { siteConfig } = useDocusaurusContext();
  const fromConfig = siteConfig.customFields?.apiBaseUrl;
  return typeof fromConfig === "string" && fromConfig.length > 0
    ? fromConfig
    : DEFAULT_API_BASE_URL;
}
