interface AppPicture {
  src: string;
  description: string;
}

interface Destination {
  id: string;
  description: string;
  name: string;
  pictures: AppPicture[];
}

export type { Destination, AppPicture };
