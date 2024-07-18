export const errorMessages = {
  MAGIC_MOVER: {
    MAGIC_MOVER__ALREADY_ON_MISSION:
      "The magic mover is already on a mission, Please wait until it's finished.",
    MAGIC_MOVER_IS_NOT_FOUND: "Magic mover is not found",
    EMPTY_MAGIC_ITEMS:
      "Magic mover cannot be loaded with an empty list of items, Please provide a list of items.",
  },

  DEFAULT: "Something went wrong.",
};

export const DEFAULT_ERROR = { error: errorMessages.DEFAULT };
