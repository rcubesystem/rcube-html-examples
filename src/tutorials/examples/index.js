// slug -> example (imported only by client components: TutorialPage, Sidebar)
import { introduction, schemaBasics, eventsActions } from "./start";
import { htmlTags, elementDynamics } from "./text";
import { inputFields, selectFields, choiceFields, validation, conditionalFields, formValues, repeatableEntries } from "./fields";
import { cardsAlerts, tabsAccordion, modalCarousel } from "./containers";
import { dataTable, serverPaging, tableEditing, charts, calendar, fileUpload, tree, treeExplorer } from "./data";
import { languages, customComponents } from "./advanced";
import { richText, rememberView } from "./latest";
import { stylesThemes } from "./styles";
import { useAnywhere } from "./anywhere";

export const examples = {
  introduction,
  "schema-basics": schemaBasics,
  "events-actions": eventsActions,
  "styles-themes": stylesThemes,
  "angular-vue-jsp": useAnywhere,
  "html-tags": htmlTags,
  "element-dynamics": elementDynamics,
  "input-fields": inputFields,
  "select-fields": selectFields,
  "choice-fields": choiceFields,
  validation,
  "conditional-fields": conditionalFields,
  "form-values": formValues,
  "rich-text": richText,
  "repeatable-entries": repeatableEntries,
  "cards-alerts": cardsAlerts,
  "tabs-accordion": tabsAccordion,
  "modal-carousel": modalCarousel,
  "data-table": dataTable,
  "server-paging": serverPaging,
  "remember-view": rememberView,
  "table-editing": tableEditing,
  charts,
  calendar,
  "file-upload": fileUpload,
  tree,
  "tree-explorer": treeExplorer,
  languages,
  "custom-components": customComponents,
};
