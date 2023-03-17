import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faLayerGroup,
  faCommentAltLines,
  faComments,
} from "@fortawesome/pro-solid-svg-icons";
import Badge from "~/components/Badge";
import { StyleSheet, css } from "aphrodite";
import colors, { bountyColors } from "~/config/themes/colors";
import {
  PostIcon,
  PaperIcon,
  HypothesisIcon,
  QuestionIcon,
} from "~/config/themes/icons";
import { breakpoints } from "~/config/themes/screen";
import ResearchCoinIcon from "~/components/Icons/ResearchCoinIcon";
import { POST_TYPES } from "./TextEditor/config/postTypes";
import { ReactElement } from "react";

type Args = {
  contentType: string;
  size?: "small" | "medium";
  label: string | ReactElement;
  onClick?: null | Function;
  rscContentOverride?: any;
  badgeOverride?: any;
};

const ContentBadge = ({
  contentType,
  size = "medium",
  label = "",
  onClick = null,
  rscContentOverride,
  badgeOverride,
}: Args) => {
  return (
    <Badge
      badgeClassName={[
        styles.badge,
        styles["badgeFor_" + contentType],
        styles[size],
        badgeOverride,
      ]}
    >
      {contentType === "paper" ? (
        <>
          <span className={css(styles.icon)}>
            <PaperIcon withAnimation={false} onClick={undefined} />
          </span>
          <span>Paper</span>
        </>
      ) : contentType === "post" ? (
        <>
          <span className={css(styles.icon)}>
            <PostIcon withAnimation={false} onClick={undefined} />
          </span>
          <span>Post</span>
        </>
      ) : contentType === "hypothesis" ? (
        <>
          <span className={css(styles.icon)}>
            <HypothesisIcon withAnimation={false} onClick={undefined} />
          </span>
          <span>Meta Study</span>
        </>
      ) : contentType === "question" ? (
        <>
          <span className={css(styles.icon)}>
            <QuestionIcon withAnimation={false} onClick={undefined} />
          </span>
          <span>Question</span>
        </>
      ) : contentType === POST_TYPES.DISCUSSION || contentType === "comment" ? (
        <>
          <span className={css(styles.icon)}>
            {<FontAwesomeIcon icon={faComments}></FontAwesomeIcon>}
          </span>
          <span>Comment</span>
        </>
      ) : contentType === POST_TYPES.ANSWER ? (
        <>
          <span className={css(styles.icon)}>
            {<FontAwesomeIcon icon={faCommentAltLines}></FontAwesomeIcon>}
          </span>
          <span>Answer</span>
        </>
      ) : contentType === POST_TYPES.SUMMARY ? (
        <>
          <span className={css(styles.icon)}>
            {<FontAwesomeIcon icon={faLayerGroup}></FontAwesomeIcon>}
          </span>
          <span>Summary</span>
        </>
      ) : contentType === POST_TYPES.REVIEW ? (
        <>
          <span className={css(styles.icon)}>
            {<FontAwesomeIcon icon={faStar}></FontAwesomeIcon>}
          </span>
          <span>Review</span>
        </>
      ) : contentType === "rsc_support" ? (
        <>
          <span className={css(styles.icon, styles.rscIcon)}>
            <ResearchCoinIcon version={4} height={16} width={16} />
            {` `}
          </span>
          <span className={css(styles.rscContent)}>{label}</span>
        </>
      ) : contentType === "bounty" ? (
        <>
          <span
            className={css(
              styles.icon,
              size === "small" && styles.iconSmall,
              styles.rscIcon
            )}
          >
            <ResearchCoinIcon
              version={4}
              height={size === "small" ? 14 : 16}
              width={size === "small" ? 14 : 16}
            />
            {` `}
          </span>
          <span className={css(styles.rscContent, rscContentOverride)}>
            {label}
          </span>
        </>
      ) : (
        <></>
      )}
    </Badge>
  );
};

const styles = StyleSheet.create({
  small: {
    fontSize: 12,
    padding: "3px 6px 1px",
  },
  medium: {},
  icon: {
    marginRight: 6,
    fontSize: 16,
    height: 21,
  },
  rscIcon: {
    height: "16px",
    display: "flex",
  },
  iconSmall: {
    height: 14,
  },
  badgeFor_rsc_support: {
    background: bountyColors.BADGE_BACKGROUND,
    color: bountyColors.BADGE_TEXT,
    padding: "5px 10px",
    paddingTop: 4,
  },
  badgeFor_bounty: {
    background: bountyColors.BADGE_BACKGROUND,
    color: bountyColors.BADGE_TEXT,
    padding: "5px 10px",
    paddingTop: 4,
  },
  rscContent: {
    color: colors.ORANGE_DARK2(),
  },
  badge: {
    color: colors.BLACK(0.5),
    background: colors.LIGHT_GREY(1.0),
    display: "flex",
    padding: "4px 10px 1px 10px",
    textTransform: "capitalize",
    borderRadius: "4px",
    marginBottom: 0,
    marginRight: 0,
    fontSize: 14,
    lineHeight: "17px",
    fontWeight: 500,
    [`@media only screen and (max-width: ${breakpoints.small.str})`]: {
      marginBottom: 0,
    },
  },
});

export default ContentBadge;
