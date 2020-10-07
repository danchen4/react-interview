import { connect } from 'react-redux';
import { sortDeal, publishDeal } from '../../redux/actions';
import DealsTable from './DealsTable';
import { DealsListType } from '../../types';

type DispatchType = (arg0: {
  type: string;
  payload: { id: number } | { key: string; desc: boolean };
}) => any | Promise<void>;

const mapStateToProps = (state: DealsListType) => {
  const { deals } = state;
  return {
    deals,
  };
};

const mapDispatchToProps = (dispatch: DispatchType) => ({
  onSortDeals: (key: string, desc: boolean) => dispatch(sortDeal(key, desc)),
  // onPublishDeal: (id: number) => dispatch(publishDeal(id)),
  // onRemoveDeal: (id: number) => dispatch(removeDeal(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DealsTable);
