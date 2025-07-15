interface InDojoSection {
  id: string;
  title: string;
  description: string;
  image: StaticImageData | string;
  href:
    | "/in-dojo/salutation"
    | "/in-dojo/rules"
    | "/in-dojo/vocabulary"
    | "/in-dojo/grades";
}
