export class Request {
    id: number
    description: string;
    clarification: Array<any>;
    creationDate: Date;
    lastModified: Date;
    status: string;

    constructor(description: string, status: string = "started") {
        this.id = 0;
        this.description = description;
        this.clarification = [];
        this.creationDate = new Date();
        this.lastModified = this.creationDate;
        this.status = status;
    }

    print() {
        console.log(this.description);
        console.log(this.clarification);
        console.log(this.creationDate);
        console.log(this.lastModified);
        console.log(this.status);
    };

}

export class Comment {
    id: number;
    description: string;
    type: string;
    options: Array<any>;
    selected: string;

    constructor(description: string, type: string = "info") {
        this.description = description;
        this.type = type;
        this.options = [];
        this.selected = "";
    }

}
