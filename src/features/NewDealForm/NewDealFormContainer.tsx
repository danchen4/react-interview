import { connect } from 'react-redux';
import { createDealSuccess } from '../../redux/actions';
import NewDealForm from './NewDealForm';
import { DealType } from '../../types';

type DispatchType = (arg0: { type: string; payload: { deal: DealType } }) => any;

// const mapDispatchToProps = (dispatch: DispatchType) => ({
//   onCreateDeal: (deal: DealType) => dispatch(createDealSuccess(deal)),
// });

// export default connect(undefined, mapDispatchToProps)(NewDealForm);
export default NewDealForm;
