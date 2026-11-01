// slug -> example (imported only by client components: TutorialPage, Sidebar)
import { introduction, schemaBasics, eventsActions } from "./start";
import { htmlTags, elementDynamics } from "./text";
import { inputFields, selectFields, choiceFields, validation, conditionalFields, formValues, repeatableEntries } from "./fields";
import { cardsAlerts, tabsAccordion, modalCarousel } from "./containers";
import { dataTable, tableEditing, charts, calendar, fileUpload, tree, treeExplorer } from "./data";
import { languages, customComponents } from "./advanced";

export const examples = {
  introduction,
  "schema-basics": schemaBasics,
  "events-actions": eventsActions,
  "html-tags": htmlTags,
  "element-dynamics": elementDynamics,
  "input-fields": inputFields,
  "select-fields": selectFields,
  "choice-fields": choiceFields,
  validation,
  "conditional-fields": conditionalFields,
  "form-values": formValues,
  "repeatable-entries": repeatableEntries,
  "cards-alerts": cardsAlerts,
  "tabs-accordion": tabsAccordion,
  "modal-carousel": modalCarousel,
  "data-table": dataTable,
  "table-editing": tableEditing,
  charts,
  calendar,
  "file-upload": fileUpload,
  tree,
  "tree-explorer": treeExplorer,
  languages,
  "custom-components": customComponents,
};
