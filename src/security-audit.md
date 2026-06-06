# Auditoria de Segurança - Chaves do Supabase

## Resumo
Realizada varredura completa no código-fonte para identificar exposição de chaves do Supabase diretamente no código.

## Arquivos Encontrados com Chaves Expostas

### 1. `src/integrations/supabase/client.ts`
**Linha 3-4**: Contém URL e chave do Supabase hardcoded
```typescript
const SUPABASE_URL = "https://pwdmcdtjtnrnvidkfvsq.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3ZG1jZHRqdG5ybnZpZGtmdnNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1OTA2MDIsImV4cCI6MjA5NjE2NjYwMn0.jq5j27yGZP6AvjZyVs61SptmZs68ou4Pl1pbfFGyFkI";
```

### 2. `src/App.tsx`
**Linha 1**: Importação do componente toaster, mas não há chaves expostas neste arquivo.

### 3. `src/contexts/auth/hooks/useAuth.ts`
**Linha 3**: Importa o client do Supabase, mas as chaves estão centralizadas no arquivo de configuração.
```typescript
import { supabase } from "@/integrations/supabase/client";
```

### 4. `src/contexts/auth/components/GoogleButton.tsx`
**Linha 3**: Importa o client do Supabase, mas as chaves estão centralizadas no arquivo de configuração.
```typescript
import { supabase } from "@/integrations/supabase/client";
```

### 5. `src/contexts/disciplinas/hooks/useDisciplinas.ts`
**Linha 3**: Importa o client do Supabase, mas as chaves estão centralizadas no arquivo de configuração.
```typescript
import { supabase } from "@/integrations/supabase/client";
```

### 6. `src/contexts/disciplinas/hooks/useDisciplinaBySlug.ts`
**Linha 3**: Importa o client do Supabase, mas as chaves estão centralizadas no arquivo de configuração.
```typescript
import { supabase } from "@/integrations/supabase/client";
```

### 7. `src/contexts/quizzes/hooks/useQuizzesByDisciplina.ts`
**Linha 3**: Importa o client do Supabase, mas as chaves estão centralizadas no arquivo de configuração.
```typescript
import { supabase } from "@/integrations/supabase/client";
```

### 8. `src/pages/DisciplinaPage.tsx`
**Linha 5**: Importa o client do Supabase, mas as chaves estão centralizadas no arquivo de configuração.
```typescript
import { supabase } from "@/integrations/supabase/client";
```

### 9. `src/components/Header.tsx`
**Linha 9**: Importa o client do Supabase, mas as chaves estão centralizadas no arquivo de configuração.
```typescript
import { supabase } from "@/integrations/supabase/client";
```

## Análise de Risco

**Risco CRÍTICO**: O arquivo `src/integrations/supabase/client.ts` contém as chaves do Supabase hardcoded diretamente no código, o que viola protocolos de segurança.

**Risco BAIXO**: Os demais arquivos apenas importam o cliente do Supabase de forma centralizada, o que é uma boa prática.

## Recomendações

1. **IMEDIATA**: Mover as chaves do arquivo `src/integrations/supabase/client.ts` para variáveis de ambiente
2. Criar arquivo `.env.example` com template das variáveis necessárias
3. Atualizar `src/integrations/supabase/client.ts` para usar `import.meta.env`
4. Verificar se o `.gitignore` está adequado para não expor chaves

## Status de Segurança
⚠️ **CRÍTICO**: Exposição de chaves detectada. Necessita correção imediata.