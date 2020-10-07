import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import noop from 'lodash/noop';
import { DealType, InputType } from '../../types';
import { checkValidity } from '../../utils/utility';
import './NewDealForm.scss';
import { createDeals } from '../../redux/actions';

const DEFAULT_DEAL: DealType = {
  institution: '',
  dealType: '',
  dealSize: '',
  isPublished: false,
};

const DEFAULT_INPUT_FORM: {
  [key: string]: InputType;
} = {
  institution: {
    type: 'text',
    placeholder: 'LS Credit Union',
    value: '',
    validation: {
      required: true,
      minLength: 1,
      maxLength: 50,
    },
    valid: false,
    touched: false,
  },
  dealType: {
    type: 'text',
    placeholder: 'Consumer Auto',
    validation: {
      required: true,
      minLength: 1,
      maxLength: 50,
    },
    value: '',
    valid: false,
    touched: false,
  },
  dealSize: {
    type: 'text',
    placeholder: '$1,000,000',
    validation: {
      required: true,
      minLength: 1,
      maxLength: 12,
      isNumber: true,
    },
    value: '',
    valid: false,
    touched: false,
  },
};

type DealFormProps = {
  onCreateDeal: (deal: DealType) => any;
};

const DealForm = () => {
  // noop returns undefined no matter the received parameters
  // const { onCreateDeal = noop } = props;
  const [newDeal, setNewDeal] = useState(DEFAULT_DEAL);

  // Add state to determine whether to toggle alert message when input is not complete
  const [inputForm, setInputForm] = useState(DEFAULT_INPUT_FORM);
  const [formIsValid, setFormIsValid] = useState(false);

  const dispatch = useDispatch();
  const onCreateDeals = (deal: DealType) => dispatch(createDeals(deal));

  const handleUpdateProperty = (property: string) => (e: React.ChangeEvent<any>) => {
    // create a copy of the inputForm values (e.g. inputForm[dealType]) with updated input values, touched and whether or not valid
    const updatedInputElement = {
      ...inputForm[property],
      ...{
        value: e.target.value,
        touched: true,
        valid: checkValidity(e.target.value, inputForm[property].validation),
      },
    };

    // create a copy of the inputForm with the updated inputForm values
    const updatedInputForm = {
      ...inputForm,
      [property]: updatedInputElement,
    };

    //Check to see if all inputForm values are valid
    let formIsValid = true;
    for (let inputIdentifier in updatedInputForm) {
      formIsValid = updatedInputForm[inputIdentifier].valid && formIsValid;
    }

    // set input field values to rerender the view
    setInputForm(updatedInputForm);
    // This should be done on submit since it no longe affects the input values
    setNewDeal({ ...newDeal, [property]: e.target.value });
    // set formisValid to determine if whole form is valid
    setFormIsValid(formIsValid);
  };

  const handleCreateDeal = (e: React.SyntheticEvent) => {
    e.preventDefault();

    console.log('newDeal', newDeal);

    onCreateDeals({ ...newDeal });
    // Reset state for the next deal input.
    setNewDeal({ ...DEFAULT_DEAL });
    // Reset input fields for next input.
    setInputForm({ ...DEFAULT_INPUT_FORM });
  };

  const inputElementsArray = [];
  for (let key in inputForm) {
    inputElementsArray.push({
      id: key,
      config: inputForm[key],
    });
  }

  return (
    <form className="NewDealForm tile">
      <div className="tile--header">Add New Deal</div>
      {inputElementsArray.map((input) => {
        return (
          // Should be refactored into own component
          <div className="NewDealForm--div" key={input.id}>
            <label
              className={`NewDealForm--label ${
                !input.config.valid && input.config.touched ? 'NewDealForm--error--label' : ''
              }`}
            >
              {input.id}
            </label>
            <input
              className={`NewDealForm--input ${
                !input.config.valid && input.config.touched ? 'NewDealForm--error--input' : ''
              }`}
              value={input.config.value}
              placeholder={input.config.placeholder}
              onChange={handleUpdateProperty(`${input.id}`)}
              required
            />
            {!input.config.valid && input.config.touched && (
              <span className="NewDealForm--error--text"> Please enter a valid {input.id}</span>
            )}
          </div>
        );
      })}

      <button className="NewDealForm--button" onClick={handleCreateDeal} disabled={!formIsValid}>
        Create Deal
      </button>
    </form>
  );
};

export default DealForm;
