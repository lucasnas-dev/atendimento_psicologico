const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  try {
    // Hash da senha
    const hashedPassword = await bcrypt.hash("senha123", 12);

    // Usar o primeiro tenant que você já tem
    const tenant = await prisma.tenant.findFirst();

    if (!tenant) {
      console.error("❌ Nenhum tenant encontrado!");
      return;
    }

    console.log("🏢 Usando tenant:", tenant.nome);

    // Criar ou atualizar usuário
    const user = await prisma.usuario.upsert({
      where: { email: "psicologo@exemplo.com" },
      update: {
        senha: hashedPassword, // Atualizar senha se já existir
        ativo: true,
      },
      create: {
        email: "psicologo@exemplo.com",
        nome: "Dr. Psicólogo Teste",
        senha: hashedPassword,
        role: "PSICOLOGO",
        ativo: true,
        tenantId: tenant.id,
      },
    });

    console.log("✅ Usuário criado/atualizado:", {
      email: user.email,
      nome: user.nome,
      role: user.role,
      ativo: user.ativo,
      tenantId: user.tenantId,
    });

    console.log("\n🔑 Credenciais de teste:");
    console.log("Email: psicologo@exemplo.com");
    console.log("Senha: senha123");
  } catch (error) {
    console.error("❌ Erro:", error);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
