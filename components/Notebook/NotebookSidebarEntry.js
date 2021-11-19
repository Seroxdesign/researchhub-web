import Link from "next/link";
import NoteOptionsMenuButton from "./NoteOptionsMenuButton";
import colors from "~/config/themes/colors";
import icons from "~/config/themes/icons";
import { css, StyleSheet } from "aphrodite";
import { getNotePathname } from "~/components/Org/utils/orgHelper";
import { useState } from "react";

const NotebookSidebarEntry = ({
  currentNoteId,
  currentOrg,
  note,
  redirectToNote,
  showOptions,
  title,
}) => {
  const noteId = String(note.id);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={getNotePathname({ noteId: note.id, org: currentOrg })}>
      <a
        className={css(styles.entry, noteId === currentNoteId && styles.active)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={css(styles.noteIcon)}>{icons.paper}</div>
        {title}
        {showOptions && (
          <div className={css(styles.optionsMenuWrapper)}>
            <NoteOptionsMenuButton
              currentOrg={currentOrg}
              key={note.id}
              note={note}
              redirectToNote={redirectToNote}
              show={isHovered}
              title={title}
            />
          </div>
        )}
      </a>
    </Link>
  );
};

const styles = StyleSheet.create({
  entry: {
    backgroundClip: "padding-box",
    borderTop: `1px solid ${colors.GREY(0.3)}`,
    color: colors.BLACK(),
    cursor: "pointer",
    display: "flex",
    fontSize: 14,
    fontWeight: 500,
    padding: "15px 40px 15px 20px",
    position: "relative",
    textDecoration: "none",
    wordBreak: "break-word",
    ":hover": {
      backgroundColor: colors.GREY(0.3),
    },
    ":last-child": {
      borderBottom: `1px solid ${colors.GREY(0.3)}`,
    },
  },
  active: {
    backgroundColor: colors.GREY(0.3),
  },
  noteIcon: {
    color: colors.GREY(),
    marginRight: 10,
  },
  optionsMenuWrapper: {
    position: "absolute",
    right: 7,
    top: 11,
  },
});

export default NotebookSidebarEntry;