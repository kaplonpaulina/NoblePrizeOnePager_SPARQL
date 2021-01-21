import React from 'react';
import GridItem from "components/Grid/GridItem.js";


import axios from 'axios';
import Modal from "../Modal/modal";
import CreatableSelect from 'react-select';
import {awardOption, sexOption} from "./data";

const endpointUrl = 'https://query.wikidata.org/sparql';
const headers = {'Accept': 'application/sparql-results+json'};


const TimeLine = () => {
    const [showModal, setShowModal] = React.useState(false);
    const [sexChosen, setSexChosen] = React.useState("");
    const [awardChosen, setAwardChosen] = React.useState("wd:Q44585 wd:Q35637 wd:Q37922 wd:Q38104 wd:Q80061 wd:Q47170");


    const sparqlQuery = `
    PREFIX nobel: <http://data.nobelprize.org/terms/>
        PREFIX foaf: <http://xmlns.com/foaf/0.1/>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        SELECT DISTINCT ?itemLabel (YEAR(?when) as ?date) ?aaLabel
    WHERE {
      ?item p:P166 ?awardStat .`
        + (sexChosen.length > 0 ? `
      ?item wdt:P21 ?gender. 
      VALUES ?gender {` + sexChosen + `}` : ``) + `
      ?awardStat ps:P166 ?aa .
      VALUES ?aa {` + awardChosen + `} .
      ?awardStat pq:P585 ?when . 
    SERVICE wikibase:label { bd:serviceParam wikibase:language "en" . }
    
    }
    ORDER BY DESC(?when)
`;

    const fullUrl = endpointUrl + '?query=' + encodeURIComponent(sparqlQuery);


    let [responseData, setResponseData] = React.useState([])


    React.useEffect(() => {
        axios.get(fullUrl, headers)
            .then(res => {
                console.log("timeline")
                const data = res.data.results.bindings;

                const first = data[0].date.value;

                let golden = [];
                let curr = first;

                let aa = [];
                data.forEach(a => {
                    const year = a.date.value;
                    if (curr !== year) {
                        golden.push(aa);
                        aa = [];
                        curr = year;
                    }
                    aa.push({name: a.itemLabel.value, year: year, cat: a.aaLabel.value})
                })

                golden.push(aa)

                setResponseData(golden)
            })
            .catch(err => {
                console.log(err);
            })
    }, [fullUrl]);

    function handleSexChange(newValue) {
        let s = "";
        if (newValue?.length > 0) {
            s = newValue.map(x => x.actual).join(" ");
        }
        setSexChosen(s)
    };

    function handleAwardChange(newValue) {
        let s = "";
        if (newValue?.length > 0) {
            s = newValue.map(x => x.actual).join(" ");
        } else {
            s = awardOption.map(x => x.actual).join(" ");
        }
        setAwardChosen(s)
    };

    return (
        <>
            <GridItem style={{zIndex:100, minWidth:'20%'}}>
                <CreatableSelect
                    defaultValue={[sexOption[0], sexOption[1]]}
                    isMulti
                    name="colors"
                    options={sexOption}
                    onChange={handleSexChange}
                    className="basic-multi-select"
                    classNamePrefix="select"
                />
            </GridItem>
            <GridItem style={{zIndex:50, minWidth:'20%'}}>
                <CreatableSelect
                    defaultValue={awardOption}
                    isMulti
                    name="colors"
                    options={awardOption}
                    onChange={handleAwardChange}
                    className="basic-multi-select"
                    classNamePrefix="select"
                />
            </GridItem>


            <GridItem xs={12} sm={12} md={12} onClick={() => setShowModal(true)}>

                <ul className="timeline">
                    {responseData.map((a) => (
                        <li>
                            <div className={a[0].year % 2 === 0 ? "direction-r" : "direction-l"}>
                                <div className="flag-wrapper">
                                    <span className="hexa"></span>
                                    <span className="flag">Award ceremony.</span>
                                    <span className="time-wrapper"><span className="time">{a[0].year}</span></span>
                                </div>
                                {a.map((b) => (
                                    <div className="desc">
                                        <p className="flag-name">
                                            {b.name}
                                        </p>
                                        <p>
                                            {b.cat}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </li>
                    ))}
                </ul>
            </GridItem>

            <Modal query={sparqlQuery} showModal={showModal} setShowModal={setShowModal}/>
        </>
    )
}

export default TimeLine;