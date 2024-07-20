declare module '@eliaslazcano/utils' {
  /**
   * Extrai os dígitos numéricos da string.
   * @param string - String original que pode conter letras e números.
   * @returns String contendo somente os caracteres numéricos.
   */
  export function extrairNumeros(string: string): string;

  /**
   * Remove caracteres numéricos da string.
   * @param string - String original.
   * @returns String sem caracteres numéricos.
   */
  export function removerNumeros(string: string): string;

  /**
   * Caracteres com acentuação são trocados pelo equivalente sem acentuação.
   * @param texto - O texto a ser higienizado.
   * @param rigoroso - Define se deve ser usado um algoritmo mais rigoroso para remoção de acentos.
   * @returns O texto sem acentos.
   */
  export function removerAcentos(texto: string, rigoroso?: boolean): string;

  /**
   * Formata um número, utilizando vírgula como separador decimal e ponto como separador de milhar.
   * @param number - O número a ser formatado.
   * @returns O número formatado.
   */
  export function formatarNumero(number: number | string): string;

  /**
   * Formata um CPF, introduzindo os pontos e traços padrões.
   * @param cpf - CPF a ser formatado.
   * @returns CPF formatado.
   */
  export function formatarCPF(cpf: string): string;

  /**
   * Formata um CNPJ, introduzindo os pontos, barras e traços padrões.
   * @param cnpj - CNPJ a ser formatado.
   * @returns CNPJ formatado.
   */
  export function formatarCNPJ(cnpj: string): string;

  /**
   * Formata um CPF ou CNPJ, introduzindo os pontos, barras e traços padrões.
   * @param cpfCnpj - CPF ou CNPJ a ser formatado.
   * @returns CPF ou CNPJ formatado.
   */
  export function formatarCpfCnpj(cpfCnpj: string): string;

  /**
   * Formata um CEP, introduzindo os pontos e traços padrões.
   * @param cep - CEP a ser formatado.
   * @returns CEP formatado.
   */
  export function formatarCEP(cep: string): string;

  /**
   * Formata um telefone de acordo com a quantidade de dígitos.
   * @param telefone - Telefone a ser formatado.
   * @returns Telefone formatado.
   */
  export function formatarTelefone(telefone: string): string;

  /**
   * Valida um CPF brasileiro.
   * @param cpf - CPF a ser validado.
   * @returns True se o CPF for válido, caso contrário, false.
   */
  export function validarCPF(cpf: string): boolean;

  /**
   * Valida um CNPJ brasileiro.
   * @param cnpj - CNPJ a ser validado.
   * @returns True se o CNPJ for válido, caso contrário, false.
   */
  export function validarCNPJ(cnpj: string): boolean;

  /**
   * Verifica se a string é um email válido.
   * @param email - Email a ser validado.
   * @returns True se o email for válido, caso contrário, false.
   */
  export function validarEmail(email: string): boolean;

  /**
   * Abrevia o nome para duas palavras.
   * @param fullname - Nome completo.
   * @param useSecondName - Usar o segundo nome ao invés do último.
   * @returns Nome abreviado.
   */
  export function encurtarNome(fullname: string, useSecondName?: boolean): string;

  /**
   * Obtém duas letras que abreviam com o primeiro e último nome.
   * @param nome - Nome completo ou parcial.
   * @returns Iniciais do nome.
   */
  export function nomeSiglas(nome: string): string;

  /**
   * Reorganiza a sequência dos itens do array, usando uma das propriedades do item.
   * @param arr - O array a ser ordenado.
   * @param propriedade - Nome da propriedade do objeto a ser usado para ordenação.
   * @param decrescente - Ordena em sequência decrescente.
   * @returns Array ordenado.
   */
  export function ordenarArrayDeObjetos<T>(arr: T[], propriedade: keyof T, decrescente?: boolean): T[];

  /**
   * Verifica se um array de dados primitivos possui itens duplicados.
   * @param array - O array de dados primitivos a ser verificado.
   * @returns True se houver itens duplicados, caso contrário, false.
   */
  export function possuiItensDuplicados<T>(array: T[]): boolean;

  /**
   * Verifica se um array de objetos possui valores duplicados, comparando uma propriedade específica do objeto.
   * @param array - O array de objetos a ser verificado.
   * @param propriedade - A propriedade do objeto a ser comparada para detectar duplicatas.
   * @returns True se houver valores duplicados, caso contrário, false.
   */
  export function possuiObjetosDuplicados<T>(array: T[], propriedade: keyof T): boolean;

  /**
   * Remove itens duplicados de um array de valores primitivos.
   * @param array - O array de valores primitivos.
   * @returns Um novo array sem itens duplicados.
   */
  export function removerItensDuplicados<T>(array: T[]): T[];

  /**
   * Remove itens duplicados de um array de objetos, comparando uma propriedade específica do objeto.
   * @param array - O array de objetos a ser verificado.
   * @param propriedade - A propriedade do objeto a ser comparada para detectar duplicatas.
   * @returns Array sem objetos duplicados.
   */
  export function removerObjetosDuplicados<T>(array: T[], propriedade: keyof T): T[];

  /**
   * Converte um tamanho em bytes em uma representação humanizada.
   * @param bytes - O tamanho em bytes a ser convertido.
   * @param binary - Define se a conversão será baseada em 1024 (binário) ou 1000 (decimal).
   * @returns Representação humanizada do tamanho.
   */
  export function tamanhoHumanizado(bytes: number, binary?: boolean): string;

  /**
   * Obtém o nome do arquivo a partir do caminho informado.
   * @param caminho - O caminho completo do arquivo.
   * @returns Nome do arquivo.
   */
  export function extrairNomeArquivo(caminho: string): string;

  /**
   * Obtém a extensão do arquivo a partir do nome informado.
   * @param nomeArquivo - O nome do arquivo.
   * @returns Extensão do arquivo, ou null se não houver extensão.
   */
  export function extrairExtensaoArquivo(nomeArquivo: string): string | null;

  /**
   * Higieniza o texto, removendo espaços duplicados ou maiores.
   * @param texto - O texto a ser higienizado.
   * @returns Texto higienizado.
   */
  export function removerEspacosRepetidos(texto: string): string;

  /**
   * Copia um texto para a área de transferência.
   * @param texto - O texto a ser copiado.
   * @returns Uma Promise vazia que é resolvida quando a cópia é concluída.
   */
  export function copiarTextoParaAreaTransferencia(texto: string): Promise<void>;

  /**
   * Higieniza um texto usando as funções desta biblioteca unificadas.
   * @param string - O texto a ser higienizado.
   * @param removerEspacoRepetido - Remove espaços duplicados ou maiores.
   * @param removerAcentuacao - Caracteres com acentuação são trocados pelo equivalente sem acentuação.
   * @returns Texto higienizado.
   */
  export function limparTexto(string: string, removerEspacoRepetido?: boolean, removerAcentuacao?: boolean): string;

  /**
   * Converte Blob para String binária (UTF8).
   * @param blob - O Blob a ser convertido.
   * @returns Uma Promise com a String binária.
   */
  export function converteBlobPraString(blob: Blob): Promise<string>;

  /**
   * Converte Blob para String base64.
   * @param blob - O Blob a ser convertido.
   * @returns Uma Promise com a String base64.
   */
  export function converteBlobPraBase64(blob: Blob): Promise<string>;

  /**
   * Remove a extensão de um nome de arquivo.
   * @param nomeArquivo - Nome do arquivo.
   * @returns Nome do arquivo sem a extensão.
   */
  export function removerExtensao(nomeArquivo: string): string;

  /**
   * Decodifica uma string que está em formato BASE64.
   * @param encodedString
   * @returns String decodificada.
   */
  export function base64Decode(encodedString: string): string;
}
