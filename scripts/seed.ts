import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed do banco de dados...");

  // Criar tenant
  const tenant = await prisma.tenant.upsert({
    where: { dominio: "clinica-exemplo" },
    update: {},
    create: {
      nome: "Clínica Exemplo",
      dominio: "clinica-exemplo",
      plano: "premium",
      ativo: true,
    },
  });

  console.log("✅ Tenant criado:", tenant.nome);

  // Criar usuário administrador
  const hashedPassword = await bcrypt.hash("senha123", 12);
  const usuario = await prisma.usuario.upsert({
    where: { email: "psicologo@exemplo.com" },
    update: {},
    create: {
      nome: "Dr. João Silva",
      email: "psicologo@exemplo.com",
      senha: hashedPassword,
      crp: "06/12345",
      role: "psicologo",
      tenantId: tenant.id,
      ativo: true,
    },
  });

  console.log("✅ Usuário criado:", usuario.nome);

  // Criar pacientes de exemplo
  const pacientes = await Promise.all([
    prisma.paciente.upsert({
      where: { id: "paciente-1" },
      update: {},
      create: {
        id: "paciente-1",
        nome: "Maria Silva",
        email: "maria.silva@exemplo.com",
        telefone: "(11) 98765-4321",
        dataNascimento: new Date("1990-05-15"),
        genero: "Feminino",
        endereco: "Rua das Flores, 123 - São Paulo/SP",
        observacoes: "Paciente com histórico de ansiedade",
        tenantId: tenant.id,
        usuarioId: usuario.id,
      },
    }),
    prisma.paciente.upsert({
      where: { id: "paciente-2" },
      update: {},
      create: {
        id: "paciente-2",
        nome: "Carlos Oliveira",
        email: "carlos.oliveira@exemplo.com",
        telefone: "(11) 91234-5678",
        dataNascimento: new Date("1985-10-20"),
        genero: "Masculino",
        endereco: "Av. Paulista, 456 - São Paulo/SP",
        observacoes: "Primeira consulta agendada",
        tenantId: tenant.id,
        usuarioId: usuario.id,
      },
    }),
  ]);

  console.log("✅ Pacientes criados:", pacientes.length);

  // Criar prontuários
  await Promise.all(
    pacientes.map((paciente) =>
      prisma.prontuario.upsert({
        where: { pacienteId: paciente.id },
        update: {},
        create: {
          pacienteId: paciente.id,
          tenantId: tenant.id,
        },
      })
    )
  );

  console.log("✅ Prontuários criados");

  // Criar consultas de exemplo
  const hoje = new Date();
  const amanha = new Date(hoje);
  amanha.setDate(hoje.getDate() + 1);
  amanha.setHours(14, 0, 0, 0);

  const depoisDeAmanha = new Date(hoje);
  depoisDeAmanha.setDate(hoje.getDate() + 2);
  depoisDeAmanha.setHours(16, 0, 0, 0);

  await Promise.all([
    prisma.consulta.create({
      data: {
        data: amanha,
        duracao: 50,
        status: "agendada",
        observacoes: "Primeira sessão de terapia",
        valor: 150.0,
        tenantId: tenant.id,
        pacienteId: pacientes[0].id,
        usuarioId: usuario.id,
      },
    }),
    prisma.consulta.create({
      data: {
        data: depoisDeAmanha,
        duracao: 50,
        status: "agendada",
        observacoes: "Sessão de acompanhamento",
        valor: 150.0,
        tenantId: tenant.id,
        pacienteId: pacientes[1].id,
        usuarioId: usuario.id,
      },
    }),
  ]);

  console.log("✅ Consultas criadas");

  // Criar algumas anotações
  await Promise.all([
    prisma.anotacao.create({
      data: {
        titulo: "Primeira impressão - Maria",
        conteudo:
          "Paciente apresenta sinais de ansiedade generalizada. Demonstra boa disposição para o tratamento.",
        tipo: "observacao",
        tenantId: tenant.id,
        usuarioId: usuario.id,
      },
    }),
    prisma.anotacao.create({
      data: {
        titulo: "Plano de tratamento - Carlos",
        conteudo:
          "Iniciar com técnicas de relaxamento e mindfulness. Agendar sessões semanais.",
        tipo: "geral",
        tenantId: tenant.id,
        usuarioId: usuario.id,
      },
    }),
  ]);

  console.log("✅ Anotações criadas");

  // Criar configurações padrão
  await Promise.all([
    prisma.configuracao.upsert({
      where: { chave: "duracao_consulta_padrao" },
      update: {},
      create: {
        chave: "duracao_consulta_padrao",
        valor: "50",
        descricao: "Duração padrão das consultas em minutos",
        tenantId: tenant.id,
      },
    }),
    prisma.configuracao.upsert({
      where: { chave: "valor_consulta_padrao" },
      update: {},
      create: {
        chave: "valor_consulta_padrao",
        valor: "150.00",
        descricao: "Valor padrão das consultas",
        tenantId: tenant.id,
      },
    }),
  ]);

  console.log("✅ Configurações criadas");
  console.log("🎉 Seed concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro durante o seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
