import { checkIcon, crossSvg } from "@/utils/UtilsSvg";
export const configMenuOpt = [
  {
    id: 1,
    name: "Company Profile",
  },
  {
    id: 2,
    name: "Operational Information",
  },
  {
    id: 3,
    name: "Themes & Subthemes",
  },
  {
    id: 4,
    name: "Key Impact Metrics",
  },
  {
    id: 5,
    name: "Formulae Definition",
  },
  {
    id: 6,
    name: "Standard & Reporting",
  },
  {
    id: 7,
    name: "Data Templates",
  },
  {
    id: 8,
    name: "Dashboard Settings",
  },
];
export const operationalArr = [
  [
    {
      groupId: 1,
      parentTag: [],
      tagLabel: "Production/ Manufacturing",
      tagId: 1,
      KIM: [1, 2, 3, 5, 6],
      operationalInfoId: "08bbd42d-1277-43f2-99b2-9e9d163d79ab",
      multiSelected: true,
      id: "644b6613e9a5b9bf04e46331",
    },
    {
      groupId: 1,
      parentTag: [],
      tagLabel: "Services/ Software",
      tagId: 2,
      KIM: [1, 2, 3, 5, 6],
      operationalInfoId: "8ba0c1e6-622a-450f-8110-9f182c4545b5",
      multiSelected: true,
      id: "644b6671e9a5b9bf04e46333",
    },
    {
      groupId: 1,
      parentTag: [],
      tagLabel: "Both",
      tagId: 3,
      KIM: [1, 2, 3, 5, 6],
      operationalInfoId: "7c747aa6-2b88-416f-85d7-67692697a582",
      multiSelected: true,
      id: "644b66a2e9a5b9bf04e46335",
    },
  ],
];

export const operationalArr2 = [
  {
    groupId: 2,
    parentTag: [],
    tagLabel: "Domestic",
    tagId: 4,
    KIM: [],
    operationalInfoId: "e581fa24-f2da-4322-beca-2ef5293ebead",
    multiSelected: true,
    id: "644b66dae9a5b9bf04e46337",
  },
  {
    groupId: 2,
    parentTag: [],
    tagLabel: "Overseas",
    tagId: 5,
    KIM: [
      7, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51,
    ],
    operationalInfoId: "65d0e66d-2e03-46e9-aa46-c1ae56f1f0af",
    multiSelected: true,
    id: "644b674ce9a5b9bf04e46339",
  },
];
export const operationalArr3 = [
  {
    groupId: 3,
    parentTag: [1, 3],
    tagLabel: "Own & Opearte Factories",
    tagId: 6,
    KIM: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
    ],
    operationalInfoId: "418ba292-23b1-410c-ab99-4837d264a29d",
    multiSelected: false,
    id: "644b6857e9a5b9bf04e46341",
  },
  {
    groupId: 3,
    parentTag: [1, 3],
    tagLabel: "Only Office Space",
    tagId: 7,
    KIM: [1, 2, 3, 4, 5, 6, 7, 9, 11, 12, 13, 14],
    operationalInfoId: "bf90b7fa-9f0e-44eb-af8f-08adb88c84dc",
    multiSelected: false,
    id: "644b68a8e9a5b9bf04e46343",
  },
];

export const listFirst = [
  "Production / Manufacturing",
  "Services / Software",
  "Both",
];
export const listSecond = ["Domestic", "Overseas"];
export const listThird = ["Own & Operate Factories", "Only Office Space"];
export const listFourth = [
  "Power Backup Solar / Biofuel",
  "Power Backup Diesel",
];

export const matrixRowArray = [
  {
    id: 1,
    selected: false,
    labelContent: "checkbox",
    metricName: "Scope 1 GHG emissions",
    metricUnit: "kgCO2e",
    metricType: "Number",
    metricMultiLocation: "Yes",
    metricMultiProduct: "Yes",
  },
  {
    id: 2,
    selected: true,
    labelContent: "checkbox",
    metricName: "Scope 2 GHG emissions",
    metricUnit: "kgCO2e",
    metricType: "Number",
    metricMultiLocation: "Yes",
    metricMultiProduct: "Yes",
  },
  {
    id: 4,
    selected: true,
    labelContent: " checkbox",
    metricName: "Scope 3 GHG emissions",
    metricUnit: "kgCO2e",
    metricType: "Number",
    metricMultiLocation: "Yes",
    metricMultiProduct: "Yes",
  },
  {
    id: 5,
    selected: false,
    labelContent: " checkbox",
    metricName: "Carbon footprint per employee",
    metricUnit: "kgCO2e",
    metricType: "Number",
    metricMultiLocation: "Yes",
    metricMultiProduct: "Yes",
  },
  {
    id: 6,
    selected: true,
    labelContent: " checkbox",
    metricName: "Emissions avoided due to the firm output product / services",
    metricUnit: "kgCO2e",
    metricType: "Number",
    metricMultiLocation: "Yes",
    metricMultiProduct: "Yes",
  },
  {
    id: 7,
    selected: true,
    labelContent: " checkbox",
    metricName: "Emissions from business travel",
    metricUnit: "kgCO2e",
    metricType: "Number",
    metricMultiLocation: "Yes",
    metricMultiProduct: "Yes",
  },
  {
    id: 8,
    selected: true,
    labelContent: " checkbox",
    metricName: "Emissions from capital goods",
    metricUnit: "kgCO2e",
    metricType: "Number",
    metricMultiLocation: "Yes",
    metricMultiProduct: "Yes",
  },
];

export const treeContents = [
  {
    id: 1,
    values: ["Energy", "Emissions", "Waste management"],
  },
  {
    id: 2,
    values: [
      "Community",
      "Customer Relations",
      "Diversity and inclusion",
      "Employee engagement",
      "Employee training",
    ],
  },
  {
    id: 3,
    values: [
      "Board",
      "Ethics and compliance",
      "Data protection",
      "Executive Compensation",
      "Stakeholder Engagement",
    ],
  },
];

export const formulaList = [
  {
    id: 1,
    metric: "Scope 1 GHG emissions",
    multipleLocation: false,
    multipleProduct: false,
    userFormula: "a=b+c",
    companyFormula: "Total GHG emissions from direct sources - vehicle and DG",
  },
  {
    id: 2,
    metric: "Carbon footprint per e...",
    multipleLocation: false,
    multipleProduct: false,
    userFormula: "a=b+c",
    companyFormula: "Total GHG emissions from direct sources - vehicle and DG",
  },
  {
    id: 3,
    metric: "Scope 2 GHG emissions",
    multipleLocation: false,
    multipleProduct: false,
    userFormula: "a=b+c",
    companyFormula: "Total GHG emissions from direct sources - vehicle and DG",
  },
  {
    id: 4,
    metric: "Scope 3 GHG emissions",
    multipleLocation: false,
    multipleProduct: false,
    userFormula: "a=b+c",
    companyFormula: "Total GHG emissions from direct sources - vehicle and DG",
  },
  {
    id: 5,
    metric: "Employee training cost",
    multipleLocation: false,
    multipleProduct: false,
    userFormula: "a=b+c",
    companyFormula: "Total GHG emissions from direct sources - vehicle and DG",
  },
  {
    id: 6,
    metric: "Board composition",
    multipleLocation: false,
    multipleProduct: false,
    userFormula: "a=b+c",
    companyFormula: "Total GHG emissions from direct sources - vehicle and DG",
  },
  {
    id: 7,
    metric: "Board meetings",
    multipleLocation: false,
    multipleProduct: false,
    userFormula: "a=b+c",
    companyFormula: "Total GHG emissions from direct sources - vehicle and DG",
  },
  {
    id: 8,
    metric: "Board diversity",
    multipleLocation: false,
    multipleProduct: false,
    userFormula: "a=b+c",
    companyFormula: "Total GHG emissions from direct sources - vehicle and DG",
  },
  {
    id: 9,
    metric: "Ethical business conduct",
    multipleLocation: false,
    multipleProduct: false,
    userFormula: "a=b+c",
    companyFormula: "Total GHG emissions from direct sources - vehicle and DG",
  },
  {
    id: 10,
    metric: "Emission from electric...",
    multipleLocation: false,
    multipleProduct: false,
    userFormula: "a=b+c",
    companyFormula: "Total GHG emissions from direct sources - vehicle and DG",
  },
];

export const variable = [
  "Solar electricity units",
  "Electricity consumption in kWh",
  "Renewable energy units in kWh",
  "Executive team diversity",
  "Diversity and inclusion index",
  "Diversity and inclusion score",
];
export const constantArray = [
  "Grid Emission factor",
  "Emission factor",
  "Paper packaging/ 100mlproduct",
  "Paper packaging/ 500mlproduct",
  "Plastic packaging/ 100mlproduct",
  "Plastic packaging/ 500ml product",
];
export const reportingStandard = ["SDG", "BRSR", "Custom"];
export const formatReports = ["PDF", "Excel"];
export const dataPeriod = ["MONTHLY", "QUARTERLY"];
export const financialYear = ["JAN-DEC", "APR-MAR"];

export const subThemeArr = [
  {
    themeId: "ec404e9b-7b95-48de-b4d5-4e2c557e6e91",
    subtheme: "Emissions/Climate Change",
    metricId: [1],
    subthemeId: "46a32d5b-423d-442a-a269-39ab9d55e996",
    id: "644f749a85e0f5953269b653",
  },
  {
    themeId: "ec404e9b-7b95-48de-b4d5-4e2c557e6e91",
    subtheme: "Energy",
    metricId: [11],
    subthemeId: "e476864c-12a8-48ff-a997-9684df209fc8",
    id: "644f74be85e0f5953269b657",
  },
  {
    themeId: "ec404e9b-7b95-48de-b4d5-4e2c557e6e91",
    subtheme: "Waste Management",
    metricId: [15],
    subthemeId: "0767a887-5303-496d-bc1d-9f08e0a229f0",
    id: "644f74cc85e0f5953269b659",
  },
  {
    themeId: "d4e8f853-51ba-4e5c-9674-cec001aad84c",
    subtheme: "Capex",
    metricId: [20],
    subthemeId: "523256c5-5c81-4dc3-96a2-35ab83e7597b",
    id: "644f74fa85e0f5953269b65b",
  },
  {
    themeId: "d4e8f853-51ba-4e5c-9674-cec001aad84c",
    subtheme: "Cash Flow Management",
    metricId: [21],
    subthemeId: "f850316e-af72-4967-9959-01697d3caedd",
    id: "644f751685e0f5953269b65d",
  },
  {
    themeId: "d4e8f853-51ba-4e5c-9674-cec001aad84c",
    subtheme: "Cost Management",
    metricId: [23],
    subthemeId: "dcf0d802-6e87-4920-acb4-d97b60730b8c",
    id: "644f753085e0f5953269b65f",
  },
];

export const themeArr = [
  {
    theme: "Environment",
    themeId: "ec404e9b-7b95-48de-b4d5-4e2c557e6e91",
    id: "644f5e7e1d2843fa73e990c3",
  },
  {
    theme: "Financial",
    themeId: "d4e8f853-51ba-4e5c-9674-cec001aad84c",
    id: "644f74ab85e0f5953269b655",
  },
];

export const dataCollectionTableContent = [
  {
    id: 1,
    heading: "Scope 2 emissions ",
    unit: "kgCo2e",
    // month1: "10000",
    // month2: "12000",
    // month3: "10000",
    // month4: "11000",
    // month5: "900",
    // month6: "10500",
    data: [
      { name: "Jan'23", value: 10000 },
      { name: "Fab'23", value: 12000 },
      { name: "Mar'23", value: 10000 },
      { name: "Apr'23", value: 11000 },
      { name: "Mar'23", value: 19000 },
      { name: "Jun'23", value: 12600 },
      // {name: "Jul'23", value: 18400},
      // {name: "Aug'23", value: 12500},
    ],
    dataCollection: [
      {
        id: 1.1,
        heading: "Electricity consumption ",
        unit: "kWh",
        // month1: "2000",
        // month2: "2300",
        // month3: "1800",
        // month4: "2000",
        // month5: "1900",
        // month6: "2050",
        data: [
          { name: "", value: 10000 },
          { name: "", value: 12000 },
          { name: "", value: 10000 },
          { name: "", value: 11000 },
          { name: "", value: 19000 },
          { name: "", value: 19500 },
        ],
        parentId: 1,
      },
      {
        id: 1.2,
        heading: "Renewable energy units ",
        unit: "kWh",
        month1: "2000",
        month2: "2300",
        month3: "1800",
        month4: "2000",
        month5: "1900",
        month6: "2050",
        data: [
          { name: "", value: 10000 },
          { name: "", value: 12000 },
          { name: "", value: 10000 },
          { name: "", value: 11000 },
          { name: "", value: 19000 },
          { name: "", value: 19500 },
        ],
        parentId: 1,
      },
      {
        id: 1.3,
        heading: " Grid emission factor ",
        unit: "kWh",
        month1: "2000",
        month2: "2300",
        month3: "1800",
        month4: "2000",
        month5: "1900",
        month6: "2050",
        data: [
          { name: "", value: 10000 },
          { name: "", value: 12000 },
          { name: "", value: 10000 },
          { name: "", value: 11000 },
          { name: "", value: 19000 },
          { name: "", value: 19500 },
        ],
        parentId: 1,
      },
    ],
  },
  {
    id: 2,
    heading: "Gender diversity",
    unit: "%",
    month1: "40",
    month2: "40",
    month3: "40",
    month4: "42",
    month5: "42",
    month6: "42",
    data: [
      { name: "", value: 40 },
      { name: "", value: 24 },
      { name: "", value: 58 },
      { name: "", value: 65 },
      { name: "", value: 45 },
      { name: "", value: 42 },
    ],
    dataCollection: [
      {
        id: 2.1,
        heading: "No. of Women employees",
        unit: "Count",
        month1: "40",
        month2: "40",
        month3: "40",
        month4: "42",
        month5: "42",
        month6: "42",
        data: [
          { name: "", value: 40 },
          { name: "", value: 24 },
          { name: "", value: 58 },
          { name: "", value: 65 },
          { name: "", value: 45 },
          { name: "", value: 42 },
        ],
        parentId: 2,
      },
      {
        id: 2.2,
        heading: "Total employees",
        unit: "Count",
        month1: "40",
        month2: "40",
        month3: "40",
        month4: "42",
        month5: "42",
        month6: "42",
        data: [
          { name: "", value: 40 },
          { name: "", value: 24 },
          { name: "", value: 58 },
          { name: "", value: 65 },
          { name: "", value: 45 },
          { name: "", value: 42 },
        ],
        parentId: 2,
      },
    ],
  },
  {
    id: 3,
    heading: "Women representation in management positions",
    unit: "%",
    month1: "5",
    month2: "5",
    month3: "5",
    month4: "5",
    month5: "5",
    month6: "7.5",
    data: [
      { name: "", value: 5 },
      { name: "", value: 4 },
      { name: "", value: 8 },
      { name: "", value: 4 },
      { name: "", value: 6 },
      { name: "", value: 5.6 },
    ],
    dataCollection: [
      {
        id: 3.1,
        heading: "No. of Women employees in management positions ",
        unit: "Count",
        month1: "2",
        month2: "2",
        month3: "2",
        month4: "2",
        month5: "2",
        month6: "3",
        data: [
          { name: "", value: 5 },
          { name: "", value: 4 },
          { name: "", value: 8 },
          { name: "", value: 4 },
          { name: "", value: 6 },
          { name: "", value: 5.6 },
        ],
        parentId: 3,
      },
      {
        id: 3.2,
        heading: "Total employees in management positions ",
        unit: "Count",
        month1: "40",
        month2: "40",
        month3: "40",
        month4: "40",
        month5: "40",
        month6: "40",
        data: [
          { name: "", value: 5 },
          { name: "", value: 4 },
          { name: "", value: 8 },
          { name: "", value: 4 },
          { name: "", value: 6 },
          { name: "", value: 5.6 },
        ],
        parentId: 3,
      },
    ],
  },
];