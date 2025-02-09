import { flagInfoType } from "../types";

// similar countries
const equalFlags0 = [
    "nc",
    "bl",
    "re",
    "pm",
    "fr",
    "gp",
    "yt",
    "gf",
    "mq",
    "mf",
];
const equalFlags1 = ["id", "mc"];
const equalFlags2 = ["nl", "lu"];
const equalFlags3 = ["ro", "td"];
const equalFlags4 = ["us", "um"];

// country codes and names
const countries: flagInfoType = {
    zw: "Zimbabwe",
    zm: "Zambia",
    ye: "Yemen",
    eh: "Western Sahara",
    wf: "Wallis and Futuna",
    vi: "Virgin Islands (U.S.)",
    vg: "Virgin Islands (British)",
    vn: "Viet Nam",
    ve: "Venezuela (Bolivarian Republic of Venezuela)",
    vu: "Vanuatu",
    uz: "Uzbekistan",
    uy: "Uruguay",
    um: "United States Minor Outlying Islands",
    us: "United States of America",
    gb: "United Kingdom of Great Britain and Northern Ireland",
    ae: "United Arab Emirates",
    ua: "Ukraine",
    ug: "Uganda",
    tv: "Tuvalu",
    tc: "Turks and Caicos Islands",
    tm: "Turkmenistan",
    tr: "Turkey",
    tn: "Tunisia",
    tt: "Trinidad and Tobago",
    to: "Tonga",
    tk: "Tokelau",
    tg: "Togo",
    tl: "Timor-Leste",
    th: "Thailand",
    tz: '"Tanzania',
    tj: "Tajikistan",
    tw: '"Taiwan',
    sy: "Syrian Arab Republic",
    ch: "Switzerland",
    se: "Sweden",
    sj: "Svalbard and Jan Mayen",
    sr: "Suriname",
    sd: "Sudan",
    lk: "Sri Lanka",
    es: "Spain",
    ss: "South Sudan",
    gs: "South Georgia and the South Sandwich Islands",
    za: "South Africa",
    so: "Somalia",
    sb: "Solomon Islands",
    si: "Slovenia",
    sk: "Slovakia",
    sx: "Sint Maarten (Dutch part)",
    sg: "Singapore",
    sl: "Sierra Leone",
    sc: "Seychelles",
    rs: "Serbia",
    sn: "Senegal",
    sa: "Saudi Arabia",
    st: "Sao Tome and Principe",
    sm: "San Marino",
    ws: "Samoa",
    vc: "Saint Vincent and the Grenadines",
    pm: "Saint Pierre and Miquelon",
    mf: "Saint Martin (French part)",
    lc: "Saint Lucia",
    kn: "Saint Kitts and Nevis",
    sh: '"Saint Helena',
    bl: "Saint Barthélemy",
    rw: "Rwanda",
    ru: "Russian Federation",
    ro: "Romania",
    re: "Réunion",
    qa: "Qatar",
    pr: "Puerto Rico",
    pt: "Portugal",
    pl: "Poland",
    pn: "Pitcairn",
    ph: "Philippines",
    pe: "Peru",
    py: "Paraguay",
    pg: "Papua New Guinea",
    pa: "Panama",
    ps: '"Palestine',
    pw: "Palau",
    pk: "Pakistan",
    om: "Oman",
    no: "Norway",
    mp: "Northern Mariana Islands",
    mk: "North Macedonia",
    nf: "Norfolk Island",
    nu: "Niue",
    ng: "Nigeria",
    ne: "Niger",
    ni: "Nicaragua",
    nz: "New Zealand",
    nc: "New Caledonia",
    nl: "Netherlands",
    np: "Nepal",
    nr: "Nauru",
    na: "Namibia",
    mm: "Myanmar",
    mz: "Mozambique",
    ma: "Morocco",
    ms: "Montserrat",
    me: "Montenegro",
    mn: "Mongolia",
    mc: "Monaco",
    md: '"Moldova',
    fm: "Micronesia (Federated States of Micronesia)",
    mx: "Mexico",
    yt: "Mayotte",
    mu: "Mauritius",
    mr: "Mauritania",
    mq: "Martinique",
    mh: "Marshall Islands",
    mt: "Malta",
    ml: "Mali",
    mv: "Maldives",
    my: "Malaysia",
    mw: "Malawi",
    mg: "Madagascar",
    mo: "Macao",
    lu: "Luxembourg",
    lt: "Lithuania",
    li: "Liechtenstein",
    ly: "Libya",
    lr: "Liberia",
    ls: "Lesotho",
    lb: "Lebanon",
    lv: "Latvia",
    la: "Lao People's Democratic Republic",
    kg: "Kyrgyzstan",
    kw: "Kuwait",
    kr: '"Korea',
    kp: "Korea (Democratic People's Republic of Korea)",
    ki: "Kiribati",
    ke: "Kenya",
    kz: "Kazakhstan",
    jo: "Jordan",
    je: "Jersey",
    jp: "Japan",
    jm: "Jamaica",
    it: "Italy",
    il: "Israel",
    im: "Isle of Man",
    ie: "Ireland",
    iq: "Iraq",
    ir: "Iran (Islamic Republic of Iran)",
    id: "Indonesia",
    in: "India",
    is: "Iceland",
    hu: "Hungary",
    hk: "Hong Kong",
    hn: "Honduras",
    va: "Holy See",
    hm: "Heard Island and McDonald Islands",
    ht: "Haiti",
    gy: "Guyana",
    gw: "Guinea-Bissau",
    gn: "Guinea",
    gg: "Guernsey",
    gt: "Guatemala",
    gu: "Guam",
    gp: "Guadeloupe",
    gd: "Grenada",
    gl: "Greenland",
    gr: "Greece",
    gi: "Gibraltar",
    gh: "Ghana",
    de: "Germany",
    ge: "Georgia",
    gm: "Gambia",
    ga: "Gabon",
    tf: "French Southern Territories",
    pf: "French Polynesia",
    gf: "French Guiana",
    fr: "France",
    fi: "Finland",
    fj: "Fiji",
    fo: "Faroe Islands",
    fk: "Falkland Islands (Malvinas)",
    et: "Ethiopia",
    sz: "Eswatini",
    ee: "Estonia",
    er: "Eritrea",
    gq: "Equatorial Guinea",
    sv: "El Salvador",
    eg: "Egypt",
    ec: "Ecuador",
    do: "Dominican Republic",
    dm: "Dominica",
    dj: "Djibouti",
    dk: "Denmark",
    cz: "Czechia",
    cy: "Cyprus",
    cw: "Curaçao",
    cu: "Cuba",
    hr: "Croatia",
    ci: "Côte d'Ivoire",
    cr: "Costa Rica",
    ck: "Cook Islands",
    cd: '"Congo',
    cg: "Congo",
    km: "Comoros",
    co: "Colombia",
    cc: "Cocos (Keeling) Islands",
    cx: "Christmas Island",
    cn: "China",
    cl: "Chile",
    td: "Chad",
    cf: "Central African Republic",
    ky: "Cayman Islands",
    ca: "Canada",
    cm: "Cameroon",
    kh: "Cambodia",
    cv: "Cabo Verde",
    bi: "Burundi",
    bf: "Burkina Faso",
    bg: "Bulgaria",
    bn: "Brunei Darussalam",
    io: "British Indian Ocean Territory",
    br: "Brazil",
    bv: "Bouvet Island",
    bw: "Botswana",
    ba: "Bosnia and Herzegovina",
    bq: '"Bonaire',
    bo: "Bolivia (Plurinational State of Bolivia)",
    bt: "Bhutan",
    bm: "Bermuda",
    bj: "Benin",
    bz: "Belize",
    be: "Belgium",
    by: "Belarus",
    bb: "Barbados",
    bd: "Bangladesh",
    bh: "Bahrain",
    bs: "Bahamas",
    az: "Azerbaijan",
    at: "Austria",
    au: "Australia",
    aw: "Aruba",
    am: "Armenia",
    ar: "Argentina",
    ag: "Antigua and Barbuda",
    aq: "Antarctica",
    ai: "Anguilla",
    ao: "Angola",
    ad: "Andorra",
    as: "American Samoa",
    dz: "Algeria",
    al: "Albania",
    ax: "Åland Islands",
    af: "Afghanistan",
};

export {
    equalFlags0,
    equalFlags1,
    equalFlags2,
    equalFlags3,
    equalFlags4,
    countries,
};
