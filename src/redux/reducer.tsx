import {
  CREATE_DEAL_SUCCESS,
  REMOVE_DEAL_SUCCESS,
  PUBLISH_DEAL_SUCCESS,
  SORT_DEAL,
  FETCH_DEALS_SUCCESS,
  FETCH_DEALS_START,
} from './actions';
import { DealType, DealsListType } from '../types';
import { sortArrayObject } from '../utils/utility';

export let nextDealId = 4;

export const initialState: DealsListType = {
  deals: [
    // {
    //   id: 1,
    //   institution: 'LS Credit Union',
    //   dealSize: '1000000',
    //   dealType: 'Consumer Auto',
    //   isPublished: true,
    // },
    // {
    //   id: 2,
    //   institution: 'LS Credit Union',
    //   dealSize: '5000000',
    //   dealType: 'Real Estate',
    //   isPublished: false,
    // },
  ],
};

type ActionType = {
  type: string;
  payload: { deal: DealType } & { id: number } & { key: string; desc: boolean } & {
    deals: DealType[];
  };
};

export default (state = initialState, action: ActionType) => {
  switch (action.type) {
    case FETCH_DEALS_START:
      return {
        ...state,
      };
    case FETCH_DEALS_SUCCESS:
      return {
        ...state,
        deals: [...state.deals, ...action.payload.deals],
      };
    case CREATE_DEAL_SUCCESS:
      return {
        ...state,
        deals: [...state.deals, { ...action.payload.deal }],
      };
    case SORT_DEAL:
      const sortedDealList = sortArrayObject(action.payload.key, state.deals, action.payload.desc);
      return {
        ...state,
        deals: sortedDealList,
      };
    case PUBLISH_DEAL_SUCCESS:
      const publishedDealList = state.deals.map((deal) => {
        if (deal.id === action.payload.id) {
          deal.isPublished = true;
        }
        return deal;
      });
      return {
        ...state,
        deals: publishedDealList,
      };
    case REMOVE_DEAL_SUCCESS:
      const updatedDealList = state.deals.filter((deal) => deal.id !== action.payload.id);
      return {
        ...state,
        deals: updatedDealList,
      };
    default:
      return state;
  }
};
