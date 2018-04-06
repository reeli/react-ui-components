import { css } from 'glamor';
import {
  Dictionary,
  groupBy,
} from 'lodash';
import * as React from 'react';
import { IGroupedOption } from '../../listing/GroupedCheckboxListing';
import { ISelectOption } from '../../multi-select/MultiSelect';
import { GroupedCheckListingSelect } from '../GroupedCheckListingSelect';

// const provinces = [
//   {
//     display: '四川省',
//     value: '1',
//   },
//   {
//     display: '河北省',
//     value: '2',
//   },
//   {
//     display: '海南省',
//     value: '3',
//   },
// ];

const cities = [
  {
    value: '11',
    display: '成都',
    group: '1',
  },
  {
    value: '12',
    display: '乐山',
    group: '1',
  },
  {
    value: '13',
    display: '绵阳',
    group: '1',
  },
  {
    value: '21',
    display: '北京',
    group: '2',
  },
  {
    value: '22',
    display: '鞍山',
    group: '2',
  },
  {
    value: '31',
    display: '吉宁',
    group: '3',
  },
  {
    value: '32',
    display: '长春',
    group: '3',
  },
];

const groupedCity = groupBy(cities, 'group') as Dictionary<IGroupedOption[]>;

export class CheckListingSelectDemo extends React.Component<any, any> {
  state = {
    provincesValue: [],
    cityValue: [],
  };

  handleChange = (_: ISelectOption, selectedValues: string[] | number[]) => {
    console.log(selectedValues, 'selectedValues');
    this.setState({
      cityValue: selectedValues,
    });
  };

  render() {
    return (
      <div {...css({ display: 'flex' })}>
        <div {...css({ flex: 1 })}>
          {/*<CascadingSelect*/}
          {/*value={this.state.provincesValue}*/}
          {/*options={provinces}*/}
          {/*onChange={this.handleChange}*/}
          {/*placeholder="Type you name here..."*/}
          {/*/>*/}
        </div>
        <div {...css({ flex: 1 })}>
          <GroupedCheckListingSelect
            value={this.state.cityValue}
            groupedOptions={groupedCity}
            onChange={this.handleChange}
            placeholder="Type you name here..."
          />
        </div>
      </div>
    );
  }
}
