export const API_BASE = "https://api.github.com";

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string;
  location: string | null;
  bio: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export async function searchGitHubUser(username: string): Promise<GitHubUser> {
  const url = `${API_BASE}/users/${username}`;
  
  const response = await fetch(url, {
    headers: {
      "Accept": "application/vnd.github.v3+json",
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Usuário "${username}" não encontrado`);
    }
    throw new Error(`Erro na requisição: ${response.status}`);
  }

  return response.json();
}
