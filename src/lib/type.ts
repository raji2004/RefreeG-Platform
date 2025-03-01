export type elementProps = {
    className?: string;
    children?: React.ReactNode;
};
export type typographyProps = elementProps & {
    color?: 'text-primary' | 'text-secondary' | 'text-primary-foreground' | 'text-secondary-foreground' | 'text-popover'|'text-gray-400';
};

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    countryOfResidence: string;
    DOB: string;
    phoneNumber: string;
    bvn: number;
    nin: number;
    pin:number;
    donationPreference:string
}

export interface Country {
    name: {
        common: string;
        official: string;
        nativeName: {
            [key: string]: {
                official: string;
                common: string;
            };
        };
    };
    tld: string[];
    cca2: string;
    ccn3: string;
    cca3: string;
    independent: boolean;
    status: string;
    unMember: boolean;
    currencies: {
        [key: string]: {
            name: string;
            symbol: string;
        };
    };
    idd: {
        root: string;
        suffixes: string[];
    };
    capital: string[];
    altSpellings: string[];
    region: string;
    languages: {
        [key: string]: string;
    };
    translations: {
        [key: string]: {
            official: string;
            common: string;
        };
    };
    latlng: [number, number];
    landlocked: boolean;
    area: number;
    demonyms: {
        eng: {
            f: string;
            m: string;
        };
    };
    flag: string;
    maps: {
        googleMaps: string;
        openStreetMaps: string;
    };
    population: number;
    car: {
        signs: string[];
        side: string;
    };
    timezones: string[];
    continents: string[];
    flags: {
        png: string;
        svg: string;
    };
    coatOfArms: object;
    startOfWeek: string;
    capitalInfo: {
        latlng: [number, number];
    };
}

export interface SortedCountry{
    name: {
        common: string;
        official: string;
        nativeName: {
            [key: string]: {
                official: string;
                common: string;
            };
        };
    };
    flags: {
        png: string;
        svg: string;
    };
}

export type DonationHistory = {
    id: number;
    amount: number;
    cause: string;
    dateTime: string;
    transactionId: string;
    paymentMethod: string;
  };
  
