export const getFeatures = (
  t: TFunction,
  icons: Record<string, React.ReactNode>,
): Feature[] => [
  {
    id: "tradition",
    icon: icons.tradition,
    title: t("features.tradition.title"),
    description: t("features.tradition.description"),
  },
  {
    id: "instructors",
    icon: icons.instructors,
    title: t("features.instructors.title"),
    description: t("features.instructors.description"),
  },
  {
    id: "community",
    icon: icons.community,
    title: t("features.community.title"),
    description: t("features.community.description"),
  },
];

export const getSchedules = (t: TFunction): Schedule[] => [
  {
    day: t("schedule.weekdays"),
    time: t("schedule.time1"),
    level: t("schedule.children"),
  },
  {
    day: t("schedule.weekdays"),
    time: t("schedule.time2"),
    level: t("schedule.adults"),
  },
];
