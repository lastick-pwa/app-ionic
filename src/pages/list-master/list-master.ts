import { SearchPage } from './../search/search';
import { BuyTicketPage } from './../buy-ticket/buy-ticket';
import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: Item[];

  constructor(
    public navCtrl: NavController,
    public items: Items,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public http: HttpClient) {
    this.currentItems = this.items.query();
  }


  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Confirmando Pagamento...",
      duration: 4500
    });
    loader.present();
    loader.dismiss().then(() => {
      this.goToPage();
    })
  }


  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Pagamento Confirmado',
      subTitle: 'Seu ingresso foi adicionado em Meus tickets',
      buttons: ['OK']
    });
    alert.present();
  }


  // Set the date we're counting down to

  counter: any;
  counter2: any;

  urlGet = 'https://lastick-develop.vapor.cloud/events'
  listEvents: Array<any> = [{ "id": 1, "remainingSeats": 32, "discountedPrice": 7, "title": "Mission: Impossible Fallout", "remainingTime": 342, "originalPrice": 15, "address": "Shopping Metro Tatuape" }, { "id": 2, "remainingSeats": 32, "discountedPrice": 7, "title": "Mission: Impossible Fallout", "remainingTime": 342, "originalPrice": 15, "address": "Shopping Metro Tatuape" }, { "id": 3, "remainingSeats": 32, "discountedPrice": 7, "title": "Mission: Impossible Fallout", "remainingTime": 342, "originalPrice": 15, "address": "Shopping Metro Tatuape" }]

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {

    this.startCounter()
    this.startCounter2()

    this.http.get(this.urlGet).subscribe(data => {
      console.log(data);
    }, err => {
      console.log(err);
    });

    // console.log(this.listEvents)
    // console.log(typeof this.listEvents)


  }

  startCounter() {

    // Update the count down every 1 second
    var x = setInterval(() => {

      // Get todays date and time
      var now = new Date().getTime();

      var countDownDate = new Date("Jul 31, 2018 15:37:25").getTime();

      // Find the distance between now an the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Output the result in an element with id="demo"
      this.counter = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";

      // If the count down is over, write some text 
      // if (distance < 0) {
      //   clearInterval(x);
      //   document.getElementById("demo").innerHTML = "EXPIRED";
      // }
    }, 1000);
  }

  startCounter2() {

    // Update the count down every 1 second
    var x = setInterval(() => {

      // Get todays date and time
      var now = new Date().getTime();


      var countDownDate = new Date("Jul 30, 2018 13:24:25").getTime();

      // Find the distance between now an the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Output the result in an element with id="demo"
      this.counter2 = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";

      // If the count down is over, write some text 
      // if (distance < 0) {
      //   clearInterval(x);
      //   document.getElementById("demo").innerHTML = "EXPIRED";
      // }
    }, 1000);
  }



  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }

  goToPage() {
    this.navCtrl.push(SearchPage);
  }
}
