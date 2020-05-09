import { Helpers } from "@quantfive/js-web-config";
import API from "~/config/api";

/**********************************
 *        ACTIONS SECTION         *
 **********************************/

export const ModalConstants = {
  UPLOAD_PAPER_MODAL_TOGGLE: "@@modal/UPLOAD_PAPER_MODAL_TOGGLE",
  ADD_AUTHOR_MODAL_TOGGLE: "@@modal/ADD_AUTHOR_MODAL_TOGGLE",
  LOGIN_MODAL_TOGGLE: "@@modal/LOGIN_MODAL_TOGGLE",
  PERMISSION_NOTIFICATION_MODAL_TOGGLE:
    "@@modal/PERMISSION_NOTIFICATION_MODAL_TOGGLE",
  INVITE_TO_HUB_MODAL_TOGGLE: "@@MODAL/INVITE_TO_HUB_MODAL_TOGGLE",
  ADD_DISCUSSION_MODAL_TOGGLE: "@@MODAL/ADD_DISCUSSION_MODAL_TOGGLE",
  ADD_HUB_MODAL_TOGGLE: "@@MODAL/ADD_HUB_MODAL_TOGGLE",
  TRANSACTION_MODAL_TOGGLE: "@@MODAL/TRANSACTION_MODAL_TOGGLE",
  FIRST_VOTE_MODAL_TOGGLE: "@@MODAL/FIRST_VOTE_MODAL_TOGGLE",
  ORCID_CONNECT_MODAL_TOGGLE: "@@modal/ORCID_CONNECT_MODAL_TOGGLE",
  MANAGE_BULLET_POINTS_MODAL_TOGGLE: "@@modal/MANAGE_BULLET_POINTS_TOGGLE",
  SIGN_UP_MODAL_TOGGLE: "@@modal/SIGN_UP_MODAL_TOGGLE",
  OPEN_DND_MODAL_TOGGLE: "@@modal/OPEN_DND_MODAL_TOGGLE",
};

export const ModalActions = {
  /**
   * Opens/closes the modal for upload paper modal
   * @param: boolean -- true opens modal false closes modal
   */
  openUploadPaperModal: (openModal, suggestedPapers = []) => {
    return (dispatch) => {
      return dispatch({
        type: ModalConstants.UPLOAD_PAPER_MODAL_TOGGLE,
        payload: {
          openUploadPaperModal: openModal,
          uploadPaperModal: {
            suggestedPapers,
          },
        },
      });
    };
  },
  openAddAuthorModal: (openModal) => {
    return (dispatch) => {
      return dispatch({
        type: ModalConstants.ADD_AUTHOR_MODAL_TOGGLE,
        payload: {
          openAddAuthorModal: openModal,
        },
      });
    };
  },
  openLoginModal: (openModal, flavorText) => {
    return (dispatch) => {
      return dispatch({
        type: ModalConstants.LOGIN_MODAL_TOGGLE,
        payload: {
          openLoginModal: openModal,
          loginModal: {
            flavorText,
          },
        },
      });
    };
  },
  openManageBulletPointsModal: (openModal, type) => {
    return (dispatch) => {
      return dispatch({
        type: ModalConstants.LOGIN_MODAL_TOGGLE,
        payload: {
          openManageBulletPointsModal: {
            isOpen: openModal,
            type,
          },
        },
      });
    };
  },
  openPermissionNotificationModal: (openModal, action) => {
    return (dispatch) => {
      return dispatch({
        type: ModalConstants.PERMISSION_NOTIFICATION_MODAL_TOGGLE,
        payload: {
          openPermissionNotificationModal: openModal,
          permissionNotificationAction: action,
        },
      });
    };
  },
  openInviteToHubModal: (openModal, hubId) => {
    return (dispatch) => {
      return dispatch({
        type: ModalConstants.INVITE_TO_HUB_MODAL_TOGGLE,
        payload: {
          openInviteToHubModal: openModal,
          hubId,
        },
      });
    };
  },
  openAddDiscussionModal: (openModal) => {
    return (dispatch) => {
      return dispatch({
        type: ModalConstants.ADD_DISCUSSION_MODAL_TOGGLE,
        payload: {
          openAddDiscussionModal: openModal,
        },
      });
    };
  },
  openAddHubModal: (openModal) => {
    return (dispatch) => {
      return dispatch({
        type: ModalConstants.ADD_HUB_MODAL_TOGGLE,
        payload: {
          openAddHubModal: openModal,
        },
      });
    };
  },
  openTransactionModal: (openModal) => {
    return (dispatch) => {
      return dispatch({
        type: ModalConstants.TRANSACTION_MODAL_TOGGLE,
        payload: {
          openTransactionModal: openModal,
        },
      });
    };
  },
  openFirstVoteModal: (openModal) => {
    return (dispatch) => {
      return dispatch({
        type: ModalConstants.FIRST_VOTE_MODAL_TOGGLE,
        payload: {
          openFirstVoteModal: openModal,
        },
      });
    };
  },
  openOrcidConnectModal: (openModal, setHasSeen = false) => {
    return (dispatch) => {
      if (!openModal && setHasSeen) {
        const config = { has_seen_orcid_connect_modal: true };
        return fetch(API.USER_ORCID_CONNECT_MODAL, API.PATCH_CONFIG(config))
          .then(Helpers.checkStatus)
          .then(Helpers.parseJSON)
          .then((res) => {
            return dispatch({
              type: ModalConstants.ORCID_CONNECT_MODAL_TOGGLE,
              payload: {
                openOrcidConnectModal: openModal,
              },
            });
          });
      } else {
        return dispatch({
          type: ModalConstants.ORCID_CONNECT_MODAL_TOGGLE,
          payload: {
            openOrcidConnectModal: openModal,
          },
        });
      }
    };
  },
  openSignUpModal: (openModal) => {
    return (dispatch) => {
      return dispatch({
        type: ModalConstants.SIGN_UP_MODAL_TOGGLE,
        payload: {
          openSignUpModal: openModal,
        },
      });
    };
  },
  openDndModal: (openModal, props) => {
    return (dispatch) => {
      return dispatch({
        type: ModalConstants.OPEN_DND_MODAL_TOGGLE,
        payload: {
          openDndModal: {
            isOpen: openModal,
            props,
          },
        },
      });
    };
  },
};

/**********************************
 *        REDUCER SECTION         *
 **********************************/

const defaultModalState = {
  openUploadPaperModal: false,
  openAddAuthorModal: false,
  openLoginModal: false,
  openPermissionNotificationModal: false,
  openInviteToHubModal: false,
  openAddDiscussionModal: false,
  openAddHubModal: false,
  openTransactionModal: false,
  openFirstVoteModal: false,
  openOrcidConnectModal: false,
  loginModal: {},
  uploadPaperModal: {
    suggestedPapers: [],
  },
  openManageBulletPointsModal: {
    type: null,
    isOpen: false,
  },
  openSignUpModal: false,
  openDndModal: {
    isOpen: false,
    props: {},
  },
};

const ModalReducer = (state = defaultModalState, action) => {
  switch (action.type) {
    case ModalConstants.UPLOAD_PAPER_MODAL_TOGGLE:
    case ModalConstants.ADD_AUTHOR_MODAL_TOGGLE:
    case ModalConstants.LOGIN_MODAL_TOGGLE:
    case ModalConstants.PERMISSION_NOTIFICATION_MODAL_TOGGLE:
    case ModalConstants.INVITE_TO_HUB_MODAL_TOGGLE:
    case ModalConstants.ADD_DISCUSSION_MODAL_TOGGLE:
    case ModalConstants.ADD_HUB_MODAL_TOGGLE:
    case ModalConstants.TRANSACTION_MODAL_TOGGLE:
    case ModalConstants.FIRST_VOTE_MODAL_TOGGLE:
    case ModalConstants.ORCID_CONNECT_MODAL_TOGGLE:
    case ModalConstants.MANAGE_BULLET_POINTS_TOGGLE:
    case ModalConstants.SIGN_UP_MODAL_TOGGLE:
    case ModalConstants.OPEN_DND_MODAL_TOGGLE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default ModalReducer;
