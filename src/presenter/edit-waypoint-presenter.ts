import EditItemContainer from '../view/main/edit-event/edit-item-container';
import EventHeader from '../view/main/edit-event/header/event-header';
import EventTypeWrapper from '../view/main/edit-event/header/event-type-wrapper/event-type-wrapper';
import EventTypeLabel from '../view/main/edit-event/header/event-type-wrapper/event-type-label/event-type-label';
import ChooseEventType from '../view/main/edit-event/header/event-type-wrapper/event-type-label/choose-event-type';
import EventTypeIcon from '../view/main/edit-event/header/event-type-wrapper/event-type-label/event-type-icon';
import EventTypeToggle from '../view/main/edit-event/header/event-type-wrapper/event-type-toggle';
import EventTypeList from '../view/main/edit-event/header/event-type-wrapper/event-type-list/event-type-list';
import EventTypeGroup from '../view/main/edit-event/header/event-type-wrapper/event-type-list/event-type-group';
import EventTypeItem from '../view/main/edit-event/header/event-type-wrapper/event-type-list/event-type-item';
import EventDestination from '../view/main/edit-event/header/event-destination/event-destination';
import EventLabelDestination from '../view/main/edit-event/header/event-destination/event-label-destination';
import EventInputDestination from '../view/main/edit-event/header/event-destination/event-input-destination';
import EventDestinationList from '../view/main/edit-event/header/event-destination/destination-list';
import EventDestinationListItem from '../view/main/edit-event/header/event-destination/destination-list-item';
import EventTime from '../view/main/edit-event/header/event-time';
import EventPrice from '../view/main/edit-event/header/event-price';
import EventSave from '../view/main/edit-event/header/event-save';
import EventDelete from '../view/main/edit-event/header/event-delete';
import EventRollup from '../view/main/event-list-item/event-rollup';
import EventDetails from '../view/main/edit-event/section/event-details';
import OffersSection from '../view/main/edit-event/section/offers-section/offers-section';
import OffersList from '../view/main/edit-event/section/offers-section/offers-lits';
import OfferItem from '../view/main/edit-event/section/offers-section/offer-item';
import DestinationDescription from '../view/main/edit-event/section/destination-section/destinations-description';
import PicturesContainer from '../view/main/edit-event/section/destination-section/pictures-container';
import DestinationPicturesList from '../view/main/edit-event/section/destination-section/destination-pictures-list';
import DestinationPicture from '../view/main/edit-event/section/destination-section/destination-picture';
import WaypointContainer from '../view/main/waypoint-container';
import { render } from '../render';
import type WaypointsModel from '../model/waypoints-model';
import type DestinationsModel from '../model/destinations-model';
import type OffersModel from '../model/offers-model';
import { WayPoint } from '../types/way-point';
import { AppPicture, Destination } from '../types/destination';

export default class EditWaypointPresenter {
  editWaypointContainer: HTMLUListElement;
  offersModel: OffersModel;
  destinationsModel: DestinationsModel;
  waypointsModel: WaypointsModel;
  waypoint: WayPoint;
  destination: Destination;
  editItemContainer: EditItemContainer;
  waypointContainer: WaypointContainer;
  eventHeader: EventHeader;
  eventTypeWrapper: EventTypeWrapper;
  eventTypeLabel: EventTypeLabel;
  chooseEventType: ChooseEventType;
  eventTypeIcon: EventTypeIcon;
  eventTypeToggle: EventTypeToggle;
  eventTypeList: EventTypeList;
  eventTypeGroup: EventTypeGroup;
  eventTypeItem: EventTypeItem;
  eventDestination: EventDestination;
  eventLabelDestination: EventLabelDestination;
  eventInputDestination: EventInputDestination;
  eventDestinationList: EventDestinationList;
  eventDestinationListItem: EventDestinationListItem;
  eventTime: EventTime;
  eventPrice: EventPrice;
  eventSave: EventSave;
  eventDelete: EventDelete;
  eventRollup: EventRollup;
  eventDetails: EventDetails;
  offersSection: OffersSection;
  offersList: OffersList;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  offers: any;
  destinationDescription: DestinationDescription;
  picturesContainer: PicturesContainer;
  pictures: AppPicture[];
  destinationPicturesList: DestinationPicturesList;

  constructor({
    editWaypointContainer,
    destinationsModel,
    offersModel,
    waypointsModel,
    waypoint,
    destination
  }: {
    editWaypointContainer: HTMLUListElement;
    waypointsModel: WaypointsModel;
    destinationsModel: DestinationsModel;
    offersModel: OffersModel;
    waypoint: WayPoint;
    destination: Destination;
  }) {
    this.editWaypointContainer = editWaypointContainer;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
    this.waypointsModel = waypointsModel;
    this.destination = destination;
    this.waypoint = waypoint;
    this.waypointContainer = new WaypointContainer();
    this.editItemContainer = new EditItemContainer();
    this.eventHeader = new EventHeader();
    this.eventTypeWrapper = new EventTypeWrapper();
    this.eventTypeLabel = new EventTypeLabel();
    this.chooseEventType = new ChooseEventType();
    this.eventTypeIcon = new EventTypeIcon(this.waypoint);
    this.eventTypeToggle = new EventTypeToggle();
    this.eventTypeList = new EventTypeList();
    this.eventTypeGroup = new EventTypeGroup();
    this.eventTypeItem = new EventTypeItem(this.waypoint);
    this.eventDestination = new EventDestination();
    this.eventLabelDestination = new EventLabelDestination(this.waypoint);
    this.eventInputDestination = new EventInputDestination(this.destination);
    this.eventDestinationList = new EventDestinationList();
    this.eventDestinationListItem = new EventDestinationListItem(this.destination);
    this.eventTime = new EventTime(this.waypoint);
    this.eventPrice = new EventPrice(this.waypoint);
    this.eventSave = new EventSave();
    this.eventDelete = new EventDelete();
    this.eventRollup = new EventRollup();
    this.eventDetails = new EventDetails();
    this.offersSection = new OffersSection();
    this.offersList = new OffersList();
    this.destinationDescription = new DestinationDescription(this.destination);
    this.picturesContainer = new PicturesContainer();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.pictures = (this.waypoint.destination as any).pictures as AppPicture[];
    this.destinationPicturesList = new DestinationPicturesList();
  }

  init() {
    render(this.waypointContainer, this.editWaypointContainer);
    render(this.editItemContainer, this.waypointContainer.element);
    render(this.eventHeader, this.editItemContainer.element);
    render(this.eventTypeWrapper, this.eventHeader.element);
    render(this.eventTypeLabel, this.eventTypeWrapper.element);
    render(this.chooseEventType, this.eventTypeLabel.element);
    render(this.eventTypeIcon, this.eventTypeLabel.element);
    render(this.eventTypeToggle, this.eventTypeWrapper.element);
    render(this.eventTypeList, this.eventTypeWrapper.element);
    render(this.eventTypeGroup, this.eventTypeList.element);
    render(this.eventTypeItem, this.eventTypeGroup.element);
    render(this.eventTypeItem, this.eventTypeGroup.element);
    render(this.eventDestination, this.eventHeader.element);
    render(this.eventLabelDestination, this.eventDestination.element);
    render(this.eventInputDestination, this.eventDestination.element);
    render(this.eventDestinationList, this.eventDestination.element);
    render(this.eventDestinationListItem, this.eventDestinationList.element);
    render(this.eventTime, this.eventHeader.element);
    render(this.eventPrice, this.eventHeader.element);
    render(this.eventSave, this.eventHeader.element);
    render(this.eventDelete, this.eventHeader.element);
    render(this.eventRollup, this.eventHeader.element);
    render(this.eventDetails, this.editItemContainer.element);
    render(this.offersSection, this.eventDetails.element);
    render(this.offersList, this.offersSection.element);

    const accessibleOffers = this.offersModel.offers[0].offers;

    for (let i = 0; i < accessibleOffers.length; i++) {
      const offer = accessibleOffers[i];
      render(new OfferItem({ offer }), this.offersList.element);
    }

    render(this.destinationDescription, this.eventDetails.element);
    render(this.picturesContainer, this.eventDetails.element);
    render(this.destinationPicturesList, this.picturesContainer.element);

    const pictures = this.destinationsModel.destinations[0].pictures;
    for (let i = 0; i < pictures.length; i++) {
      const picture = pictures[i];
      render(new DestinationPicture(picture), this.destinationPicturesList.element);
    }
  }
}
