export const trackMetaEvent = (eventName: string, parameters?: object) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, parameters);
  }
};

// Predefined tracking functions for your karate school
export const trackEvents = {
  // Track when someone clicks "Trial Class" button
  trialClassClick: () =>
    trackMetaEvent("Lead", { content_name: "Trial Class Request" }),

  // Track when someone views contact information
  contactView: () =>
    trackMetaEvent("Contact", { content_name: "Contact Information" }),

  // Track when someone clicks phone number
  phoneClick: () => trackMetaEvent("Contact", { method: "phone" }),

  // Track when someone clicks email
  emailClick: () => trackMetaEvent("Contact", { method: "email" }),

  // Track when someone views schedule
  scheduleView: () =>
    trackMetaEvent("ViewContent", { content_name: "Class Schedule" }),
};
