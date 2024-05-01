import EventItemContainer from '../view/main/event-list-item/event-item-container';
import EventDate from '../view/main/event-list-item/event-date';
import EventType from '../view/main/event-list-item/event-type';
import EventTitle from '../view/main/event-list-item/event-title';
import EventSchedule from '../view/main/event-list-item/event-schedule';
import EventPrice from '../view/main/event-list-item/event-price';
import EventOffersTitle from '../view/main/event-list-item/event-offers-title';
import EventOffersList from '../view/main/event-list-item/event-offers-list';
import EventOffersListItem from '../view/main/event-list-item/event-offers-list-item';
import EventFavorite from '../view/main/event-list-item/event-favorite';
import EventRollup from '../view/main/event-list-item/event-rollup';
import { render } from '../render';
import type WaypointsModel from '../model/waypoints-model';
import { WayPoint } from '../types/way-point';

export default class WaypointListItemPresenter {
  waypointItemContainer: HTMLElement;
  waypointsModel: WaypointsModel;
  waypoint: WayPoint;
  eventDate: EventDate;
  eventItemContainer = new EventItemContainer();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  offers: any;
  eventOffersList: EventOffersList;

  constructor({
    waypointItemContainer,
    waypointsModel,
    waypoint,
  }: {
    waypointItemContainer: HTMLElement;
    waypointsModel: WaypointsModel;
    waypoint: WayPoint;
  }) {
    this.waypointItemContainer = waypointItemContainer;
    this.waypointsModel = waypointsModel;
    this.waypoint = waypoint;
    this.eventDate = new EventDate(this.waypoint);
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
