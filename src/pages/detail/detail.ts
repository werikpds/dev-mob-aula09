import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertCmp, AlertController } from 'ionic-angular';
import { NoteService } from '../../app/note.service';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  static n = {
    id: '',
    modelo: '',
    marca: '',
    cor: '',
    placa: ''
  }

  newNoteFlag = false;
  deleteNoteFlag = false;
  note;
  constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public noteService: NoteService,
                public alertController: AlertController) {
    this.note = this.navParams.get ('noteParam');
    if (!this.note){
      this.note = {
        id: '',
        modelo: '',
        marca: '',
        cor: '',
        placa: ''
      }
      this.newNoteFlag = true;
    }
    console.log ('DetailPage', this.note, this.newNoteFlag, this.deleteNoteFlag)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage', this.note, this.newNoteFlag, this.deleteNoteFlag)
  }

  ionViewWillLeave (){
    console.log('ionViewWillLeave', this.note, this.newNoteFlag, this.deleteNoteFlag, DetailPage.n);
    if (this.newNoteFlag){
    let areSame: boolean = JSON.stringify(this.note) === JSON.stringify(DetailPage.n);
      if(areSame){
        console.log('Não tem dado, cancela', this.note);
      }
      else {
        console.log('Deveriam estar diferentes', this.note, DetailPage.n);
        this.noteService.addNote (this.note);
      }
    }
    else{
      if (this.deleteNoteFlag){
        this.noteService.removeNote(this.note);
      }
      else{
        this.noteService.editNote(this.note);
      }
    }
  }

  onTrash(){
    //constrói o alerta
    let confirm = this.alertController.create({
      title: 'Apagar?',
      message: `Deseja apagar essa nota: ${this.note.modelo}?`,
      buttons: [
        {
          //primeiro botão, sem handler não faz nada
          text: "Cancelar"
        },
        {
          text: "OK",
          handler: () => {
            this.noteService.removeNote(this.note);
            this.deleteNoteFlag = true;
            this.navCtrl.pop();
          }
        }
      ]
    });
    //exibe
    confirm.present();
  }

}
