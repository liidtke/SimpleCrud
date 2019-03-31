import { PersonService, IPerson } from "services/person-service";
import { autoinject, observable } from "aurelia-framework";
import { Toaster } from "shared/notification";

@autoinject
export class PeopleList{
    private people: IPerson[];
    private personInEdit: IPerson;
    @observable
    private isLoading: boolean = false;

    @observable
    editItem: number;
    constructor(private service: PersonService, private notification: Toaster){

    }
    
    attached() {
        this.getPeople();
        
    }

    public get getEditItem() {
        return this.editItem;
    }
    public get getIsLoading(){
        return this.isLoading;
    }

    getPeople() {
        this.service.getAll()
            .then(res => this.people = res)
            .catch(err => this.notification.warning('Erro ao buscar itens'));
      
    }

    addLine() {
        if (!this.people) {
            this.people = [];
        }

        if (this.people.find(item => item.id == 0)) {
            return;
        }

        this.people.push({ id: 0, name: "", email: null, phone: null });
        
        this.edit(0);
    }

    validate(person:IPerson){
        let emailX = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        let phoneX = new RegExp("^[0-9]");
        
        let validEmail = emailX.test(person.email);
        let validPhone = phoneX.test(person.phone);
        if (!validEmail){
            this.notification.warning("Digite um email válido");
        }
        if (!validPhone){
            this.notification.warning("Digite um telefone válido");
            
        }
        if (validEmail == false || validPhone == false){
            return false;
        }
    }

    edit(id: number) {
        this.editItem = id;
        if(id != null){
            //locate original element and add to edit
            let index = this.people.indexOf(this.people.find(item => item.id == id));
            this.personInEdit = {...this.people[index]};
        }
    }

    editItemChanged(newValue, oldValue) {
        //apenas remove itens não salvos
        if (newValue == null && oldValue == 0) {
            let index = this.people.indexOf(this.people.find(item => item.id == 0));
            this.people.splice(index, 1);
        }
    }

    save(person: IPerson) {
        if(this.validate(person) == false)
        {
            return;
        }
        

        let p = this.service.savePerson(person);
            p.then(response => {
                if (response.isSuccess) {
                    this.notification.success("Salvo com sucesso");
                    this.editItem = null;
                    this.getPeople();
                }
                else {
                    this.notification.warning("Erro ao excluir");
                }
            });

    }

    remove(person: IPerson) {
        this.service.removePerson(person)
            .then(response => {
                if (response.isSuccess) {
                    this.notification.success("Excluído com sucesso");
                    this.editItem = null;
                    this.getPeople();
                }
                else {
                    this.notification.warning("Erro ao excluir");
                }
            });
    }
}