/* eslint-disable no-unused-vars */
interface IRadioButtons {
  label1: string;
  value1: string;
  label2: string;
  value2: string;
  urlKey: string;
  header?: string;
}

interface MulitSelectProps {
  options: {
    label: string;
    value: string;
  }[];
  Label: string;
  URLkey: string;
  customStyles: any;
}

interface IRangeSelect {
  options: {
    min: number;
    max: number | null;
  }[];
  Label: string;
  urlKey: string;
  placeholder: string;
  showDollarSign: boolean;
}

interface IUniSearchResult {
  query: string;
  loading: boolean;
}

interface IResultsColumn {
  loading: boolean;
  activeSubTab: string;
  filterPage: number;
}
