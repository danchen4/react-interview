import { DealType } from '../types';
import { Dispatch } from 'redux';

export const CREATE_DEAL_SUCCESS = 'CREATE_DEAL_SUCCESS';
export const SORT_DEAL = 'SORT_DEAL';
export const PUBLISH_DEAL_SUCCESS = 'PUBLISH_DEAL_SUCCESS ';
export const REMOVE_DEAL_SUCCESS = 'REMOVE_DEAL_SUCCESS';
export const FETCH_DEALS_START = 'FETCH_DEALS_START';
export const FETCH_DEALS_SUCCESS = 'FETCH_DEALS_SUCCESS';

export const fetchDeals = () => async (dispatch: Dispatch) => {
  const url = 'http://localhost:8000/deals';
  try {
    const response = await fetch(url);
    const data = await response.json();
    dispatch(fetchDealsSuccess(data));
  } catch (err) {
    console.log(err);
  }
};

export const createDeals = (deal: DealType) => async (dispatch: Dispatch) => {
  const url = `http://localhost:8000/deals`;
  console.log('createDeals', deal);
  try {
    // Fetch deals to find the highest id number
    let newId = 1;
    let response = await fetch(url);
    let data = await response.json();

    // New ID number will be incremented from highest id number
    for (let deal of data) {
      if (deal.id > newId) {
        newId = deal.id;
      }
    }
    newId++;

    const dealWithId = { ...deal, id: newId };

    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deal),
    });
    dispatch(createDealSuccess(dealWithId));
  } catch (err) {
    console.log(err);
  }
};

export const removeDeal = (id: number) => async (dispatch: Dispatch) => {
  const url = `http://localhost:8000/deals/${id}`;
  try {
    await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    dispatch(removeDealSuccess(id));
  } catch (err) {
    console.log(err);
  }
};

export const publishDeal = (id: number) => async (dispatch: Dispatch) => {
  const url = `http://localhost:8000/deals/${id}`;
  try {
    await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isPublished: true }),
    });
    dispatch(publishDealSuccess(id));
  } catch (err) {
    console.log(err);
  }
};

export const createDealSuccess = (deal: DealType) => {
  return {
    type: CREATE_DEAL_SUCCESS,
    payload: { deal },
  };
};

export const fetchDealsStart = () => {
  return {
    type: FETCH_DEALS_START,
  };
};

export const fetchDealsSuccess = (deals: DealType[]) => {
  return {
    type: FETCH_DEALS_SUCCESS,
    payload: { deals },
  };
};

export const sortDeal = (key: string, desc: boolean) => {
  return {
    type: SORT_DEAL,
    payload: {
      key,
      desc,
    },
  };
};

export const publishDealSuccess = (id: number) => {
  return {
    type: PUBLISH_DEAL_SUCCESS,
    payload: {
      id,
    },
  };
};

export const removeDealSuccess = (id: number) => {
  return {
    type: REMOVE_DEAL_SUCCESS,
    payload: {
      id,
    },
  };
};
