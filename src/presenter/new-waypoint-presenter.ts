/* eslint-disable @typescript-eslint/no-explicit-any */
import NewWaypoint from '../view/edit-waypoint/new-waypoint';
import EventHeader from '../view/edit-waypoint/event-header';
import EventEdit from '../view/edit-waypoint/event-edit';
import EventDetails from '../view/edit-waypoint/event-details';
import OffersSection from '../view/edit-waypoint/offers-section';
import EventOffer from '../view/edit-waypoint/event-offer';
import OfferItem from '../view/edit-waypoint/offer-item';
import OffersList from '../view/edit-waypoint/offers-lits';
import DestinationSection from '../view/edit-waypoint/destinations-description';
import { render } from '../render';

export default class NewWaypointPresenter {
  newWaypointContainer: HTMLElement;
  newWaypointModel: any;
  newWaypoint = new NewWaypoint();
  eventEdit = new EventEdit();
  eventDetails = new EventDetails();
  offersSection = new OffersSection();
  eventOffers = new EventOffer();
  offersList = new OffersList();
  waypoint: any;
  offers: any;

  constructor({ newWaypointContainer, newWaypointModel }: { newWaypointContainer: any; newWaypointModel: any }) {
    this.newWaypointContainer = newWaypointContainer;
    this.newWaypointModel = newWaypointModel;
    this.waypoint = this.newWaypointModel.newWaypoint;
    this.offers = this.waypoint.offers;
  }

  init() {
    // render(this.newWaypoint, this.newWaypointContainer, 'afterbegin');
    // render(this.eventEdit, this.newWaypoint.element);
    // render(new EventHeader(), this.eventEdit.element);
    // render(this.eventDetails, this.eventEdit.element);
    // render(this.offersSection, this.eventDetails.element);
    // render(this.eventOffers, this.offersSection.element);
    // render(this.offersList, this.eventOffers.element);
    // console.log(this.offers);
    // for (let i = 0; i < this.offers.length; i++) {
    //   const offer = this.offers[i];
    //   render(new OfferItem({ offer }), this.offersList.element);
    // }
    // render(new DestinationSection(), this.eventDetails.element);
  }
}
