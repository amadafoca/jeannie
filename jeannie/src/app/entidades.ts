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

export class Card {
  id: any;
  description = '';
  clarification = [];
  creationDate = Date.now();
  lastModified = this.creationDate;
  status = '';

  constructor(pId, pDescription, pClarification, pCreationDate, pLastModified, pStatus) {
    this.id = pId;
    this.description = pDescription;
    this.clarification = pClarification;
    this.creationDate = pCreationDate;
    this.lastModified = pLastModified;
    this.status = pStatus;
  }
}
