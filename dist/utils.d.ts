export function extrairNumeros(string: string): string;
export function removerNumeros(string: string): string;
export function removerAcentos(texto: string, rigoroso?: boolean): string;
export function formatarNumero(number: number | string): string;
export function formatarCPF(cpf: string): string;
export function formatarCNPJ(cnpj: string): string;
export function formatarCpfCnpj(cpfCnpj: string): string;
export function formatarCEP(cep: string): string;
export function formatarTelefone(telefone: string): string;
export function validarCPF(cpf: string): boolean;
export function validarCNPJ(cnpj: string): boolean;
export function validarEmail(email: string): boolean;
export function encurtarNome(fullname: string, useSecondName?: boolean): string;
export function nomeSiglas(nome: string): string;
export function ordenarArrayDeObjetos(arr: Array<any>, propriedade: string, decrescente?: boolean): Array<any>;
export function possuiItensDuplicados(array: any[]): boolean;
export function possuiObjetosDuplicados(array: Array<any>, propriedade: string): boolean;
export function removerItensDuplicados(array: any[]): any[];
export function removerObjetosDuplicados(array: Array<any>, propriedade: string): Array<any>;
export function tamanhoHumanizado(bytes: number, binary?: boolean): string;
export function extrairNomeArquivo(caminho: string): string;
export function extrairExtensaoArquivo(nomeArquivo: string): string | null;
export function removerEspacosRepetidos(texto: string): string;
export function copiarTextoParaAreaTransferencia(texto: string): Promise<void>;
export function limparTexto(string: string, removerEspacoRepetido?: boolean, removerAcentuacao?: boolean): string;
export function converteBlobPraString(blob: Blob): Promise<string>;
export function converteBlobPraBase64(blob: Blob): Promise<string>;
export function removerExtensao(nomeArquivo: string): string;
export function base64Decode(encodedString: string): string;
export function jwtPayload(token: string): any | null;
export function jwtCheck(token: string): boolean;
export function reduzirNome(nome: string, limite?: number, append?: string): string;
export function delay(ms: number, callback?: Function): Promise<void>;
//# sourceMappingURL=utils.d.ts.map