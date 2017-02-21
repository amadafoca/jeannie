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
  chat: Chat[];
  creationDate = Date.now();
  lastModified = this.creationDate;
  status = '';

  constructor(pId, pDescription, pChat, pCreationDate, pLastModified, pStatus) {
    this.id = pId;
    this.description = pDescription;
    this.chat = pChat; //array com os chats
    this.creationDate = pCreationDate;
    this.lastModified = pLastModified;
    this.status = pStatus; //'started',
  }

}

export class Chat {
  description = '';
  type = ''; //"info" ou "question"
  option = [];
  selected = '';

  constructor(pDescription, pType, pOption, pSelected) {
    this.description = pDescription;
    this.type = pType;
    this.option = pOption;
    this.selected = pSelected;
  }
}
