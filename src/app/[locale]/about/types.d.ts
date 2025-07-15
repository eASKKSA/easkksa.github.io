interface Instructor {
  id: string;
  name: string;
  image: StaticImageData;
  graduation: string;
  credentials: string[];
  certifiedBy?: BlackBelt["certifiedBy"][];
}

interface BlackBelt {
  id: string;
  name: string;
  image: StaticImageData | string; // Allow for default thumb
  graduation: string;
  certifiedBy?: "skifCanada" | "skif" | "askkm" | "venezuela";
}

interface Dojo {
  id: string;
  name: string;
  mapUrl: string;
}
