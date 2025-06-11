// Este script é apenas para referência e deve ser executado manualmente
// para remover os arquivos duplicados em inglês

import fs from "fs"
import path from "path"

const duplicatedFiles = [
  "app/patients/page.tsx",
  "app/patients/loading.tsx",
  "app/appointments/page.tsx",
  "app/appointments/new/page.tsx",
  "app/notes/page.tsx",
  "app/notes/loading.tsx",
  "app/notes/new/page.tsx",
  "app/dashboard/page.tsx",
  "components/appointment-list.tsx",
  "components/recent-patients.tsx",
  "components/upcoming-appointments.tsx",
]

function removeFile(filePath: string) {
  try {
    fs.unlinkSync(filePath)
    console.log(`Arquivo removido: ${filePath}`)
  } catch (error) {
    console.error(`Erro ao remover arquivo ${filePath}:`, error)
  }
}

// Remover arquivos duplicados
duplicatedFiles.forEach((file) => {
  const fullPath = path.join(process.cwd(), file)
  removeFile(fullPath)
})

console.log("Arquivos duplicados removidos com sucesso!")
