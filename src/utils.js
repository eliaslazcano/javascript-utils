/**
 * Extrai os digitos numericos da string.
 * @param {string} string - String original que pode conter letras e numeros.
 * @returns {string} - String contendo somente os caracteres numericos.
 */
export const extrairNumeros = (string) => {
  const sanitizedString = (string || '').toString(); // Using a constant
  return sanitizedString.replace(/\D/g, '');
}

/**
 * Remove caracteres numéricos da string.
 * @param {string} string - A string com caracteres numéricos.
 * @returns {string} - A string sem caracteres numéricos.
 */
export const removerNumeros = (string) => {
  const sanitizedString = (string || '').toString(); // Using a constant
  return sanitizedString.replace(/\d/g, '');
}

/**
 * Caracteres com acentuação são trocados pelo equivalente sem acentuação.
 * @param {string} texto - O texto a ser higienizado.
 * @returns {string} - O texto sem acentos.
 */
export const removerAcentos = texto => {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
 * Formata um número, utilizando vírgula como separador decimal e ponto como separador de milhar.
 * @param {number|string} numero - O número a ser formatado.
 * @returns {string} - O número formatado.
 */
export const formatarNumero = numero => {
  if (!numero) return '0';
  if (typeof numero !== 'number') numero = Number(numero.toString());
  return numero.toFixed(2).replace('.', ',').replace(/\d(?=(\d{3})+,)/g, '$&.');
}

/**
 * Formata um CPF, introduzindo os pontos e traços padrões.
 * @param {string} cpf - Números do CPF, somente os caracteres numéricos serão usados pra criar a saída.
 * @return {string} - CPF formatado como neste exemplo: 000.000.000-00
 */
export const formatarCPF = cpf => {
  const digitos = extrairNumeros((cpf || '').toString());
  if (digitos.length !== 11) return cpf;
  const regex = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
  return digitos.replace(regex, '$1.$2.$3-$4');
}

/**
 * Formata um CNPJ, introduzindo os pontos, barras e traços padrões.
 * @param {string} cnpj - Números do CNPJ, somente os caracteres numéricos serão usados pra criar a saída.
 * @return {string} - CNPJ formatado como neste exemplo: 00.000.000/0000-00
 */
export const formatarCNPJ = cnpj => {
  const digitos = extrairNumeros((cnpj || '').toString());
  if (digitos.length !== 14) return cnpj;
  const regex = /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/;
  return digitos.replace(regex, '$1.$2.$3/$4-$5');
}

/**
 * Aplica os pontos para formatar um CPF ou CNPJ, se houver caractere não-numérico ele será removido antes da formatação.
 * @param {string} cpfCnpj - Números do CPF ou CNPJ.
 * @returns {string} - CPF/CNPJ formatado.
 */
export const formatarCpfCnpj = cpfCnpj => {
  const digitos = extrairNumeros((cpfCnpj || '').toString());
  if (digitos.length === 11) return formatarCPF(digitos);
  if (digitos.length === 14) return formatarCNPJ(digitos);
  return cpfCnpj;
}

/**
 * Formata um CEP, introduzindo os pontos e traços padrões.
 * @param {string} cep - Números do CEP.
 * @return {string} - Números do CEP com os caracteres separadores.
 */
export const formatarCEP = cep => {
  if (!cep) return cep;
  cep = cep.replace(/\D/g, '');
  if (!cep || cep.length !== 8) return cep;
  return cep.substr(0, 2) + '.' + cep.substr(2, 3) + '-' + cep.substr(5);
}

/**
 * Formata um telefone de acordo com a quantidade de dígitos. Funciona com fixo e celular, com ou sem DDD.
 * @param {string} telefone - Números do telefone.
 * @return {string} - Números do telefone com os caracteres de separação.
 */
export const formatarTelefone = telefone => {
  telefone = (telefone || '').toString();
  if (!telefone) return 'telefone';
  telefone = telefone.replace(/\D/g, '');
  if (!telefone || telefone.length < 8) return telefone;
  if (telefone.length === 8) return telefone.substr(0, 4) + '-' + telefone.substr(4);
  if (telefone.length === 9) return telefone.substr(0, 5) + '-' + telefone.substr(5);
  if (telefone.length === 10) return '(' + telefone.substr(0, 2) + ') ' + telefone.substr(2, 4) + '-' + telefone.substr(6);
  if (telefone.length === 11) return '(' + telefone.substr(0, 2) + ') ' + telefone.substr(2, 5) + '-' + telefone.substr(7);
  return telefone;
}

/**
 * Valida um CPF brasileiro usando a regra do dígito verificador e a quantidade de digitos.
 * @param {string} cpf - Números do CPF. Caracteres não-numéricos serão desconsiderados antes do calculo.
 * @returns {boolean} - Resultado da validação, true: ok, false: inválido.
 */
export const validarCPF = cpf => {
  const sanitizedCpf = (cpf || '').toString().replace(/\D/g, ''); // Using a constant
  const invalidCpfPatterns = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
  ];
  if (sanitizedCpf.length !== 11 || invalidCpfPatterns.includes(sanitizedCpf)) return false;

  // Valida 1o digito
  let add = 0;
  for (let i = 0; i < 9; i++) add += parseInt(sanitizedCpf.charAt(i)) * (10 - i);
  let rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(sanitizedCpf.charAt(9))) return false;

  // Valida 2o digito
  add = 0;
  for (let i = 0; i < 10; i++) add += parseInt(sanitizedCpf.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) rev = 0;
  return rev === parseInt(sanitizedCpf.charAt(10));
}

/**
 * Valida um CPNJ brasileiro com a regra do dígito verificador.
 * @param {string} cnpj - Numeros do CPNJ.
 * @returns {boolean} - Resultado da validação, true: ok, false: inválido.
 */
export const validarCNPJ = cnpj => {
  if (!cnpj) return false;
  if (typeof cnpj == 'number') cnpj = cnpj.toString();
  cnpj = cnpj.replace(/\D+/g, '');
  if (cnpj.length !== 14) return false;

  // Elimina CNPJs invalidos conhecidos
  if (cnpj === '00000000000000' ||
    cnpj === '11111111111111' ||
    cnpj === '22222222222222' ||
    cnpj === '33333333333333' ||
    cnpj === '44444444444444' ||
    cnpj === '55555555555555' ||
    cnpj === '66666666666666' ||
    cnpj === '77777777777777' ||
    cnpj === '88888888888888' ||
    cnpj === '99999999999999')
    return false;

  // Valida DVs
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  let i;
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado.toString() !== digitos.charAt(0)) return false;

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2)
      pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  return resultado.toString() === digitos.charAt(1);
}

/**
 * Verifica se a string é um email, obedecendo regras como arroba, pontuação, sem espaços e etc.
 * @param {string} email - Endereço de email completo.
 * @return {boolean} - Resultado da validação. true: ok, false: inválido.
 */
export const validarEmail = email => /^(([^<>()[\]\\/.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)

/**
 * Abrevia o nome para duas palavras.
 * @param {string} fullname - Nome completo.
 * @param {boolean} useSecondName - Usar o segundo nome ao invés do último.
 * @returns {string} - Nome abreviado.
 */
export const encurtarNome = (fullname, useSecondName = false) => {
  if (!fullname || typeof fullname !== 'string') return '';
  const trimmedFullname = fullname.trim();
  if (!trimmedFullname) return '';

  const names = trimmedFullname.split(' ');
  if (names.length === 1) return names[0];
  const firstName = names[0];
  const lastName = names[names.length - 1];
  const secondName = names[1];

  if (useSecondName && secondName) return firstName + ' ' + secondName;
  else return firstName + ' ' + lastName;
}

/**
 * Obtem duas letras que abreviam com o primeiro e último nome.
 * @param {string} nome - Nome completo ou parcial.
 * @returns {string} - Iniciais.
 */
export const nomeSiglas = (nome) => {
  nome = nome.trim();
  if (!nome) return '';
  const names = nome.split(' ');
  if (names.length === 1) return names[0].substr(0,2);
  else return names[0].substr(0,1) + names[names.length - 1].substr(0,1);
}

/**
 * Reorganiza a sequencia dos itens do array (de objetos), usando uma das propriedades do item/objeto.
 * @param {Array<Object>} arr - O array a ser ordenado.
 * @param {string} propriedade - Nome da propriedade do objeto, cujo seu valor será usado para ordenar o array.
 * @param {boolean} decrescente - Ordena em sequencia decrescente.
 * @return {Array<Object>}
 */
export const ordenarArrayDeObjetos = (arr, propriedade, decrescente = false) => {
  // Função de comparação para ordenação ascendente
  const compararAscendente = (a, b) => {
    if (a[propriedade] < b[propriedade]) return -1
    if (a[propriedade] > b[propriedade]) return 1
    return 0
  }

  // Função de comparação para ordenação decrescente
  const compararDecrescente = (a, b) => {
    if (a[propriedade] > b[propriedade]) return -1
    if (a[propriedade] < b[propriedade]) return 1
    return 0
  }

  // Ordena o array com base na função de comparação selecionada
  if (decrescente) {
    arr.sort(compararDecrescente)
  } else {
    arr.sort(compararAscendente)
  }

  return arr
}

/**
 * Verifica se um array de dados primitivos possui itens duplicados.
 * @param {Array} array - O array de dados primitivos a ser verificado.
 * @returns {boolean} - Retorna true se houver itens duplicados, caso contrário, retorna false.
 */
export const possuiItensDuplicados = (array) => {
  return array.length !== new Set(array).size
}

/**
 * Verifica se um array de objetos possui valores duplicados, comparando uma propriedade específica do objeto.
 * @param {Array<Object>} array - O array de objetos a ser verificado.
 * @param {string} propriedade - A propriedade do objeto a ser comparada para detectar duplicatas.
 * @returns {boolean} - Retorna true se houver valores duplicados, caso contrário, retorna false.
 */
export const possuiObjetosDuplicados = (array, propriedade) => {
  const valores = new Set()
  for (const objeto of array) {
    const valorPropriedade = objeto[propriedade]
    if (valores.has(valorPropriedade)) return true
    valores.add(valorPropriedade)
  }
  return false
}

/**
 * Remove itens duplicados de um array de valores primitivos, mantendo apenas a primeira ocorrência de cada valor.
 * @param {Array} array - O array de valores primitivos.
 * @returns {Array} - Um novo array sem itens duplicados.
 */
export const removerItensDuplicados = (array) => {
  return array.filter((i, index) => array.indexOf(i) === index)
}

/**
 * Remove itens duplicados de um array de objetos, comparando uma propriedade específica do objeto, mantendo apenas a primeira ocorrência.
 * @param {Array<Object>} array - O array de objetos a ser verificado.
 * @param {string} propriedade - A propriedade do objeto a ser comparada para detectar duplicatas.
 * @returns {Array<Object>} - Retorna true se houver valores duplicados, caso contrário, retorna false.
 */
export const removerObjetosDuplicados = (array, propriedade) => {
  const valoresUnicos = new Set()
  return array.filter(objeto => {
    const valorPropriedade = objeto[propriedade]
    if (!valoresUnicos.has(valorPropriedade)) {
      valoresUnicos.add(valorPropriedade)
      return true;
    }
    return false;
  });
}

/**
 * Converte um tamanho em bytes em uma representação humanizada.
 * @param {number} bytes - O tamanho em bytes a ser convertido.
 * @param {boolean} [binary=false] - Define se a conversão será baseada em 1024 (binário) ou 1000 (decimal). O padrão é false (decimal).
 * @returns {string} - A representação humanizada do tamanho.
 */
export const tamanhoHumanizado = (bytes, binary = false) => {
  const base = binary ? 1024 : 1000;
  if (bytes < base) return `${bytes} B`;
  const prefix = binary ? ['Ki', 'Mi', 'Gi'] : ['k', 'M', 'G'];
  let unit = -1;
  while (Math.abs(bytes) >= base && unit < prefix.length - 1) {
    bytes /= base;
    ++unit;
  }
  return `${bytes.toFixed(1)} ${prefix[unit]}B`;
}

/**
 * Obtém o nome do arquivo (com extensão) a partir do caminho informado.
 * @param {string} caminho - O caminho completo do arquivo.
 * @returns {string} - O nome do arquivo (com extensão).
 */
export const extrairNomeArquivo = (caminho) => {
  return caminho.replace(/^.*[\\/]/, '');
}

/**
 * Obtém a extensão do arquivo a partir do nome informado.
 * @param {string} nomeArquivo - O nome do arquivo.
 * @returns {string|null} - A extensão do arquivo, ou null se não houver extensão.
 */
export const extrairExtensaoArquivo = (nomeArquivo) => {
  const regex = new RegExp('[^.]+$');
  const extension = nomeArquivo.match(regex);
  if (extension.length !== 1) return null;
  return extension[0];
}

/**
 * Higieniza o texto, removendo espaços duplicados ou maiores.
 * @param {string} texto - O texto a ser higienizado.
 * @returns {string} - O texto higienizado.
 */
export const removerEspacosRepetidos = (texto) => {
  return texto.trim().replace(/ {2,}/g, ' ');
}

/**
 * Copia um texto para a área de transferência.
 * @param {string} texto - O texto a ser copiado.
 * @returns {Promise<void>} - Uma Promise vazia que é resolvida quando a cópia é concluída.
 */
export const copiarTextoParaAreaTransferencia = async (texto) => {
  if (!navigator.clipboard) {
    let textArea = document.createElement('textarea');
    textArea.value = texto;

    // Evita rolar para a parte inferior
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    document.execCommand('copy');
    document.body.removeChild(textArea);
    return;
  }
  await navigator.clipboard.writeText(texto);
}

/**
 * Higieniza um texto usando a funções desta biblioteca unificadas.
 * @param {string} string - O texto a ser higienizado.
 * @param {boolean} [removerEspacoRepetido=true] - Remove espaços duplicados ou maiores.
 * @param {boolean} [removerAcentuacao=true] - Caracteres com acentuação são trocados pelo equivalente sem acentuação.
 * @return {string} - Texto higienizado.
 */
export const limparTexto = (string, removerEspacoRepetido = true, removerAcentuacao = true) => {
  let text = (string || '').toString().trim();
  if (!text) return text;
  if (removerEspacoRepetido) text = removerEspacosRepetidos(text);
  if (removerAcentuacao) text = removerAcentos(text);
  return text;
}

/**
 * Converte Blob para String binária (UTF8).
 * @param {Blob} blob
 * @return {Promise<string>}
 */
export const converteBlobPraString = blob => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      const arrayBuffer = event.target.result;
      let byteArray = new Uint8Array(arrayBuffer);
      let binaryString = '';
      for (let i = 0; i < byteArray.length; i++) {
        binaryString += String.fromCharCode(byteArray[i]);
      }
      resolve(binaryString);
    };

    reader.onerror = function () {
      reject(new Error("Erro ao ler Blob como string binaria."));
    };

    reader.readAsArrayBuffer(blob);
  });
}

/**
 * Converte Blob para String base64.
 * @param {Blob} blob
 * @return {Promise<string>}
 */
export const converteBlobPraBase64 = blob => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      resolve(event.target.result);
    };

    reader.onerror = function () {
      reject(new Error("Erro ao ler Blob como string base64."));
    };

    reader.readAsDataURL(blob);
  });
}

/**
 * Remove a extensão de um nome de arquivo.
 * @param {string} nomeArquivo - Nome do arquivo como este 'exemplo.pdf'.
 * @return {string}
 */
export const removerExtensao = nomeArquivo => {
  const ultimoPonto = nomeArquivo.lastIndexOf(".");
  return (ultimoPonto !== -1) ? nomeArquivo.substring(0, ultimoPonto) : nomeArquivo;
}

/**
 * Decodifica uma string que está em formato BASE64.
 * @param {string} encodedString - String em formato base64.
 * @returns {string} - String em formato normal.
 */
export const base64Decode = encodedString => {
  if (typeof window !== 'undefined' && typeof window.atob === 'function') return decodeURIComponent(window.atob(encodedString));
  else if (typeof Buffer !== 'undefined') return Buffer.from(encodedString, 'base64').toString('ascii');
  else return ''
}

/**
 * Obtem o paylod de um token JWT parseado para Javascript.
 * @param {string} token - Token completo no padrão JSON WEB TOKEN.
 * @returns {any|null} - null: payload vazio ou token inválido.
 */
export const jwtPayload = token => {
  const partes = token.split('.')
  if (partes.length !== 3) return null
  try {
    return JSON.parse(base64Decode(partes[1]))
  } catch (e) {
    return null
  }
}

/**
 * Verifica se a string é um token JWT.
 * @param {string} token - Token completo no padrão JSON WEB TOKEN.
 * @return {boolean}
 */
export const jwtCheck = token => {
  if (!token || typeof token !== 'string') return false
  const parts = token.split('.')
  if (parts.length !== 3) return false

  try {
    const header = JSON.parse(base64Decode(parts[0]))
    const payload = JSON.parse(base64Decode(parts[1]))
    const signature = parts[2]
    if (!header || !payload || !signature) return false
  } catch (e) {
    return false
  }

  return true
}

/**
 * Encurta um nome até o limite de palavaras.
 * @param {string} nome - Nome completo.
 * @param {number} limite - Máximo de palavras.
 * @param {string} append - Adiciona uma string no final do resultado caso o nome original seja maior que o limite.
 * @returns {string} - Nome encurtado.
 */
export const reduzirNome = (nome, limite = 2, append = '') => {
  if (!nome || !nome.trim()) return ''
  nome = nome.trim()
  const palavras = nome.split(' ')
  if (palavras.length <= limite) return nome
  let novo = ''
  for (let i = 0; i < limite; i++) novo += palavras[i] + ' '
  novo = novo.trim()
  novo += append
  return novo
}

/**
 * Semelhante a função setTimeOut, mas pode ser utilizado em código Async/Await e com possibilidade de ter callback.
 * @param {number} ms - Tempo de delay em milisegundos.
 * @param {function} callback - Função callback optional para ser executada após o delay.
 * @returns {Promise<void>} - Promessa com retorno vazio.
 */
export const delay = (ms, callback = null) => {
  return new Promise(resolve => setTimeout(() => {
    if (typeof callback === 'function') callback()
    resolve()
  }, ms))
}