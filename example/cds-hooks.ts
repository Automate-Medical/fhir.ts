import { Config, Http, CDSHooks } from "../src";

import appointmentBookExample from "./cds-hooks/appointment-book";
import encounterDischargeExample from "./cds-hooks/encounter-discharge";
import encounterStartExample from "./cds-hooks/encounter-start";
import medicationPrescribeExample from "./cds-hooks/medication-prescribe";
import orderReviewExample from "./cds-hooks/order-review";
import orderSelectExample from "./cds-hooks/order-select";
import orderSignExample from "./cds-hooks/order-sign";
import patientViewExample from "./cds-hooks/patient-view";
import patientViewSuggestion from "./cds-hooks/patient-view-suggestion";

const config: Config = {
  cdsHooks: {
    services: [
      appointmentBookExample,
      medicationPrescribeExample,
      encounterDischargeExample,
      encounterStartExample,
      orderReviewExample,
      orderSelectExample,
      orderSignExample,
      patientViewExample,
      patientViewSuggestion
    ],
    cors: true
  }
}

export const http = Http(config);

CDSHooks(config, http);