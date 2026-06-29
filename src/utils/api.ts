import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export const useApiBaseUrl = (): string => {
  const { siteConfig } = useDocusaurusContext();
  const apiBaseUrl = siteConfig.customFields?.apiBaseUrl;

  if (typeof apiBaseUrl !== "string") {
    return "";
  }

  return apiBaseUrl.replace(/\/$/, "");
};

export const buildApiUrl = (apiBaseUrl: string, path: string): string => {
  if (!apiBaseUrl) {
    return path;
  }

  if (path.startsWith("/")) {
    return `${apiBaseUrl}${path}`;
  }

  return `${apiBaseUrl}/${path}`;
};
