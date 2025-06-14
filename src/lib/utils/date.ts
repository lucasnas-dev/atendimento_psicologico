/**
 * Calcula a idade de uma pessoa baseada na data de nascimento
 * @param dataNascimento - Data de nascimento em formato ISO string
 * @returns Idade em anos
 */
export const calcularIdade = (dataNascimento: string): number => {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mesAtual = hoje.getMonth();
  const mesNascimento = nascimento.getMonth();

  // Verifica se ainda não fez aniversário este ano
  if (
    mesAtual < mesNascimento ||
    (mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())
  ) {
    idade--;
  }

  return idade;
};

/**
 * Formata uma data ISO para o formato brasileiro
 * @param dataISO - Data em formato ISO string
 * @returns Data formatada (dd/mm/aaaa)
 */
export const formatarData = (dataISO: string): string => {
  const data = new Date(dataISO);
  return data.toLocaleDateString("pt-BR");
};

/**
 * Formata uma data com a idade da pessoa
 * @param dataISO - Data de nascimento em formato ISO string
 * @returns String formatada "dd/mm/aaaa (X anos)"
 */
export const formatarDataComIdade = (dataISO: string): string => {
  const dataFormatada = formatarData(dataISO);
  const idade = calcularIdade(dataISO);
  return `${dataFormatada} (${idade} anos)`;
};

/**
 * Formata data e hora para exibição
 * @param dataISO - Data em formato ISO string
 * @returns Data e hora formatadas
 */
export const formatarDataHora = (dataISO: string): string => {
  const data = new Date(dataISO);
  return data.toLocaleString("pt-BR");
};

/**
 * Calcula diferença entre duas datas em dias
 * @param dataInicio - Data inicial
 * @param dataFim - Data final
 * @returns Diferença em dias
 */
export const calcularDiferenca = (
  dataInicio: string,
  dataFim: string
): number => {
  const inicio = new Date(dataInicio);
  const fim = new Date(dataFim);
  const diferenca = fim.getTime() - inicio.getTime();
  return Math.ceil(diferenca / (1000 * 60 * 60 * 24));
};
