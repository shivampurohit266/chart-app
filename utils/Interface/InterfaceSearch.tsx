export interface SearchInterface {
    searchOption? : string;
    alphaOption? : string;
    plusOption? : string;
    editOption? : string;
    deleteOption? : string;
    selectedItem? : string;
    getData? : () => void;
    setSearchData? : (value: string) => void;
    searchFor?: string;
}