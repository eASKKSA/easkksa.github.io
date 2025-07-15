interface Instructor {
  id: string;
  name: string;
  image: StaticImageData;
  graduation: string;
  credentials: string[];
}

interface BlackBelt {
  id: string;
  name: string;
  image: StaticImageData | string; // Allow for default thumb
  graduation: string;
}

interface Dojo {
  id: string;
  name: string;
  mapUrl: string;
}
