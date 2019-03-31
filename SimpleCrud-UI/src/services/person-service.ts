import { HttpClient } from 'aurelia-http-client';
import { autoinject, bindable } from "aurelia-framework";
import { Toaster } from 'shared/notification';

@autoinject
export class PersonService{
    constructor(private http: HttpClient, private notification: Toaster) {
        http.configure(x => {
            x.withBaseUrl('http://localhost:62169/api/');
        });
    }

    private uri: string = 'People/';
    @bindable loading: boolean = false;
    
     async getAll(){
        this.loading = true;
        let people: IPerson[];
        
        try {
            let response = await this.http.createRequest(this.uri)
                .asGet()
                .send();
            if (response.isSuccess) {
                if (response.response){
                    people = JSON.parse(response.response);
                }
                
            }
            else {
                this.notification.warning(response.response);
            }
        }
        catch (error) {
            this.notification.error(error.message);
        }
        finally {
            this.loading = false;
            return people;

        }

    }

    savePerson(person){

        if (person.id > 0) {
            return this.editPerson(person);
        }
        else if (person.id == 0) {
            return this.addPerson(person);
        }
    }

    private addPerson(person:IPerson) {
        return this.http.post(this.uri, person);
    }

    private editPerson(person:IPerson) {
        return this.http.put(this.uri, person);
    }

    removePerson(person:IPerson) {
        return this.http.delete(this.uri + person.id);
    }
}

export interface IPerson
{
  id: number,
  name: string,
  email: string,
  phone: string
}