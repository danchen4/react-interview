import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import noop from 'lodash/noop';
import { DealType } from '../../types';
import DealsTableRow from './DealsTableRow/DealsTableRow';
import './DealsTable.scss';
import SortIcon from '../../assets/SortIcon';
import { fetchDeals } from '../../redux/actions';

type DealsTableProps = {
  deals: DealType[];
  onSortDeals: (key: string, sortDesc: boolean) => void;
  // onPublishDeal: (id: number) => void;
  // onRemoveDeal: (id: number) => void;
};

const DealsTable = (props: DealsTableProps) => {
  const { deals, onSortDeals = noop /*onPublishDeal = noop onRemoveDeal = noop*/ } = props;
  const [desc, setDesc] = useState(false);

  const dispatch = useDispatch();
  const onInitDeals = useCallback(() => dispatch(fetchDeals()), []);

  console.log('DealsTable');

  // Update table whenever deals change
  useEffect(() => {
    onInitDeals();
  }, [onInitDeals]);

  // const deleteHandler = (id: number) => {
  //   onRemoveDeal(id);
  // };

  // const publishHandler = (id: number) => {
  //   onPublishDeal(id);
  // };

  const sortHandler = (key: string) => {
    setDesc(!desc);
    onSortDeals(key, desc);
  };

  const dealsTableRows = deals.map((deal) => (
    <DealsTableRow key={deal.id} deal={deal} /*delete={deleteHandler} publish={publishHandler} */ />
  ));

  return (
    <div className="tile">
      <div className="tile--header">Deal Portfolio</div>
      <table className="DealsTable">
        <thead>
          <tr>
            <th className="DealsTable--headerCell">
              <div className="DealsTable--sort" onClick={() => sortHandler('institution')}>
                <span>Institution</span>
                <SortIcon />
              </div>
            </th>
            <th className="DealsTable--headerCell">
              <div className="DealsTable--sort" onClick={() => sortHandler('dealType')}>
                <span>Deal Type</span>
                <SortIcon />
              </div>
            </th>
            <th className="DealsTable--headerCell">
              <div className="DealsTable--sort" onClick={() => sortHandler('dealSize')}>
                <span>Deal Size</span>
                <SortIcon />
              </div>
            </th>
            <th className="DealsTable--headerCell">Is Published?</th>
            <th className="DealsTable--headerCell">Publish?</th>
            <th className="DealsTable--headerCell">Remove</th>
          </tr>
        </thead>
        <tbody>{dealsTableRows}</tbody>
      </table>
    </div>
  );
};

export default DealsTable;
