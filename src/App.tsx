import { useState, useEffect } from "react";
import { z } from "zod";
import { searchSchema } from "@/utils/schema";
import { searchGitHubUser, type GitHubUser } from "@/api/api";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ValidationError } from "@/utils/ValidationError";
import { Moon, Sun, MapPin, Building2, Link as LinkIcon, Calendar, Search } from "lucide-react";

import "@/App.css";

function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Sincroniza o tema com a classe 'dark' no documento
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-primary">GitHub Profiles</h1>
          <div className="flex items-center gap-3">
            {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            <Switch
              checked={isDark}
              onCheckedChange={setIsDark}
              aria-label="Alternar tema escuro"
            />
          </div>
        </div>

        <div className="mb-6">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Digite para buscar... (ex: meu-usuario)"
                value={search}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearch(value);
                  
                  // Validação em tempo real - só valida se há texto
                  if (value.trim()) {
                    try {
                      searchSchema.parse({ query: value });
                      setError(""); // Limpa erro se válido
                    } catch (err) {
                      if (err instanceof z.ZodError) {
                        setError(err.issues[0]?.message || "Erro de validação");
                      }
                    }
                  }
                  // Se vazio, mantém o erro anterior
                }}
                onKeyPress={handleKeyPress}
                maxLength={39}
                aria-invalid={!!error}
                className="pl-10"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={loading || !search || !!error}
              className="px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all whitespace-nowrap"
            >
              {loading ? "Buscando..." : "Buscar"}
            </button>
          </div>
          
          <p className="mt-2 text-xs text-muted-foreground">
            O nome do usuário deve conter apenas letras, números e hifens.
          </p>
          
          <ValidationError message={error} show={!!error} />
        </div>

        {data && (
          <main>
            <Card>
              <CardHeader className="flex flex-row items-start gap-4">
                <a href={data.html_url} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                  <img 
                    src={data.avatar_url} 
                    alt={data.login}
                    className="w-24 h-24 rounded-full border-2 border-primary cursor-pointer"
                  />
                </a>
                <div className="flex-1">
                  <a href={data.html_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    <CardTitle>{data.name || data.login}</CardTitle>
                  </a>
                  <CardDescription className="mt-1">@{data.login}</CardDescription>
                  {data.bio && <p className="mt-2 text-sm text-foreground">{data.bio}</p>}
                  {data.location && (
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{data.location}</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <Separator />

              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4">
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
              </CardContent>
              <Separator />

              <CardFooter className="flex flex-col gap-2 text-xs text-muted-foreground">
                {data.company && (
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    <span>{data.company}</span>
                  </div>
                )}
                {data.blog && (
                  <div className="flex items-center gap-2">
                    <LinkIcon className="h-4 w-4" />
                    <a href={data.blog} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{data.blog}</a>
                  </div>
                )}
                <div className="flex items-center gap-2 p-2">
                  <Calendar className="h-4 w-4" />
                  <span>Conta criada em {new Date(data.created_at).toLocaleDateString('pt-BR')}</span>
                </div>
              </CardFooter>
            </Card>
          </main>
        )}
      </div>
    </div>
  );
}

export default App;
