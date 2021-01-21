import React from "react";
import {ComposableMap, Geographies, Geography, Marker} from "react-simple-maps";
import axios from "axios";
import Modal from "../Modal/modal";

const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
const endpointUrl = 'https://query.wikidata.org/sparql';

const sparqlQuery = `
PREFIX nobel: <http://data.nobelprize.org/terms/>
    PREFIX foaf: <http://xmlns.com/foaf/0.1/>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    SELECT DISTINCT ?person ?name ?birthplace ?birthyear ?coord ?layer WHERE {
        ?person p:P166 ?awardStat . 
        ?awardStat ps:P166 ?aa .
        VALUES ?aa {wd:Q44585 wd:Q35637 wd:Q37922 wd:Q38104 wd:Q80061 wd:Q47170} .
        ?person wdt:P570 ?dod;
        wdt:P19 ?place .
        ?place wdt:P625 ?coord
        OPTIONAL { ?person wdt:P569 ?dob }
        BIND(YEAR(?dob) as ?birthyear)
        BIND(IF( (?aa = wd:Q44585), "Chemistry", IF((?aa = wd:Q35637), "Peace", IF((?aa = wd:Q37922), "Literature", IF((?aa = wd:Q38104), "Phisics", IF((?aa = wd:Q80061), "Physiology or Medicine", IF((?aa = wd:Q47170), "Economic Science", "else") ) ) ) )) AS ?layer )  
        ?person rdfs:label ?name filter (lang(?name) = "en")
        ?place rdfs:label ?birthplace filter (lang(?birthplace) = "en")
    } ORDER BY ?birthyear
`;

const fullUrl = endpointUrl + '?query=' + encodeURIComponent(sparqlQuery);
const headers = {'Accept': 'application/sparql-results+json'};


const mapping = {
    "Literature": "#f44336",
    "Peace": "#00bbff",
    "Chemistry": "#9c27b0",
    "Economic Science": "#ff9800",
    "Phisics": "#d439c7",
    "Physiology or Medicine": "#4caf50"

};
const wrapperStyles = {
    width: "95%",
};


const MapChart = () => {
    let [markers, setMarkers] = React.useState([])

    React.useEffect(() => {
        axios.get(fullUrl, headers)
            .then(res => {
                console.log("tylko raz")
                const data = res.data.results.bindings;
                const re = /Point\(([-]*\d+.[\d]+)\s([-]*\d+.[\d]+)\)/;
                let aa = [];
                data.forEach(a => {
                    const match = re.exec(a.coord.value);
                    aa.push({name: a.name.value, coordinates: [match[1], match[2]], label: a.layer.value})
                })
                setMarkers(aa)
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const [showModal, setShowModal] = React.useState(false);

    return (
        <>
            <div style={wrapperStyles} onClick={() => setShowModal(true)}>
                <ComposableMap>
                    <Geographies geography={geoUrl}>
                        {({geographies}) =>
                            geographies
                                .map((geo) => (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        fill="#bcbcbc"
                                        stroke="#D6D6DA"
                                    />
                                ))
                        }
                    </Geographies>
                    {markers.map(({name, coordinates, label}) => (
                        <Marker key={""} coordinates={coordinates}>
                            <circle
                                r={1}
                                fill={mapping[label]}
                                stroke={mapping[label]}
                                strokeWidth={1}
                            />
                        </Marker>
                    ))}
                </ComposableMap>
            </div>
            <Modal query={sparqlQuery} showModal={showModal} setShowModal={setShowModal}/>
        </>
    );
};

export default MapChart;
