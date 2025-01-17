import { NextRouter } from "next/router";
import { PaperIcon } from "~/config/themes/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faStar } from "@fortawesome/pro-solid-svg-icons";
import ResearchCoinIcon from "~/components/Icons/ResearchCoinIcon";
import { Tab } from "~/components/HorizontalTabBar";
import colors from "~/config/themes/colors";
import { GenericDocument } from "./types";

export const tabs: Array<Tab> = [
  {
    label: "Paper",
    value: "",
    // @ts-ignore
    icon: <PaperIcon height={18} width={18} />,
  },
  {
    icon: <FontAwesomeIcon icon={faComments} />,
    label: "Conversation",
    value: "conversation",
  },
  {
    icon: (
      <ResearchCoinIcon
        version={4}
        color={colors.BLACK(0.5)}
        height={18}
        width={18}
      />
    ),
    label: "Bounties",
    value: "bounties",
  },
  {
    icon: <FontAwesomeIcon icon={faStar} />,
    label: "Peer Reviews",
    value: "peer-reviews",
  },
];

export const getTabs = ({
  router,
  document,
}: {
  router: NextRouter;
  document: GenericDocument;
}) => {
  const { tabName } = router.query;

  let _tabs = tabs;
  _tabs = withHref({ tabs: _tabs, router });
  _tabs = withSelected({ tabs: _tabs, tabName: tabName as string });
  _tabs = withPillContent({ tabs: _tabs, document });

  return _tabs;
};

const withPillContent = ({
  tabs,
  document,
}: {
  tabs: Array<Tab>;
  document: GenericDocument;
}) => {
  const finalTabs: Array<Tab> = [];
  for (let i = 0; i < tabs.length; i++) {
    const tab = tabs[i];

    if (tab.value === "") {
      finalTabs.push(tab);
    } else if (tab.value === "conversation") {
      finalTabs.push({
        ...tab,
        pillContent: document.discussionCount,
      });
    } else if (tab.value === "bounties") {
      finalTabs.push({
        ...tab,
        // FIXME: Use actual bounties
        pillContent: 4,
      });
    } else if (tab.value === "peer-reviews") {
      finalTabs.push({
        ...tab,
        pillContent: document.reviewSummary.count,
      });
    }
  }

  return finalTabs;
};

const withSelected = ({
  tabs,
  tabName,
}: {
  tabs: Array<Tab>;
  tabName: string;
}) => {
  const tabsWithSelected = tabs.map((tab) =>
    tab.value === tabName ? { ...tab, isSelected: true } : tab
  );

  const hasSelected = Boolean(tabsWithSelected.find((t) => t.isSelected));
  if (!hasSelected) {
    tabsWithSelected[0].isSelected = true;
  }

  return tabsWithSelected;
};

const withHref = ({
  tabs,
  router,
}: {
  tabs: Array<Tab>;
  router: NextRouter;
}) => {
  const { documentType, documentId, documentSlug, tabName } = router.query;
  // FIXME: Remove "doc-v2"
  const basePath = `/doc-v2/${documentType}/${documentId}/${documentSlug}`;

  return tabs.map((t) => ({ ...t, href: `${basePath}/${t.value}` }));
};
