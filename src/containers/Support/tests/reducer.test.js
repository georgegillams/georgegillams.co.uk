import supportReducer from '../reducer';
import { loadLinks, createLink, deleteLink } from '../actions';
import { initialState } from '../reducer';

describe('supportReducer', () => {
  let state;

  beforeEach(() => {
    state = {
      ...initialState,
    };
  });

  it('should return the initial state', () => {
    expect(supportReducer(undefined, {})).toEqual(state);
  });

  describe('loadLinks actions', () => {
    it('should handle the action loadLinks.TRIGGER correctly', () => {
      const expectResult = {
        ...state,
      };

      expect(supportReducer(state, loadLinks.trigger())).toEqual(expectResult);
    });

    it('should handle the action loadLinks.REQUEST correctly', () => {
      const expectResult = {
        ...state,
        loadingLinks: true,
      };

      expect(supportReducer(state, loadLinks.request())).toEqual(expectResult);
    });

    it('should return the action loadLinks.SUCCESS correctly', () => {
      const expectResult = {
        ...state,
        links: [{ id: 'some-link', name: 'link1' }],
      };

      expect(
        supportReducer(state, loadLinks.success({ supportMessages: [{ id: 'some-link', name: 'link1' }] }))
      ).toEqual(expectResult);
    });

    it('should return the action loadLinks.FAILURE correctly', () => {
      const expectResult = {
        ...state,
        loadLinksError: 'some error',
      };

      expect(supportReducer(state, loadLinks.failure('some error'))).toEqual(expectResult);
    });
  });

  describe('createLink actions', () => {
    it('should handle the action createLink.TRIGGER correctly', () => {
      const expectResult = {
        ...state,
        linkToCreate: 'some-link',
      };

      expect(supportReducer(state, createLink.trigger('some-link'))).toEqual(expectResult);
    });

    it('should handle the action createLink.REQUEST correctly', () => {
      const expectResult = {
        ...state,
        creatingLink: true,
      };

      expect(supportReducer(state, createLink.request())).toEqual(expectResult);
    });

    it('should return the action createLink.SUCCESS correctly', () => {
      const expectResult = {
        ...state,
      };

      expect(supportReducer(state, createLink.success({ status: 200 }))).toEqual(expectResult);
    });

    it('should return the action createLink.FAILURE correctly', () => {
      const expectResult = {
        ...state,
        createLinkError: 'some error',
      };

      expect(supportReducer(state, createLink.failure('some error'))).toEqual(expectResult);
    });
  });

  describe('deleteLink actions', () => {
    it('should handle the action deleteLink.TRIGGER correctly', () => {
      const expectResult = {
        ...state,
        linkToDelete: 'some-link',
      };

      expect(supportReducer(state, deleteLink.trigger('some-link'))).toEqual(expectResult);
    });

    it('should handle the action deleteLink.REQUEST correctly', () => {
      const expectResult = {
        ...state,
        deletingLink: true,
      };

      expect(supportReducer(state, deleteLink.request())).toEqual(expectResult);
    });

    it('should return the action deleteLink.SUCCESS correctly', () => {
      const expectResult = {
        ...state,
      };

      expect(supportReducer(state, deleteLink.success({ status: 200 }))).toEqual(expectResult);
    });

    it('should return the action deleteLink.FAILURE correctly', () => {
      const expectResult = {
        ...state,
        deleteLinkError: 'some error',
      };

      expect(supportReducer(state, deleteLink.failure('some error'))).toEqual(expectResult);
    });
  });
});
