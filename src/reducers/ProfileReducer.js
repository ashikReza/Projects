import { actions } from "../actions";

const initialState = {
  user: null,
  blogs: [],
  loading: false,
  error: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.profile.DATA_FETCHING: {
      return {
        ...state,
        loading: true,
      };
    }

    case actions.profile.PROFILE_DATA_FETCHED: {
      return {
        ...state,
        loading: false,
        user: action.user,
        blogs: action.blogs,
      };
    }

    case actions.profile.PROFILE_DATA_FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }

    case actions.profile.PROFILE_BIO_EDITED:
      // Update only the bio in the user object
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          bio: action.user.bio,
        },
      };

    case actions.profile.IMAGE_UPDATED: {
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          avatar: action.data.avatar,
        },
      };
    }

    case actions.profile.TOGGLE_BLOG_CONTENT_DISPLAY: {
      return {
        ...state,
        blogs: state.blogs.map((blog) =>
          blog.id === action.blogId
            ? { ...blog, showFullContent: !blog.showFullContent }
            : blog
        ),
      };
    }

    case actions.profile.DELETE_BLOG: {
      return {
        ...state,
        blogs: state.blogs.filter((blog) => blog.id !== action.blogId),
      };
    }

    default: {
      return state;
    }
  }
};

export { initialState, profileReducer };
