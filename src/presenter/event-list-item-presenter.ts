/* eslint-disable @typescript-eslint/no-explicit-any */
import EventListItemContainer from '../view/main/event-list-item/container';
import Date from '../view/main/event-list-item/date';
import Type from '../view/main/event-list-item/type';
import Title from '../view/main/event-list-item/title';
import Schedule from '../view/main/event-list-item/schedule';
import Price from '../view/main/event-list-item/price';
import OffersTitle from '../view/main/event-list-item/offers-title';
import OffersList from '../view/main/event-list-item/list';
import OffersItem from '../view/main/event-list-item/item';
import Favorite from '../view/main/event-list-item/favorite';
import Rollup from '../view/main/event-list-item/rollup';
import { render } from '../render';
import type WaypointsModel from '../model/waypoints-model';
import type DestinationsModel from '../model/destinations-model';
import type { Waypoint } from '../types/way-point';
import type { Destination } from '../types/destination';
import type OffersModel from '../model/offers-model';
import type { InnerOffer } from '../types/offer';

export default class WaypointListItemPresenter {
  container: any;
  destinationsModel: DestinationsModel;
  offersModel: OffersModel;
  waypointsModel: WaypointsModel;
  currentWaypoint: Waypoint;
  handlers: any;
  destination: Destination;
  date: Date;
  eventItemContainer = new EventListItemContainer();
  eventOffersList: OffersList;
  selectedOffers: InnerOffer[];

  constructor({
    container: editWaypointContainer,
    destinationsModel,
    offersModel,
    waypointsModel,
    currentWaypoint,
    handlers,
  }: {
    container: HTMLLIElement;
    destinationsModel: DestinationsModel;
    offersModel: OffersModel;
    waypointsModel: WaypointsModel;
    currentWaypoint: Waypoint;
    handlers: any;
  }) {
    this.container = editWaypointContainer;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
    this.waypointsModel = waypointsModel;
    this.currentWaypoint = currentWaypoint;
    this.handlers = handlers;
    this.destination = this.destinationsModel.getDestination(this.currentWaypoint)!;
    this.date = new Date(this.currentWaypoint);
    this.eventOffersList = new OffersList();
    this.selectedOffers = this.offersModel.getSelectedOffers(currentWaypoint);
  }

  init() {
    render(this.eventItemContainer, this.container);
    render(new Date(this.currentWaypoint), this.eventItemContainer.element);
    render(new Type(this.currentWaypoint), this.eventItemContainer.element);
    render(new Title(this.currentWaypoint, this.destination), this.eventItemContainer.element);
    render(new Schedule(this.currentWaypoint), this.eventItemContainer.element);
    render(new Price(this.currentWaypoint), this.eventItemContainer.element);
    render(new OffersTitle(), this.eventItemContainer.element);
    render(this.eventOffersList, this.eventItemContainer.element);

    for (let i = 0; i < this.selectedOffers.length; i++) {
      const offer = this.selectedOffers[i];
      render(new OffersItem(offer), this.eventOffersList.element);
    }

    render(new Favorite(this.currentWaypoint), this.eventItemContainer.element);
    render(new Rollup(this.handlers.onEditClick), this.eventItemContainer.element);
  }
}
