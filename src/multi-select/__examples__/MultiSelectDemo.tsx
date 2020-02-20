import { filter, find, includes } from "lodash";
import React from "react";
import { CheckboxSelect } from "../CheckboxSelect";
import { GroupedCheckboxSelect } from "../GroupedCheckboxSelect";
import { ISelectOption, TSelectedValues } from "../../with-multi-select/interfaces";

const provinces = [
  {
    display: "四川省",
    value: "1",
  },
  {
    display: "河北省",
    value: "2",
  },
  {
    display: "海南省",
    value: "3",
  },
];

const cities = [
  {
    value: "11",
    display: "成都",
    group: "1",
  },
  {
    value: "12",
    display: "乐山",
    group: "1",
  },
  {
    value: "13",
    display: "绵阳",
    group: "1",
  },
  {
    value: "21",
    display: "北京",
    group: "2",
  },
  {
    value: "22",
    display: "鞍山",
    group: "2",
  },
  {
    value: "31",
    display: "吉宁",
    group: "3",
  },
  {
    value: "32",
    display: "长春",
    group: "3",
  },
];

interface ISelectOptionWithGroup extends ISelectOption {
  group: string;
}

const getCitiesBySelectedProvinces = (data: ISelectOptionWithGroup[], provincesValue: any[]) => {
  return filter(data, item => {
    return includes(provincesValue, item.group);
  });
};

const getDisplayByValue = (value: string | number, options: ISelectOption[]) => {
  const result = find(options, (option: ISelectOption) => option.value === value);
  return result ? result.display : "";
};

export class MultiSelectDemo extends React.Component<any, any> {
  state = {
    provincesValue: [],
    cityValue: [],
    cities: {} as ISelectOption[],
  };

  handleCityChange = (selectedValues?: TSelectedValues) => {
    console.log(this.state.cityValue, "cityValue");
    this.setState({
      cityValue: selectedValues,
    });
  };

  handleProvinceChange = (selectedValues?: TSelectedValues) => {
    console.log(this.state.provincesValue, "provincesValue");
    this.setState(
      {
        provincesValue: selectedValues,
      },
      () => {
        this.setState({
          cities: getCitiesBySelectedProvinces(cities, this.state.provincesValue),
        });
      },
    );
  };

  render() {
    return (
      <div css={{ display: "flex" }}>
        <div css={{ flex: 1 }}>
          <CheckboxSelect
            selectedValues={this.state.provincesValue}
            options={provinces}
            onChange={this.handleProvinceChange}
            placeholder="选择省份..."
          />
        </div>
        <div css={{ flex: 1 }}>
          <GroupedCheckboxSelect
            selectedValues={this.state.cityValue}
            options={this.state.cities}
            onChange={this.handleCityChange}
            getGroupTitle={key => {
              return getDisplayByValue(key, provinces);
            }}
            placeholder="选择城市..."
          />
        </div>
      </div>
    );
  }
}
