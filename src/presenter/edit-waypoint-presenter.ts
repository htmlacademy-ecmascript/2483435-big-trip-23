/* eslint-disable @typescript-eslint/no-explicit-any */
import EditEventListItemContainer from '../view/main/edit-event/edit-item-container';
import EventHeader from '../view/main/edit-event/header/header';
import TypeWrapper from '../view/main/edit-event/header/event-type-wrapper/wrapper';
import TypeLabel from '../view/main/edit-event/header/event-type-wrapper/event-type-label/label';
import ChooseEventType from '../view/main/edit-event/header/event-type-wrapper/event-type-label/choose';
import TypeIcon from '../view/main/edit-event/header/event-type-wrapper/event-type-label/icon';
import TypeToggle from '../view/main/edit-event/header/event-type-wrapper/toggle';
import TypeList from '../view/main/edit-event/header/event-type-wrapper/event-type-list/list';
import TypeGroup from '../view/main/edit-event/header/event-type-wrapper/event-type-list/group';
import TypeItem from '../view/main/edit-event/header/event-type-wrapper/event-type-list/item';
import DestinationField from '../view/main/edit-event/header/destination/destination';
import LabelDestination from '../view/main/edit-event/header/destination/label';
import InputDestination from '../view/main/edit-event/header/destination/input';
import DestinationList from '../view/main/edit-event/header/destination/list';
import DestinationItem from '../view/main/edit-event/header/destination/item';
import EventTime from '../view/main/edit-event/header/time';
import EventPrice from '../view/main/edit-event/header/price';
import EventSave from '../view/main/edit-event/header/save';
import EventDelete from '../view/main/edit-event/header/delete';
import EventRollup from '../view/main/event-list-item/rollup';
import EventDetails from '../view/main/edit-event/section/details';
import OffersSection from '../view/main/edit-event/section/offers/section';
import OffersList from '../view/main/edit-event/section/offers/lits';
import OfferItem from '../view/main/edit-event/section/offers/item';
import Description from '../view/main/edit-event/section/destination/description';
import PicturesContainer from '../view/main/edit-event/section/destination/container';
import PicturesList from '../view/main/edit-event/section/destination/list';
import DestinationPicture from '../view/main/edit-event/section/destination/picture';
import WaypointContainer from '../view/main/waypoint-container';
import { render } from '../render';
import type WaypointsModel from '../model/waypoints-model';
import type DestinationsModel from '../model/destinations-model';
import type OffersModel from '../model/offers-model';
import type { Waypoint } from '../types/way-point';
import type { AppPicture, Destination } from '../types/destination';
import type { InnerOffer } from '../types/offer';

export default class EditWaypointPresenter {
  container: HTMLUListElement;
  offersModel: OffersModel;
  destinationsModel: DestinationsModel;
  waypointsModel: WaypointsModel;
  waypoint: Waypoint;
  offers: InnerOffer['id'][];
  destination: Destination;
  description: Destination['description'];
  availableOffers: InnerOffer[];
  selectedOffers: InnerOffer[];
  selectedOffersIds: InnerOffer['id'][];
  editItemContainer: EditEventListItemContainer;
  waypointContainer: WaypointContainer;
  header: EventHeader;
  typeWrapper: TypeWrapper;
  typeLabel: TypeLabel;
  chooseEventType: ChooseEventType;
  icon: TypeIcon;
  toggle: TypeToggle;
  typeList: TypeList;
  typeGroup: TypeGroup;
  typeItem: TypeItem;
  destinationField: DestinationField;
  labelDestination: LabelDestination;
  inputDestination: InputDestination;
  destinationList: DestinationList;
  destinationItem: DestinationItem;
  time: EventTime;
  price: EventPrice;
  save: EventSave;
  delete: EventDelete;
  rollup: EventRollup;
  details: EventDetails;
  offersSection: OffersSection;
  offersList: OffersList;
  EventDescription: Description;
  picturesContainer: PicturesContainer;
  pictures: AppPicture[];
  picturesList: PicturesList;
  destinationName: Destination['name'];
  allDestinationsNames: Destination['name'][];

  constructor({
    container: editWaypointContainer,
    destinationsModel,
    offersModel,
    waypointsModel,
    waypoint,
  }: {
    container: HTMLUListElement;
    waypointsModel: WaypointsModel;
    destinationsModel: DestinationsModel;
    offersModel: OffersModel;
    waypoint: Waypoint;
  }) {
    this.container = editWaypointContainer;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
    this.waypointsModel = waypointsModel;
    this.waypoint = waypoint;
    this.destination = this.destinationsModel.getDestination(waypoint)!;
    this.description = this.destination.description;
    this.destinationName = this.destination.name;
    this.allDestinationsNames = this.destinationsModel.allDestinationsNames;
    this.availableOffers = this.offersModel.getAvailableOffers(waypoint)!;
    this.selectedOffers = this.offersModel.getSelectedOffers(waypoint);
    this.selectedOffersIds = this.selectedOffers.map((item: any) => item.id);
    this.pictures = this.destination.pictures;
    this.offers = this.waypoint.offers;
    this.waypointContainer = new WaypointContainer();
    this.editItemContainer = new EditEventListItemContainer();
    this.header = new EventHeader();
    this.typeWrapper = new TypeWrapper();
    this.typeLabel = new TypeLabel();
    this.chooseEventType = new ChooseEventType();
    this.icon = new TypeIcon(this.waypoint);
    this.toggle = new TypeToggle();
    this.typeList = new TypeList();
    this.typeGroup = new TypeGroup();
    this.typeItem = new TypeItem(this.waypoint);
    this.destinationField = new DestinationField();
    this.labelDestination = new LabelDestination(this.waypoint);
    this.inputDestination = new InputDestination(this.destination);
    this.destinationList = new DestinationList();
    this.destinationItem = new DestinationItem(this.destination.name, this.destinationName);
    this.time = new EventTime(this.waypoint);
    this.price = new EventPrice(this.waypoint);
    this.save = new EventSave();
    this.delete = new EventDelete();
    this.rollup = new EventRollup();
    this.details = new EventDetails();
    this.offersSection = new OffersSection();
    this.offersList = new OffersList();
    this.EventDescription = new Description(this.destination);
    this.picturesContainer = new PicturesContainer();
    this.picturesList = new PicturesList();
  }

  init() {
    render(this.waypointContainer, this.container);
    render(this.editItemContainer, this.waypointContainer.element);
    render(this.header, this.editItemContainer.element);
    render(this.typeWrapper, this.header.element);
    render(this.typeLabel, this.typeWrapper.element);
    render(this.chooseEventType, this.typeLabel.element);
    render(this.icon, this.typeLabel.element);
    render(this.toggle, this.typeWrapper.element);
    render(this.typeList, this.typeWrapper.element);
    render(this.typeGroup, this.typeList.element);
    render(this.typeItem, this.typeGroup.element);
    render(this.typeItem, this.typeGroup.element);
    render(this.destinationField, this.header.element);
    render(this.labelDestination, this.destinationField.element);
    render(this.inputDestination, this.destinationField.element);
    render(this.destinationList, this.destinationField.element);

    for (let i = 0; i < this.allDestinationsNames.length; i++) {
      const name = this.allDestinationsNames[i];
      render(new DestinationItem(name, this.destinationName), this.destinationList.element);
    }

    render(this.time, this.header.element);
    render(this.price, this.header.element);
    render(this.save, this.header.element);
    render(this.delete, this.header.element);
    render(this.rollup, this.header.element);
    render(this.details, this.editItemContainer.element);

    if (this.offers.length !== 0) {
      render(this.offersSection, this.details.element);
      render(this.offersList, this.offersSection.element);

      for (let i = 0; i < this.availableOffers.length; i++) {
        const offer = this.availableOffers[i];
        render(new OfferItem(offer, this.selectedOffersIds), this.offersList.element);
      }
    }

    if (this.description.length !== 0 || this.pictures.length !== 0) {
      render(this.EventDescription, this.details.element);
      render(this.picturesContainer, this.details.element);
      render(this.picturesList, this.picturesContainer.element);

      for (let i = 0; i < this.pictures.length; i++) {
        const picture = this.pictures[i];
        render(new DestinationPicture(picture), this.picturesList.element);
      }
    }
  }
}
