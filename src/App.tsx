import { useState } from "react";
import { z } from "zod";
import { searchSchema } from "@/utils/schema";
import { Input } from "@/components/ui/input";

import "@/App.css";

function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setData(null);

    try {
      // Valida com Zod
      const validated = searchSchema.parse({ query: search });
      
      setLoading(true);

      // Substitua pela sua URL de API real
      const response = await fetch(`/api/search?q=${encodeURIComponent(validated.query)}`);
      
      if (!response.ok) throw new Error("Erro na busca");
      
      const result = await response.json();
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
          
          {error && (
            <div className="mt-2 text-sm text-destructive flex items-center gap-2">
              <span className="text-lg">⚠️</span>
              <span>{error}</span>
            </div>
          )}
          
          {!error && search && (
            <div className="mt-2 text-sm text-green-600 flex items-center gap-2">
              <span className="text-lg">✓</span>
              <span>Válido!</span>
            </div>
          )}
        </div>

        {data && (
          <div className="p-6 bg-card border border-border rounded-lg">
            <h2 className="font-bold mb-4 text-primary">Resultado:</h2>
            <pre className="text-sm overflow-auto max-h-96 bg-background p-4 rounded border border-border">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
