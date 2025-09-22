export type Launch = {
  links?: {
    mission_patch_small: string;
    mission_patch: string;
  };
  rocket?: { rocket_name: string };
  mission_name: string;
  details: string | null;
};

export type State = {
  launches: Launch[];
  activeLaunch: Launch | null;
  isModalOpen: boolean;
  loadError?: null | string;
};

export type Action =
  | {
      type: "load_launch";
      payload: Launch[];
    }
  | { type: "active_launch"; payload: Launch }
  | { type: "open_modal"; payload: boolean }
  | { type: "load_error"; payload: null | string };

export type CardLaunchProps = {
  launch: Launch;
};
