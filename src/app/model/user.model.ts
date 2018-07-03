export class User {
    public id: number;
    public firstName: string;
    public lastName: string;
    public userName: string;
    public finishedTutorial: true;
    public companyt_name: string;
    public studySubjectLabel: string;
    constructor( data ) {
        this.id = data.id || 1;
        this.firstName = data.first_name || '';
        this.lastName = data.last_name || '';
        this.userName = data.edc_username || '';
        this.finishedTutorial = data.finished_tutorial || true;
        this.companyt_name = data.companyt_name || '';
        this.studySubjectLabel = data.study_subject_label || '';
    }
}
