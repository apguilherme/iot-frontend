import BaseButton from "../components/BaseButton";
import BaseDropdown from "../components/BaseDropdown";
import BaseHeader from "../components/BaseHeader";
import BaseInput from "../components/BaseInput";
import BaseNav from "../components/BaseNav";
import BaseTable from "../components/BaseTable";
import Card from "../components/Card";
import { ElTooltip, ElPopover } from "element-plus";

const GlobalComponents = {
  install(app) {
    app.component("base-button", BaseButton);
    app.component("base-dropdown", BaseDropdown);
    app.component("base-header", BaseHeader);
    app.component("base-input", BaseInput);
    app.component("base-nav", BaseNav);
    app.component("base-table", BaseTable);
    app.component("card", Card);
    app.use(ElTooltip);
    app.use(ElPopover);
  },
};

export default GlobalComponents;
