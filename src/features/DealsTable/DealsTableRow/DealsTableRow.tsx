import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { DealType } from '../../../types';
import './DealsTableRow.scss';
import { removeDeal, publishDeal } from '../../../redux/actions';

const currencyAmountToString = (amount: string) => {
  return `$${amount.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

type DealsTableRowProps = {
  deal: DealType;
  // publish: (id: number) => void;
  // delete: (id: number) => void;
};

const DealsTableRow = (props: DealsTableRowProps) => {
  // Added id to prop so that it identify the deal to delete
  const {
    deal: { id, institution, dealType, dealSize, isPublished },
    // publish: publishListItem,
    // delete: deleteListItem,
  } = props;

  const dispatch = useDispatch();
  const onRemoveDeal = (id: number) => dispatch(removeDeal(id));
  const onPublishDeal = (id: number) => dispatch(publishDeal(id));

  return (
    <tr className="DealsTableRow">
      <td className="DealsTableRow--cell">{institution}</td>
      <td className="DealsTableRow--cell">{dealType}</td>
      <td className="DealsTableRow--cell">{currencyAmountToString(dealSize)}</td>
      <td className="DealsTableRow--cell">{isPublished ? 'Yes' : 'No'}</td>
      <td className="DealsTableRow--cell DealsTableRow--center">
        <span className="DealsTableRow--publish" onClick={() => onPublishDeal(id as number)}>
          {isPublished ? '' : 'Publish Now'}
        </span>
      </td>
      <td className="DealsTableRow--cell">
        <span className="DealsTableRow--delete" onClick={() => onRemoveDeal(id as number)}>
          X
        </span>
      </td>
    </tr>
  );
};

export default DealsTableRow;
