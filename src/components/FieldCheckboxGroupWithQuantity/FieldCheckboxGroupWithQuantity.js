import React, { Component } from 'react';
import classNames from 'classnames';
import { FieldQuantityInput, FieldCheckboxGroup } from '../../components';
import { requiredQuantity, requiredFieldArrayCheckbox } from '../../util/validators';
import css from './FieldCheckboxGroupWithQuantity.css';

const guid = () =>
  `_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

Array.prototype.diff = function(a) {
  return this.filter(function(i) {return a.indexOf(i) < 0;});
};
class FieldCheckboxGroupWithQuantity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOptions: this.props.selectedWorkspaces,
    };    
  }

  shouldComponentUpdate(nextProps, nextState){
    return true
  }

  componentDidUpdate(prevProps){
    let prevArray = prevProps.selectedWorkspaces;
    let newArray = this.props.selectedWorkspaces;
    if(prevArray !== newArray){
      this.setState({
        selectedOptions: this.props.selectedWorkspaces,
      })   
    }
  }

  render() {
    const {
      id, 
      options,
      intl,
      quantityErrors,
      defaultMaxQuantity,
    } = this.props;

    const selectedValues = this.state.selectedOptions;

    const quantityErrorsText = quantityErrors ? quantityErrors.map(function(item){
      return (
        <div className={css.quantityErrorText} key={guid()}>
          {item}
        </div>
      )
    }) : null;

    const labelW = intl.formatMessage({
      id: 'EditListingDescriptionForm.workspacesLabel',
    });
    const labelQ = intl.formatMessage({
      id: 'EditListingDescriptionForm.quantityLabel',
    });

    const workspacesRequiredMessage = intl.formatMessage({
      id: 'EditListingDescriptionForm.workspacesRequiredMessage',
    });

    return (
      <div>
        <div className={css.twoColumnWQ}>
          <div>
            <FieldCheckboxGroup
              id="workspaces"
              name="workspaces"
              label={labelW}
              options={options}
              validate={requiredFieldArrayCheckbox(workspacesRequiredMessage)}
            />
          </div>
          <div>
            <label className={css.labelQuantity}>{labelQ}</label>
            <ul className={css.list}>
              {options.map((option) => {
                const maxQuantity = defaultMaxQuantity ? defaultMaxQuantity[option.key] : option.count;
                const fieldId = `${id}.${option.key}`;
                const quantityRequiredFunc = requiredQuantity(`${option.label} value must be from ${1} to ${maxQuantity}`, 1, maxQuantity)
                const quantityRequired = selectedValues.indexOf(option.key) != -1 ? quantityRequiredFunc : false;
                return (
                  <li key={fieldId} className={css.item}>
                    <FieldQuantityInput
                      id={`${fieldId}_quantity`}
                      type="number"
                      name={`${option.key}_quantity`}
                      validate={quantityRequired}
                      selectedValues={selectedValues}
                      optionKey={option.key}
                      maxQuantity={maxQuantity}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        {quantityErrorsText}
      </div>
    );
  }
};

// FieldCheckboxGroupWithQuantity.defaultProps = {
//   rootClassName: null,
//   className: null,
//   label: null,
//   twoColumns: false,
// };

// FieldCheckboxGroupWithQuantityr.propTypes = {
//   rootClassName: string,
//   className: string,
//   id: string.isRequired,
//   label: node,
//   options: arrayOf(
//     shape({
//       key: string.isRequired,
//       label: node.isRequired,
//     })
//   ).isRequired,
// };

export default FieldCheckboxGroupWithQuantity;
