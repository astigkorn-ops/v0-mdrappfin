"use client";
import React, { useState } from 'react';
import { Search, MapPin, Phone, User, Calendar, FileText, Users, Building, AlertTriangle, Send, X, Check, Map } from 'lucide-react';

const BarangayPortal = () => {
  const [selectedBarangay, setSelectedBarangay] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportData, setReportData] = useState({
    type: 'typhoon',
    evacuees: '',
    location: '',
    reportType: 'partial'
  });

  const barangays = [
    "Agol", "Alabangpuro", "Banawan", "Barangay I", "Barangay II", "Barangay III", 
    "Barangay IV", "Barangay V", "Basicao Coastal", "Basicao Interior", "Binodegahan", 
    "Buenavista", "Buyo", "Caratagan", "Cuyaoyao", "Flores", "La Medalla", "Lawinon", 
    "Macasitas", "Malapay", "Malidong", "Mamlad", "Marigondon", "Matanglad", 
    "Nablangbulod", "Oringon", "Palapas", "Panganiran", "Rawis", "Salvacion", 
    "Santo Cristo", "Sukip", "Tibabo"
  ];

  const filteredBarangays = barangays.filter(barangay => 
    barangay.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Barangay officials data
  const barangayOfficials: Record<string, any[]> = {
    "Agol": [
      { position: "Punong Barangay", lastName: "ALBAYTAR", firstName: "JOEL", middleName: "PERALTA", suffix: "", contact: "09361562854" },
      { position: "Sangguniang Barangay Member", lastName: "LLONA", firstName: "ROMEO", middleName: "MURILLO", suffix: "", contact: "09058745433" },
      { position: "Sangguniang Barangay Member", lastName: "BALDERAMA", firstName: "RODERICK", middleName: "MADELAR", suffix: "", contact: "09355907477" },
      { position: "Sangguniang Barangay Member", lastName: "OROGO", firstName: "CHERRY", middleName: "PEÑAFLOR", suffix: "", contact: "0955982507" },
      { position: "Sangguniang Barangay Member", lastName: "BODINO", firstName: "CIRIACO", middleName: "NAVIA", suffix: "", contact: "09263283395" },
      { position: "Sangguniang Barangay Member", lastName: "ORDIALES", firstName: "NIMFA", middleName: "RAQUIA", suffix: "", contact: "09979966890" },
      { position: "Sangguniang Barangay Member", lastName: "MARILLA", firstName: "MARIA RIMA", middleName: "ESPINEDA", suffix: "", contact: "09657229125" },
      { position: "Sangguniang Barangay Member", lastName: "VELARDE", firstName: "DELFIN", middleName: "YANELA", suffix: "JR", contact: "09756189574" },
      { position: "SK Chairperson", lastName: "SERRANO", firstName: "ALYSSA JOY", middleName: "QUITAY", suffix: "", contact: "09062637419" },
      { position: "Barangay Secretary", lastName: "LUSTRE", firstName: "ESVE", middleName: "PAGO", suffix: "", contact: "09976897410" }
    ],
    "Alabangpuro": [
      { position: "Punong Barangay", lastName: "MASOTES", firstName: "GREGORIO", middleName: "CONSORTE", suffix: "", contact: "09274977236" },
      { position: "Sangguniang Barangay Member", lastName: "MARTILLANA", firstName: "ANTONIO", middleName: "OBLIGADO", suffix: "", contact: "09268372911" },
      { position: "Sangguniang Barangay Member", lastName: "OTILLA", firstName: "ROGIL", middleName: "PALOYO", suffix: "", contact: "09352206251" },
      { position: "Sangguniang Barangay Member", lastName: "MASOTES", firstName: "RUBEN", middleName: "PAUYO", suffix: "JR", contact: "09274977236" },
      { position: "Sangguniang Barangay Member", lastName: "PAUYO", firstName: "DOMINGO", middleName: "OLAVERE", suffix: "", contact: "09368741404" },
      { position: "Sangguniang Barangay Member", lastName: "PALOYO", firstName: "DIOSDADO", middleName: "OLITIN", suffix: "", contact: "09274877236" },
      { position: "Sangguniang Barangay Member", lastName: "PALLEGA", firstName: "MARTY", middleName: "NANTES", suffix: "", contact: "09269995209" },
      { position: "Sangguniang Barangay Member", lastName: "OCFEMIA", firstName: "LEO", middleName: "GARCIA", suffix: "", contact: "09771684841" },
      { position: "SK Chairperson", lastName: "BELLE", firstName: "JOHN CARLOS", middleName: "MASOTES", suffix: "", contact: "0967051292" },
      { position: "Barangay Secretary", lastName: "PAPICA", firstName: "JESSABEL", middleName: "PAVIA", suffix: "", contact: "09553397794" }
    ],
    "Banawan": [
      { position: "Punong Barangay", lastName: "LOMANGAYA", firstName: "ALBERTO", middleName: "BERMILLO", suffix: "", contact: "09652847253" },
      { position: "Sangguniang Barangay Member", lastName: "NASIBA", firstName: "MARLON", middleName: "RIOPRER", suffix: "", contact: "09510055204" },
      { position: "Sangguniang Barangay Member", lastName: "BRIAGAS", firstName: "FRANKLIN", middleName: "CERVANTES", suffix: "", contact: "09702380376" },
      { position: "Sangguniang Barangay Member", lastName: "PAPICA", firstName: "BERNARD", middleName: "SEÑORIN", suffix: "", contact: "0943509059" },
      { position: "Sangguniang Barangay Member", lastName: "BASE", firstName: "ANANIAS", middleName: "DAYTO", suffix: "JR", contact: "09815143335" },
      { position: "Sangguniang Barangay Member", lastName: "SABDAO", firstName: "FRANKLIN", middleName: "MARBELLA", suffix: "", contact: "09634195777" },
      { position: "Sangguniang Barangay Member", lastName: "SULPICO", firstName: "ELISEE", middleName: "BARBACENA", suffix: "", contact: "09398262992" },
      { position: "Sangguniang Barangay Member", lastName: "ALIM", firstName: "MARIDEL", middleName: "SANCHEZ", suffix: "", contact: "09263847568" },
      { position: "SK Chairperson", lastName: "BAGAMASBAD", firstName: "MIA", middleName: "MANCION", suffix: "", contact: "09171034830" },
      { position: "Barangay Secretary", lastName: "GALON", firstName: "GRACE", middleName: "NUAS", suffix: "", contact: "09481357218" }
    ],
    "Barangay I": [
      { position: "Punong Barangay", lastName: "TRIGUERO", firstName: "AARON", middleName: "DEL MUNDO", suffix: "", contact: "0920-5160-834" },
      { position: "Sangguniang Barangay Member", lastName: "MANGAMPO", firstName: "ELWIN", middleName: "BUENDIA", suffix: "", contact: "0981-5676-669" },
      { position: "Sangguniang Barangay Member", lastName: "PINTAL", firstName: "ROLLY", middleName: "APULI", suffix: "", contact: "0" },
      { position: "Sangguniang Barangay Member", lastName: "DE LEON", firstName: "ALEXANDER", middleName: "DE LOS SANTOS", suffix: "", contact: "0" },
      { position: "Sangguniang Barangay Member", lastName: "GRANADO", firstName: "GODOFREDO", middleName: "ANA", suffix: "", contact: "0" },
      { position: "Sangguniang Barangay Member", lastName: "DELOS SANTOS", firstName: "ALBERTO", middleName: "DEBORJA", suffix: "", contact: "0" },
      { position: "Sangguniang Barangay Member", lastName: "RICO", firstName: "MELINDA", middleName: "ONESA", suffix: "", contact: "0" },
      { position: "SK Chairperson", lastName: "APULI", firstName: "DRAVEN CEDRICK", middleName: "LIMJUCO", suffix: "", contact: "0" },
      { position: "Barangay Secretary", lastName: "ORDIZ", firstName: "MARIA SHELLA", middleName: "BARRUGA", suffix: "", contact: "0" }
    ],
    "Barangay II": [
      { position: "Punong Barangay", lastName: "CEDEÑO", firstName: "JULIUS", middleName: "ALMODAL", suffix: "", contact: "09295044191" },
      { position: "Sangguniang Barangay Member", lastName: "ANTIADO", firstName: "LEO", middleName: "HICAP", suffix: "", contact: "0981973404" },
      { position: "Sangguniang Barangay Member", lastName: "MANALLO", firstName: "ESTER", middleName: "BHO", suffix: "", contact: "09064720172" },
      { position: "Sangguniang Barangay Member", lastName: "BAUSING", firstName: "REYMUNDO", middleName: "BOLAÑO", suffix: "", contact: "09389213949" },
      { position: "Sangguniang Barangay Member", lastName: "ESPARRAGO", firstName: "NESTOR", middleName: "DOLOR", suffix: "", contact: "09203325800" },
      { position: "Sangguniang Barangay Member", lastName: "BRIONES", firstName: "DANILO", middleName: "OMBAO", suffix: "", contact: "09979968621" },
      { position: "Sangguniang Barangay Member", lastName: "DEL CAMPO", firstName: "RODORA", middleName: "GABRIEL", suffix: "", contact: "09202251421" },
      { position: "Sangguniang Barangay Member", lastName: "MONTANA", firstName: "GENNA", middleName: "NANTEZA", suffix: "", contact: "09702380368" },
      { position: "SK Chairperson", lastName: "DEL MUNDO", firstName: "YSA", middleName: "ABIÑO", suffix: "", contact: "09512067550" },
      { position: "Barangay Secretary", lastName: "GARCIA", firstName: "ANA", middleName: "PANDAAN", suffix: "", contact: "09193204029" }
    ],
    "Barangay III": [
      { position: "Punong Barangay", lastName: "DE LOS SANTOS", firstName: "EMILIO", middleName: "TOLOSA", suffix: "JR", contact: "09103046703" },
      { position: "Sangguniang Barangay Member", lastName: "ABALOS", firstName: "CHRISTIANFER", middleName: "VILLAMOR", suffix: "", contact: "09169466113" },
      { position: "Sangguniang Barangay Member", lastName: "GORDO", firstName: "EDISON", middleName: "NIDEA", suffix: "", contact: "09093920001" },
      { position: "Sangguniang Barangay Member", lastName: "RANGES", firstName: "MANUEL", middleName: "NARRA", suffix: "", contact: "09351123417" },
      { position: "Sangguniang Barangay Member", lastName: "TIBOR", firstName: "EFREN", middleName: "MORENO", suffix: "JR", contact: "09480232916" },
      { position: "Sangguniang Barangay Member", lastName: "BORBE", firstName: "VIOLETA", middleName: "NOTA", suffix: "", contact: "09752626962" },
      { position: "Sangguniang Barangay Member", lastName: "MORENO", firstName: "ANTONIO", middleName: "CAMAR", suffix: "", contact: "09302300022" },
      { position: "Sangguniang Barangay Member", lastName: "AVILA", firstName: "MARLON", middleName: "ALBAN", suffix: "", contact: "09169213339" },
      { position: "SK Chairperson", lastName: "DAYANDANTE", firstName: "GRACIELLE MAE", middleName: "PAPICA", suffix: "", contact: "09512805858" },
      { position: "Barangay Secretary", lastName: "BARAZONA", firstName: "YNA", middleName: "RODIGO", suffix: "", contact: "09637096331" }
    ],
    "Barangay IV": [
      { position: "Punong Barangay", lastName: "JIMENEZ", firstName: "ARISTON", middleName: "NACE", suffix: "", contact: "09475701676" },
      { position: "Sangguniang Barangay Member", lastName: "JIMENEZ", firstName: "CHRISELDA", middleName: "OMAYAN", suffix: "", contact: "09106165863" },
      { position: "Sangguniang Barangay Member", lastName: "SARIOLA", firstName: "ROBERTO", middleName: "LOVEDROAI", suffix: "", contact: "06215168059" },
      { position: "Sangguniang Barangay Member", lastName: "CABALLAS", firstName: "YVONNE", middleName: "MANRIQUE", suffix: "", contact: "09496841781" },
      { position: "Sangguniang Barangay Member", lastName: "BARLIZO", firstName: "ALBERTO", middleName: "B.", suffix: "", contact: "09100181230" },
      { position: "Sangguniang Barangay Member", lastName: "DAYANDANTE", firstName: "DIANA FRANCE", middleName: "LIM", suffix: "", contact: "09097586403" },
      { position: "Sangguniang Barangay Member", lastName: "BUHATIN", firstName: "TIMOTEO", middleName: "NARADULLA", suffix: "", contact: "09850933549" },
      { position: "Sangguniang Barangay Member", lastName: "ARIATE", firstName: "SERAFIN", middleName: "BUHATIN", suffix: "JR.", contact: "09127272624" },
      { position: "SK Chairperson", lastName: "ARIATE", firstName: "MARK LYNDON", middleName: "DEL CAMPO", suffix: "", contact: "09612688211" },
      { position: "Barangay Secretary", lastName: "PESINO", firstName: "EMMA", middleName: "ARAMBURO", suffix: "", contact: "09353032128" }
    ],
    "Barangay V": [
      { position: "Punong Barangay", lastName: "RACHO", firstName: "EMMANUEL", middleName: "TUANA", suffix: "", contact: "09351759848" },
      { position: "Sangguniang Barangay Member", lastName: "BENITEZ", firstName: "RUTH", middleName: "MORENO", suffix: "", contact: "09351759848" },
      { position: "Sangguniang Barangay Member", lastName: "CABALLAS", firstName: "CESAR", middleName: "PRADAS", suffix: "JR.", contact: "09172219846" },
      { position: "Sangguniang Barangay Member", lastName: "BON", firstName: "REX", middleName: "LOSABIO", suffix: "", contact: "09298308277" },
      { position: "Sangguniang Barangay Member", lastName: "LUPERA", firstName: "JOVELYN", middleName: "CANINO", suffix: "", contact: "09853172230" },
      { position: "Sangguniang Barangay Member", lastName: "BORDEOS", firstName: "BOBBY", middleName: "HERMIDA", suffix: "", contact: "09298308277" },
      { position: "Sangguniang Barangay Member", lastName: "SODSOD", firstName: "MA. CHRISTINA", middleName: "CAMBUSA", suffix: "", contact: "09351759848" },
      { position: "Sangguniang Barangay Member", lastName: "BON", firstName: "FELICITO", middleName: "BODINO", suffix: "", contact: "09300534175" },
      { position: "SK Chairperson", lastName: "MAHINAY", firstName: "HERMAN", middleName: "BESA", suffix: "", contact: "09076412084" },
      { position: "Barangay Secretary", lastName: "MORATO", firstName: "VIRGO", middleName: "CADAG", suffix: "", contact: "09351759848" }
    ],
    "Basicao Coastal": [
      { position: "Punong Barangay", lastName: "DELA PUNTA", firstName: "ESTEBAN", middleName: "SANCHA", suffix: "JR.", contact: "09483831923" },
      { position: "Sangguniang Barangay Member", lastName: "ROVELO", firstName: "DAISY", middleName: "NASOL", suffix: "", contact: "09075536431" },
      { position: "Sangguniang Barangay Member", lastName: "ALA", firstName: "DANTE", middleName: "BELLEN", suffix: "", contact: "09090237374" },
      { position: "Sangguniang Barangay Member", lastName: "FLORES", firstName: "JAIME", middleName: "PALIMA", suffix: "", contact: "09100145833" },
      { position: "Sangguniang Barangay Member", lastName: "PATANAO", firstName: "CARLOS", middleName: "DE LUNA", suffix: "", contact: "09693476275" },
      { position: "Sangguniang Barangay Member", lastName: "NEGRE", firstName: "MARCELO", middleName: "DE LUNA", suffix: "", contact: "00" },
      { position: "Sangguniang Barangay Member", lastName: "ADVINCULA", firstName: "RICARDO", middleName: "SAPAO", suffix: "JR.", contact: "09935910264" },
      { position: "Sangguniang Barangay Member", lastName: "PATANAO", firstName: "JOHNSON", middleName: "ISORENA", suffix: "", contact: "00" },
      { position: "SK Chairperson", lastName: "NASOL", firstName: "MARIELLE", middleName: "PATANAO", suffix: "", contact: "09564324478" },
      { position: "Barangay Secretary", lastName: "PATANAO", firstName: "AMADOR", middleName: "M.", suffix: "", contact: "09075536431" }
    ],
    "Basicao Interior": [
      { position: "Punong Barangay", lastName: "LLANDA", firstName: "VICTORIA", middleName: "ODSINADA", suffix: "", contact: "09069595800" },
      { position: "Sangguniang Barangay Member", lastName: "OSCURO", firstName: "MILA", middleName: "LERON", suffix: "", contact: "09678590147" },
      { position: "Sangguniang Barangay Member", lastName: "OLI", firstName: "ERNESTO", middleName: "MARANTAL", suffix: "", contact: "00" },
      { position: "Sangguniang Barangay Member", lastName: "PATRIARCA", firstName: "EDNA", middleName: "BAJAMUNDI", suffix: "", contact: "09653265173" },
      { position: "Sangguniang Barangay Member", lastName: "PATRIARCA", firstName: "SUSAN", middleName: "MUJAL", suffix: "", contact: "09354731219" },
      { position: "Sangguniang Barangay Member", lastName: "TUAZON", firstName: "ARJIE", middleName: "OLIVA", suffix: "", contact: "09067871914" },
      { position: "Sangguniang Barangay Member", lastName: "NASAYAO", firstName: "MERLYN", middleName: "NARES", suffix: "", contact: "09755623014" },
      { position: "Sangguniang Barangay Member", lastName: "NON", firstName: "EDNA", middleName: "OSABEL", suffix: "", contact: "09057048048" },
      { position: "SK Chairperson", lastName: "NOBELA", firstName: "MARVIN", middleName: "BAJAMUNDI", suffix: "", contact: "09051896373" },
      { position: "Barangay Secretary", lastName: "CARIZO", firstName: "CONCEPCION", middleName: "MANGAMUSTA", suffix: "", contact: "09360533893" }
    ],
    "Binodegahan": [
      { position: "Punong Barangay", lastName: "SANQUE", firstName: "BARNIE", middleName: "SAPINOSO", suffix: "", contact: "09557735336" },
      { position: "Sangguniang Barangay Member", lastName: "NABO", firstName: "ARLAN", middleName: "QUIDES", suffix: "", contact: "09074357757" },
      { position: "Sangguniang Barangay Member", lastName: "MANGAMPO", firstName: "JOVEN", middleName: "NUŃEZ", suffix: "", contact: "09164421558" },
      { position: "Sangguniang Barangay Member", lastName: "POLLOSO", firstName: "RAFAEL", middleName: "NEBRES", suffix: "JR.", contact: "09972642250" },
      { position: "Sangguniang Barangay Member", lastName: "IMPERIAL", firstName: "CHRISTORY", middleName: "MOLAR", suffix: "", contact: "09265717707" },
      { position: "Sangguniang Barangay Member", lastName: "MARAŃO", firstName: "NASSER", middleName: "NARVAEZ", suffix: "", contact: "09269982093" },
      { position: "Sangguniang Barangay Member", lastName: "ESTIADA", firstName: "JOHN REY", middleName: "GARCIA", suffix: "", contact: "09056120861" },
      { position: "Sangguniang Barangay Member", lastName: "MAGDAONG", firstName: "ANNABEL", middleName: "MARILLA", suffix: "", contact: "09558122369" },
      { position: "SK Chairperson", lastName: "MANGAMPO", firstName: "JAY-R", middleName: "ALORO", suffix: "", contact: "09662254870" },
      { position: "Barangay Secretary", lastName: "QUIDES", firstName: "ALFONSO", middleName: "SAMBAJON", suffix: "", contact: "09161462189" }
    ],
    "Buenavista": [
      { position: "Punong Barangay", lastName: "SEŃORIN", firstName: "WINSTON", middleName: "CLEMENTE", suffix: "", contact: "09653811940" },
      { position: "Sangguniang Barangay Member", lastName: "OCINA", firstName: "ERNESTO", middleName: "OLIVA", suffix: "JR.", contact: "09487115523" },
      { position: "Sangguniang Barangay Member", lastName: "NIEVA", firstName: "MARK ANTHONY", middleName: "AQUINDE", suffix: "", contact: "09557639509" },
      { position: "Sangguniang Barangay Member", lastName: "BALIAT", firstName: "ELSA", middleName: "NASAYAO", suffix: "", contact: "09090748369" },
      { position: "Sangguniang Barangay Member", lastName: "OCFEMIA", firstName: "JOSE", middleName: "CEDEŃO", suffix: "", contact: "09552162936" },
      { position: "Sangguniang Barangay Member", lastName: "IBAŃEZ", firstName: "ROBERT", middleName: "POLLOSO", suffix: "", contact: "09973971212" },
      { position: "Sangguniang Barangay Member", lastName: "CERVANTES", firstName: "NORLIE", middleName: "NARIO", suffix: "", contact: "09279123928" },
      { position: "Sangguniang Barangay Member", lastName: "PANESA", firstName: "FRANCISCO", middleName: "LORETO", suffix: "JR.", contact: "09953063058" },
      { position: "SK Chairperson", lastName: "OCFEMIA", firstName: "QUEENIE", middleName: "PRINCIPE", suffix: "", contact: "09064115248" },
      { position: "Barangay Secretary", lastName: "CERVANTES", firstName: "MARY JOY", middleName: "S.", suffix: "", contact: "090700211900" }
    ],
    "Buyo": [
      { position: "Punong Barangay", lastName: "MILARPIS", firstName: "GILBERT", middleName: "NARIO", suffix: "", contact: "09483234098" },
      { position: "Sangguniang Barangay Member", lastName: "LOSABIA", firstName: "BANGIE", middleName: "OCTAVO", suffix: "", contact: "00" },
      { position: "Sangguniang Barangay Member", lastName: "NARIO", firstName: "CATHERINE", middleName: "LUDOVICE", suffix: "", contact: "09352966152" },
      { position: "Sangguniang Barangay Member", lastName: "PERNECITA", firstName: "SUNDAY", middleName: "ORDIALES", suffix: "", contact: "09753478953" },
      { position: "Sangguniang Barangay Member", lastName: "BLANCHE", firstName: "FE", middleName: "NOBLEZA", suffix: "", contact: "00" },
      { position: "Sangguniang Barangay Member", lastName: "ALCANTARA", firstName: "CONNIE", middleName: "LOSABIA", suffix: "", contact: "09563576254" },
      { position: "Sangguniang Barangay Member", lastName: "SAMBAJON", firstName: "ROSALIE", middleName: "AGUILAR", suffix: "", contact: "00" },
      { position: "Sangguniang Barangay Member", lastName: "SAMBAJON", firstName: "ARNEL", middleName: "MARILLA", suffix: "", contact: "00" },
      { position: "SK Chairperson", lastName: "NATIVIDAD", firstName: "MARIEL", middleName: "MOLAR", suffix: "", contact: "09262880798" },
      { position: "Barangay Secretary", lastName: "PANESA", firstName: "MARICEL", middleName: "LODOVICE", suffix: "", contact: "00" }
    ],
    "Caratagan": [
      { position: "Punong Barangay", lastName: "GURAT", firstName: "JUDITH", middleName: "BAZAR", suffix: "", contact: "09457792033" },
      { position: "Sangguniang Barangay Member", lastName: "PINEDA", firstName: "DEXTER", middleName: "ARMENTA", suffix: "", contact: "09351675438" },
      { position: "Sangguniang Barangay Member", lastName: "CALLOPE", firstName: "MARK HENRY", middleName: "GRANADO", suffix: "", contact: "09665076468" },
      { position: "Sangguniang Barangay Member", lastName: "MIRANDA", firstName: "MARYJANE", middleName: "NACION", suffix: "", contact: "09056122190" },
      { position: "Sangguniang Barangay Member", lastName: "BAGAMASBAD", firstName: "MARIO", middleName: "VALE", suffix: "", contact: "09658205393" },
      { position: "Sangguniang Barangay Member", lastName: "JOCOM", firstName: "DANTE", middleName: "CORTEZ", suffix: "", contact: "09653259644" },
      { position: "Sangguniang Barangay Member", lastName: "ORAA", firstName: "GLENN", middleName: "GILLA", suffix: "JR.", contact: "09654803227" },
      { position: "Sangguniang Barangay Member", lastName: "SABDAO", firstName: "SHIRYLL", middleName: "MARFIL", suffix: "", contact: "09362736110" },
      { position: "SK Chairperson", lastName: "SARIOLA", firstName: "BEINEX CARLO", middleName: "PERDIGON", suffix: "", contact: "09066306510" },
      { position: "Barangay Secretary", lastName: "PALAJE", firstName: "DEOGENIS", middleName: "PURAWAN", suffix: "", contact: "09305043003" }
    ],
    "Cuyaoyao": [
      { position: "Punong Barangay", lastName: "AMPARO", firstName: "SORIA", middleName: "ANDES", suffix: "", contact: "0916243183" },
      { position: "Sangguniang Barangay Member", lastName: "LLANERA", firstName: "JAYSON", middleName: "CIMANES", suffix: "", contact: "09067869267" },
      { position: "Sangguniang Barangay Member", lastName: "LAMIT", firstName: "MARGILYN", middleName: "MADRIDANO", suffix: "", contact: "09553683815" },
      { position: "Sangguniang Barangay Member", lastName: "ORIDO", firstName: "BENJO", middleName: "LUDANA", suffix: "", contact: "09959680091" },
      { position: "Sangguniang Barangay Member", lastName: "MANCERA", firstName: "MANUEL", middleName: "MORCOZO", suffix: "", contact: "09556632292" },
      { position: "Sangguniang Barangay Member", lastName: "CAÑAVERAL", firstName: "JOEMAR", middleName: "GARCIA", suffix: "", contact: "09169464845" },
      { position: "Sangguniang Barangay Member", lastName: "MARCELLANA", firstName: "NOEL", middleName: "MORTA", suffix: "", contact: "09976548647" },
      { position: "Sangguniang Barangay Member", lastName: "ORIDO", firstName: "SHERRY", middleName: "MIRANDA", suffix: "", contact: "09162432183" },
      { position: "SK Chairperson", lastName: "BALIDOY", firstName: "CHRICHELL JAY", middleName: "DIMAS", suffix: "", contact: "09059219465" },
      { position: "Barangay Secretary", lastName: "MADRIDANO", firstName: "MARICHOU TERESA", middleName: "PEDRES", suffix: "", contact: "09057199568" }
    ],
    "Flores": [
      { position: "Punong Barangay", lastName: "CAMILLO", firstName: "RIZALDE", middleName: "VARGAS", suffix: "", contact: "09264091497" },
      { position: "Sangguniang Barangay Member", lastName: "MUJAR", firstName: "SONNY", middleName: "REYTERAN", suffix: "", contact: "09457207947" },
      { position: "Sangguniang Barangay Member", lastName: "ATULI", firstName: "MELCHOR", middleName: "ARANGO", suffix: "", contact: "09368449947" },
      { position: "Sangguniang Barangay Member", lastName: "ONDES", firstName: "SALVADOR", middleName: "BORROMED", suffix: "", contact: "09278444423" },
      { position: "Sangguniang Barangay Member", lastName: "MANCERA", firstName: "DANIEL CELSO", middleName: "PEDIDO", suffix: "JR.", contact: "09565643222" },
      { position: "Sangguniang Barangay Member", lastName: "ONDIS", firstName: "GLORIA", middleName: "PADILLA", suffix: "", contact: "09659334647" },
      { position: "Sangguniang Barangay Member", lastName: "LUSTRE", firstName: "MARITES", middleName: "SUAREZ", suffix: "", contact: "09058745251" },
      { position: "Sangguniang Barangay Member", lastName: "LUMERIO", firstName: "JEZEL", middleName: "BODIGON", suffix: "", contact: "09264072076" },
      { position: "SK Chairperson", lastName: "ONDIS", firstName: "ACEJAN", middleName: "ONTOY", suffix: "", contact: "09636702658" },
      { position: "Barangay Secretary", lastName: "ARIATE", firstName: "SOFIO", middleName: "QUISING", suffix: "", contact: "09676042225" }
    ],
    "La Medalla": [
      { position: "Punong Barangay", lastName: "PELECIA", firstName: "AMALIA", middleName: "MANCION", suffix: "", contact: "09176701796" },
      { position: "Sangguniang Barangay Member", lastName: "PELECIA", firstName: "JOMMEL", middleName: "SARIOLA", suffix: "", contact: "09176701796" },
      { position: "Sangguniang Barangay Member", lastName: "POLBINAR", firstName: "HILARION", middleName: "CARIZON", suffix: "", contact: "09176701796" },
      { position: "Sangguniang Barangay Member", lastName: "PELECIA", firstName: "HERSON", middleName: "DE LUNA", suffix: "", contact: "09176701796" },
      { position: "Sangguniang Barangay Member", lastName: "PALMA", firstName: "EMMA", middleName: "ALIBANTO", suffix: "", contact: "09176701796" },
      { position: "Sangguniang Barangay Member", lastName: "DORONGON", firstName: "GILBERTO", middleName: "CARIÑO", suffix: "", contact: "09176701796" },
      { position: "Sangguniang Barangay Member", lastName: "BARNUEVO", firstName: "MARILOU", middleName: "MAGCAYANG", suffix: "", contact: "09176701796" },
      { position: "Sangguniang Barangay Member", lastName: "REALUBIT", firstName: "JEREMIAS", middleName: "CERVANTES", suffix: "", contact: "09176701796" },
      { position: "SK Chairperson", lastName: "BAZAR", firstName: "KURT RAFAEL", middleName: "CASTAÑAS", suffix: "", contact: "09651530263" },
      { position: "Barangay Secretary", lastName: "POBERBIO", firstName: "MAYLA", middleName: "REALUBIT", suffix: "", contact: "09777588501" }
    ],
    "Lawinon": [
      { position: "Punong Barangay", lastName: "ROSAS", firstName: "SOTERO", middleName: "TORREFIEL", suffix: "", contact: "09354055729" },
      { position: "Sangguniang Barangay Member", lastName: "NOPRE", firstName: "LORIE", middleName: "PANDAAN", suffix: "", contact: "09517476489" },
      { position: "Sangguniang Barangay Member", lastName: "LONGUITE", firstName: "ARIEL", middleName: "MORON", suffix: "", contact: "09464045875" },
      { position: "Sangguniang Barangay Member", lastName: "RUBEN", firstName: "ROMEGIO", middleName: "MOTIN", suffix: "", contact: "09501545988" },
      { position: "Sangguniang Barangay Member", lastName: "PALMONES", firstName: "MAYO", middleName: "SACATINTO", suffix: "", contact: "09319841391" },
      { position: "Sangguniang Barangay Member", lastName: "MAESTRE", firstName: "ELENA", middleName: "GALECIA", suffix: "", contact: "09099419072" },
      { position: "Sangguniang Barangay Member", lastName: "NAPARATO", firstName: "HENRY", middleName: "NOPRE", suffix: "", contact: "00" },
      { position: "Sangguniang Barangay Member", lastName: "OTILLA", firstName: "ALLAN", middleName: "MIRASOL", suffix: "", contact: "09482856471" },
      { position: "SK Chairperson", lastName: "ALFEREZ", firstName: "EMJAY", middleName: "ROSAS", suffix: "", contact: "09481122631" },
      { position: "Barangay Secretary", lastName: "PANDAAN", firstName: "JENNY", middleName: "COMIDA", suffix: "", contact: "09851227589" }
    ],
    "Macasitas": [
      { position: "Punong Barangay", lastName: "OLAGUER", firstName: "EDGARDO", middleName: "MORANTE", suffix: "", contact: "09971583567" },
      { position: "Sangguniang Barangay Member", lastName: "NABATA", firstName: "JONNEL", middleName: "ALCANTARA", suffix: "", contact: "09265824350" },
      { position: "Sangguniang Barangay Member", lastName: "ODEÑA", firstName: "EDWIN", middleName: "NACE", suffix: "", contact: "09351677886" },
      { position: "Sangguniang Barangay Member", lastName: "MUICO", firstName: "DEODITA", middleName: "SOBRECAREY", suffix: "", contact: "09066155271" },
      { position: "Sangguniang Barangay Member", lastName: "NARITO", firstName: "MICHAEL", middleName: "PALMIANO", suffix: "", contact: "09533065346" },
      { position: "Sangguniang Barangay Member", lastName: "MONILLA", firstName: "BERNADETTE", middleName: "ODEÑA", suffix: "", contact: "09267625794" },
      { position: "Sangguniang Barangay Member", lastName: "NOTOB", firstName: "LEONIDO", middleName: "ORINGO", suffix: "", contact: "09676018522" },
      { position: "Sangguniang Barangay Member", lastName: "FAJARDO", firstName: "LENI", middleName: "OSAS", suffix: "", contact: "09533064817" },
      { position: "SK Chairperson", lastName: "PALLAN", firstName: "CARLO", middleName: "NOVA", suffix: "", contact: "09056361832" },
      { position: "Barangay Secretary", lastName: "GARCIA", firstName: "SHERYL", middleName: "DAYTO", suffix: "", contact: "0955038607" }
    ],
    "Malapay": [
      { position: "Punong Barangay", lastName: "ORDIALES", firstName: "ZALDY", middleName: "MARQUEZ", suffix: "", contact: "09356721206" },
      { position: "Sangguniang Barangay Member", lastName: "OLI", firstName: "ANNIE", middleName: "PALMIANO", suffix: "", contact: "09356721206" },
      { position: "Sangguniang Barangay Member", lastName: "ABRIGO", firstName: "HELEN", middleName: "MURILLO", suffix: "", contact: "09355502901" },
      { position: "Sangguniang Barangay Member", lastName: "PALMIANO", firstName: "MAURICIO", middleName: "EBANO", suffix: "JR", contact: "09356721206" },
      { position: "Sangguniang Barangay Member", lastName: "NEVARES", firstName: "JIMSON", middleName: "NASAYAO", suffix: "", contact: "09356721206" },
      { position: "Sangguniang Barangay Member", lastName: "NACION", firstName: "MARILOU", middleName: "LUCENA", suffix: "", contact: "09356721206" },
      { position: "Sangguniang Barangay Member", lastName: "MADELA", firstName: "NORLY", middleName: "NUARIN", suffix: "", contact: "09356721206" },
      { position: "Sangguniang Barangay Member", lastName: "TUMALA", firstName: "ALVIN", middleName: "BASILAN", suffix: "", contact: "09279732464" },
      { position: "SK Chairperson", lastName: "ABRIGO", firstName: "JUDY ANN", middleName: "PEPAÑO", suffix: "", contact: "09652813123" },
      { position: "Barangay Secretary", lastName: "NICOL", firstName: "LORNA", middleName: "ORPIADA", suffix: "", contact: "09356721206" }
    ],
    "Malidong": [
      { position: "Punong Barangay", lastName: "TOLOSA", firstName: "ROMEO", middleName: "ADVINCULA", suffix: "", contact: "00" },
      { position: "Sangguniang Barangay Member", lastName: "ODEŃA", firstName: "RYAN", middleName: "ONTOY", suffix: "", contact: "09267678337" },
      { position: "Sangguniang Barangay Member", lastName: "MAQUIŃANA", firstName: "ALLAN", middleName: "LODRONIO", suffix: "", contact: "09157324240" },
      { position: "Sangguniang Barangay Member", lastName: "GUIRIBA", firstName: "ALBERTO", middleName: "ALIM", suffix: "", contact: "09813889412" },
      { position: "Sangguniang Barangay Member", lastName: "AVILA", firstName: "ELY", middleName: "ROTONI", suffix: "", contact: "09072577261" },
      { position: "Sangguniang Barangay Member", lastName: "BAS", firstName: "ARLENE", middleName: "VARGAS", suffix: "", contact: "09265805079" },
      { position: "Sangguniang Barangay Member", lastName: "ALILANO", firstName: "HIPOLITO", middleName: "NAYVE", suffix: "JR.", contact: "09097665094" },
      { position: "Sangguniang Barangay Member", lastName: "LITA", firstName: "DONNA JANE", middleName: "GUANZON", suffix: "", contact: "09197317540" },
      { position: "SK Chairperson", lastName: "LLAVE", firstName: "ARVY", middleName: "OLARCOS", suffix: "", contact: "09989840957" },
      { position: "Barangay Secretary", lastName: "PESITO", firstName: "MARY GRACE", middleName: "OCMER", suffix: "", contact: "09777265590" }
    ],
    "Mamlad": [
      { position: "Punong Barangay", lastName: "ODEÑA", firstName: "RENATO", middleName: "NACE", suffix: "", contact: "09609073835" },
      { position: "Sangguniang Barangay Member", lastName: "OLAGUER", firstName: "REGIE", middleName: "PANESA", suffix: "", contact: "09609073835" },
      { position: "Sangguniang Barangay Member", lastName: "OPENIANA", firstName: "ADAN", middleName: "GARCIA", suffix: "II", contact: "09609073835" },
      { position: "Sangguniang Barangay Member", lastName: "MIRASOL", firstName: "ROLLY", middleName: "MANRIQUE", suffix: "", contact: "09609073835" },
      { position: "Sangguniang Barangay Member", lastName: "OLAGUER", firstName: "ALAN", middleName: "LOVENDINO", suffix: "", contact: "09609073835" },
      { position: "Sangguniang Barangay Member", lastName: "ODEÑA", firstName: "MARITES", middleName: "PALOYO", suffix: "", contact: "09609073835" },
      { position: "Sangguniang Barangay Member", lastName: "BALUYO", firstName: "JESSECA", middleName: "GARCIA", suffix: "", contact: "09609073835" },
      { position: "Sangguniang Barangay Member", lastName: "MIRASOL", firstName: "ROMMEL", middleName: "PANDAAN", suffix: "", contact: "09609073835" },
      { position: "SK Chairperson", lastName: "OLAGUER", firstName: "CHARLE DAVE", middleName: "MALTO", suffix: "", contact: "09510983162" },
      { position: "Barangay Secretary", lastName: "NAPARATO", firstName: "JENNEFFER", middleName: "", suffix: "", contact: "09553955025" }
    ],
    "Marigondon": [
      { position: "Punong Barangay", lastName: "POCAAN", firstName: "HENRY", middleName: "SAPAO", suffix: "", contact: "09175502907" },
      { position: "Sangguniang Barangay Member", lastName: "PAVIA", firstName: "ANALYN", middleName: "BARNUEVO", suffix: "", contact: "09368009811" },
      { position: "Sangguniang Barangay Member", lastName: "LOPEZ", firstName: "ALLAN", middleName: "DELA TORRE", suffix: "", contact: "09955009693" },
      { position: "Sangguniang Barangay Member", lastName: "POCAAN", firstName: "ADONIS", middleName: "BUENSALIDA", suffix: "", contact: "09675982223" },
      { position: "Sangguniang Barangay Member", lastName: "SAMBAJON", firstName: "WALTER", middleName: "SAPAO", suffix: "", contact: "09109958427" },
      { position: "Sangguniang Barangay Member", lastName: "DE LUNA", firstName: "IDA", middleName: "PINTAL", suffix: "", contact: "09653514760" },
      { position: "Sangguniang Barangay Member", lastName: "PESAURO", firstName: "ARNULFO", middleName: "VILLAROSA", suffix: "", contact: "09811973266" },
      { position: "Sangguniang Barangay Member", lastName: "PAVIA", firstName: "TINA", middleName: "STO. TOMAS", suffix: "", contact: "09810360138" },
      { position: "SK Chairperson", lastName: "CAJARO", firstName: "MARRAH", middleName: "CANCISIO", suffix: "", contact: "09355838973" },
      { position: "Barangay Secretary", lastName: "STO. TOMAS", firstName: "REYAN", middleName: "PEDIDO", suffix: "", contact: "09676297616" }
    ],
    "Matanglad": [
      { position: "Punong Barangay", lastName: "PALOYO", firstName: "ELIZA", middleName: "OROYO", suffix: "", contact: "09978660122" },
      { position: "Sangguniang Barangay Member", lastName: "PANESA", firstName: "RONALDO", middleName: "MOLLASGO", suffix: "", contact: "09978660122" },
      { position: "Sangguniang Barangay Member", lastName: "CONVOCAR", firstName: "ROLANDO", middleName: "C.", suffix: "", contact: "09978660122" },
      { position: "Sangguniang Barangay Member", lastName: "PALOYO", firstName: "ANTONIO", middleName: "OLLANO", suffix: "JR.", contact: "09978660122" },
      { position: "Sangguniang Barangay Member", lastName: "NOLASCO", firstName: "MYLEN", middleName: "NAŃOZ", suffix: "", contact: "09978660122" },
      { position: "Sangguniang Barangay Member", lastName: "OGAYON", firstName: "MARWENA", middleName: "GUIRIBA", suffix: "", contact: "09978660122" },
      { position: "Sangguniang Barangay Member", lastName: "PALMONES", firstName: "EDWARD", middleName: "MOSTOLES", suffix: "", contact: "09978660122" },
      { position: "Sangguniang Barangay Member", lastName: "NAŃOZ", firstName: "ALVIN", middleName: "REALOSA", suffix: "", contact: "09978660122" },
      { position: "SK Chairperson", lastName: "PAJALLA", firstName: "AIRES", middleName: "PALMIANO", suffix: "", contact: "09978660122" },
      { position: "Barangay Secretary", lastName: "MARIQUE", firstName: "MARILOU", middleName: "MARCAIDA", suffix: "", contact: "09659171626" }
    ],
    "Nablangbulod": [
      { position: "Punong Barangay", lastName: "CAGANDA", firstName: "PRIMO", middleName: "NASOL", suffix: "", contact: "09451760628" },
      { position: "Sangguniang Barangay Member", lastName: "PALENCIA", firstName: "JESSA", middleName: "CAŃAVERAL", suffix: "", contact: "09260875794" },
      { position: "Sangguniang Barangay Member", lastName: "QUITAY", firstName: "HELEN", middleName: "LUDOVICE", suffix: "", contact: "09777902491" },
      { position: "Sangguniang Barangay Member", lastName: "ALBERGA", firstName: "JOCEL", middleName: "TOPASI", suffix: "", contact: "09169503098" },
      { position: "Sangguniang Barangay Member", lastName: "MALTO", firstName: "ROMEO", middleName: "BINO", suffix: "", contact: "09533764528" },
      { position: "Sangguniang Barangay Member", lastName: "LITAN", firstName: "NELLY", middleName: "MOINA", suffix: "", contact: "09352482294" },
      { position: "Sangguniang Barangay Member", lastName: "NASOL", firstName: "RICHARD", middleName: "DAGATAN", suffix: "", contact: "09266252799" },
      { position: "Sangguniang Barangay Member", lastName: "MARBELLA", firstName: "MERLINDA", middleName: "BUARAO", suffix: "", contact: "09262027192" },
      { position: "SK Chairperson", lastName: "SAMAR", firstName: "KYNE PATRICK", middleName: "POLLOSO", suffix: "", contact: "09205892036" },
      { position: "Barangay Secretary", lastName: "LITA", firstName: "CECILE", middleName: "MALEJANA", suffix: "", contact: "09360532972" }
    ],
    "Oringon": [
      { position: "Punong Barangay", lastName: "GALICIA", firstName: "RAMON", middleName: "NACIONAL", suffix: "", contact: "09158722289" },
      { position: "Sangguniang Barangay Member", lastName: "MOYA", firstName: "SANCHO", middleName: "OLAGUER", suffix: "", contact: "09158722289" },
      { position: "Sangguniang Barangay Member", lastName: "NOLASCO", firstName: "WARLEY", middleName: "SANTOS", suffix: "", contact: "09356714799" },
      { position: "Sangguniang Barangay Member", lastName: "PAUYO", firstName: "RAMJAY", middleName: "OROPESA", suffix: "", contact: "09752750503" },
      { position: "Sangguniang Barangay Member", lastName: "PAPINA", firstName: "LEOSILENE", middleName: "MONDA", suffix: "", contact: "09358817682" },
      { position: "Sangguniang Barangay Member", lastName: "PAVIA", firstName: "DEXTER", middleName: "NEVERA", suffix: "JR", contact: "09683248895" },
      { position: "Sangguniang Barangay Member", lastName: "ORMILLO", firstName: "ROGER", middleName: "ODOÑO", suffix: "", contact: "09207345347" },
      { position: "Sangguniang Barangay Member", lastName: "ORMILLO", firstName: "EDGAR", middleName: "ORDINANZA", suffix: "", contact: "09667423245" },
      { position: "SK Chairperson", lastName: "NUŃEZ", firstName: "JUSTINE JAMES", middleName: "NIEBRES", suffix: "", contact: "09068601963" },
      { position: "Barangay Secretary", lastName: "ELAURZA", firstName: "JOVYLEE", middleName: "R.", suffix: "", contact: "09361256269" }
    ],
    "Palapas": [
      { position: "Punong Barangay", lastName: "ARANDIA", firstName: "BRAYAN", middleName: "POLLOSO", suffix: "", contact: "09706569590" },
      { position: "Sangguniang Barangay Member", lastName: "NIEVA", firstName: "EDEN", middleName: "PEPAŃO", suffix: "", contact: "09157565357" },
      { position: "Sangguniang Barangay Member", lastName: "REYTERAN", firstName: "MARK ANTHONY", middleName: "ADOLFO", suffix: "", contact: "09706569590" },
      { position: "Sangguniang Barangay Member", lastName: "MANCERA", firstName: "MALOU", middleName: "RECUYO", suffix: "", contact: "09706569590" },
      { position: "Sangguniang Barangay Member", lastName: "REYTERAN", firstName: "MAILYN", middleName: "MADRIDANO", suffix: "", contact: "09706569590" },
      { position: "Sangguniang Barangay Member", lastName: "OCAÑA", firstName: "ZENAIDA", middleName: "POSIQUIT", suffix: "", contact: "09668635710" },
      { position: "Sangguniang Barangay Member", lastName: "OLAGUERA", firstName: "ARMANDO", middleName: "OROGO", suffix: "", contact: "09706569590" },
      { position: "Sangguniang Barangay Member", lastName: "ARDALES", firstName: "JOHN PAUL MARTIN", middleName: "NUÑEZ", suffix: "", contact: "09706569590" },
      { position: "SK Chairperson", lastName: "ARANDIA", firstName: "MARIANE", middleName: "PENAFLOR", suffix: "", contact: "09566719295" },
      { position: "Barangay Secretary", lastName: "OLAGUERA", firstName: "ANTONIO", middleName: "OROGO", suffix: "", contact: "09278452247" }
    ],
    "Panganiran": [
      { position: "Punong Barangay", lastName: "LLONA", firstName: "CONSEJO", middleName: "ARIATE", suffix: "", contact: "09653261003" },
      { position: "Sangguniang Barangay Member", lastName: "LATUGA", firstName: "MARITES", middleName: "SURIBEN", suffix: "", contact: "00" },
      { position: "Sangguniang Barangay Member", lastName: "MAIMOT", firstName: "FRANCISCA", middleName: "PEDRAGOSA", suffix: "", contact: "00" },
      { position: "Sangguniang Barangay Member", lastName: "NEO", firstName: "GINA", middleName: "MAGALONA", suffix: "", contact: "00" },
      { position: "Sangguniang Barangay Member", lastName: "QUISING", firstName: "EDGARDO", middleName: "ROMERO", suffix: "JR.", contact: "00" },
      { position: "Sangguniang Barangay Member", lastName: "PAULAR", firstName: "JERRY", middleName: "OGAYON", suffix: "", contact: "00" },
      { position: "Sangguniang Barangay Member", lastName: "PRIAS", firstName: "ADELINA", middleName: "LATUGA", suffix: "", contact: "09676041739" },
      { position: "Sangguniang Barangay Member", lastName: "PULGO", firstName: "JAYSON", middleName: "ORENCIA", suffix: "", contact: "00" },
      { position: "SK Chairperson", lastName: "YUSON", firstName: "MAY", middleName: "RINGCOPAN", suffix: "", contact: "09949970618" },
      { position: "Barangay Secretary", lastName: "NEO", firstName: "MARY ANN", middleName: "MORTA", suffix: "", contact: "09553053491" }
    ],
    "Rawis": [
      { position: "Punong Barangay", lastName: "GARCIA", firstName: "EDWIN", middleName: "PABELONIA", suffix: "", contact: "09059634587" },
      { position: "Sangguniang Barangay Member", lastName: "POLLOSO", firstName: "JOHN CARL", middleName: "NOVENO", suffix: "", contact: "09059634587" },
      { position: "Sangguniang Barangay Member", lastName: "OLAGUER", firstName: "ZEDRICK", middleName: "CADAG", suffix: "", contact: "09059634587" },
      { position: "Sangguniang Barangay Member", lastName: "POLLOSO", firstName: "JERRY", middleName: "ESPINOSA", suffix: "", contact: "09059634587" },
      { position: "Sangguniang Barangay Member", lastName: "TOLOSA", firstName: "ANTONIO", middleName: "ORINGO", suffix: "", contact: "09059634587" },
      { position: "Sangguniang Barangay Member", lastName: "NACION", firstName: "EVELYN", middleName: "MURILLO", suffix: "", contact: "09059634587" },
      { position: "Sangguniang Barangay Member", lastName: "OCHARAN", firstName: "EMMA", middleName: "GARCIA", suffix: "", contact: "09059634587" },
      { position: "Sangguniang Barangay Member", lastName: "MONILLA", firstName: "REMELYN", middleName: "ROMOBIO", suffix: "", contact: "09059634587" },
      { position: "SK Chairperson", lastName: "PALOYO", firstName: "JOBERT", middleName: "NOVA", suffix: "", contact: "09261135208" },
      { position: "Barangay Secretary", lastName: "SAPINOSO", firstName: "EMILY", middleName: "GARCIA", suffix: "", contact: "09355843467" }
    ],
    "Salvacion": [
      { position: "Punong Barangay", lastName: "PEPAÑO", firstName: "MARINA", middleName: "MUINA", suffix: "", contact: "09365846243" },
      { position: "Sangguniang Barangay Member", lastName: "PALMONES", firstName: "ARNEL", middleName: "NOBENO", suffix: "", contact: "09772597032" },
      { position: "Sangguniang Barangay Member", lastName: "PABELONIA", firstName: "ELEANOR", middleName: "PUSON", suffix: "", contact: "09261205627" },
      { position: "Sangguniang Barangay Member", lastName: "LOBIOSO", firstName: "WILMA", middleName: "NEBRES", suffix: "", contact: "09654683970" },
      { position: "Sangguniang Barangay Member", lastName: "BRIONES", firstName: "JAYZEL", middleName: "REALOSA", suffix: "", contact: "09358190170" },
      { position: "Sangguniang Barangay Member", lastName: "LODANA", firstName: "SUSANA", middleName: "LIZA", suffix: "", contact: "09356938029" },
      { position: "Sangguniang Barangay Member", lastName: "OLIVA", firstName: "NORLY", middleName: "ALCANTARA", suffix: "", contact: "0915151697" },
      { position: "Sangguniang Barangay Member", lastName: "NARITO", firstName: "SALVADOR", middleName: "NARES", suffix: "", contact: "09168924735" },
      { position: "SK Chairperson", lastName: "PALLAN", firstName: "ROMMEL", middleName: "SEGOVIA", suffix: "", contact: "V" },
      { position: "Barangay Secretary", lastName: "MARCAIDA", firstName: "JUDY ANNE", middleName: "CERVANTES", suffix: "", contact: "09202481294" }
    ],
    "Santo Cristo": [
      { position: "Punong Barangay", lastName: "MIRABETE", firstName: "ALFREDO", middleName: "NASIBA", suffix: "JR.", contact: "09659485318" },
      { position: "Sangguniang Barangay Member", lastName: "LUCILA", firstName: "JEZON", middleName: "CERVANTES", suffix: "", contact: "09971443675" },
      { position: "Sangguniang Barangay Member", lastName: "PANTOJA", firstName: "NELSON", middleName: "NAPOD", suffix: "", contact: "09268403204" },
      { position: "Sangguniang Barangay Member", lastName: "NASIBA", firstName: "PAQUITO", middleName: "REOFRER", suffix: "", contact: "09273841633" },
      { position: "Sangguniang Barangay Member", lastName: "NOVENO", firstName: "JOSEFINA", middleName: "NASIBA", suffix: "", contact: "09068604687" },
      { position: "Sangguniang Barangay Member", lastName: "WARDE", firstName: "ANA", middleName: "NERO", suffix: "", contact: "09350523961" },
      { position: "Sangguniang Barangay Member", lastName: "MALANO", firstName: "DELIA", middleName: "CERVANTES", suffix: "", contact: "09659166820" },
      { position: "Sangguniang Barangay Member", lastName: "OLIQUINO", firstName: "ANALYN", middleName: "LUZON", suffix: "", contact: "09264096288" },
      { position: "SK Chairperson", lastName: "OCFEMIA", firstName: "MARK JAMES", middleName: "REYES", suffix: "", contact: "09551956011" },
      { position: "Barangay Secretary", lastName: "MALANO", firstName: "CHRISTOPHER", middleName: "CERVANTES", suffix: "", contact: "09061063108" }
    ],
    "Sukip": [
      { position: "Punong Barangay", lastName: "VILLANUEVA", firstName: "HELEN", middleName: "LOMA", suffix: "", contact: "09652847909" },
      { position: "Sangguniang Barangay Member", lastName: "NOCOMORA", firstName: "ARJON", middleName: "MILLARE", suffix: "", contact: "09759817335" },
      { position: "Sangguniang Barangay Member", lastName: "LUDOVICE", firstName: "ANALIZA", middleName: "PALMONES", suffix: "", contact: "09267620249" },
      { position: "Sangguniang Barangay Member", lastName: "NOLASCO", firstName: "ANDRES", middleName: "AREPENTIDO", suffix: "", contact: "09061509971" },
      { position: "Sangguniang Barangay Member", lastName: "NACION", firstName: "ANTONIO", middleName: "VELASCO", suffix: "", contact: "09676609858" },
      { position: "Sangguniang Barangay Member", lastName: "NIEBRES", firstName: "VIRGIE", middleName: "ORTACIO", suffix: "", contact: "09361528107" },
      { position: "Sangguniang Barangay Member", lastName: "MUJAR", firstName: "NORMAN", middleName: "MAGDASOC", suffix: "", contact: "09365415446" },
      { position: "Sangguniang Barangay Member", lastName: "NICOL", firstName: "MERRY JANE", middleName: "MOLAR", suffix: "", contact: "00" },
      { position: "SK Chairperson", lastName: "NIEBRES", firstName: "EDCEL", middleName: "NOVE", suffix: "", contact: "09169477880" },
      { position: "Barangay Secretary", lastName: "ORIBIANA", firstName: "MARICEL", middleName: "CERVANTES", suffix: "", contact: "09267632310" }
    ],
    "Tibabo": [
      { position: "Punong Barangay", lastName: "OSIA", firstName: "LILIA", middleName: "BULACAN", suffix: "", contact: "09054882871" },
      { position: "Sangguniang Barangay Member", lastName: "LUCILA", firstName: "ROSECHEL", middleName: "CASIL", suffix: "", contact: "09054882871" },
      { position: "Sangguniang Barangay Member", lastName: "NUÑEZ", firstName: "SANNY", middleName: "MECALLER", suffix: "", contact: "0905488287" },
      { position: "Sangguniang Barangay Member", lastName: "PANEN", firstName: "ELMER", middleName: "PABLEO", suffix: "", contact: "09057131575" },
      { position: "Sangguniang Barangay Member", lastName: "PATRIARCA", firstName: "NATIVIDAD", middleName: "NOVENO", suffix: "", contact: "09054882871" },
      { position: "Sangguniang Barangay Member", lastName: "MUELLA", firstName: "JOEMEL", middleName: "LUNA", suffix: "", contact: "09054882871" },
      { position: "Sangguniang Barangay Member", lastName: "PABELONIA", firstName: "NONITO", middleName: "MORILLO", suffix: "", contact: "09054882871" },
      { position: "Sangguniang Barangay Member", lastName: "LLAMES", firstName: "MILA", middleName: "PORMENTO", suffix: "", contact: "09533064378" },
      { position: "SK Chairperson", lastName: "LUZON", firstName: "JOSUA", middleName: "OGUERA", suffix: "", contact: "09169265724" },
      { position: "Barangay Secretary", lastName: "ORTEZA", firstName: "MARIEL", middleName: "BRONZAL", suffix: "", contact: "09955792510" }
    ]
};
  // Barangay profile data
  const barangayProfiles: Record<string, any[]> = {
    "Agol": [
      { purok: "Purok 1", households: 45, families: 52, persons: 210 },
      { purok: "Purok 2", households: 38, families: 42, persons: 185 },
      { purok: "Purok 3", households: 52, families: 58, persons: 240 },
      { purok: "Purok 4", households: 41, families: 46, persons: 195 },
      { purok: "Purok 5", households: 35, families: 39, persons: 165 }
    ],
    "Alabangpuro": [
      { purok: "Purok 1", households: 50, families: 55, persons: 230 },
      { purok: "Purok 2", households: 42, families: 48, persons: 205 },
      { purok: "Purok 3", households: 37, families: 41, persons: 180 },
      { purok: "Purok 4", households: 45, families: 50, persons: 215 },
      { purok: "Purok 5", households: 39, families: 44, persons: 190 }
    ]
  };

  const profile = {
    population: "2,450",
    households: "520",
    area: "15.6 km²",
    elevation: "12 meters",
    barangayCaptain: "Hon. Juan Dela Cruz"
  };

  const bdrmmCommittee = [
    { name: "Juan Dela Cruz", role: "Chairperson", position: "Punong Barangay" },
    { name: "Maria Santos", role: "Vice Chairperson", position: "SB Member" },
    { name: "Pedro Reyes", role: "Member", position: "Barangay Treasurer" },
    { name: "Ana Gomez", role: "Member", position: "Barangay Secretary" },
    { name: "Carlos Mendoza", role: "Member", position: "SK Chairman" }
  ];

  const handleSubmitReport = () => {
    // Handle report submission
    setShowReportModal(false);
    setReportData({
      type: 'typhoon',
      evacuees: '',
      location: '',
      reportType: 'partial'
    });
  };

  if (!selectedBarangay) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 font-sans">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-950 mb-4">PIO DURAN BARANGAY PORTAL</h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Access information and services for all 33 barangays in Pio Duran, Albay
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-blue-950">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-blue-950 mb-4">Select Your Barangay</h2>
                  <p className="text-gray-600 mb-6">
                    Choose from the list of 33 barangays in Pio Duran to access barangay-specific information and services.
                  </p>
                </div>
                
                <div className="w-full md:w-auto">
                  <div className="relative">
                    <button
                      onClick={() => setShowSearch(!showSearch)}
                      className="w-full md:w-80 bg-blue-950 hover:bg-blue-900 text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-between transition-all duration-300 shadow-lg"
                    >
                      <span>{showSearch ? "Close Search" : "Search Barangay"}</span>
                      <Search className="ml-2" size={20} />
                    </button>
                    
                    {showSearch && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-10">
                        <div className="p-4 border-b border-gray-100">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                              type="text"
                              placeholder="Search barangay..."
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-transparent"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <div className="max-h-96 overflow-y-auto">
                          {filteredBarangays.length > 0 ? (
                            filteredBarangays.map((barangay) => (
                              <button
                                key={barangay}
                                onClick={() => {
                                  setSelectedBarangay(barangay);
                                  setShowSearch(false);
                                  setSearchTerm('');
                                }}
                                className="w-full text-left px-6 py-4 hover:bg-blue-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                              >
                                <div className="flex items-center">
                                  <MapPin className="text-blue-950 mr-3" size={18} />
                                  <span className="font-medium text-gray-800">{barangay}</span>
                                </div>
                              </button>
                            ))
                          ) : (
                            <div className="px-6 py-8 text-center text-gray-500">
                              No barangays found matching your search
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6">
                    <p className="text-gray-600 mb-3">Or browse all barangays:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto p-2">
                      {barangays.map((barangay) => (
                        <button
                          key={barangay}
                          onClick={() => setSelectedBarangay(barangay)}
                          className="text-left p-3 rounded-lg bg-gray-50 hover:bg-blue-50 hover:border-blue-200 border border-gray-200 transition-all duration-200"
                        >
                          <div className="flex items-center">
                            <MapPin className="text-blue-950 mr-2" size={16} />
                            <span className="text-gray-700 font-medium">{barangay}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-950">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <button 
                onClick={() => setSelectedBarangay(null)}
                className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X size={24} className="text-blue-950" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-blue-950">{selectedBarangay.toUpperCase()}</h1>
                <p className="text-gray-600">Barangay Portal - Pio Duran, Albay</p>
              </div>
            </div>
            
            <button
              onClick={() => setShowReportModal(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-blue-950 font-semibold py-3 px-6 rounded-lg flex items-center transition-colors duration-300 shadow-md"
            >
              <AlertTriangle className="mr-2" size={20} />
              Submit Situational Report
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Google Map Section */}
        <section className="mb-12 bg-white rounded-2xl shadow-lg p-8 border-t-4 border-blue-950">
          <div className="flex items-center mb-6">
            <Map className="text-blue-950 mr-3" size={28} />
            <h2 className="text-3xl font-bold text-blue-950">Location</h2>
          </div>
          <div className="bg-gray-200 rounded-xl h-96 flex items-center justify-center mb-6">
            <div className="text-center">
              <Map className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600 font-medium">Google Maps Integration</p>
              <p className="text-gray-500 mt-2">Interactive map showing {selectedBarangay} location in Pio Duran, Albay</p>
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-blue-950 font-medium">
              Google Maps Search Format: <span className="font-bold">{selectedBarangay}, Pio Duran, Albay</span>
            </p>
          </div>
        </section>

        {/* History Section */}
        <section className="mb-12 bg-white rounded-2xl shadow-lg p-8 border-t-4 border-blue-950">
          <div className="flex items-center mb-6">
            <FileText className="text-blue-950 mr-3" size={28} />
            <h2 className="text-3xl font-bold text-blue-950">Barangay History</h2>
          </div>
          <div className="prose max-w-none text-gray-700">
            <p className="mb-4">
              {selectedBarangay} has a rich history dating back to the early Spanish colonial period. 
              Originally inhabited by the indigenous Bicolano people, the barangay was formally established 
              in the late 1800s as part of the municipality of Pio Duran.
            </p>
            <p className="mb-4">
              The barangay played a significant role during the Philippine Revolution against Spain and 
              later during World War II. Its strategic location along the coast made it an important 
              trading point for local goods and agricultural products.
            </p>
            <p>
              Today, {selectedBarangay} continues to thrive as a vibrant community with a strong emphasis 
              on agriculture, fishing, and small-scale industries. The barangay is known for its 
              cooperative spirit and active participation in local governance and disaster preparedness.
            </p>
          </div>
        </section>

        {/* Officials Section */}
        <section className="mb-12 bg-white rounded-2xl shadow-lg p-8 border-t-4 border-blue-950">
          <div className="flex items-center mb-6">
            <Users className="text-blue-950 mr-3" size={28} />
            <h2 className="text-3xl font-bold text-blue-950">BARANGAY: OFFICIAL INFORMATION</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-950 text-yellow-500">
                  <th className="text-left p-4 font-semibold">Position</th>
                  <th className="text-left p-4 font-semibold">Last Name</th>
                  <th className="text-left p-4 font-semibold">First Name</th>
                  <th className="text-left p-4 font-semibold">Middle Name</th>
                  <th className="text-left p-4 font-semibold">Suffix</th>
                  <th className="text-left p-4 font-semibold">Contact Number</th>
                </tr>
              </thead>
              <tbody>
                {(barangayOfficials[selectedBarangay] || []).map((official, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-blue-50">
                    <td className="p-4 font-medium text-gray-800">{official.position}</td>
                    <td className="p-4 text-gray-700">{official.lastName}</td>
                    <td className="p-4 text-gray-700">{official.firstName}</td>
                    <td className="p-4 text-gray-700">{official.middleName}</td>
                    <td className="p-4 text-gray-700">{official.suffix}</td>
                    <td className="p-4 text-gray-700 flex items-center">
                      <Phone className="mr-2 text-blue-950" size={16} />
                      {official.contact}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Profile Section */}
        <section className="mb-12 bg-white rounded-2xl shadow-lg p-8 border-t-4 border-blue-950">
          <div className="flex items-center mb-6">
            <User className="text-blue-950 mr-3" size={28} />
            <h2 className="text-3xl font-bold text-blue-950">Barangay Profile</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-950 text-yellow-500">
                  <th className="text-left p-4 font-semibold">Purok Name</th>
                  <th className="text-left p-4 font-semibold">No. of Households</th>
                  <th className="text-left p-4 font-semibold">No. of Families</th>
                  <th className="text-left p-4 font-semibold">No. of Persons</th>
                </tr>
              </thead>
              <tbody>
                {(barangayProfiles[selectedBarangay] || []).map((profile, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-blue-50">
                    <td className="p-4 font-medium text-gray-800">{profile.purok}</td>
                    <td className="p-4 text-gray-700">{profile.households}</td>
                    <td className="p-4 text-gray-700">{profile.families}</td>
                    <td className="p-4 text-gray-700">{profile.persons}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* BDRRM Committee Section */}
        <section className="mb-12 bg-white rounded-2xl shadow-lg p-8 border-t-4 border-blue-950">
          <div className="flex items-center mb-6">
            <Building className="text-blue-950 mr-3" size={28} />
            <h2 className="text-3xl font-bold text-blue-950">BDRRM Committee Operational Structure</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bdrmmCommittee.map((member, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow bg-gradient-to-br from-white to-blue-50">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <User className="text-blue-950" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{member.name}</h3>
                    <p className="text-blue-950 font-medium">{member.role}</p>
                  </div>
                </div>
                <p className="text-gray-600">{member.position}</p>
              </div>
            ))}
          </div>
        </section>

        {/* BDRRM Plan Section */}
        <section className="mb-12 bg-white rounded-2xl shadow-lg p-8 border-t-4 border-blue-950">
          <div className="flex items-center mb-6">
            <Calendar className="text-blue-950 mr-3" size={28} />
            <h2 className="text-3xl font-bold text-blue-950">BDRRM Plan</h2>
          </div>
          <div className="prose max-w-none text-gray-700">
            <h3 className="text-xl font-bold mb-4">Disaster Risk Reduction and Management Plan</h3>
            <p className="mb-4">
              The Barangay Disaster Risk Reduction and Management Plan outlines comprehensive strategies 
              for preparedness, response, recovery, and mitigation of various hazards including typhoons, 
              floods, earthquakes, and volcanic eruptions.
            </p>
            
            <h4 className="text-lg font-bold mt-6 mb-3">Key Components:</h4>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Hazard identification and risk assessment</li>
              <li>Early warning systems and communication protocols</li>
              <li>Evacuation procedures and shelter management</li>
              <li>Resource mobilization and logistics management</li>
              <li>Capacity building and training programs</li>
              <li>Recovery and rehabilitation frameworks</li>
            </ul>
            
            <h4 className="text-lg font-bold mt-6 mb-3">Emergency Contacts:</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>Barangay Emergency Response Team: 0912-345-6789</li>
              <li>Municipal DRRMO: (052) 123-4567</li>
              <li>Provincial DRRMO: (052) 987-6543</li>
              <li>National Emergency Hotline: 911</li>
            </ul>
          </div>
        </section>
      </div>

      {/* Situational Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-950 to-blue-900 text-white">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">Situational Report</h3>
                <button 
                  onClick={() => setShowReportModal(false)}
                  className="p-2 rounded-lg hover:bg-blue-800"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                  <select 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-transparent"
                    value={reportData.type}
                    onChange={(e) => setReportData({...reportData, type: e.target.value})}
                  >
                    <option value="typhoon">Typhoon</option>
                    <option value="flood">Flood</option>
                    <option value="earthquake">Earthquake</option>
                    <option value="fire">Fire</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Evacuees</label>
                  <input
                    type="number"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-transparent"
                    placeholder="Enter number of evacuees"
                    value={reportData.evacuees}
                    onChange={(e) => setReportData({...reportData, evacuees: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Evacuation Location</label>
                  <select 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-transparent"
                    value={reportData.location}
                    onChange={(e) => setReportData({...reportData, location: e.target.value})}
                  >
                    <option value="">Select location</option>
                    <option value="daycare">Daycare Center</option>
                    <option value="school">School</option>
                    <option value="private">Private House</option>
                    <option value="church">Church</option>
                    <option value="barangay_hall">Barangay Hall</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Report Status</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="reportType"
                        value="partial"
                        checked={reportData.reportType === 'partial'}
                        onChange={(e) => setReportData({...reportData, reportType: e.target.value})}
                        className="mr-2"
                      />
                      Partial Report
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="reportType"
                        value="final"
                        checked={reportData.reportType === 'final'}
                        onChange={(e) => setReportData({...reportData, reportType: e.target.value})}
                        className="mr-2"
                      />
                      Final Report
                    </label>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    onClick={() => setShowReportModal(false)}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitReport}
                    className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-blue-950 rounded-lg flex items-center transition-colors font-semibold"
                  >
                    <Send className="mr-2" size={18} />
                    Submit Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BarangayPortal;
