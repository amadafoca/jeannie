export class Mensagem {
    textos: string[];
    doAssistente: boolean;
    doCliente: boolean;

    constructor(pTextos, pDoAssistente, pDoCliente) {
      this.textos = pTextos;
      this.doAssistente = pDoAssistente;
      this.doCliente = pDoCliente;
    }
}
