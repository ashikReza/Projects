import { actions } from "../actions";

const initialState = {
  blogs: [],
  loading: false,
  error: null,
  page: 1,
};

const blogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.blogs.FETCH_BLOGS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.blogs.FETCH_BLOGS_SUCCESS:
      return {
        ...state,
        loading: false,
        blogs:
          action.page === 1 ? action.blogs : [...state.blogs, ...action.blogs], // Append blogs for subsequent pages
        page: action.page, // Update current page
        error: null,
      };
    case actions.blogs.FETCH_BLOGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case actions.blogs.DATA_CREATED: {
      return {
        ...state,
        loading: false,
        blogs: [...state.blogs, action.data],
      };
    }

    case actions.blogs.POST_DELETED: {
      // Filter out the deleted post by ID
      const filteredBlogs = state.blogs.filter((item) => item.id !== action.data);
      return {
        ...state,
        loading: false,
        blogs: filteredBlogs,
      };
    }

    case actions.blogs.DATA_EDITED: {
      // Map through blogs and update the edited blog
      const updatedBlogs = state.blogs.map((blog) =>
        blog.id === action.data.id ? action.data : blog
      );
      return {
        ...state,
        loading: false,
        blogs: updatedBlogs,
      };
    }

    default:
      return state;
  }
};

export { initialState, blogsReducer };
