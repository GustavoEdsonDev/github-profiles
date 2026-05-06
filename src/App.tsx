import { useState } from "react";
import { z } from "zod";
import { searchSchema } from "@/utils/schema";
import { searchGitHubUser, type GitHubUser } from "@/api/api";
import { Input } from "@/components/ui/input";
import { ValidationError } from "@/components/ValidationError";

import "@/App.css";

function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setData(null);

    try {
      // Valida com Zod
      const validated = searchSchema.parse({ query: search });
      
      setLoading(true);

      // Busca usuário no GitHub
      const result = await searchGitHubUser(validated.query);
      setData(result);
    } catch (err) {
      if (err instanceof z.ZodError) {
        // Pega a primeira mensagem de erro
        const firstError = err.issues[0];
        setError(firstError?.message || "Erro de validação");
        console.error("Erro Zod:", err.issues);
      } else {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-primary">Digite o nome do usuário aqui</h1>
        <div className="mb-4 text-sm text-muted-foreground">
          <p className="mb-2"><strong>Regras:</strong></p>
          <ul className="list-disc list-inside space-y-1">
            <li>Apenas letras (a-z), números (0-9) e hifens (-)</li>
            <li>Não pode começar ou terminar com hífen</li>
            <li>Sem hifens consecutivos (--)</li>
            <li>Sem espaços</li>
            <li>Máximo 39 caracteres</li>
          </ul>
        </div>
        <div className="mb-6">
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                placeholder="Digite para buscar... (ex: meu-usuario)"
                value={search}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearch(value);
                  setError("");
                  
                  // Validação em tempo real
                  if (value.trim()) {
                    try {
                      searchSchema.parse({ query: value });
                    } catch (err) {
                      if (err instanceof z.ZodError) {
                        setError(err.issues[0]?.message || "Erro de validação");
                      }
                    }
                  }
                }}
                onKeyPress={handleKeyPress}
                maxLength={39}
                aria-invalid={!!error}
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={loading || !search || !!error}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 disabled:opacity-50 transition-opacity whitespace-nowrap cursor-pointer"
            >
              {loading ? "Buscando..." : "Buscar"}
            </button>
          </div>
          
          <ValidationError message={error} show={!!error} />
        </div>

        {data && (
          <div className="p-6 bg-card border border-border rounded-lg space-y-4">
            <div className="flex items-start gap-4">
              <img 
                src={data.avatar_url} 
                alt={data.login}
                className="w-24 h-24 rounded-full border-2 border-primary"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-primary">{data.name || data.login}</h2>
                <p className="text-muted-foreground">@{data.login}</p>
                {data.bio && <p className="mt-2">{data.bio}</p>}
                {data.location && <p className="text-sm text-muted-foreground">📍 {data.location}</p>}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{data.public_repos}</div>
                <p className="text-sm text-muted-foreground">Repositórios</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{data.followers}</div>
                <p className="text-sm text-muted-foreground">Seguidores</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{data.following}</div>
                <p className="text-sm text-muted-foreground">Seguindo</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{data.public_gists}</div>
                <p className="text-sm text-muted-foreground">Gists</p>
              </div>
            </div>
            
            <div className="pt-4 border-t border-border text-xs text-muted-foreground space-y-1">
              {data.company && <p>🏢 {data.company}</p>}
              {data.blog && <p>🔗 <a href={data.blog} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{data.blog}</a></p>}
              <p>📅 Conta criada em {new Date(data.created_at).toLocaleDateString('pt-BR')}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
