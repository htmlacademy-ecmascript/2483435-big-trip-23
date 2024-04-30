/* eslint-disable @typescript-eslint/no-explicit-any */
import EventItemContainer from '../view/event-list-item/event-item-container';
import EventDate from '../view/event-list-item/event-date';
import EventType from '../view/event-list-item/event-type';
import EventTitle from '../view/event-list-item/event-title';
import EventSchedule from '../view/event-list-item/event-schedule';
import EventPrice from '../view/event-list-item/event-price';
import EventOffersTitle from '../view/event-list-item/event-offers-title';
import EventOffersList from '../view/event-list-item/event-offers-list';
import EventOffersListItem from '../view/event-list-item/event-offers-list-item';
import EventFavorite from '../view/event-list-item/event-favorite';
import EventRollup from '../view/event-list-item/event-rollup';
import { render } from '../render';

export default class WaypointListItemPresenter {
  waypointItemContainer: HTMLUListElement;
  waypointsModel: any;
  waypoint: any;
  eventDate: EventDate;
  eventItemContainer: any;
  offers: any;
  eventOffersList: EventOffersList;

  constructor({ waypointItemContainer, waypointsModel, waypoint }: { waypointItemContainer: any; waypointsModel: any; waypoint: any }) {
    this.waypointItemContainer = waypointItemContainer;
    this.waypointsModel = waypointsModel;
    this.waypoint = waypoint;
    this.eventDate = new EventDate(this.waypoint);
    this.eventItemContainer = new EventItemContainer();
    this.offers = this.waypoint.offers;
    this.eventOffersList = new EventOffersList();
  }

  init() {
    render(this.eventItemContainer, this.waypointItemContainer);
    render(new EventDate(this.waypoint), this.eventItemContainer.element);
    render(new EventType(this.waypoint), this.eventItemContainer.element);
    render(new EventTitle(this.waypoint), this.eventItemContainer.element);
    render(new EventSchedule(this.waypoint), this.eventItemContainer.element);
    render(new EventPrice(this.waypoint), this.eventItemContainer.element);
    render(new EventOffersTitle(), this.eventItemContainer.element);
    render(this.eventOffersList, this.eventItemContainer.element);

    for (let i = 0; i < this.offers.length; i++) {
      const offer = this.offers[i];
      render(new EventOffersListItem(offer), this.eventOffersList.element);
    }

    render(new EventFavorite(this.waypoint), this.eventItemContainer.element);
    render(new EventRollup(), this.eventItemContainer.element);
    
  }
}
