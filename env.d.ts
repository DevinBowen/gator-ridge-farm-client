/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />

interface importMeta {
  env: {
    [key: string]: string|boolean|number
  }
}
