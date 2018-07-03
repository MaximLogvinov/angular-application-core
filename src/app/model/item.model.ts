export class Member {
    public id: number;
    public name: string;
    public description: string;
    constructor( data ) {
        this.id = data.id || 1;
        this.name = data.name || '';
        this.description = data.description || '';
    }
}
